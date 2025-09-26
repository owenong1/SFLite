import type { CourseSummary, CourseSummaryApiResponse, RawCourse } from '../types.ts';
import wrapProxy from './proxy-wrapper.ts';
import { getSubsidizedFee } from './subsidized-fee-calculator.ts';

// Helper func to map raw course data from api to CourseSummary structure
const mapRawCourseToSummary = (rawCourse: RawCourse): CourseSummary => {
  
  const formatDuration = (durationFacet: string): string => {
    if (!durationFacet) return 'N/A';
    return durationFacet.split('=')[1] || 'N/A';
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-SG', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const fullFee = rawCourse.Tol_Cost_of_Trn_Per_Trainee || 0;
  let subsidizedFee: number | undefined = undefined;

  // If the course tags include 'Course Fee Grant', calculate the subsidized price.
  if (rawCourse.Course_Tagging_text?.includes('Course Fee Grant') && fullFee) {
    subsidizedFee = getSubsidizedFee(fullFee);
  }

  return {
    id: rawCourse.Course_Ref_No,
    title: rawCourse.Course_Title,
    providerName: rawCourse.TP_ALIAS,
    starRating: rawCourse.Course_Quality_Stars_Rating || 0,
    ratingCount: rawCourse.Course_Quality_NumberOfRespondents || 0,
    duration: formatDuration(rawCourse.Len_of_Course_Duration_facet),
    trainingMode: rawCourse.Mode_of_Training_text?.join(', ') || 'N/A',
    fullFee: fullFee,
    subsidizedFee: subsidizedFee, 
    upcomingRunDate: formatDate(rawCourse.Course_Start_Date_Nearest),
  };
};

// Constructs the correct url for the api call
function getAPIURL(searchTerm: string, start: number = 0): string {
  const baseUrl = "https://www.myskillsfuture.gov.sg/services/tex/individual/course-search";

  const params = new URLSearchParams();
  params.set("rows", '24');
  params.set("facet", "true");
  params.set("facet.mincount", "1");
  params.set("json.nl", "map");

  // ✅ Append multiple facet.field values
  const facets = [
    "{!ex=TP_ALIAS_Suggest}TP_ALIAS_Suggest",
    "{!ex=Wheelchair_Access}Wheelchair_Access",
    "{!ex=Area_of_Training}Area_of_Training",
    "{!ex=Area_of_Training}Area_of_Training_facet",
    "{!ex=Mode_of_Training}Mode_of_Training",
    "{!ex=Mode_of_Training}Mode_of_Training_facet",
    "{!ex=Medium_of_Instruction}Medium_of_Instruction",
    "{!ex=Medium_of_Instruction}Medium_of_Instruction_facet",
    "{!ex=Minimum_Education_Req}Minimum_Education_Req",
    "{!ex=Minimum_Education_Req}Minimum_Education_Req_facet",
    "{!ex=Course_Funding}Course_Funding",
    "{!ex=Course_Funding}Course_Funding_facet",
    "{!ex=Course_Quality_Stars_Rating_Search}Course_Quality_Stars_Rating_Search",
    "{!ex=Course_Quality_Stars_Rating_Search}Course_Quality_Stars_Rating_facet",
    "{!ex=Len_of_Course_Duration_Search}Len_of_Course_Duration_Search",
    "{!ex=Len_of_Course_Duration_Search}Len_of_Course_Duration_facet",
    "{!ex=Tags_text_Filtered}Tags_text_Filtered",
    "{!ex=Tags_text_FeaturedInitiatives}Tags_text_FeaturedInitiatives",
    "{!ex=Tags_text_SFInitiatives}Tags_text_SFInitiatives"
  ];
  facets.forEach(f => params.append("facet.field", f));

  params.append("fq", "IsValid:true");
  params.append("fq", `Course_Supp_Period_To_1:[${new Date().toISOString()} TO *]`);
  params.set("q", searchTerm);
  params.set("start", start.toString());
  params.set("refresh", Date.now().toString());

  const fullUrl = `${baseUrl}?query=${encodeURIComponent(params.toString())}&jumpstart=true&client_id=f840437b-c974-40d4-a469-574f6630efa2`;

  return wrapProxy(fullUrl);
}

/**
 * Fetches list of courses for a search query using the API.
 * @param searchQuery The query to search given in the search bar
 * @param start The row of data to retrieve (API sends max 24 courses at a time)
 * @returns Cleaned and structured course details.
 */
export const getCourseSummaries = async (searchQuery : string = "data analytics", n : number = 48): Promise<CourseSummary[]> => {
  // Construct the API URL using proxy.
  const apiURLs : string[] = [];
  for (let start = 0; start < n; start += 24) {
    apiURLs.push( getAPIURL(searchQuery, start));
    console.log(getAPIURL(searchQuery, start))
  }

  try {
    const allCourseSummaries : CourseSummary[] = [];

    for (const apiURL of apiURLs) {

      const response = await fetch(apiURL);
      if (!response.ok) throw new Error("Failed to fetch courses!");
      const jsonResponse = await response.json() as CourseSummaryApiResponse;

      const courseGroups = jsonResponse.contents.grouped.GroupID.groups;
      const courseSummaries: CourseSummary[] = courseGroups.map(group => {
        const rawCourse = group.doclist.docs[0] as RawCourse; 
      return mapRawCourseToSummary(rawCourse);
      });
      allCourseSummaries.push(...courseSummaries);
    }

    return allCourseSummaries

  } catch (error) {
    console.error("Failed to get course details:", error);
    return [];
  }

}

/* Obsolete due to new implementation

import mockCourseData from '../mock-course-data.ts';

// Simulate an API response using the mock data
const apiMockResponse = mockCourseData as CourseSummaryApiResponse;
const courseGroups = apiMockResponse.grouped.GroupID.groups;
const allMockCourseSummaries: CourseSummary[] = courseGroups.map(group => {
  const rawCourse = group.doclist.docs[0] as RawCourse; 
  return mapRawCourseToSummary(rawCourse);
});

// Return all course summaries based on the mock data
export const getMockCourseSummaries = (): CourseSummary[] => {
  return allMockCourseSummaries;
};

export const getMockCourseById = (id: string): CourseSummary | undefined => {
  return allMockCourseSummaries.find(course => course.id === id);
};

*/