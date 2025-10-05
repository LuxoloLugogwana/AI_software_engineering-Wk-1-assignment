## Mini e‑Learning Platform (Prototype)

A small, clean, and fully client‑side e‑learning prototype. It lists courses, shows a course detail page with lessons and a progress bar, lets learners check off lessons, and provides buttons to mark a course complete or reset progress. Progress is stored in the browser via localStorage.

### Features
- **Home page**: List of courses with description and progress
- **Course details**: Lessons with checkboxes, live progress bar and label
- **Completion controls**: “Mark course completed” and “Reset progress”
- **Persistence**: Progress saved in `localStorage`
- **Design**: Simple, modern styling with subtle hover effects
- **No build tools**: Pure HTML, CSS, and JavaScript

### Tech Stack
- **HTML**: `index.html`, `course.html`
- **CSS**: `styles.css`
- **JavaScript**: `data.js`, `storage.js`, `home.js`, `course.js`

## Project Structure
```text
.
├─ index.html        # Home page – course grid
├─ course.html       # Course detail – lessons & progress
├─ styles.css        # Global styles and components
├─ data.js           # In-memory course catalog (editable)
├─ storage.js        # localStorage helpers and progress logic
├─ home.js           # Home page rendering and interactions
└─ course.js         # Course page rendering and interactions
```

## Getting Started
### Option 1: Open directly
- Open `index.html` in your browser.

### Option 2: Serve locally (recommended)
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

## Usage
- From the home page, click a course’s “View course”.
- Check lesson boxes to update progress; the bar and percentage update live.
- Use “Mark course completed” to complete all lessons.
- Use “Reset progress” to clear completion state.
- Return to the home page; progress is reflected on the course cards.

## Data & Persistence
- Course data lives in `data.js` as a JavaScript array of course objects.
- Completion state is saved per course in `localStorage` using the key prefix `elearn:course:`.

### Editing/Adding Courses
Open `data.js` and edit the `COURSES` array. Example item:
```js
{
  id: "my-course",
  title: "My Course",
  description: "What this course teaches.",
  lessons: [
    { id: "my-1", title: "Lesson One" },
    { id: "my-2", title: "Lesson Two" }
  ]
},
```
- Ensure each `course.id` and each lesson `id` is unique across the catalog.
- Progress is tracked by lesson `id` values; changing them resets saved progress for those lessons.

## Styling & Theming
- Update `styles.css` to adjust look and feel.
- Key CSS variables (see `:root`) you can tweak quickly:
  - `--bg`, `--text`, `--muted`, `--border`
  - `--primary`, `--success`, `--secondary`
- Buttons and cards include hover/active states out of the box.

## Accessibility Notes
- Lesson checkboxes use native inputs with labels for good keyboard/screen reader support.
- Progress bar includes a text label; percentage is announced visually.
- Colors aim for good contrast on a dark background. Adjust variables as needed for your brand.

## Browser Support
- Designed for modern evergreen browsers. Uses flexbox/grid, sticky header, and CSS gradients.

## Deployment
Because the app is static, you can host it anywhere:
- **GitHub Pages**: Push to a repo and enable Pages (deploy from branch root).
- **Netlify/Vercel**: Drag‑and‑drop or connect the repository (no build step needed).
- **Any static host**: Upload these files to your server.

## Notes
- No external dependencies. No framework. Everything runs in the browser.
- To clear all saved progress quickly, clear your browser’s localStorage for this origin.
