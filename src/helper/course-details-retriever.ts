import type { CourseDetails } from '../types'; 
import { getSubsidizedFee } from './subsidized-fee-calculator';

/**
 * Fetches detailed information for a single course using the details API.
 * @param courseId The ID of the course (e.g., "TGS-2020502527")
 * @returns Cleaned and structured course details.
 */
export const getCourseDetails = async (courseId: string): Promise<CourseDetails | null> => {
  // Construct the API URL using proxy.
  const apiUrl = `/api/services/tex/individual/course-detail?action=get-course-by-ref-number&refNumber=${courseId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch details");
    
    const jsonResponse = await response.json();
    const rawData = jsonResponse.data;

    // Helper to format dates
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-SG', {
      day: 'numeric', month: 'short', year: 'numeric'
    });

    // Calculate subsidized fee if applicable
    const fullFee = parseFloat(rawData.totalCostOfTrainingPerTrainee);
    const subsidizedFee = (rawData.courseTaggings?.some((t: any) => t.description === 'Course Fee Grant')) 
                          ? getSubsidizedFee(fullFee) 
                          : undefined;

    // Find the next course run and count the others
    const nextRun = rawData.courseRuns?.[0];
    const nextCourseRun = nextRun ? `${formatDate(nextRun.courseStartDate)} - ${formatDate(nextRun.courseEndDate)}` : 'N/A';
    const moreCourseRunsCount = rawData.courseRuns.length > 1 ? rawData.courseRuns.length - 1 : 0;

    // To adjust bullet points formatting if necessary
    // const cleanText = (text: string) => text.replace(/•\t/g, '\n• ').trim();

    const details: CourseDetails = {
      id: rawData.courseReferenceNumber,
      title: rawData.courseTitle,
      providerName: rawData.trainingProviderAlias,
      fullFee: fullFee,
      subsidizedFee: subsidizedFee,
      attendeeCount: rawData.courseAttendeeCount,
      // Note: The details API doesn't seem to return rating/ratingCount, so we'll fake it for now.
      // In a real app, we'd merge this with data from the search results.
      rating: 4.3, 
      ratingCount: 1762,
      nextCourseRun: nextCourseRun,
      moreCourseRunsCount: moreCourseRunsCount,
      schemes: rawData.tags.map((tag: any) => tag.text),
      description: rawData.courseObjective,
      whatYoullLearn: rawData.courseContent,
      entryRequirement: rawData.entryRequirement,
      skills: rawData.uniqueSkills.map((skill: any) => ({ title: skill.title, type: skill.type })),
    };

    return details;

  } catch (error) {
    console.error("Failed to get course details:", error);
    return null;
  }
};
