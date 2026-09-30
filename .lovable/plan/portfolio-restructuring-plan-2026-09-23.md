# Portfolio restructuring plan

## What will change
- Replace the circular mouse marker with a sharper, editorial pointer that changes shape for links, project previews, and card interactions; keep the normal system cursor on touch devices.
- Rebuild the opening layout so “Sethumadhavan” stays on one line when space permits, remove decorative dots and the intro logo, and sequence three equal-size album-style portrait slots so the third remains visible at the end.
- Add a compact project-section navigator for Featured, UX, Graphic, Logo, Video, Artwork, and Contact.
- Rework Featured Work into visual cover tiles and include Sipit as a featured project.
- Rework UX into responsive visual project columns for Sipit, Kiosk Booking, Stuart, and Street Smart Game Design. Sipit will open the uploaded PDF; unavailable project files will use clearly labeled replacement paths.
- Keep the supplied heading icons unchanged, but enlarge and position their containers so they remain legible without distortion.
- Update Graphic Work so Ethnic Village Resort has a cover area with a centered contrast-video replacement slot and a named PDF replacement path.
- Move the Logo Ideation Deck to its own `/logo-deck` page. The home-page card becomes clickable and glows on hover; deck cards flip on click instead of hover.
- Replace the résumé links with a named final résumé path. Until that file is uploaded, the existing placeholder remains available without breaking the site.
- Add named cover and video replacement slots for the three videos, remaining two presentations, photographs, and project covers.

## Responsive behavior
- Use stable grids that collapse from four/two columns to one column without clipped titles.
- Keep navigation, project headings, media frames, and calls to action usable on phone, tablet, and desktop.
- Disable pointer-follow effects where touch or reduced-motion preferences make them inappropriate.

## Technical details
- Preserve TanStack Start routing and existing semantic color tokens.
- Add the `/logo-deck` route with its own metadata and update links from the home page.
- Use the uploaded Sipit asset pointer already in the project; no reference screenshots will be embedded.
- Add a small media manifest in the source with obvious replacement constants, so later uploads only require swapping URLs.
- Verify desktop and mobile layouts, project links, click-to-flip behavior, and the latest build status.

## Assumptions
- “Stuart” and “Street Smart Game Design” are the final labels requested for those UX projects.
- The only final portfolio file currently available to the app is the Sipit PDF; uploaded screenshots remain design references only.
