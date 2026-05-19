# Changelog — UI/UX audit

## Summary

Audited the Northstar ops dashboard and fixed the highest-impact layout, accessibility, routing, and state issues while keeping the visual design simple and professional.

## What changed and why

### Layout and responsiveness

- Removed the fixed `720px` panel width and other CSS rules that caused horizontal scrolling on laptop and mobile viewports.
- Raised the mobile sidebar above the sticky top bar, added a dimmed backdrop, and improved small-screen spacing for the top bar, charts, and billing summary.
- Let data tables scroll inside their containers instead of forcing a global minimum width.

### Accessibility

- Restored visible `:focus-visible` outlines (replacing the global `outline: none`).
- Improved the modal: escape key cleanup, click-outside only on the backdrop, labelled close control, dialog title wiring, and scroll lock while open.
- Added labels, `aria-current`, `aria-live`, table headers, and progressbar semantics across forms and data views.

### Routing and navigation

- Hash routes now ignore query strings (e.g. `#/team?tab=active` still resolves to Team).
- Fixed the `hashchange` listener leak on hot reload.
- Gave Projects and Billing distinct icons; active nav state uses the resolved route.

### State and forms

- Global search now filters Dashboard projects, Projects table, Team roster, and Billing invoices consistently.
- Projects checkboxes toggle correctly without duplicate IDs; Team removals use immutable updates.
- Billing discount is parsed as a number with validation; Settings uses a single controlled form with required company name.
- Support tickets require a title; Dashboard notes are controlled; empty states appear when filters match nothing.

## Next steps (if more time)

- Add client-side routing with React Router and deep links without hash fragments.
- Persist settings, notes, and ticket lists to `localStorage`.
- Add a minimal test suite (Vitest + Testing Library) for routing and form validation.
- Introduce ESLint/Prettier and tighten the Tailwind/Sass split for maintainability.
