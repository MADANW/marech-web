# Marech Web

Marketing site **and** customer portal for [Marech](https://github.com/MADANW/block-me) —
the AI-scraper protection SaaS. Built with Next.js (App Router) + Tailwind, deployed on **Vercel**.
It talks to the Marech backend API (hosted on **AWS**) over HTTPS.

## What's here

- **Marketing** (`app/(marketing)`) — landing, pricing, platform pages, login.
- **Auth** (`app/(auth)`) — multi-step signup, plus **Google sign-in**.
- **Customer portal** (`app/(app)`) — dashboard, traffic logs, policies, snippet, account, billing.

Auth state lives in `lib/auth.tsx` (`AuthProvider`, hoisted in `app/layout.tsx`).
API calls live in `lib/api.ts`. Route gating is in `proxy.ts` (this fork of Next uses
`proxy.ts` as its middleware file).

## Mock vs. live

The UI runs against **mock data by default** so it's previewable with no backend.
Set `NEXT_PUBLIC_MOCK=false` to connect to the real API.

| Env var | Purpose |
|---|---|
| `NEXT_PUBLIC_MOCK` | `false` = use the real backend; anything else = mock data |
| `NEXT_PUBLIC_API_URL` | Backend base URL, e.g. `https://api.marech.tech` |
| `NEXT_PUBLIC_CDN_URL` | Optional snippet host; defaults to `NEXT_PUBLIC_API_URL` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Web client id (same id the backend verifies) |

See [`.env.example`](.env.example).

## Local development

```bash
npm install
cp .env.example .env.local      # edit values

# Run against mock data:
npm run dev                      # http://localhost:3000

# Run against a local backend (API on :3000), web on :3001:
#   set NEXT_PUBLIC_MOCK=false and NEXT_PUBLIC_API_URL=http://localhost:3000
npm run dev:demo                 # http://localhost:3001
```

## Deploy to Vercel

1. Import this repo in Vercel (framework auto-detected as Next.js).
2. Add Environment Variables (Production + Preview):
   - `NEXT_PUBLIC_MOCK=false`
   - `NEXT_PUBLIC_API_URL=https://api.marech.tech`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-google-web-client-id>`
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
