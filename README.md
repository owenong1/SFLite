# SkillsFuture Lite
## SkillsFuture Lite is a minimalist course-search app built with Vite. It helps users quickly find, filter and bookmark SkillsFuture courses without any excess. 

## Features
- 🔍 Search for courses just like on the SkillsFuture website
- 🗂️ Filter the list by matching text
- ⭐ Bookmark favorite courses for later viewing
- 📅 View all relevant details in the app itself
- 📱 Embedded links with direct access to the SkillsFuture course details website

## 🛠️ Tech Stack
- **Framework:** Vite + React 
- **Language:** TypeScript
- **Styling:** CSS 

## 📦 Installation
1. Clone the repository:
git clone https://github.com/owenong1/SFLite.git
cd `<your-repo>`
2. Install dependencies:
npm install   
3. Start the dev server:
npm run dev   
4. Open in browser:
Usually at http://localhost:5173

## 🎮 Usage
The Main screen of the app is the **Course List Page**, which has some bars/buttons on the top and a grid of **Course Cards** below. Clicking on any of the **Course Cards** takes you to the **Course Details** page for that course.
Do note:
- The App comes preloaded with mock data that it defaults to if search is unavailable, or if a blank string is searched.
- Currently the non-local website version does not support live search 

### How to use:
- Course List: Scroll as you please to browse courses!
- Top search bar: Type a keyword and click the blue 'Search' button to search for SkillsFuture courses.
- Lower filter bar, type any string you want to filter the currently shown courses by (e.g., 'Introduction', 'Advanced').
- "Show bookmarked only" button: Click to additionally filter the shown list by those you have bookmarked
Click a course to view its details
- Bookmark buttons: Click to save the course to your bookmarked courses
- Course Card: Click to be taken to the Course Details page for that course
- Course Details: View in-depth details of your chosen course. You may click on the button in the top right to be taken directly to the SkillsFuture website for that course too.

