import CourseList from '../components/CourseList'; 
import './CourseListPage.css'; 

const CourseListPage = () => {
  return (
    <div className="course-list-page">
      <header className="page-header">
        <h1 className="page-title">MySkillsFuture Course Catalogue</h1>
        <p className="page-subtitle">
          Displaying the first 24 courses for "Data Analytics"
        </p>
      </header>
      <main>
        <CourseList />
      </main>
    </div>
  );
};

export default CourseListPage;
