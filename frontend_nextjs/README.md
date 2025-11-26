# Ocean Notes (Simple Notes App)

A modern, responsive notes app built with Next.js App Router. Features a clean Ocean Professional theme with blue (#2563EB) and amber (#F59E0B) accents, subtle gradients, and smooth transitions.

## Features
- Two-pane layout: sidebar list and main editor with header
- CRUD: create, read, update, delete notes
- Autosave on typing with explicit Save button
- Local state with persistence to localStorage
- Keyboard accessible list selection and buttons
- Optional remote API scaffold (env based) without breaking local behavior
- TypeScript, lightweight components, test-friendly `data-testid` hooks

## Run locally
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Environment variables (optional)
- NEXT_PUBLIC_API_BASE or NEXT_PUBLIC_BACKEND_URL (optional): if provided and your backend implements:
  - GET /notes
  - POST /notes
  - PUT /notes/:id
  - DELETE /notes/:id

The UI defaults to local state and localStorage even if these are not set.

## Structure
- src/app/page.tsx – main UI and state management
- src/components/Header.tsx – app header
- src/components/NotesList.tsx – sidebar with search and actions
- src/components/NoteEditor.tsx – title + content editor
- src/lib/types.ts – shared types
- src/lib/storage.ts – localStorage helpers and utilities
- src/lib/api.ts – optional API client scaffold

## Accessibility
- Landmarks (banner, region), aria labels and roles
- Keyboard selection with Enter/Space on note items
- Color contrast mindful of theme

## Notes
- This project uses Tailwind v4 via `@tailwindcss/postcss` (already configured).
- Build: `npm run build`, Start: `npm start`.

