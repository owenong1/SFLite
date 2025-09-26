import type { CourseDetails } from '../types';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseDetails } from '../helper/course-details-retriever';
import BookmarkButton from '../components/BookmarkButton';
import './CourseDetailsPage.css';

const CourseDetailsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const searchQuery = new URLSearchParams(location.search).get('q') || '';
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
    return (
      <div className="status-message">
        <h2>Course not found.</h2>
        <Link to="/">Go back to the course list</Link>
      </div>
    );
  }

  return (
    <div className="course-details-page">
      <Link to={`/?q=${encodeURIComponent(searchQuery)}`} className="back-link">← Back to Course List</Link>
      
      <header className="details-header">
        <div>
          <h1 className="details-title">{course.title}</h1>
          <p className="details-provider">by {course.providerName}</p>
          <div className="header-meta">
            <span>⭐ {course.rating} ({course.ratingCount} ratings)</span>
            <span className="meta-divider">•</span>
            <span>{course.attendeeCount} Attended</span>
          </div>
        </div>
        <div className = "header-actions">
          <BookmarkButton courseId={course.id} />
          <Link to={`https://www.myskillsfuture.gov.sg/content/portal/en/training-exchange/course-directory/course-detail.html?courseReferenceNumber=${course.id}`} className="enroll-button" target="_blank" rel="noopener noreferrer">View on SkillsFuture Website</Link>
        </div>
      </header>

      <div className="details-grid">
        {/* Left Column: Main Content */}
        <div className="details-main">
          <div className="detail-section">
            <h3>About This Course</h3>
            {/* Using 'pre-wrap' to respect newlines from the API response */}
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

        {/* Right Column: Sidebar */}
        <aside className="details-sidebar">
          
          {course.skills && course.skills.length > 0 && (
          <div className="sidebar-card skills-section">
            <strong>Skills You'll Pick Up</strong>
            <div className="skills-tags">
              {course.skills.map(skill => (
                <span key={skill.title} className="skill-tag">{skill.title}</span>
              ))}
            </div>
          </div>
          )}

          <div className="sidebar-card fees-section">
            {course.subsidizedFee !== undefined ? (
              <>
                <div className="fee-item">
                  <span className="fee-label">Full Course Fee</span>
                  <span className="fee-value full-fee">${course.fullFee.toFixed(2)}</span>
                </div>
                <div className="fee-item">
                  <span className="fee-label">After Subsidies</span>
                  <span className="fee-value subsidized-fee">${course.subsidizedFee.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <div className="fee-item">
                <span className="fee-label">Course Fee</span>
                <span className="fee-value subsidized-fee">${course.fullFee.toFixed(2)}</span>
              </div>
            )}
          </div>

          {course.schemes && course.schemes.length > 0 && (
          <div className="sidebar-card info-section">
            <div className="info-item">
              <strong>Next Course Run</strong>
              <div>{course.nextCourseRun}</div>
              {course.moreCourseRunsCount > 0 && (
                <span className="more-runs-link">And {course.moreCourseRunsCount} more</span>
              )}
            </div>
            <div className="info-item">
              <strong>Applicable Schemes</strong>
              <p className="schemes-text">{course.schemes.join(', ')}</p>
            </div>
          </div>
          )}

        </aside>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
