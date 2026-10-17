# Morrow

A responsive landing page for Morrow, a fictional studio offering brand strategy,
digital design, and growth services. Built as an HTML, CSS, and JavaScript
landing page assignment.

## Links

- Repository: to be added
- Live site: to be added

## What's included

- A fixed header with navigation and a mobile hamburger menu.
- Hero, About, Services, Testimonials, Contact, and Footer sections.
- Smooth scrolling between sections.
- Different scroll-triggered animations for each section.
- Layouts that adjust for phones, tablets, and desktops.
- An email link that opens a draft in the visitor's configured email app.
- Social links that open in a new tab or window.

Keyboard focus styles are included. The menu closes with Escape or after
selecting a link. Animations and smooth scrolling respect reduced-motion
preferences.

## Built with

HTML, CSS, vanilla JavaScript, and Vite. Animations use the Web Animations API
and IntersectionObserver. There are no UI frameworks.

## Run locally

You'll need Node.js 22.12 or newer, or Node.js 20.19+, and npm.

From the project root:

```bash
cd frontend
npm ci
npm run dev
```

Open the local address printed in the terminal.

To build and preview the production version, run these commands from `frontend/`:

```bash
npm run build
npm run preview
```

The build is saved in `frontend/dist`. Rebuild after changing the source if
you're using the production preview.

## Project structure

```text
frontend/
  index.html          Page entry point
  public/             Logos, illustrations, and social icons
  src/
    main.js           Assembles the sections and sets up interactions
    style.css         Imports the stylesheets
    sections/         HTML files for each section
    styles/           Shared styles and section stylesheets
    js/
      menu.js         Mobile menu behavior
      animations.js   Scroll-triggered animations
docs/                 Design references and project notes
```

The sections are kept in separate HTML files and imported through Vite's `?raw`
imports. Shared colors, typography, and spacing live in `base.css`; each section
has its own stylesheet.

## Deployment

For a static host, use `frontend` as the project directory, `npm run build` as
the build command, and `dist` as the publish directory.

The current asset paths assume the site is hosted at the domain root. Hosting
under a repository subpath, such as GitHub Pages, needs matching Vite base and
asset-path configuration.

## Checks

The production build passes. Browser checks covered phone, tablet, laptop, and
desktop sizes, including horizontal overflow and mobile menu interactions.

On small screens, sections with more content remain scrollable rather than
being forced into one screen. The contact details are fictional, and the social
links currently point to the platforms' homepages.
