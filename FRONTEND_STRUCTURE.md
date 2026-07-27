# ZATBIZ Frontend — Structure Map & Restructure Plan

**Goal:** every template's files in ONE place, with names anyone can understand
(`GymLogin.tsx` instead of a fourth file called `Login.tsx`).

---

## 1. Where everything is TODAY (current map)

### App routes (`src/app/`) — pages users visit
| Route file | What it is |
|---|---|
| `app/page.tsx` | Public landing / marketing page |
| `app/login/page.tsx` | Main platform login |
| `app/dashboard/page.tsx` | Main user dashboard (Shopify-style shell) |
| `app/builder/[id]/page.tsx` | Website builder / Theme Studio entry |
| `app/preview/[id]/page.tsx` | Published site — landing page render |
| `app/preview/[id]/login/page.tsx` | Published site — customer login render |
| `app/preview/[id]/dashboard/page.tsx` | Published site — customer/admin dashboard render |
| `app/frontend/<niche>/page.tsx` | Static template demo pages (clinic, gym, wedding, …) |
| `app/templates-preview/page.tsx` | Template gallery preview |

### ALREADY CLEAN — `components/preview/templates/<niche>/`
Each niche folder has: `Landing.tsx`, `Login.tsx`, `UserDashboard.tsx`, `AdminDashboard.tsx`
Niches: `gym`, `hospital`, `medical-shop`, `realestate`, `restaurant`, `school`, `travel` (has `TravelStorefront.tsx`, no Landing), `wedding`
→ Only problem: generic file names repeat in every folder (8 files all called `Login.tsx`).

### MESSY — files scattered outside their template's home
| Current location | Belongs to | Target |
|---|---|---|
| `preview/dashboard/templates/GymDashboard.tsx` | Gym | `templates/gym/` |
| `preview/dashboard/templates/GymAdminPanel.tsx` | Gym | `templates/gym/` |
| `preview/dashboard/templates/GymUserPanel.tsx` | Gym | `templates/gym/` |
| `preview/dashboard/templates/HospitalDashboard.tsx` | Hospital | `templates/hospital/` |
| `preview/dashboard/templates/MedicalShopDashboard.tsx` | Medical Shop | `templates/medical-shop/` |
| `preview/dashboard/templates/MedicalShopAdminPanel.tsx` | Medical Shop | `templates/medical-shop/` |
| `preview/dashboard/templates/MedicalShopUserPanel.tsx` | Medical Shop | `templates/medical-shop/` |
| `preview/dashboard/templates/RealEstateDashboard.tsx` | Real Estate | `templates/realestate/` |
| `preview/dashboard/templates/RestaurantDashboard.tsx` | Restaurant | `templates/restaurant/` |
| `preview/dashboard/templates/RestaurantAdminDashboard.tsx` | Restaurant | `templates/restaurant/` (rename → `RestaurantAdminPanel.tsx` to avoid clash) |
| `preview/dashboard/templates/SchoolDashboard.tsx` | School | `templates/school/` |
| `preview/dashboard/templates/EventDashboard.tsx` | Event/Wedding planner | `templates/event/` (new folder) |
| `preview/wedding/WeddingStorefront.tsx` | Wedding | `templates/wedding/` |
| `preview/scratch/ScratchStorefront.tsx` | Scratch store | `templates/scratch/` (new folder) |
| `preview/ecommerce/niches/beauty/Login.tsx` | E-com Beauty | `templates/ecommerce/BeautyLogin.tsx` |
| `preview/ecommerce/niches/furniture/Login.tsx` | E-com Furniture | `templates/ecommerce/FurnitureLogin.tsx` |
| `preview/ecommerce/niches/pcet/Login.tsx` | E-com Pet | `templates/ecommerce/PetLogin.tsx` |
| `preview/ecommerce/niches/pharmacy/Login.tsx` | E-com Pharmacy | `templates/ecommerce/PharmacyLogin.tsx` |
| `preview/ecommerce/niches/restaurant/Login.tsx` | E-com Restaurant | `templates/ecommerce/RestaurantEcomLogin.tsx` |
| `preview/ecommerce/niches/scratch/Login.tsx` | Scratch store | `templates/scratch/ScratchLogin.tsx` |

### Restaurant storefront system — already in one place, keep as-is
`preview/restaurant/` (RestaurantStorefront, CartDrawer, BookingSeatMapModal, `categories/` with
FastFood/FineDining/Cafe/Pizza/etc. + Vesta). ~30 files, heavily imported by the Theme Studio.
**Recommendation: leave in place** — it is already grouped; renames here have the highest breakage risk.

### Selector modals — `components/dashboard/*SelectorModal.tsx`
GymSelectorModal, HospitalSelectorModal, MedicalShopSelectorModal, RealEstateSelectorModal,
RestaurantSelectorModal, TravelSelectorModal, WeddingSelectorModal, EcommerceSelectorModal,
ScratchSelectorModal, DynamicCategorySelectorModal (+ WeddingWizardSteps, realEstateItems.ts).
These are dashboard UI, not template code → **keep together**, optionally under
`components/dashboard/selectors/`.

---

## 2. TARGET structure (what we're moving to)

```
src/components/templates/
├── gym/            GymLanding.tsx, GymLogin.tsx, GymUserDashboard.tsx, GymAdminDashboard.tsx,
│                   GymDashboard.tsx, GymAdminPanel.tsx, GymUserPanel.tsx
├── hospital/       HospitalLanding.tsx, HospitalLogin.tsx, HospitalUserDashboard.tsx,
│                   HospitalAdminDashboard.tsx, HospitalDashboard.tsx
├── medical-shop/   MedicalShopLanding.tsx, MedicalShopLogin.tsx, MedicalShopUserDashboard.tsx,
│                   MedicalShopAdminDashboard.tsx, MedicalShopDashboard.tsx,
│                   MedicalShopAdminPanel.tsx, MedicalShopUserPanel.tsx
├── realestate/     RealEstateLanding.tsx, RealEstateLogin.tsx, RealEstateUserDashboard.tsx,
│                   RealEstateAdminDashboard.tsx, RealEstateDashboard.tsx
├── restaurant/     RestaurantLanding.tsx, RestaurantLogin.tsx, RestaurantUserDashboard.tsx,
│                   RestaurantAdminDashboard.tsx, RestaurantDinerDashboard.tsx,
│                   RestaurantAdminPanel.tsx
│                   (storefront engine stays in preview/restaurant/)
├── school/         SchoolLanding.tsx, SchoolLogin.tsx, SchoolUserDashboard.tsx,
│                   SchoolAdminDashboard.tsx, SchoolDashboard.tsx
├── travel/         TravelStorefront.tsx, TravelLogin.tsx, TravelUserDashboard.tsx,
│                   TravelAdminDashboard.tsx
├── wedding/        WeddingLanding.tsx, WeddingLogin.tsx, WeddingUserDashboard.tsx,
│                   WeddingAdminDashboard.tsx, WeddingStorefront.tsx
├── event/          EventDashboard.tsx
├── scratch/        ScratchStorefront.tsx, ScratchLogin.tsx
└── ecommerce/      BeautyLogin.tsx, FurnitureLogin.tsx, PetLogin.tsx, PharmacyLogin.tsx,
                    RestaurantEcomLogin.tsx
```

**Naming rule:** `<Template><Page>.tsx` — the file name alone tells you the template AND the page.

---

## 3. Files that import templates (must be updated during the move)

- `app/builder/[id]/page.tsx` — imports restaurant Landing
- `app/preview/[id]/page.tsx` — imports all niche Landings
- `app/preview/[id]/login/page.tsx` — imports all niche Logins (+ ecommerce logins — verify)
- `app/preview/[id]/dashboard/page.tsx` — imports all niche User/Admin dashboards
- `components/preview/dashboard/UserPanels.tsx` and `AdminPanels.tsx` — import
  `preview/dashboard/templates/*` (verify exact list with grep before moving)
- Any `app/frontend/<niche>/page.tsx` that imports template components (verify)

## 4. Execution checklist (when workspace shell is available)

1. `git add -A && git commit` — safety snapshot first.
2. `git mv` each file per the table above (preserves history).
3. Find/replace import paths (script sweep over `src/`).
4. `npx tsc --noEmit` → fix any missed imports.
5. `npm run dev` → click through: landing, login, dashboard, builder, preview pages.
6. Delete the now-empty old folders.
