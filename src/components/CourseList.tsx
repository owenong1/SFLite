// In src/components/CourseList.tsx

import { useState, useEffect } from 'react';
import { getCourseSummaries } from '../helper/course-summary-retriever';
import type { CourseSummary } from '../types';
import CourseCard from './CourseCard';
import { useBookmarks } from '../context/BookmarkContext';
import './CourseList.css';

const CourseList = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [allCourses, setAllCourses] = useState<CourseSummary[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseSummary[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false); // State for show bookmark toggle
  const { bookmarkedIds } = useBookmarks();

  // Fetch the full dataset once when the component first mounts.
  useEffect(() => {
    const allCourseData = getCourseSummaries();
    setAllCourses(allCourseData);
    setFilteredCourses(allCourseData); // Initially, show all courses
  }, []); 

  // To adjust list whenever the 'searchQuery' or 'allCourses' state changes.
  useEffect(() => {
    let currentCourses = allCourses
    
    if (searchQuery) {
      currentCourses = currentCourses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (showBookmarksOnly) {
      currentCourses = currentCourses.filter(course => 
        bookmarkedIds.includes(course.id));
    }

    setFilteredCourses(currentCourses);
    
  }, [searchQuery, allCourses, showBookmarksOnly, bookmarkedIds]); 

  return (
    // Use a React.Fragment <> to return multiple elements at the same level.
    <>
      {/* --- CONTROLS --- */}
      <div className="controls-container">
        <input
          type="text"
          placeholder="Search for a course..."
          className="search-input"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="bookmark-filter">
          <input
            type="checkbox"
            id="bookmark-toggle"
            checked={showBookmarksOnly}
            onChange={e => setShowBookmarksOnly(e.target.checked)}
          />
          <label htmlFor="bookmark-toggle">Show Bookmarked Only</label>
        </div>
      </div>

      {/* --- COURSE GRID --- */}
      <div className="course-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="no-results-message">No courses found.</p>
        )}
      </div>
    </>
  );
};

export default CourseList;
