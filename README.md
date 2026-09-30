# Interactive Showcase

Uh, help me build my portfolio website. Uh, I will add the image of the layout that I want my website to be in. The website should start with a good animation. A good preloader and after that it should slow zoom in to the landing page of the site where three of my photos will be shown and the featured work will also be seen next to it which is also interactive where if people hover over it they will get to see the description of the work and in the description even keywords are given and then over in the navbar the SK icon is interactive if you press it it will do the click animation and rotate and on the right there is contact when you hover over it it will turn orange and then it will take you to the footer of the site and onto the right we have the diamond menu bar uh, when you open it you will go into the go into another page where you will get to see four options in that I will add my resume make sure that people can download it from there It should be interactive there should be audio while choosing the option and also while hovering the color should come off well Coming back to the landing page, when you scroll down, you will get to see UX work. Also make sure the background is interactive. It should react to the mouse. The mouse should also change when it hovers. The UX of the site should be really good. It should be really attractive I will add the color palette also if you feel like you can make it better make it the icon next to user experience design should be interactive uh, when the mouse is on the icon it should move a little bit and also the sun rays inside the character should be always rotating uh, the width of user experience design should also be interactive if the like it will vary according to the mouse where the mouse pointer is uh, then the four UX projects that I have to add is Uh, booking system, snippet, steward, and game design. Uh, then, when you scroll down, you will get to see the graphic work. Uh, same thing for graphic. Make the other thing rotating. And let the width vary according to the mouse pointer. Then, add ethnic village resort uh, PDF. and below that the logo deck when you open it there should be four cards and the four cards when people hover over it the card should flip around and show the description of the logo and there should be flip sound effect also so that should be there for all the cards and then returning back Uh, there will be a carousel of images carousel of logos that I've created and then scrolling down there will be three videos one called Sangeet Kala one called Bordens and one will be my editing showreel when you go to the editing showreel you will also get another button where you can see AI video graphic slash AI video editing then when you scroll down you will get to see my artworks and photographs which should be shown as a collage and should appear according to our scrolling like the user scrolling Then when you scroll down, down, the footer should just appear from down, a good preloader, and after that, it should slow zoom in to the landing page of the site where three of my photos will be shown and the featured work will also be seen next to it which is also interactive where if people hover over it they will get to see the description of the work and in the description even keywords are given And then over in the navbar, the SK icon is interactive. If you press it, it will do the click animation and rotate. And on the right, there is contact. When you hover over it, it will turn orange and then it will take you to the footer of the site. And on to the right, we have the diamond menu bar. Uh, When you open it, you will go into the go into another page where you will get to see four options. In that I will add my resume. Make sure that people can download it from there. It should be interactive. There should be audio. while choosing the option and also while hovering the color should come off well Coming back to the landing page, when you scroll down, you will get to see UX work. Also make sure the background is interactive. It should react to the mouse. The mouse should also change when it hovers. The UX of the site should be really good. It should be really attractive. I will add the color palette also. If you feel like you can make it better, make it. The icon next to user experience design. should be interactive uh, when the mouse is on the icon it should move a little bit and also the sun rays inside the character should be always rotating uh, the width of user experience design should also be interactive like it will vary according to the mouse where the mouse pointer is uh, then the four UX projects that I have to add is Uh, booking system, Sipit, Steward, and game design. Uh, then, when you scroll down, you will get to see the graphic work. Uh, same thing for graphic. Make the other thing rotating, and let the width vary according to the mouse pointer. Then add ethnic village resort uh, PDF in. And below that, the logo deck, when you open it, there should be four cards. And the four cards, when people hover over it, the card should flip around and show the description of the logo. And there should be flip sound effect also. So that should be there for all the cards. And then returning back. Uh, there will be a carousel of images, carousel of logos that I've created. And then scrolling down, there will be three videos. One called Sangeet Kala, one called Bordens, and one will be my editing showreel. When you go to the editing showreel, you will also get another button where you can see AI video. Graphy. slash AI video editing then when you scroll down you will get to see my artworks and photographs which should be shown as a collage and should appear according to our scrolling like the user scrolling Then when you scroll down, down, the footer should just appear from niche. Make sure the footer gets revealed. And won't just come along with it.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e4d72698-f227-40d0-9c13-dde5deed0057).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Hosting on Vercel

This project uses Nitro's Vercel preset. To deploy through the Vercel dashboard:

Before pushing the repository, move the large portfolio media out of `public`
using the instructions below; otherwise GitHub/Vercel upload limits can reject
the deployment.

1. Push the project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Keep the install command as `npm install`, the build command as
   `npm run build`, and the output directory on automatic detection.
4. Choose **Deploy**. Vercel provides a `vercel.app` URL and deploys future
   pushes automatically. Add a custom domain from **Settings → Domains**.

You can also deploy from a terminal in the project folder:

```sh
npm install
npx vercel login
npx vercel
npx vercel --prod
```

Run `npm run dev` for local development. Vercel creates preview deployments
for Git branches and pull requests automatically.

### Large portfolio media

The five large original files total about 1.1 GiB:

- `wardens port.mp4` — 691 MiB
- `sangeet kala - Kishan.mp4` — 194 MiB
- `video_editing_portfolio.mp4` — 80 MiB
- `stuart.pdf` — 107 MiB
- `game design.pdf` — 67 MiB

Vercel's documented static-file upload allowance is 100 MB on Hobby and 1 GB
on Pro ([limits](https://vercel.com/docs/limits)); host these originals outside
the deployment in a public [Vercel Blob](https://vercel.com/docs/vercel-blob)
store (up to 5 TB per file) or Cloudflare R2. To use Vercel Blob:

1. Sign in and create a public store:

   ```sh
   npx vercel login
   npx vercel blob create-store portfolio-media --access public
   ```

2. Upload each large file; for example:

   ```sh
   npx vercel blob put "public/Media/Film-and-video-design/wardens port.mp4" --access public
   npx vercel blob put "public/Media/Film-and-video-design/sangeet kala - Kishan.mp4" --access public
   npx vercel blob put "public/Media/Film-and-video-design/video_editing_portfolio.mp4" --access public
   npx vercel blob put "public/Media/User-experience-work/stuart.pdf" --access public
   npx vercel blob put "public/Media/User-experience-work/game design.pdf" --access public
   ```

3. Replace the matching media paths in `src/lib/portfolio-media.ts` with each
   command's returned public URL, then move the local files out of `public/Media`
   before pushing to GitHub. Keep a local backup outside the repository.

Public object URLs can be accessed by anyone who has the link.

## Replacing portfolio media

The easiest way to replace a file locally:

1. Put the new image, video, or PDF in `public/Media` (create the `Media`
   folder if needed).
2. Open `src/lib/portfolio-media.ts` and find the matching media key.
3. Replace its current value with the file's public URL, for example:

   ```ts
   aboutPortrait: "/Media/my-about-photo.jpg",
   sangeetKalaVideo: "/Media/my-new-film.mp4",
   ```

   Files in `public` are served from the site root, so
   `public/Media/my-about-photo.jpg` becomes `/Media/my-about-photo.jpg`.
4. Save and refresh the site. Keep the key name unchanged so the existing
   section continues to use the replacement.

In Lovable, upload the replacement and import the generated `.asset.json` file
from `src/assets`, then set the media key to `myNewAsset.url`. For example:

```ts
import myAboutPhoto from "@/assets/my-about-photo.jpg.asset.json";

// In portfolioMedia:
aboutPortrait: myAboutPhoto.url,
```

To replace an already connected cover, either change that key's URL in
`portfolioMedia`, or replace its asset import and keep the `.url` mapping.

The image/video/PDF keys are:

- Portraits: `kishanPortrait01`, `kishanPortrait02`, `kishanPortrait03`,
  `aboutPortrait`
- Section and navigation icons: `navLogo`, `diamondMenuIcon`, `uxProjectIcon`,
  `graphicProjectIcon`, `videoProjectIcon`, `artworkProjectIcon`
- Logo carousel: `carouselAerionLogo`, `carouselButterloopLogo`,
  `carouselCoActionLogo`, `carouselEthnicLogo`, `carouselRefilLogo`
- Logo deck/project marks: `conceptAerionLogo`, `conceptButterloopLogo`,
  `conceptCoActionLogo`, `conceptEthnicLogo`, `conceptRefilLogo`
- Interactive deck fronts/backs: `conceptFeatherHatFront`,
  `conceptFeatherHatBack`, `conceptNestFront`, `conceptNestBack`,
  `conceptRhinoFront`, `conceptRhinoBack`, `conceptWelcomeFront`,
  `conceptWelcomeBack`
- UX covers: `sipitCover`, `kioskBookingCover`, `stuartCover`,
  `streetSmartGameCover`
- Graphic and film covers: `ethnicVillageCover`, `sangeetKalaCover`,
  `wardensCover`, `editingShowreelCover`
- Artwork: `artwork01`–`artwork06`
- Photographs: `photograph01`–`photograph11`
- Reader-free project exports: `sipitProjectImage`, `gameDesignProjectImage`,
  `stuartProjectImage`, `ethnicVillagePresentationImage`,
  `ethnicVillagePresentationImage02`
- Video files: `contrastVideo`, `sangeetKalaVideo`, `bordensVideo`,
  `editingShowreelVideo`
- Presentations: `sipitPresentation`, `kioskBookingPresentation`,
  `stuartPresentation`, `streetSmartPresentation`, `ethnicVillagePresentation`,
  `ethnicVillagePresentation02`, `graphicSecondPresentation`
- Resume: `resume`

The resume downloads from `public/Media/Kishan resume.pdf`. Project PNG exports
and the interactive logo-deck card art are stored under `public/Media`.

The logo carousel, Logo Ideation Deck, and Ethnic Village project marks are
mapped in `src/lib/portfolio-media.ts`. Replace the relevant URL there when
updating those files. The website icon is `public/favicon.svg`.

The current home-page photo sequence uses the three images in
`public/Media/Kishan-Pictures`. The artwork collage maps all images in
`public/Media/Photos-and-artworks`: numbered files and the long exposure are
artwork, while the `IMG_*.jpg` files are photographs. Component icons are
served from `public/Media/Components`.

### Adding a UX project

Add an entry to the `uxProjects` array in `src/routes/index.tsx` with a title,
number, project type, short description, cover key, and presentation key.
Create matching cover and presentation entries in `portfolioMedia`. A PDF
presentation PNG opens directly as an image without a PDF reader. Category
links below each project open their matching PDF page in the browser when a PDF
is available. Leave the presentation value `null` if neither format is ready.
The cards are rendered from this list.

The three featured cards are configured separately in `LandingSection` in the
same file. Update those `FeaturedCard` entries to choose which work appears on
the landing page.

### Updating professional experience

Edit the `roles` array in `src/routes/experience.tsx` to add or update a role.
Each entry supplies the company, title, dates, optional location, a short
experience description, and display number. The Experience card in
`src/routes/menu.tsx` links to this interactive page.

### Adding a video

Add a cover-image slot and a video-file slot to `portfolioMedia` in
`src/lib/portfolio-media.ts`, then add an entry to the `videos` array in
`src/routes/index.tsx`. The entry's `cover` and `media` values must match those
slot names. Cover images appear on the video cards; the video file plays in the
theater viewer when a card is selected. Add a new slot with a `null` value to
show the labeled placeholder until the file is ready.

### Adding an artwork or photograph

Add a `null` slot such as `artwork10` or `photograph10` to `portfolioMedia`,
then add a matching `[slot, label, sizeClass]` entry to the `items` list in
`ArtworkSection` in `src/routes/index.tsx`. The collage reveals cards as they
enter the viewport; use Tailwind span classes such as `md:col-span-2` to vary
their shape.

The About page portrait uses the `aboutPortrait` slot in `portfolioMedia`.
Replace its `null` value with your uploaded image URL when you're ready.

The Ethnic Village Resort page shows the upper presentation image, looping
contrast video, and lower presentation image in a continuous full-width strip.
The UX cards use long PNG presentation exports when available, so visitors can
view them without opening a PDF reader. Category links open the matching PDF
pages directly in the browser.
