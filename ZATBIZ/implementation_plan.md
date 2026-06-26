# Implementation Plan - Complete Gym Category Selection, Theme Choosing, and Profile Onboarding

Complete the implementation of the Fitness & Gym template creation flow on the dashboard, fixing syntax errors in the selector component, adding Step 2 theme selection options, and collecting full gym profile information in the business wizard to save in Supabase/Spring Boot.

## Proposed Changes

### Frontend Components & Pages

---

#### [MODIFY] [GymSelectorModal.tsx](file:///e:/ZATBIZ%20-%20Copy/ZATBIZ/primezat-next-frontend/src/components/dashboard/GymSelectorModal.tsx)
- Repair the syntax error at line 145 where the image URL was truncated and the import statement was pasted inline.
- Complete Step 2 theme selection:
  - Fetch all 10 gym themes from `THEMES_30` (in `themesData.ts`).
  - Render color indicators for each theme.
  - Add a "Use Theme & Continue" button returning `onSelectCategory(selectedCategory, theme.id, theme.primaryColor)`.
  - Fix any missing closing tags/braces to make the component fully valid.

#### [MODIFY] [page.tsx](file:///e:/ZATBIZ%20-%20Copy/ZATBIZ/primezat-next-frontend/src/app/dashboard/page.tsx)
- Declare state variables `selectedGymThemeId` and `selectedGymThemeColor` using `useState`.
- Update `GymSelectorModal`'s `onSelectCategory` callback to capture `(category, themeId, themeColor)` and store all three values in state.
- Pass `initialGymThemeId={selectedGymThemeId}` and `initialGymThemeColor={selectedGymThemeColor}` props to `BusinessWizard`.
- Ensure clean resets of all gym-related states on wizard close/completion.

#### [MODIFY] [BusinessWizard.tsx](file:///e:/ZATBIZ%20-%20Copy/ZATBIZ/primezat-next-frontend/src/components/dashboard/BusinessWizard.tsx)
- Update `BusinessWizardProps` type to include optional props `initialGymThemeId` and `initialGymThemeColor`.
- In `useEffect` initialization, map the selected gym theme to the nearest existing color preset (`themePreset` state) to align visually with default UI settings.
- Adjust step routing:
  - Make the gym flow route through Step 3 (Contact Information) and Step 4 (Address Information) so users can input custom gym details.
- In backend submission for `gym`:
  - Pass the collected contact details (owner name, phone, email, address, city, state, country, pincode, theme color, logo icon/URL) to the `api.gym.create` request.

#### [MODIFY] [templates.ts](file:///e:/ZATBIZ%20-%20Copy/ZATBIZ/primezat-next-frontend/src/services/templates.ts)
- Extend `generateTemplateBlocks` parameter list to support optional `theme` (preset color) and `gymCategory`.
- Apply the user's selected theme (or `themePreset`) across all gym blocks (hero, features, pricing, FAQ, footer) instead of using hardcoded purple/slate colors.

## Verification Plan

### Automated Tests
- Run `npm run build` or Next.js compilation check to confirm that the app compiles cleanly with no syntax or type errors.

### Manual Verification
- Open the dashboard at `http://localhost:3000/dashboard`.
- Select the **Gym** template from the marketplace.
- Select a Gym category (e.g., CrossFit Gym).
- Select one of the 10 Gym themes (e.g., Volt Apex, Neon Grid, or Carbon Stealth).
- Verify the onboarding wizard starts:
  - Fill out admin username, email, and password.
  - Fill out Gym Name, Slogan, Contact Phone.
  - Fill out Gym Owner Name, Contact Email.
  - Fill out Gym Address, City, State, Pin Code.
  - Click **Save & Generate Website**.
- Verify that a network request is triggered to save the profile details, and the new gym website is launched.
