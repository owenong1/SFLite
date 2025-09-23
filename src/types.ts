export interface CourseSummary {
  id: string;
  title: string;
  providerName: string;
  starRating: number;
  ratingCount: number;
  duration: string;
  trainingMode: string;
  fullFee: number;
  subsidizedFee?: number; // Only applies if "SFC" tag is present from the api call data
  upcomingRunDate: string;
}

export interface CourseSummaryApiResponse {
  grouped: {
    GroupID: {
      groups: Array<{
        doclist: {
          docs: RawCourse[]; // The actual course object is in here
        };
      }>;
    };
  };
}

// Raw course object from the Courselist API
export interface RawCourse {
  Course_Ref_No: string;
  Course_Title: string;
  TP_ALIAS: string;
  Course_Quality_Stars_Rating: number;
  Course_Quality_NumberOfRespondents: number;
  Len_of_Course_Duration_facet: string;
  Mode_of_Training_text: string[];
  Tol_Cost_of_Trn_Per_Trainee: number;
  Course_Start_Date_Nearest: string;
  Course_Tagging_text: string[];
}

// Detailed course data from the Course Details API
export interface CourseDetails {
  id: string;
  title: string;
  providerName: string;
  fullFee: number;
  subsidizedFee: number | undefined; // Seems we can calculate this with *0.3 generally
  attendeeCount: number;
  rating: number;
  ratingCount: number;
  nextCourseRun: string;
  moreCourseRunsCount: number;
  schemes: string[];
  description: string; // "About This Course"
  whatYoullLearn: string; // "What You'll Learn"
  entryRequirement: string;
  skills: { title: string; type: string }[];
}
