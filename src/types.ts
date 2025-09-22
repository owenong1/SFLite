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

export interface ApiResponse {
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

// This interface describes the raw course object from the API
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
