# Progress Tracker

## Purpose
A running log of work actually completed on this project — the historical
record, as opposed to `build-plan.md`'s forward-looking roadmap. Updated after
every feature is finished.

## How to Use
- **After completing a feature**: add an entry below with what was built.
- Cross-reference the corresponding item in `build-plan.md` if relevant.

## Log Entry Format

### [YYYY-MM-DD] — Feature Name
- **What was built**: brief description
- **Files touched**: key files/folders
- **Notes**: anything future work should know (decisions made, deviations from
  plan, known follow-ups)

---

## Log

### [2026-09-25] — Postgres database migration

- **What was built**: Switched the Payload CMS database adapter from MongoDB to
  `@payloadcms/db-postgres`, generated the initial Postgres migration under
  `src/migrations/`, and configured migration handling (`push: false`,
  `migrationDir: ./src/migrations`). CI now applies migrations before building the
  image.
- **Files touched**: `src/payload.config.ts`, `src/migrations/`,
  `src/payload/blocks/archive/component.tsx`, `.github/workflows/push-to-ghcr.yml`,
  `README.md`, `.env.example`
- **Notes**: Postgres IDs are numeric, so relationship values are typed
  `number | Media`; narrow on the populated object (`typeof value === "object"`)
  rather than `"string"`. Existing MongoDB data is not migrated automatically.
  `next build` prerenders routes, so migrations must run before the build.

