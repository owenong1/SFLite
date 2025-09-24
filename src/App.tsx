import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseListPage from './pages/CourseListPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import { BookmarkProvider } from './context/BookmarkContext';

function App() {
  return (
    <BookmarkProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CourseListPage />} />

          <Route path="/course/:courseId" element={<CourseDetailsPage />} />
        </Routes>
      </Router>
    </BookmarkProvider>
  );
}

export default App;
