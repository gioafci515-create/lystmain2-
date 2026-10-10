# Lyst. — RSVP invite website

Next.js (App Router) · GE (default) / EN / RU · white / black / grey.

    npm install
    npm run dev      # http://localhost:3000  (redirects to /ge)
    npm run build && npm start

## Edit content
- Texts (all 3 languages): `lib/dict/ge.ts`, `en.ts`, `ru.ts` (EN/RU are type-checked against GE).
- Catalog items (URL, date, category, features): `lib/site.ts` — add an invite there, then add its
  name/desc under `catalog.invites` in each dictionary.
- Instagram / TikTok links: `lib/site.ts`.
- Styles: `app/globals.css`.
