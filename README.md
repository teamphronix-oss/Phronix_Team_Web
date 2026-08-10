# Phronix Website

A full company website for **Phronix** — marketing pages, a services/projects catalog,
protected project downloads, Google sign-in, and a contact form — split into an
independent `frontend` (React + Vite) and `backend` (Node/Express + MongoDB).

## Structure

```
phronix/
├── frontend/          React (Vite) site — pages, components, all editable data
│   └── src/data/       ← edit these files to update services, projects, team, etc.
└── backend/           Express API — auth, contact form, protected downloads
```

## Quick start

### 1. Frontend

```bash
cd frontend
npm install
cp .env.example .env      # set VITE_API_URL if the backend isn't on localhost:5000
npm run dev
```

Runs at http://localhost:5173.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env      # fill in MongoDB URI, Google OAuth keys, SMTP, secrets
npm run dev
```

Runs at http://localhost:5000. Requires a running MongoDB instance (local or Atlas).

### 3. Google OAuth setup

1. Create an OAuth Client ID at https://console.cloud.google.com/apis/credentials
   (type: Web application).
2. Authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
   (update to your production domain later).
3. Put the client ID/secret in `backend/.env`.

### 4. Protected downloads

Files must live **outside** any publicly served directory — set
`PROTECTED_FILES_DIR` in `backend/.env` to that path, and drop the real ZIP
files there (matching the `filename` field in each `DownloadableProject`
document).

- If a project needs its own password, hash it first — never store it in plain text:
  ```bash
  node backend/scripts/hashPassword.js "the password"
  ```
- Seed/update the download catalog in MongoDB:
  ```bash
  node backend/scripts/seedDownloads.js
  ```
- Update `frontend/src/data/downloads.js` with matching public-facing metadata
  (name, description, version — never the file path or hash).

Downloads work by issuing a short-lived signed link (default 120s, see
`DOWNLOAD_LINK_TTL_SECONDS`) after the backend confirms the user is signed in
and, if required, that the password is correct. The link is single-purpose
and expires quickly instead of pointing at a permanent public file URL.

### 5. Contact form email

Set `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS`/`CONTACT_TO_EMAIL` in `backend/.env`
to receive form submissions by email (any SMTP provider works — SendGrid, SES,
Postmark, etc.). Every submission is also saved to MongoDB regardless, so
nothing is lost if email isn't configured yet.

## Editing content

All company-specific content lives in `frontend/src/data/*.js` — no need to
touch components to add a service, project, team member, testimonial, video,
or ongoing project. Contact details, social links, WhatsApp number, and GST
number live in `frontend/src/data/siteConfig.js`.

Placeholder images live in `frontend/public/assets/` — swap in real photos
and screenshots at the same paths referenced in the data files.

## Security notes

- No API keys, OAuth secrets, or database credentials are ever referenced in
  frontend code — only `VITE_API_URL`.
- Sessions are signed, httpOnly cookies; the frontend never sees a token it
  could leak.
- Downloads are authenticated and served via short-lived signed links from a
  non-public directory, not static files.
- Passwords for individual project downloads are stored only as bcrypt
  hashes, checked server-side.
