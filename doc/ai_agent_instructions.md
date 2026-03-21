# AI Agent Instructions - WhatsApp Link Generator

You are an AI assistant helping with the development of the WhatsApp Link Generator. Follow these instructions strictly:

## Tech Stack
- **Framework**: Vite + React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Routing**: React Router (src/App.tsx)

## Project Rules
- **Consistency**: Maintain the design system. Use shadcn/ui components whenever possible.
- **Styling**: Use Tailwind CSS for all styling. Avoid custom CSS unless necessary.
- **Structure**:
  - Components: `src/components/`
  - Pages: `src/pages/` (Main page: `src/pages/Index.tsx`)
  - Shared Logic/Utils: `src/lib/` or `src/utils/`
- **Routing**: Keep routes in `src/App.tsx`.
- **Naming**: Use PascalCase for components and camelCase for functions/variables.
- **Documentation**: Always update `README.md`, `doc/ai_agent_instructions.md`, and `doc/versions.md` after major updates.

## Development Workflow
- **State Management**: Use React hooks (useState, useEffect, etc.).
- **Form Handling**: Use `react-hook-form` and `zod` for validation if complex forms are added.
- **Icons**: Use `lucide-react`.

## Branding (Social Masla Design System)
- **Colors**:
  - Background: `#F6F4EB` (Cream)
  - Card/Panel: `#EEEADE` (Deeper Cream)
  - Inverse/Footer: `#121417` (Charcoal)
  - Accent: `#16a34a` (Emerald Green)
- **Typography**:
  - Headings: `Outfit`, 'Helvetica Neue', sans-serif
  - Body: `Inter`, sans-serif
- **Layout**:
  - Container Max-Width: `1340px`
  - Section Padding: `140px` (Desktop)
  - Card Border Radius: `20px`
  - Button Border Radius: `8px`
  - Input Box Heights: `h-12` (48px) for consistency across forms.
