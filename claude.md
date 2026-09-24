# Kaarya Website (Astro) Guidelines for AI Assistants

Welcome, AI Agent! This document provides guidelines for contributing to the `@kaarya/web-site` repository. It complements the global `AGENTS.md` file for the Kaarya monorepo, with a specific focus on this marketing/documentation website.

## 🏛 Architecture & Tech Stack

- **Framework:** Astro 5.4+ (Static Site Generation)
- **Styling:** Tailwind CSS v4
- **Components:** Built primarily with native HTML/Astro components and Tailwind utilities.
- **Content Management:** Astro Content Collections (`src/content/`). Markdown and MDX are strictly used for data-driven sections.

## 📁 Repository Structure

- `src/pages/`: Contains the Astro routes (e.g., `index.astro`).
- `src/layouts/`: Base layouts shared across pages.
- `src/components/`: Reusable UI components.
- `src/content/`: Data-driven content managed by Astro Collections:
  - `features/`: Product capabilities (Alpha, Beta, Shipped).
  - `pricing/`: Pricing tiers (Core, Pro, Enterprise).
  - `use-cases/`: Industry-specific value propositions.
  - `proofs/`: Customer case studies and ROI receipts.
  - `how-it-works/`: Onboarding and deployment steps.
  - `specs/`: Technical specifications.
- `src/content.config.ts`: Defines the schema (Zod) and loaders for all content collections.

## 🎨 Design System: "Foundry Industrial"

The website shares the **Foundry Industrial** aesthetic with the desktop shell/SPA, prioritizing high visual density, high contrast, and industrial precision:

1. **Colors & Tonal Layering**
   - **Base Void:** `bg-surface` (e.g., `#0b1326`)
   - **Elevated Containers:** Use subtle border colors (`border-outline`) over solid gray backgrounds.
   - **Text:** `text-content` (avoid pure white `#ffffff`), `text-content-muted`.
   - **Primary Accent:** Action Cobalt (`text-primary` / `bg-primary`)
   - **Safety Accents:** Safety Green (`text-secondary`), Warning Amber, Error Red, Alpha/Beta statuses (`text-status-alpha`, `text-status-beta`).

2. **Typography Rules (Strict)**
   - **Interface Labels, Body, Headings:** **Inter** or **Space Grotesk** (`font-sans` / `font-display`).
   - **Numbers, Metrics, Timers, Prices:** **IBM Plex Mono** (`font-mono`) — **MANDATORY**. Do not use sans-serif for numerical data.

3. **Shapes & Radii**
   - Engineered, blocky feel. Use `rounded`, `rounded-sm`, `rounded-md`. Avoid large rounded pills (`rounded-full`) except for specific badges.

## ⚡ Content Workflow

- **No Hardcoded Data in Astro Files:** Whenever possible, extract lists (features, use cases, pricing, steps) into `src/content/` collections.
- **Sorting:** Content collections are returned in arbitrary or file-system order. Always use an `order` field in the Markdown frontmatter and `.sort((a, b) => (a.data.order || 99) - (b.data.order || 99))` when mapping over items.
- **Syncing with Core:** The marketing website must stay in sync with the actual Kaarya shell codebase. Ensure feature statuses (`alpha`, `beta`, `shipped`) and tier indicators (`core`, `pro`, `enterprise`) reflect the truth in `AGENTS.md`.

## 🛠 Commands

- `pnpm dev:site`: Run the Astro dev server.
- `pnpm run build`: Build the static site.

---
**Remember:** Never invent marketing claims. Always reflect the actual state of the Kaarya product ("Real Shopfloor Truth").
