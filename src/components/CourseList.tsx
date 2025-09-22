// In src/components/CourseList.tsx

import { useState, useEffect } from 'react';
import { getCourseSummaries } from '../helper/course-summary-mapper';
import type { CourseSummary } from '../types';
import CourseCard from './CourseCard';
import './CourseList.css';

const CourseList = () => {
  // State for the search input's value
  const [searchQuery, setSearchQuery] = useState('');
  
  // State to hold the original, complete list of all courses.
  const [allCourses, setAllCourses] = useState<CourseSummary[]>([]);

  // State to hold the courses that are currently being displayed.
  // This list will change based on the search query.
  const [filteredCourses, setFilteredCourses] = useState<CourseSummary[]>([]);

  // Fetch the full dataset once when the component first mounts.
  useEffect(() => {
    const allCourseData = getCourseSummaries();
    setAllCourses(allCourseData);
    setFilteredCourses(allCourseData); // Initially, show all courses
  }, []); 

  // To run whenever the 'searchQuery' or 'allCourses' state changes.
  useEffect(() => {

    const filterCourses = () => {
      if (!searchQuery) {
        // If the search query is empty, show all courses.
        setFilteredCourses(allCourses);
        return;
      }

      // Filter the 'allCourses' list based on the query.
      const filtered = allCourses.filter(course =>
        // A simple, case-insensitive search on the course title.
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    };

    filterCourses();
  }, [searchQuery, allCourses]); // dependency array for this effect.

  return (
    // Use a React.Fragment <> to return multiple elements at the same level.
    <>
      {/* --- SEARCH BAR UI --- */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for a course by name..."
          className="search-input"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* --- COURSE GRID --- */}
      <div className="course-list">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
};

export default CourseList;
