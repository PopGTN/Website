# Project Context — Joshua's Jekyll Website

This file is a handoff summary for a local Gemma/Gemma-like coding bot.
Project root: `/home/joshua/Documents/Website`

## What this project is

A personal Jekyll website that is being turned into a multi-theme site.
The important constraint is:

- Themes should build on top of Bootstrap, not replace the whole system.
- Shared controls should look reasonable in default Bootstrap mode first.
- Theme files should then restyle those shared controls in Sketch / Terminal / IDE.
- The Sketch theme is intentionally uneven, hand-drawn, and imperfect. That unevenness is part of the design language and should be preserved.

## Stack

- Jekyll
- Liquid templates
- Bootstrap 5
- SCSS via Jekyll
- Vanilla JS
- Bootstrap Icons

## Theme architecture

Two theme systems are in play:

- Site theme: `data-site-theme="default|sketch|terminal|ide"` on `<html>`
- Bootstrap color mode: `data-bs-theme="light|dark"` on `<html>`

Current intended behavior:

- `default` site theme: plain Bootstrap behavior
- `terminal`: forces Bootstrap dark mode
- `ide`: follows Bootstrap dark-ish styling from its own theme layer
- `sketch`: no longer forces light mode; it now has its own paired light/dark token sets and should follow the Bootstrap color mode selector

Theme choice is stored in:

- `localStorage["site-theme"]`

Bootstrap color mode choice is stored in:

- `localStorage["theme"]`

## Important current direction

The senior-dev-style direction for this codebase is:

- use semantic tokens instead of “invert colors”
- let Bootstrap own the light/dark mode switch
- let each site theme define a palette for both light and dark where needed
- avoid hardcoding sketch-only DOM/CSS into shared base layouts unless it is opt-in

This matters especially for Sketch.
Sketch dark mode should feel like “dark paper / notebook at night”, not a literal inverted beige page.

## Key files

### Layouts / includes

- `_layouts/default.html`
  Base layout.
  Contains the pre-paint script that restores the site theme early.
  Also contains the floating theme picker container.

- `_layouts/post.html`
  Uses a shared article shell now, not sketch-only article markup.

- `_includes/header.html`
  Shared page header component.
  Supports:
  - `headerTitle`
  - `headerSubtitle`
  - `headerEyebrow`
  - `headerHeight`
  - `headerTextClasses`

- `_includes/navigation.html`
  Navbar.
  The site-theme picker was removed from the navbar.

- `_includes/footer.html`
  Footer.
  Contains a mobile slot for the theme picker:
  `#site-theme-picker-footer-slot`

- `_includes/sketch-layout.html`
  Sketch-only homepage replacement.
  Only used on `/`.

### Theme CSS

- `assets/css/site-themes.scss`
  Entry point for the theme partials.

- `_sass/themes/_global.scss`
  Shared theme structure and Bootstrap-first shared control styles.
  Important shared classes include:
  - `.theme-filter-btn`
  - `.theme-filter-panel`
  - `.theme-article*`
  - `.theme-status-text`
  - `.theme-meta-text`
  - `.theme-header-eyebrow`
  - `.theme-repo-description`

- `_sass/themes/_sketch.scss`
  Sketch theme.
  This file now has paired token sets for:
  - `[data-site-theme="sketch"][data-bs-theme="light"]`
  - `[data-site-theme="sketch"][data-bs-theme="dark"]`

- `_sass/themes/_terminal.scss`
  Terminal theme.

- `_sass/themes/_ide.scss`
  IDE theme.

### JavaScript

- `assets/js/siteTheme.js`
  Handles:
  - applying site theme
  - syncing active theme buttons
  - moving the theme picker into the footer on mobile
  - sketch homepage pencil animation

- `assets/js/colorMode.js`
  Bootstrap-style color mode toggle logic.

- `assets/js/repos.js`
  Projects page repository UI.
  Handles:
  - fetching GitHub + Bitbucket repos
  - cache
  - filtering
  - sorting
  - pagination
  - sketch card rendering
  - Bootstrap card rendering

## Current theme picker behavior

Desktop:

- floating fixed picker in bottom-right
- uses `dropup`

Mobile:

- picker is moved into the footer slot by JS
- no longer fixed/absolute on small screens

Relevant files:

- `_layouts/default.html`
- `_includes/footer.html`
- `assets/js/siteTheme.js`
- `_sass/themes/_global.scss`

## Sketch homepage behavior

The sketch homepage is a replacement layout shown only when:

- page is `/`
- `data-site-theme="sketch"`

Normal navbar/header/main/footer are hidden on the index page in sketch mode.

The pencil animation:

- writes nav items first
- then writes the hero title
- has been tuned so the pencil sits closer to the center of the nav text
- speeds up after the halfway point of the nav-writing sequence
- keeps each hero-title line together with `white-space: nowrap` so words do not split awkwardly across lines

Important current visual constraints on the sketch homepage:

- The hand-drawn hero/nav containers should feel like they finish drawing in on load.
- The hero title itself (`.sk-title`) should not be “redesigned” casually; the user explicitly wanted that part left alone.
- The gold divider under the sketch hero title is now animated via CSS/JS as a finishing draw-in stroke, not a hard inline border.
- The navbar frame should align with the same horizontal gutter/edges as the hero containers below it.
- The hero image placeholder should read as a single intentional mockup surface, not multiple competing stacked borders.

Relevant files:

- `_includes/sketch-layout.html`
- `assets/js/siteTheme.js`
- `_sass/themes/_sketch.scss`

## Projects page

Main file:

- `projects.html`
- `projects/readme/index.html`

Important current behavior:

- Uses shared page header component with:
  - `headerTitle: "Projects"`
  - `headerSubtitle`
  - `headerEyebrow: "// projects"`
- The `// projects` eyebrow should only show in sketch mode.
- Sort control is now a dropdown with explicit ascending/descending options.
- Sidebar/filter controls should be Bootstrap-first.
- Sketch theme layers on top of those controls.
- The language filter group should hide entirely when `Bitbucket` is the selected source, because Bitbucket language data is not reliable enough for that filter.
- The sketch sidebar SVG border should not affect non-sketch themes.
- The README page under `projects/readme/index.html` should not render the shared page header.
  It uses `layout: default` but sets `header: false` and relies on the article shell inside the page content instead.

Current sort dropdown options:

- Last Updated ↓
- Last Updated ↑
- Date Created ↓
- Date Created ↑
- Name A–Z
- Name Z–A

## Repo cards / sticky notes

Projects page has two renderers in `assets/js/repos.js`:

- `sketchCard()`
- `bootstrapCard()`

Important design constraint:

- The sketch repo notes should keep an uneven sticky-note feel.
- Avoid making them too uniform or “too clean”.

Current behavior:

- repo descriptions are truncated with `.theme-repo-description`
- sketch sticky notes still use rotated `sk-postit`
- sketch note content is rendered in the sketch style
- default/other themes are allowed to stay straighter and more Bootstrap-like
- sketch controls should be implemented by overriding Bootstrap button/input classes in `_sketch.scss`, not by replacing the Bootstrap base

There was discussion about making the whole sticky note clickable to the README page.
Current code status should be checked in `assets/js/repos.js` before changing it again.
If changing this area, preserve the sketch feel.

## README page behavior

README view file:

- `projects/readme/index.html`

Important behavior:

- no shared top header
- uses the shared `theme-article` shell
- content is fetched client-side from GitHub or Bitbucket
- this page should feel like a focused read view, not a second landing page
- relative README image paths are rewritten to absolute repo asset URLs for both GitHub and Bitbucket
- GitHub profile-repo special case:
  if the repo name matches the GitHub username (`PopGTN`), links should point to `https://github.com/PopGTN` instead of `https://github.com/PopGTN/PopGTN`

## Header behavior

Shared header component is now preferred over duplicating custom page headers.

Example:

- Projects page used to render a second sketch-only intro box under the normal header.
- That was refactored so the shared header component carries the styling instead.

Constraint:

- If a decorative header treatment can be expressed through the shared header component, prefer that over page-specific duplicate markup.

## Bootstrap-first constraint

This is important enough to repeat:

- shared UI should start from Bootstrap-like defaults
- then theme partials override
- do not make shared controls sketch-only by default

This specifically applies to:

- sort controls
- sidebar filter buttons
- pager buttons
- theme picker
- article shell

Homepage-specific note:

- In non-sketch themes, `index.html` should keep normal shared container padding (`padding: true`) so the content is not flush to the viewport/container edges.

## Sketch design constraints

Treat these as intentional, not bugs:

- uneven / hand-cut button edges
- slight rotation
- imperfect note feel
- hand-drawn border vibe
- non-uniform visual rhythm

Do not “clean up” those features unless explicitly asked.

## Current open issues / likely next tasks

These are the likely areas still worth reviewing:

- More remaining hardcoded colors in `_sass/themes/_sketch.scss` could still be converted to semantic tokens.
- The projects sticky-note click behavior may still need refinement based on user preference.
- The repo grid may need more tuning to preserve uneven sketch energy while keeping usability.
- The sketch dark palette likely needs visual polish once seen in-browser across more pages.

## Run locally

```bash
bundle exec jekyll serve
```

Typical validation command:

```bash
bundle exec jekyll build
```

Current known build warning:

- Sass `@import` deprecation from `assets/css/styles.scss`
