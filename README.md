# Image Description Analyzer

A modern web application (Next.js + TypeScript + Tailwind) for analyzing images and generating AI-powered descriptions, tags and safety insights.

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js) ![React](https://img.shields.io/badge/React-18-61dafb?logo=react) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![License](https://img.shields.io/badge/License-MIT-lightgrey)

## Screenshots

Upload and analyze

<img src="./docs/screenshots/screenshot-1.png" alt="Upload and analyze" width="900" />

Settings & API key

<img src="./docs/screenshots/screenshot-2.png" alt="Settings and API key" width="900" />

Analysis result

<img src="./docs/screenshots/screenshot-3.png" alt="Analysis results" width="900" />

## Quickstart

Requirements:
- Node.js 18+
- pnpm (repo uses a pnpm lockfile; npm/yarn also work)

Clone and run locally:

```bash
git clone https://github.com/nykadamec/web-nextjs.git
cd web-nextjs
pnpm install
pnpm dev
```

The dev server runs on port 4000 by default (see `package.json` scripts).

Available scripts (package.json):

- `pnpm dev` — start dev server (Next.js) on port 4000
- `pnpm build` — build for production
- `pnpm start` — start production server on port 4000
- `pnpm lint` — run linter
- `pnpm typecheck` — run TypeScript checks
- `pnpm screenshots` — generate screenshots using Playwright

Generate screenshots (optional):

```bash
pnpm install
pnpm exec playwright install --with-deps   # first run only
pnpm screenshots
```

## Features

- Upload images (drag & drop or file picker)
- AI-generated description, tags, and a simple safety score
- Local settings and API key management
- Small persisted history using SQLite

## Configuration

- Manage provider API keys in the app; settings are persisted to `data/database.db`.
- See `docs/api-key-management.md` for details.
- If you prefer environment variables, add a `.env.local` in the project root and configure keys there.

## Project structure

- `src/app` — Next.js app routes and pages
- `src/components` — React components
- `src/hooks` — custom hooks
- `src/lib` — utilities and database access
- `data/` — local SQLite database
- `docs/` — documentation and screenshots

## Tests

There is a small unit test under `src/lib/__tests__/`.

If no test runner is configured locally, you can still run type checks with:

```bash
pnpm typecheck
```

## Contributing

Contributions are welcome. Please open an issue to discuss larger changes. For code contributions, create a feature branch, add tests where sensible, and open a pull request.

## Privacy & Security

Depending on configuration, the app may send images or derived text to third‑party AI providers. Do not upload sensitive content unless you trust the configured provider.

## License

MIT. If you want an explicit license file in the repo, I can add `LICENSE` (MIT) on request.
    "language": "english",
