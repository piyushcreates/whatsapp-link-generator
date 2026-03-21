# Versions - WhatsApp Link Generator

## [1.0.0] - 2026-03-17
### Added
- Initial project structure with Vite, React, and TypeScript.
- WhatsApp Link Generator component with phone number and message inputs.
- Link generation, copy to clipboard, and direct open functionality.
- shadcn/ui component integration.
- Project documentation setup (`doc/` directory with `ai_agent_instructions.md` and `versions.md`).

## [1.1.0] - 2026-03-17
### Added
- Integrated **Social Masla Design System (SMDS)**.
- Established premium "Editorial" aesthetic (Cream, Charcoal, Emerald Green).
- Configured `Outfit` and `Inter` typography.
- Updated UI components (Cards, Buttons, Inputs) with SMDS variables and radii.
- Refactored `WhatsAppLinkGenerator` with high-contrast hero section and footer.

## [1.2.0] - 2026-03-17
### Added
- Optimized **Mobile UI** with responsive typography and spacing.
- Redesigned **Footer**:
  - Background set to solid black.
  - Centered "Powered by Social Masla" branding.
  - Applied grey/white color scheme as per design standards.
- Refined **Card UI** by removing redundant "Link Builder" and "Configuration" headers for a cleaner, more focused look.
- Reduced **Top Spacing** for a more balanced and compact layout.
- Removed **Social Masla Verified** footer card.
- Added **Hero Feature Grid** below the title for better tool discovery.
- Simplified **Footer** to keep only the "Powered by Social Masla" branding and fixed background layout issues.
- Applied **Extreme UI Compression**: Reduced typography, padding, and component heights to ensure the entire dashboard fits in a single desktop viewport without scrolling.

## [1.3.1] - 2026-03-22
### Changed
- Removed "Professional Link Engine" badge for a cleaner UI.
- Removed the high-level feature grid below the title to declutter the interface.
- Updated main copy to: "The ultimate tool for marketers."
- Fixed flex-box alignment between the Country Code Picker and Phone Number input box to ensure perfectly equal heights.
- Applied a sticky footer layout (`flex-col`, `flex-1`, `mt-auto`) to ensure the page ends with the black footer and prevents the cream background from showing underneath.
- Updated footer attribution to "Grow your business on WhatsApp with Pulse by Social Masla" linking to `socialmasla.com/pulse`.

## [1.3.0] - 2026-03-17
### Added
- **Smart Country Code Picker**: Searchable dropdown with global codes.
- **QR Code Engine**: Instant brand-ready QR codes with PNG download support.
- **Live Preview**: Visual "WhatsApp Chat Bubble" mockup for real-time validation.
- **Link History**: LocalStorage persistence for the last 5 generated links.
- **Quick Templates**: Professional message pre-sets (Support, Inquiry, etc.).
- **UTM Tracking**: Integrated field for ad campaign tracking.
- **Advanced Layout**: New two-column desktop interface with sticky asset panel.
- **SEO Optimization**: Comprehensive meta tags (OG, Twitter) and JSON-LD structured data.
- **AI-Ready**: Added `ai.txt` and optimized site structure for AI crawlers like SearchGPT.
