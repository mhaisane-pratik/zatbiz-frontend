# Increase Product and Food Card Image Size

Adjust the product/food card layout in the website preview section to show medium-sized, premium borderless images (using `object-cover` and a taller `h-60` container) matching modern storefronts and menus.

## User Review Required

> [!NOTE]
> The product card image container will be increased from `h-48` (with `p-4` padding and `object-contain`) to a taller `h-60` container using `object-cover` without padding. This will make food pictures appear significantly larger, clearer, and premium.

## Proposed Changes

### Preview Components

#### [MODIFY] [ProductCard.tsx](file:///e:/primezat-builder-demo/primezat-next-frontend/src/components/preview/ProductCard.tsx)
- Change the image container from `h-48 bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden p-4` to `h-60 bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden`.
- Update the `<img>` classes from `max-h-full max-w-full object-contain` to `w-full h-full object-cover`.

## Verification Plan

### Manual Verification
- Launch the development server and open a website preview (e.g. `/preview/1`).
- Add a new food item from the admin workspace and upload an image.
- Verify that the item picture displays in a beautiful, borderless medium size covering the top of the card.
