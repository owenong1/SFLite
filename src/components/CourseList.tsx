import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCourseSummaries } from '../helper/course-summary-retriever';
import type { CourseSummary } from '../types';
import CourseCard from './CourseCard';
import { useBookmarks } from '../context/BookmarkContext';
import './CourseList.css';

const COURSES_PER_CALL = 24 * 2 // API calls in multiples of 24

const CourseList = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // The term in the url query param 'q'
  const initialQuery = searchParams.get('q') || 'data analytics';
  const [apiSearchQuery, setApiSearchQuery] = useState('') // The term sent for query to the api
  const [searchBarInput, setSearchBarInput] = useState(initialQuery) // The term in the search bar
  const [filterQuery, setFilterQuery] = useState('');
  const [allCourses, setAllCourses] = useState<CourseSummary[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<CourseSummary[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false); // State for show bookmark toggle
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { bookmarkedIds } = useBookmarks();

  // Fetch course data when search query changes
  const fetchCourses = useCallback(async () => {
    setIsLoading(true)  
    setError(null)
    try {
      const data = await getCourseSummaries(apiSearchQuery, COURSES_PER_CALL)
      setAllCourses(data)
    } catch(error) {
      console.error("Failed to fetch courses from SkillsFuture API", error)
      setError("Failed to load courses from API.")
      setAllCourses([])
    } finally {
      setIsLoading(false)
    }
  }, [apiSearchQuery])
  
  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  // To adjust list whenever the 'filterQuery' or 'allCourses' state changes.
  useEffect(() => {
    let currentCourses = allCourses
    
    if (filterQuery) {
      currentCourses = currentCourses.filter(course =>
        course.title.toLowerCase().includes(filterQuery.toLowerCase())
      );
    }

    if (showBookmarksOnly) {
      currentCourses = currentCourses.filter(course => 
        bookmarkedIds.includes(course.id));
    }
    
    setDisplayedCourses(currentCourses);
    
  }, [filterQuery, allCourses, showBookmarksOnly, bookmarkedIds]); 


  // Support updating via url query param
  useEffect(() => {
  const query = searchParams.get('q') || '';
  setSearchBarInput(query);  // update the input box
  setApiSearchQuery(query);     // trigger API fetch
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setApiSearchQuery(searchBarInput); // Update the term that triggers the API fetch
    setSearchParams({ q: searchBarInput });
  };


  return (
    // Use a React.Fragment <> to return multiple elements at the same level.
    <>
      {/* --- CONTROLS --- */}
      <form onSubmit={handleSearchSubmit} className="api-search-container">
        <input
          type="text"
          placeholder="Search SkillsFuture for new courses..."
          className="api-search-input"
          value={searchBarInput}
          onChange={e => setSearchBarInput(e.target.value)}
        />
        <button type="submit" className="api-search-button">Search API</button>
      </form>

      <div className="controls-container">
        <input
          type="text"
          placeholder="Filter these courses..."
          className="search-input"
          value={filterQuery}
          onChange={e => setFilterQuery(e.target.value)}
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
        {isLoading ? (
          <p className="status-message">Loading courses from API...</p>
        ) : error ? (
          <p className="status-message error-message">{error}</p>
        ) : displayedCourses.length > 0 ? (
          displayedCourses.map(course => (
            <CourseCard key={course.id} course={course} apiSearchQuery={searchParams.get('q') ?? ''}/>
          ))
        ) : (
          <p className="status-message">No courses found for: "{apiSearchQuery}" </p>
        )}
      </div>
    </>
  );
};

export default CourseList;
