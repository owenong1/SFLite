import type { CourseSummary, CourseSummaryApiResponse, RawCourse } from '../types.ts';
import mockCourseData from '../mock-course-data.ts';
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

// Simulate an API response using the mock data
const apiResponse = mockCourseData as CourseSummaryApiResponse;
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
