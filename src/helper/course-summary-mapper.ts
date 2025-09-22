import mockCourseData from '../mock-course-data.ts';
import type { CourseSummary, ApiResponse, RawCourse } from '../types';


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

  // If the course tags include 'SFC' and there's a fee, calculate the subsidized price.
  if (rawCourse.Course_Tagging_text?.includes('SFC')) {
    subsidizedFee = Math.round(fullFee * 0.3 * 100) / 100;
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

// Simulate an API response using the mock data
const apiResponse = mockCourseData as ApiResponse;
const courseGroups = apiResponse.grouped.GroupID.groups;
const allCourseSummaries: CourseSummary[] = courseGroups.map(group => {
  const rawCourse = group.doclist.docs[0] as RawCourse; 
  return mapRawCourseToSummary(rawCourse);
});

// Return all course summaries based on the mock data
export const getCourseSummaries = (): CourseSummary[] => {
  return allCourseSummaries;
};

export const getCourseById = (id: string): CourseSummary | undefined => {
  return allCourseSummaries.find(course => course.id === id);
};
