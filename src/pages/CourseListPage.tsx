import CourseList from '../components/CourseList'; 
import './CourseListPage.css'; 

const CourseListPage = () => {
  return (
    <div className="course-list-page">
      <header className="page-header">
        <h1 className="page-title">SkillsFuture Lite</h1>
        <p className="page-subtitle">
          A minimalist way to find SkillsFuture courses
        </p>
      </header>
      <main>
        <CourseList />
      </main>
    </div>
  );
};

export default CourseListPage;
