# ReactTS Job Application Tracker

<img src="https://socialify.git.ci/Sbonelo2/ReactTS-Job-Application-Tracker/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="ReactTS-Job-Application-Tracker" width="640" height="320" />

A lightweight job-application tracker built with React + TypeScript and Vite. This project helps you track the jobs you've applied to, their statuses, and basic details for each application.

## Key features

- Track jobs and their application status
- Simple, responsive UI with React + TypeScript
- Client-side routing with React Router
- Prepared for development with Vite and TypeScript

## Tech stack

- React 19 + TypeScript
- Vite (dev server + build)
- React Router
- ESLint for linting
- (Optional) Tailwind / PostCSS for styles (dev dependencies present)

## Getting started

Prerequisites: Node.js (v18+) and npm or yarn.

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm run dev
```

Open http://localhost:5173 (Vite default) in your browser.

3. Build for production

```powershell
npm run build
```

4. Preview production build locally

```powershell
npm run preview
```

5. Lint the project

```powershell
npm run lint
```

## Project scripts

Scripts available from `package.json`:

- `dev` — start the Vite dev server
- `build` — compile TypeScript and build production assets (`tsc -b && vite build`)
- `preview` — preview the built production site
- `lint` — run ESLint

## Project structure

At a glance (top-level `src/`):

- `src/main.tsx` — app entry
- `src/App.tsx` — root app component
- `src/Components/` — shared components (Navbar, Footer)
- `src/Pages/` — route pages (Home, Jobs, Login, Registration, 404)
- `src/assets/` — images and static assets

Full repository layout:

```
README.md
package.json
vite.config.ts
src/
	App.tsx
	main.tsx
	Components/
		Footer.tsx
		Navbar.tsx
	Pages/
		Home.tsx
		Jobs.tsx
		Landing.tsx
		Login.tsx
		Registration.tsx
		Page404.tsx
	assets/
```

## Notes & assumptions

- This README is based on the current repository files and `package.json`.
- The app is client-only and uses local JSON (e.g., `db.json`) for any example/demo data.

## Contributing

Contributions welcome — please open issues or PRs. Small improvements you can help with:

- Add form validation for job entries
- Add persistence (localStorage or simple backend)
- Improve accessibility and responsive styles

## License

Include a license if desired (MIT, Apache-2.0, etc.) — none specified in the repository currently.

---

If you want, I can also:

- Add badges (build/test/coverage) to the top of this README
- Add a short screenshot or demo GIF inside `public/` and reference it here
- Create a CONTRIBUTING.md and LICENSE file

Tell me which extras you'd like and I'll add them.
