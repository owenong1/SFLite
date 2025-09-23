import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseListPage from './pages/CourseListPage';
import CourseDetailsPage from './pages/CourseDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseListPage />} />

        <Route path="/course/:courseId" element={<CourseDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
