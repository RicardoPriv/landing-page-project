# Possible improvements

A running list of optional improvements to revisit as the project develops.
These are ideas, not instructions to implement them. Add new ideas here and
mark completed items when they are implemented.

## Accessibility and presentation

- [ ] Improve contrast for small coral text on cream backgrounds and cream
  text on coral backgrounds, including the hero CTA and contact supporting
  text. The current color pair measures about 3.01:1; normal-sized text needs
  at least 4.5:1 for WCAG AA. Preserve the overall palette while adjusting
  foreground or background colors where needed.
- [ ] Add a more descriptive browser title and a meta description for search
  results and shared links.
- [ ] Check the deployed site in Chromium and Safari, alongside the completed
  Firefox-based browser checks.

## Future profile integration

- [ ] If backend user profiles are introduced, fetch profile data and display
  available avatar image URLs, retaining initials for profiles without images.
- [ ] Consider using a styled text element for the initials fallback instead
  of relying on an image with an empty source.

The current initials are intentional placeholders for this static assignment.
Backend integration and real profile images are not submission requirements.

## Reusable services and testimonials

- [ ] Separate service content (title, description, icon, and tags) from its
  markup and generate the rows from an array using a reusable JavaScript
  function or HTML template.
- [ ] Do the same for testimonials: pass the quote, name, role, and optional
  featured styling into a reusable card template and loop over the data.
- [ ] Consider React as a future alternative, with reusable `ServiceCard` and
  `TestimonialCard` components that receive content through props and render
  from arrays. This is the user's preferred direction if moving to a component
  library later; it is not a request to migrate the current project.

For the current small landing page, keeping three fixed items directly in HTML
is reasonable. Revisit this when content grows, repeated markup becomes harder
to maintain, or practising components becomes a learning goal. JavaScript
templates and React are alternative approaches; both are not required.

## Completed during final review

- [x] Add a main landmark around the content sections and use a semantic footer.
- [x] Correct the heading hierarchy by using ordinary text for brand labels.
- [x] Replace existing comments with focused explanations across JS, CSS, and HTML.
- [x] Document the intended initials fallback and possible future profile fetching.
- [x] Deploy publicly on Netlify and verify the live page at phone, tablet,
  and desktop widths, including navigation, assets, and animations.
- [x] Add repository and deployed-site URLs to the README. Deployment and Checks
  sections were subsequently removed at the user's request.

Service rows are accepted as the assignment's service cards; no conversion is
needed. Remaining submission steps are committing and pushing the final README
changes and submitting both URLs.
