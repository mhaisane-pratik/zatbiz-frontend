# ZATBIZ – Project Audit Report

**Date:** 22 July 2026
**Scope audited:** `E:\ZATBIZ-ZATNEWR (2)\ZATBIZ-ZATNEWR\zatbiz-frontend`
**Method:** Static file review (the sandbox shell was unavailable, so the TypeScript
compiler, ESLint and `next build` could NOT be run — see "Limitations" at the end).

---

> **CORRECTION (added after backend folder was provided):** An earlier version of this
> report said "the backend is missing." That was because only the frontend folder was open
> at the time. The backend **does exist** in `zatbiz-backend` (Spring Boot) and is largely
> complete. See **Section 8 – Backend Review** for the corrected findings. Sections 1–3
> below are kept for context but should be read alongside Section 8.

## 1. The most important thing to know first

This *frontend* folder contains only the Next.js app; the backend lives in the sibling
folder `zatbiz-backend` (audited in Section 8).

- The only project is `zatbiz-frontend` — a **Next.js 15 + Tailwind CSS v4 + TypeScript** app.
- The backend is a **separate Spring Boot (Java / JPA) service**, referenced in the code as:
  - Dev: `http://localhost:8080/api`
  - Production: `https://zatbiz-backend.onrender.com/api`
- Because the backend is not in this folder, its remaining tasks are **inferred** from the
  API contract the frontend expects (`src/services/api.ts`) and from the huge offline
  fallback layer (`src/services/api/fallbackHandler.ts`, ~2,600 lines).

**What this means:** right now the app can appear to "work" even with no backend, because
almost every action silently falls back to `localStorage` mock data. That hides how much
backend work is still missing.

---

## 2. What ZATBIZ is

A multi-tenant **website / business builder**. A user creates a "project" and picks a
business template, then gets a storefront + an admin dashboard for that niche. Supported
niches found in the code:

Restaurant (with sub-categories: fast food, fine dining, cafe, bakery, pizza, indian,
chinese, vegan), E-commerce (beauty, furniture, pet, pharmacy, scratch), Gym,
Hospital / Clinic, Medical Shop, Real Estate, Travel Agency, Event & Wedding Planner,
Portfolio, NGO, Corporate, School.

---

## 3. Backend work still remaining

The frontend's `api.ts` defines a very large contract. The `fallbackHandler.ts` only
mocks a **subset** of it. Any endpoint that only "works" through the fallback is a sign the
real backend endpoint is missing or unverified.

### 3a. Endpoints that already have an offline fallback (so FE works without them, but the real API still needs to exist / be confirmed)
- Projects: list / get / create / update / delete
- Products: list / create / update / delete
- Reservations: list / create / update / status / delete
- Customers: register / login / list / update
- Orders: place / list / list-by-customer / update status (incl. stock deduction)
- Settings, Coupons, Categories, Brands
- Real Estate sub-entities: brokers, leads, visits, sales, payments, invoices

### 3b. Endpoints defined in the frontend that appear to have NO fallback — these depend entirely on the backend being built
- **Auth:** real login + JWT (`authToken`). Projects already *require* a token
  (`api.ts` throws "Please log in again" if none) — so real auth must exist server-side.
- **AI Sidekick:** `POST /ai/chat` (used by the dashboard & builder assistant).
- **Media upload:** `POST /ecommerce/products/upload-image` (currently falls back to a
  base64 data-URI in the browser — not a real file store).
- **Gym management suite** (large): members, trainers, classes, bookings, attendance,
  workouts, diets, payments, expenses, equipment, offers.
- **Hospital / Clinic:** info get/create/update.
- **Medical Shop:** info, products, orders (incl. prescription verification).
- **Travel Agency:** packages, bookings, destinations, hotels, flights, visas, theme-settings.
- **Event & Wedding Planner** (very large ~20 resources): bookings, calendar events,
  invoices, payments, expenses, vendors, team members, customers, quotations, testimonials,
  blogs, FAQs, contacts, leads, coupons, notifications, support tickets, reviews,
  checklist items, plus agency/website/SEO settings.
- **Scratch builder:** `/scratch` and `/scratch-ecommerce` (store, products, categories,
  orders, customers, **publish** to a subdomain).
- **Restaurant custom data:** `/restaurant-data`.
- **Restaurant users:** register / login / list.

### 3c. Backend infrastructure tasks implied by the above
- Real authentication + authorization (JWT), since multi-tenant data is keyed by `projectId`.
- A real image/file storage service (S3 / disk) behind `upload-image`.
- Store **publishing / subdomain hosting** for `scratch-ecommerce/publish`.
- An AI backend for `/ai/chat`.
- Payment gateway integration (the UI references Stripe / UPI / card / COD).

---

## 4. Frontend issues & "mismatches"

### 4a. Non-standard Tailwind color shades (biggest cleanup item)
The code uses color shades that **do not exist in default Tailwind** (Tailwind only has
50, 100, 200 … 900, 950). Examples found: `slate-850`, `slate-905`, `slate-405`,
`indigo-650`, `indigo-150`, `emerald-150`.

- Found **~1,500 occurrences across ~108 files.**
- Some (not all) are hand-patched in `globals.css`, but **only inside specific scopes**
  such as `.dark-mode .text-slate-850` and `.theme-indigo .bg-indigo-650`.
- **Consequence:** outside those scopes (e.g. light mode, or a page without a `.theme-*`
  class) these classes produce **no styling at all** — silent visual bugs. This is fragile
  and hard to maintain.
- **Recommendation:** either (a) define these custom shades once in the `@theme` block in
  `globals.css` so they work everywhere, or (b) replace them with the nearest standard
  shade (e.g. `slate-850` → `slate-800`).

### 4b. Weak typing weakens the FE↔BE contract
`api.ts` uses `any` for the majority of request/response types (e.g. `request<any>`,
`data: any`). This means TypeScript cannot catch a mismatch between what the frontend
sends and what the backend expects. This is likely the root cause of "mismatch issues"
you're seeing at runtime.
- **Recommendation:** define real interfaces in `src/types/index.ts` for gym, event,
  travel, hospital, etc., and replace `any`.

### 4c. Duplicate / parallel data files
`src/app/dashboard/themesData.ts` **and** `src/app/dashboard/myThemesData.ts` both exist.
Parallel copies like this tend to drift out of sync. Confirm which is canonical and remove
or clearly separate the other.

### 4d. Left-over debug logging
`api.ts` (ecommerce create) contains multiple `console.log` statements dumping FormData —
fine for debugging, should be removed before production.

### 4e. Environment / endpoint configuration is brittle
The API base URL is resolved from `NEXT_PUBLIC_API_URL`, then a `localStorage` value
(`zatbizApiEndpoint`), then a hardcoded Render URL, then localhost. Confirm the correct
production URL is set via env var so it doesn't silently use the wrong backend.

---

## 5. Template completeness (frontend)

Most niches have the expected set of pieces (landing page, login, admin dashboard, user
dashboard, selector modal). Restaurant is the most built-out (many sub-category dashboards).
A useful next step is a per-niche checklist confirming each has: **selector modal →
frontend page → storefront preview → admin dashboard → user dashboard → matching backend
endpoints.** Gym, Event/Wedding and Travel have the largest backend surface and are the
most likely to be partially wired.

---

## 6. Recommended priority order

1. **Stand up / finish the backend** for the endpoints in section 3b, starting with
   **auth**, then the niche you launch first.
2. **Confirm the production API URL** is set via `NEXT_PUBLIC_API_URL`.
3. **Fix the Tailwind color shades** (section 4a) — quick, high visual impact.
4. **Add real types** to `api.ts` (section 4b) to stop silent FE↔BE mismatches.
5. Resolve the duplicate `themesData` files and strip debug logging.
6. Run `npx tsc --noEmit` and `npm run lint` to get the exact remaining type/lint errors
   (see limitations below).

---

## 7. Limitations of this audit

The isolated Linux shell was unavailable during this session (disk space), so I could
**not** run `tsc`, ESLint, or `next build`. Those tools are the reliable way to get the
exact list of broken imports, type errors and unused files. This report is based on reading
the source directly. To get the precise compiler error list, run in the project folder:

```
npm install
npx tsc --noEmit
npm run lint
```

and share the output — I can then turn it into a concrete fix list.

---

## 8. Backend Review (`zatbiz-backend`) — corrected findings

**Stack:** Spring Boot (Java), package `com.primezat.demo`, ~319 Java files.
**Database:** Supabase PostgreSQL (Hibernate/JPA, `ddl-auto=update`).
**Image storage:** Cloudinary. **Auth:** JWT (`JwtUtil` + `/api/auth`). **CORS:** configured.

### 8a. Endpoint coverage vs the frontend — it matches almost 1:1
I compared every controller mapping in the backend against every call in the frontend's
`src/services/api.ts`. **Essentially the full frontend contract is implemented**, including
the large suites:

- Core: projects, products, customers, orders, reservations, coupons, categories, brands,
  settings — all present (`/api/projects`, `/api/products`, …).
- Auth: `/api/auth/register`, `/api/auth/login` (real JWT). ✔
- AI Sidekick: `/api/ai/chat`. ✔
- Media upload: `/api/ecommerce/products/upload-image` (+ bulk) via Cloudinary. ✔
- Gym management: members, trainers, classes, bookings, attendance, workouts, diets,
  payments, expenses, equipment, offers. ✔
- Hospital, Medical Shop (info/products/orders incl. prescription verify). ✔
- Travel: packages, bookings, destinations, hotels, flights, visas, theme-settings. ✔
- Event/Wedding: all ~20 sub-resources the frontend uses — **plus extra endpoints the
  frontend does not call yet** (categories, services, packages, portfolios, galleries,
  booking-statuses). So here the backend is actually *ahead* of the frontend.
- Scratch + Scratch-ecommerce (incl. `/publish`), Restaurant + restaurant-data +
  restaurant users, Real Estate (info + brokers/leads/visits/sales/payments/invoices),
  full e-commerce admin (stores, store types, banners, offers), cart, wishlist, wallet. ✔

**Conclusion:** there is no large block of "missing backend." The backend is broadly built.

### 8b. The real risks (these are the things to actually fix)

1. **Hardcoded secrets committed in `application.properties`** — the Supabase DB password
   and the Cloudinary `api-secret` are checked in as default values
   (`${SPRING_DATASOURCE_PASSWORD:uVCpf2Ij…}`, `cloudinary.api-secret=…`).
   **This is the most serious issue.** Anyone with the repo has your production DB and
   media credentials. Action: remove the defaults, load them only from environment
   variables, and **rotate** the exposed password + Cloudinary secret now.

2. **The frontend silently hides backend failures.** `fallbackHandler.ts` catches any
   404/500/502/503/504 or network error and quietly returns `localStorage` mock data.
   Effect: if a backend endpoint is broken or a payload is rejected, the user sees a
   "success" but the data is **not saved to the database** — it only lives in the browser.
   This is very likely the source of the "mismatch" behaviour you're seeing.
   Action: in development, surface these errors (e.g. a visible toast) instead of silently
   falling back, so real backend failures are not masked.

3. **Field-name mismatches between TS payloads and Java DTOs.** Because `api.ts` sends
   `any` bodies and the backend binds to typed DTOs, a mismatched or missing field name
   causes a runtime 400/500 — which is then swallowed by risk #2 above. This is the most
   probable class of real bug. Action: for each failing feature, compare the JSON the
   frontend sends with the matching `dto/*Request.java` fields.

4. **`spring.jpa.hibernate.ddl-auto=update` on a live database.** Convenient, but it lets
   entity changes alter the production schema automatically. Fine for now; consider a
   migration tool (Flyway/Liquibase) before launch.

### 8c. How to find the *exact* remaining problems
The endpoint contract lines up, so remaining issues are runtime/data-shape, not missing
routes. To pinpoint them:
- Run the backend locally (`mvn spring-boot:run`) and the frontend against it, then watch
  the backend console (`show-sql=true`) and browser network tab for any 400/500 responses.
- Each 400/500 is a concrete FE↔BE mismatch to fix (usually a field name or type).
