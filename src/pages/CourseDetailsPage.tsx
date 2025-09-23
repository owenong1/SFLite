import type { CourseDetails } from '../types';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseDetails } from '../helper/course-details-retriever';
import './CourseDetailsPage.css';

const CourseDetailsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (courseId) {
        setIsLoading(true);
        const foundCourse = await getCourseDetails(courseId);
        setCourse(foundCourse);
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [courseId]);

   if (isLoading) {
    return <div className="status-message">Loading course details...</div>;
  }

  if (!course) {
    return <div className="status-message">Course not found.</div>;
  }

  return (
    <div className="course-details-page">
      <Link to="/" className="back-link">← Back to Course List</Link>
      
      <header className="details-header">
        <h1 className="details-title">{course.title}</h1>
        <p className="details-provider">by {course.providerName}</p>
        <div className="header-meta">
          <span>⭐ {course.rating} ({course.ratingCount} ratings)</span>
          <span>•</span>
          <span>{course.attendeeCount} Attended</span>
        </div>
      </header>

      <div className="details-grid">
        <div className="details-main">
          <div className="detail-section">
            <h3>About This Course</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{course.description}</p>
          </div>
          <div className="detail-section">
            <h3>What You'll Learn</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{course.whatYoullLearn}</p>
          </div>
          {course.entryRequirement && (
            <div className="detail-section">
              <h3>Minimum Entry Requirement</h3>
              <p>{course.entryRequirement}</p>
            </div>
          )}
        </div>

        <aside className="details-sidebar">
          <div className="fees-section">
            {course.subsidizedFee !== undefined ? (
              <>
                <div className="fee-item">
                  <span className="fee-label">Full Fee</span>
                  <span className="fee-value full-fee">${course.fullFee.toFixed(2)}</span>
                </div>
                <div className="fee-item">
                  <span className="fee-label">After SkillsFuture Funding</span>
                  <span className="fee-value subsidized-fee">${course.subsidizedFee.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <div className="fee-item">
                <span className="fee-label">Fee</span>
                <span className="fee-value subsidized-fee">${course.fullFee.toFixed(2)}</span>
              </div>
            )}
          </div>
          <div className="info-section">
            <div className="info-item">
              <strong>Next Course Run</strong>
              <div>{course.nextCourseRun}</div>
              {course.moreCourseRunsCount > 0 && (
                <span>And {course.moreCourseRunsCount} more</span>
              )}
            </div>
            <div className="info-item">
              <strong>Applicable Schemes</strong>
              <div>{course.schemes.join(', ')}</div>
            </div>
            <div className="info-item">
              <strong>Skills You'll Pick Up</strong>
              <div className="skills-tags">
                {course.skills.map(skill => <span key={skill.title} className="skill-tag">{skill.title}, </span>)}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
