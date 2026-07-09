# Marech Web

Marketing site **and** customer portal for [Marech](https://github.com/MADANW/marech-BD) —
the AI-scraper protection SaaS. Built with Next.js (App Router) + Tailwind, deployed on **Vercel**.
It talks to the Marech backend API (hosted on **AWS**) over HTTPS. **Live** at
[www.marech.tech](https://www.marech.tech).

## What's here

- **Marketing** (`app/(marketing)`) — landing, pricing, platform pages, how-it-works,
  docs, contact, login, and legal (privacy, terms, DPA).
- **Auth** (`app/(auth)`) — multi-step signup, plus **Google sign-in**.
- **Customer portal** (`app/(app)`) — dashboard, traffic logs, policies, snippet,
  **API keys** (the `bm_` keys the server-side enforcement integrations authenticate
  with; raw key shown once at creation), account, billing.

Auth state lives in `lib/auth.tsx` (`AuthProvider`, hoisted in `app/layout.tsx`).
API calls live in `lib/api.ts`. Route gating is in `proxy.ts` (this fork of Next uses
`proxy.ts` as its middleware file).

## Mock vs. live

The UI talks to the **real API by default**. Mock (demo) mode is opt-in: set
`NEXT_PUBLIC_MOCK=true` to run the portal against generated demo data with no backend
(a "Demo data" pill shows in the portal header so it can't be mistaken for live).
Any other value — including unset or a typo — means live mode, so a misconfigured
deploy can never silently ship demo data.

| Env var | Purpose |
|---|---|
| `NEXT_PUBLIC_MOCK` | `true` = demo/mock data; anything else (incl. unset) = real backend |
| `NEXT_PUBLIC_API_URL` | Backend base URL, e.g. `https://api.marech.tech` |
| `NEXT_PUBLIC_CDN_URL` | Optional snippet host; defaults to `NEXT_PUBLIC_API_URL` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Web client id (same id the backend verifies) |

See [`.env.example`](.env.example).

## Local development

```bash
npm install
cp .env.example .env.local      # edit values

# Run against mock/demo data (no backend needed):
#   set NEXT_PUBLIC_MOCK=true in .env.local
npm run dev                      # http://localhost:3000

# Run against a local backend (API on :3000), web on :3001:
#   leave NEXT_PUBLIC_MOCK unset and set NEXT_PUBLIC_API_URL=http://localhost:3000
npm run dev:demo                 # http://localhost:3001
```

## Deploy to Vercel

Live in production at https://www.marech.tech against `https://api.marech.tech`.

1. Import this repo in Vercel (framework auto-detected as Next.js).
2. Add Environment Variables:
   - **Production**: `NEXT_PUBLIC_API_URL=https://api.marech.tech` and
     `NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-google-web-client-id>`. Do **not** set
     `NEXT_PUBLIC_MOCK` — live mode is the default.
   - **Preview** (optional): `NEXT_PUBLIC_MOCK=true` if you want preview deploys to run
     against demo data with no backend.

   > `NEXT_PUBLIC_*` values are **inlined at build time** — changing them in the
   > dashboard does nothing to an existing deployment. After adding or editing one,
   > redeploy, and double-check the variable is enabled for the environment
   > (Production/Preview) you're testing.
3. Deploy. Add your custom domain(s) (e.g. `marech.tech`, `app.marech.tech`).
4. In the **backend**, add your Vercel domains to `CORS_ORIGINS` so the browser
   can call the API. See the backend repo's `DEPLOY.md` and `INTEGRATION.md`.

## How it connects to the backend

```
Browser ──▶ Vercel (this app) ──▶ https://api.marech.tech (AWS backend) ──▶ Postgres
```

- Login/signup/Google → `POST /auth/login | /auth/register | /auth/google` → returns a JWT.
- The JWT is stored (localStorage + cookie) and sent as `Authorization: Bearer` on every
  portal request (`/auth/me`, `/v1/logs`, `/v1/policies`, `/billing/*`).
- The dashboard's data is scoped to the logged-in customer by the backend.
