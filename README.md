# CoreAstra

Report, track, and resolve civic issues with transparency and accountability.

## Tech Stack

- Vite
- React (TypeScript)
- Tailwind CSS + shadcn/ui
- TanStack Query

## Getting Started

Prerequisites:
- Node.js 18+ and npm

Local development:
```sh
git clone <REPO_URL>
cd core-astra
npm install
npm run dev
```

Build and preview:
```sh
npm run build
npm run preview
```

Environment variables (optional):
- `VITE_API_URL` base URL for backend API (if/when wired)

## Project Structure

- `src/` application code
- `public/` static assets
- `index.html` document head and meta

### Key Routes

Client-side routing is handled with React Router. Vercel SPA rewrites are configured in `vercel.json`.

- `/` Landing page. Includes “Try without login” CTA to preview the dashboard.
- `/dashboard` Main home page after login.
- `/report` Report complaint form.
- `/complaints` View all complaints page.
- `/complaints/your` Your complaints (active, resolved, map).
- `/complaints/:id` Single complaint detail view.
- `/profile` Profile page (fields captured during signup; Edit/Update actions).
- `/pending` Pending for discussion (placeholder for department workflow).
- `/auth/login`, `/auth/signin` Auth screens.

All pages include a consistent Back button that uses browser history.

### Navigation Model

The top navigation on `/dashboard` dynamically shows:
- Home, +Complaint, Your complaints, view all complaints
- Resolve complaints (visible when `userType` is `department`)
- Dashboard, Profile, logout

Buttons link to the routes above using `useNavigate`.

### Pages Overview

- Report Complaint (`src/pages/ReportComplaint.tsx`)
  - Fields: issue name, department (select), sector (select), description, upload photos (2–10), current location access (auto-detect), submit.
- Profile (`src/pages/Profile.tsx`)
  - Displays/edit basic user fields captured during signup; Edit/Update buttons.
- All Complaints (`src/pages/AllComplaints.tsx`)
  - Search, filter button, grid of complaint cards, locality map placeholder, trends.
- Your Complaints (`src/pages/YourComplaints.tsx`)
  - Search, Active and Resolved sections, like/edit/withdraw/status placeholders, map of reported complaints.
- Complaint View (`src/pages/ComplaintView.tsx`)
  - Detailed complaint view (images, description, department, sector, location, status, likes/comments placeholder).
- Pending Discussions (`src/pages/PendingDiscussions.tsx`)
  - Placeholder section for departmental review workflow.

### Styling/UI

- Tailwind + shadcn/ui components (`Button`, `Card`, `Input`, `Select`, `Badge`, etc.)
- Placeholder blocks indicate areas to integrate maps, carousels, and data.

### Deployment (Vercel)

- SPA rewrite is defined in `vercel.json`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
  ```
- Add any required env vars in Vercel Project Settings → Environment Variables.

## Configuration

- Update meta title/description in `index.html`.
- Icons live in `public/`. Default icon: `core-astra-icon.svg`.

## License

MIT
