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
`git clone https://github.com/owenong1/SFLite.git`
2. `cd <your-repo>`
3. Install dependencies:
`npm install`  
4. Start the dev server:
`npm run dev` 
5. Open in browser:
Usually at http://localhost:5173

## 🎮 Usage
<img width="1467" height="837" alt="Screenshot 2025-09-26 at 7 09 24 PM" src="https://github.com/user-attachments/assets/dee38391-0084-458b-8f40-e37c9687d418" />

The Main screen of the app is the **Course List Page**, which has some bars/buttons on the top and a grid of **Course Cards** below. 

Clicking on any of the **Course Cards** takes you to the **Course Details** page for that course:

<img width="1039" height="787" alt="Screenshot 2025-09-26 at 6 58 01 PM" src="https://github.com/user-attachments/assets/ea9480ff-6d80-4682-be28-e3cae6d2f65f" />

Do note:
- The App comes preloaded with mock data that it defaults to if search is unavailable, or if a blank string is searched.
- A non-local website version is available at https://sf-app-khaki.vercel.app. However, do note that it does not support live search at the moment.

### How to use:
- Course List: Scroll as you please to browse courses!
- Top search bar: Type a keyword and click the blue 'Search' button to search for SkillsFuture courses.
- Lower filter bar, type any string you want to filter the currently shown courses by (e.g., 'Introduction', 'Advanced').
- "Show bookmarked only" button: Click to additionally filter the shown list by those you have bookmarked
Click a course to view its details
- Bookmark buttons: Click to save the course to your bookmarked courses
- Course Card: Click to be taken to the Course Details page for that course
- Course Details: View in-depth details of your chosen course. You may click on the button in the top right to be taken directly to the SkillsFuture website for that course too.

## Brief Design Philosophy
The vision for this app is as a no-frills minimalist alternative to the SkillsFuture course portal, hence the name SkillsFuture Lite. The guiding principle is to support users in quickly identifying whether a course aligns with their goals, interests, and constraints. As such, the card design should surface the most critical information at a glance, in order of importance. This reduces cognitive load by allowing users to rule out courses as fast as possible, enabling more efficient decision making.

The following user Decision-Making Framework was utilized to frame the importance hierarchy (relevant components for each point are in brackets):
Assumption: When evaluating courses, users typically ask themselves three core questions:
1. Do I want/need to take this course?
- Does it provide the skills I need? (Course Title, Skills/Outcomes)
- Does it capture my interest? (Course Title, Description)
- Is it credible and worth my time? (Provider, Ratings/Reviews)
2. Is this course feasible for me?
- Does it fit into my schedule? (Duration, Timing, Mode: part-time/full-time)
- Is it financially viable? (Cost, Subsidies — presented as a secondary consideration due to the nature of SkillsFuture)
3. How can I take action?
- How do I register immediately? (Clear CTA: “Visit Website”)
- How can I save it for later? (Bookmark)

Lacking real user data, some assumptions had to be made, but it is assumed that the above framework provides a reasonable approximation sufficient for the scope of the app.

Visuals-wise, I debated whether using emojis would fit the minimalist aesthetic or not, but decided to go with them as it seemed easier to visually parse the information, and they provided a small touch of visual interest lacking which the site might appear too plain. The decision to implement the bookmark feature also arose because I wanted there to be something breaking the monotony of the act of browsing. Through experimentation, I found that using a light happy red and a filled up heart emoji for a successful bookmark in contrast with the starker white background provided a light sense of satisfaction, akin to a tiny minigame.

