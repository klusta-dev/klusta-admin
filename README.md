# Klusta Admin

Admin dashboard for Klusta — manage users, properties, amenities, categories, reports, and customer support. Built with Next.js and Tailwind CSS.

## Overview

Klusta Admin is a protected admin panel that includes:

- **Dashboard** — Overview stats (users, properties, amenities, categories) and recent activity
- **Users** — List and user details with activate/deactivate actions
- **Properties** — Searchable, filterable property list (grid/table) and property details with disable listing, enable listing, and take down actions
- **Amenities** — CRUD for amenities
- **Categories** — CRUD for categories (slug auto-generated from name)
- **Reports** — List of user and property reports with status filters (open, in review, resolved, dismissed)
- **Customer support** — Support tickets with status and priority

**Auth:** Login at `/login` (any non-empty email/password for demo). All dashboard routes are guarded; unauthenticated users are redirected to login. Sign out via the header user menu.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Manrope** (Google Font)

Design tokens (primary, secondary, typography) are defined in `globals.css` for the Klusta brand.

## Getting Started

### Prerequisites

- Node.js 18.x or later (20.x recommended)

### Install and run

```bash
# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). You’ll be redirected to `/login` until you sign in.

### Build

```bash
npm run build
# or
yarn build
```

## Project Structure

- `src/app/(admin)/` — Dashboard routes (guarded): dashboard, users, properties, amenities, categories, reports, customer-support
- `src/app/(full-width-pages)/(auth)/login/` — Login page
- `src/components/klusta/` — Klusta-specific UI (dashboard stats, user/property lists, amenities/categories managers, reports, customer support)
- `src/context/AuthContext.tsx` — Auth state (login/logout, token in `localStorage`)
- `src/components/layout/DashboardGuard.tsx` — Protects admin routes; redirects to `/login` when not authenticated
- `src/data/mock.ts` — Mock data for users, properties, amenities, categories, reports, support tickets

## License

MIT.
