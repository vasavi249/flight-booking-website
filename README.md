# Flight Booking Website

A premium, modern, fully responsive flight booking website built using purely HTML5, CSS3, and Vanilla JavaScript. 
The project features a sleek UI with glassmorphism, smooth animations, dark/light mode support, and an extensive local-storage-based booking system.

## Features

- **No Frameworks:** Built 100% with Vanilla HTML, CSS, and JS.
- **Dynamic Theming:** Built-in Light/Dark Mode that persists user preference via LocalStorage.
- **Flight Search & Filtering:** Generates 20+ dummy flights on load. Filter and sort algorithms implemented natively in JS.
- **Interactive Seat Map:** Select/deselect seats on a dynamic airplane layout, which automatically calculates fare based on selected seats.
- **Booking Flow:** End-to-end booking flow from search -> flight selection -> seat selection -> passenger details -> confirmation.
- **State Persistence:** Uses `localStorage` to save User Bookings, Flight Searches, Seat Selections, and Favorite Flights.
- **Animations:** Custom CSS keyframe animations (Fade In, Float, Slide) applied to various UI elements for a premium feel.
- **Responsive:** Fully responsive CSS Grid and Flexbox layouts.

## Pages Included
- `index.html` - Home Page with search, destinations, and stats.
- `pages/flights.html` - Search results with functional sorting/filtering.
- `pages/seat-selection.html` - Dynamic airplane seat grid.
- `pages/booking.html` - Passenger details and fare calculator.
- `pages/offers.html` - Promo codes with live countdown timers.
- `pages/my-bookings.html` - Booking history pulled from `localStorage`.
- `pages/about.html` - Company details and leadership team.
- `pages/contact.html` - Support page with a mock contact form.

## How to Run
Simply open `index.html` in any modern web browser. No local web server or Node.js environment is required, though a local server (like Live Server) is recommended for the best experience.

## Assets
- Typography: Outfit (Google Fonts)
- Icons: FontAwesome 6 (CDN)
- Images: Unsplash (High-quality placeholder images)
