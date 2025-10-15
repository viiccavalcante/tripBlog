# Nomad Chronicles - Travel Blog Scaffolding

## Overview
A barebones, futuristic travel blog/diary website built with semantic HTML, hand-written modern CSS, and vanilla JavaScript. This is a responsive foundation designed with bold, monochromatic aesthetics and modern web development best practices.

**Current State:** Basic scaffolding complete with header, hero section, content grid, and footer.

## Recent Changes
- **October 15, 2025:** Initial scaffolding created
  - Semantic HTML5 structure with header, main, sections, and footer
  - Hand-written CSS using modern best practices (CSS variables, clamp(), Grid, Flexbox, logical properties)
  - Vanilla JavaScript for mobile navigation toggle
  - Dark/light mode support via `prefers-color-scheme`
  - Futuristic monochrome design with monospace typography

## Design System

### Color Palette
- **Dark Mode (Default):** Black (#0a0a0a) with white (#ffffff) accents, high contrast monochrome
- **Light Mode:** Off-white (#fafafa) with dark text (#0a0a0a), subtle gray accents

### Typography
- **Font:** Monospace (SF Mono, Monaco, Inconsolata, Fira Code, Roboto Mono fallbacks)
- **Sizing:** Fluid typography using `clamp()` for responsive scaling
- **Style:** Bold headings with tight letter spacing for futuristic feel

### Layout
- **Approach:** Asymmetric multi-column CSS Grid
- **Spacing:** Modular scale using CSS custom properties
- **Responsive:** Mobile-first design with breakpoint at 768px

### Components
- **Buttons:** Subtle ghost buttons with border-only style, smooth hover transforms
- **Navigation:** Desktop horizontal nav, mobile slide-in menu with hamburger toggle
- **Cards:** Grid items with gradient backgrounds, hover lift effects

## Project Architecture

### File Structure
```
/
├── index.html          # Semantic HTML structure
├── styles.css          # Hand-written modern CSS
├── script.js           # Vanilla JavaScript functionality
├── .gitignore          # Git ignore patterns
└── replit.md           # Project documentation
```

### Key Technologies
- **HTML5:** Semantic elements (header, main, section, footer, nav, article)
- **CSS3:** Modern features including:
  - CSS Custom Properties (CSS Variables)
  - Fluid typography with `clamp()`
  - CSS Grid and Flexbox
  - Logical properties (margin-inline, padding-block, etc.)
  - `aspect-ratio` for media
  - Modern viewport units (svh/lvh)
  - `prefers-color-scheme` for dark/light mode
  - `prefers-reduced-motion` for accessibility
- **JavaScript (ES6+):** Vanilla JS with IIFE pattern for:
  - Mobile navigation toggle
  - Smooth scroll for anchor links
  - Keyboard accessibility (focus trapping, Escape key)
  - Skip-to-main-content link

### Accessibility Features
- Semantic HTML structure
- ARIA labels and attributes (aria-label, aria-expanded)
- Keyboard navigation support
- Focus visible states with high contrast outlines
- Skip-to-main-content link
- Reduced motion support for animations
- Sufficient color contrast ratios

## Development Notes

### CSS Best Practices Implemented
✅ CSS Variables for design tokens  
✅ Fluid typography with `clamp()`  
✅ Mobile-first media queries  
✅ Flexbox and CSS Grid layouts  
✅ Logical properties for i18n support  
✅ `aspect-ratio` for consistent media sizing  
✅ Smooth transitions for interactions  
✅ Modern viewport units (svh/lvh)  
✅ Dark/light mode via `prefers-color-scheme`  
✅ Minimal CSS reset  
✅ Accessible focus/hover states  

### Server
- Python's built-in HTTP server serving on port 5000
- No build tools or bundlers required

## Next Steps (Future Enhancements)
- Add actual travel blog content and imagery
- Create additional page templates (blog post, about, destinations)
- Implement blog post listing with filtering
- Add image gallery component
- Consider integrating a headless CMS for content management
- Add social sharing functionality
- Implement search feature for blog posts
