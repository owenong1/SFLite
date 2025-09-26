import type { CourseSummary } from '../types';
import { Link } from 'react-router-dom'; 
import BookmarkButton from './BookmarkButton';
import './CourseCard.css';


interface CourseCardProps {
  course: CourseSummary;
  apiSearchQuery: string; 
}

const CourseCard = ({ course, apiSearchQuery }: CourseCardProps) => {
  return (
    <Link to={`/course/${course.id}?q=${encodeURIComponent(apiSearchQuery)}`} className="course-card">
      
      <h3 className="course-title">{course.title}</h3>  

      <div className="card-mainline">
        <span className="provider-name">{course.providerName}</span>
        
      </div>

      <div className="card-details">
        <span>🗓️ {course.upcomingRunDate}</span>
        <span>🕒 {course.duration}</span>
        <span>💼 {course.trainingMode}</span>
      </div>

      <div className="rating">
          <span>⭐ {course.starRating.toFixed(1)}</span>
          <span className="rating-count">({course.ratingCount})</span>
        </div>

      <div className="card-footer">
        
        {course.subsidizedFee !== undefined ? (
          /// Case 1: Subsidized fee exists. Show both fees.
          <>
            <div className="fee-row">
              <span className="fee-label">Full Fee:</span>
              <span className="full-fee">${course.fullFee.toFixed(2)}</span>
            </div>
            <div className="fee-row">
              <span className="fee-label">Subsidized Fee: </span>
              <span className="subsidized-fee">${course.subsidizedFee.toFixed(2)}</span>
            </div>
          </>
        ) : (
          // Case 2: Only full fee exists.
          <div className="fee-row">
            <span className="fee-label">Fee: </span>
            <span className="subsidized-fee">${course.fullFee.toFixed(2)}</span>
          </div>
        )}
      </div>

      <BookmarkButton courseId={course.id} />

    </Link>
  );
};

export default CourseCard;
