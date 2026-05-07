# Sailing Flashcards

A tiny static flashcard app for learning **dinghy sailing terminology** —
beginner to novice level.

Open `index.html` in a browser. Nothing to install, no build step.

## Deck

The core 17 terms come from the
[Dinghy Sailing Terminology](https://www.instructortoolkit.co.uk/instructor-resources/dinghy-instructor-resources/dinghy-sailing-terminology/)
page on instructortoolkit.co.uk. Boat-part labels also come from that page;
their definitions and all other beginner-to-novice extras (points of sail,
right-of-way, capsize recovery, sail trim controls, wind, commands, roles)
are added in `cards.js`.

Categories:

- Directions
- Sails & rig
- Manoeuvres
- Commands
- Boat parts
- Sail anatomy
- Points of sail
- Ropes & controls
- Wind
- Right of way
- Safety
- Roles

## Controls

- **← / →** — previous / next card
- **Space** or **Enter** or click the card — flip
- **K** — mark / unmark as known
- **S** — shuffle the current deck
- Tap a category chip to filter

Progress (which cards you've marked as known) is stored in `localStorage`,
per browser.

## Adding cards

Edit `cards.js`. Each card is `{ cat, term, def, source? }`. New categories
appear automatically as filter chips.

## Hosting

This is a static site — drop it on GitHub Pages, Netlify, anywhere.
