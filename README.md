# Payload Template Project

Internal starter template for building customer websites, landing pages, and SaaS
applications on a consistent stack. Bootstrap new projects from this repo instead of
starting from scratch — auth, CMS, storage, and UI conventions are already wired up.

## Stack

- **Framework**: [Next.js](https://nextjs.org) 16 (App Router)
- **CMS**: [Payload CMS](https://payloadcms.com) 3
- **Database**: PostgreSQL (via `@payloadcms/db-postgres`)
- **Auth**: [Clerk](https://clerk.com)
- **Storage**: S3-compatible object storage (media uploads)
- **Email**: [Resend](https://resend.com)
- **UI**: Tailwind CSS 4, [shadcn/ui](https://ui.shadcn.com), Lucide icons, Motion

## Requirements

- Node.js `^22.14.0` or `>=24.10.0`
- pnpm `^9`, `^10`, `^11`, or `^12`
- A PostgreSQL connection string (local, Docker, or hosted)

## Setup

1. Clone the repo and install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the environment file and fill in the values:

   ```bash
   cp .env.example .env
   ```

   | Variable | Purpose |
   | --- | --- |
   | `DATABASE_URL` | PostgreSQL connection string (`postgres://user:pass@host:5432/db`) |
   | `PAYLOAD_SECRET` | Payload's signing secret |
   | `PREVIEW_SECRET` | Secret used for live preview links |
   | `CRON_SECRET` | Secret for authenticating scheduled/cron jobs |
   | `NEXT_PUBLIC_SERVER_URL` | Public URL the app is served from |
   | `CLERK_SECRET_KEY` / `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk API keys |
   | `CLERK_WEBHOOK_SIGNING_SECRET` | Verifies incoming Clerk webhooks |
   | `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `..._SIGN_IN_FALLBACK_REDIRECT_URL`, `..._SIGN_UP_FALLBACK_REDIRECT_URL` | Clerk auth flow routing |
   | `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_ACCESS_KEY_SECRET`, `S3_REGION`, `S3_ENDPOINT` | Media storage (S3-compatible) |
   | `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME` | Transactional email |

3. Start the dev server:

   ```bash
   pnpm dev
   ```

4. Open `http://localhost:3000`. Follow the on-screen instructions to log in via
   Clerk and complete first-run setup.

### Local PostgreSQL (optional)

`docker-compose.yml` deploys the application itself and expects an external
PostgreSQL instance. For local development you can run PostgreSQL with Docker:

1. Start a PostgreSQL container:

   ```bash
   docker run --name payload-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:17
   ```

2. Set `DATABASE_URL` in `.env`, e.g.
   `postgres://postgres:postgres@127.0.0.1:5432/payload`.
3. Apply the schema: `pnpm payload migrate`.

### Database Migrations

The Postgres adapter runs with `push: false`, so schema changes are applied through
migrations rather than automatic dev-time pushes. After changing any collection,
global, or field config:

1. Generate a migration and review it:

   ```bash
   pnpm payload migrate:create
   ```

2. Commit the new files under `src/migrations/`.
3. Apply pending migrations to the database:

   ```bash
   pnpm payload migrate
   ```

CI applies migrations before building the image
(`.github/workflows/push-to-ghcr.yml`), and the build prerenders routes against the
database, so migrations must be committed before the workflow runs.

## Available Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start the Next.js dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |
| `pnpm payload` | Run the Payload CLI |
| `pnpm generate:types` | Regenerate Payload's TypeScript types from the config |
| `pnpm generate:importmap` | Regenerate Payload's admin import map |
| `pnpm payload migrate:create` | Generate a migration after config changes |
| `pnpm payload migrate` | Apply pending migrations |
| `pnpm payload migrate:status` | Show applied and pending migrations |

Run `pnpm generate:types` after changing any collection, global, or field config so
generated types stay in sync, and `pnpm payload migrate:create` so the database schema
stays in sync with the config.

## Project Structure

- `src/` — application code (Next.js routes, Payload config, collections, components)
- `context/` — living documentation (architecture, UI tokens/rules, code standards,
  build plan, progress tracker) used to keep new projects built from this template
  consistent
- `docker-compose.yml` — production compose for the app (expects an external
  PostgreSQL instance)

## Collections

- **Users** — auth-enabled collection with admin panel access, backed by Clerk.
- **Media** — uploads collection with pre-configured image sizes and focal point
  support, backed by S3-compatible storage.

See the [Payload Collections docs](https://payloadcms.com/docs/configuration/collections)
to extend either.

## Using This as a Starter

When bootstrapping a new internal project from this template:

1. Update `package.json` name/description and this README's title.
2. Review `context/` and update it to describe the new project's purpose, scope, and
   architecture — it should not still describe this template once customized.
3. Keep the Clerk, Payload, S3, and Resend wiring unless the new project has a reason
   to diverge — the point of the template is a consistent baseline across projects.

## Support

Internal questions: ask in the team channel. For upstream framework issues, see the
[Payload Discord](https://discord.com/invite/payload) or
[Payload GitHub discussions](https://github.com/payloadcms/payload/discussions).
