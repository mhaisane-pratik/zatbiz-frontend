# Task Checklist: Login, Dashboard, Theming & Card Resizing

## Phase 1: Login Page (Completed)
- [x] Generate custom website builder illustration
- [x] Copy generated illustration to public image assets
- [x] Modify `src/app/login/page.tsx` with light theme, minimal text, and illustration
- [x] Verify the design locally using Next.js build / dev server

## Phase 2: Persistent Shopify-Style Dashboard (Completed)
- [x] Design & implement the layout skeleton with left sidebar and top bar in `src/app/dashboard/page.tsx`
- [x] Add the sidebar navigation tabs (Home, Workspaces, Templates, Analytics, Settings, Admin Console)
- [x] Implement new mockup tabs (Home Overview, Analytics telemetry, Settings sync configurations)
- [x] Add mobile drawer toggling for responsive screens
- [x] Verify build and functionality on the dev server

## Phase 3: Self-Healing API Fallbacks (Completed)
- [x] Modify `src/services/api.ts` to load API_BASE_URL dynamically from localStorage
- [x] Add try-catch fallback handling inside the API request helper to return premium mocks when the backend is offline
- [x] Run Next.js production compilation to verify all components compile correctly

## Phase 4: Dynamic Template Themes & Illustrations (Completed)
- [x] Generate custom restaurant login illustration
- [x] Copy generated restaurant illustration to public image assets
- [x] Add `login_config` and `dashboard_config` blocks for all templates in `src/services/templates.ts`
- [x] Refactor client preview login page `src/app/preview/[id]/login/page.tsx` to support dynamic theme colors, styles, and illustrations
- [x] Verify build and functionality

## Phase 5: Robust Network Error Detector (Completed)
- [x] Simplify network error detection logic in `src/services/api.ts` to cover all browser and Node.js fetch failure message variants
- [x] Verify build compiles successfully

## Phase 6: Product Card Picture Resizing (Completed)
- [x] Modify `src/components/preview/ProductCard.tsx` to display medium-sized borderless food pictures (`h-60`, `object-cover`)
- [x] Verify compilation compiles successfully

## Phase 7: Product Image File Upload (Completed)
- [x] Replace "Product Image URL" input with a file selector in `src/app/preview/[id]/dashboard/page.tsx`
- [x] Add image thumbnail preview with clear options
- [x] Retain external URL fallback option in input
- [x] Verify production build compiles successfully

## Phase 8: User/Customer Side Dashboard Product Integration (Completed)
- [x] Add dynamic "Store Dashboard" and "Shop Catalog" / "Food Menu" tabs to customer sidebar
- [x] Update overview dashboard widget to display product image thumbnails, categories, and correct currency symbols (rupee `₹` for fashion/grocery niches, and dollar `$` elsewhere)
- [x] Verify client-side storefront, wishlist, and orders render product images with fallback handlers
- [x] Verify production build compiles successfully


