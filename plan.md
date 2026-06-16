# Crop Price Information System - Implementation Plan

This project involves building a professional Crop Price Information System with two distinct dashboards: an Admin Dashboard for managing system data and a Farmer Dashboard for accessing market price information.

## Scope Summary
- **Admin Dashboard**: User management, market management, crop price management, weekly/monthly report generation, crop-in-market management, price trends/recommendations, logs/audits, and feedback (user comments).
- **Farmer Dashboard**: Current crop prices, market list with prices, price trend charts (weekly/monthly), market locations, and a suggestion box.
- **Data Persistence**: Since Supabase is NOT available in this session, we will use a **client-side mock data layer with LocalStorage persistence** to simulate a real-backend experience.
- **SMS/USSD Simulation**: As this is a web application, SMS/USSD functionality will be simulated via a dedicated "Mobile View/Simulation" mode or simply as informative UI components demonstrating how those interfaces would look.

## Affected Areas
- **Frontend**: New dashboard layouts (Admin/Farmer), interactive charts (using Recharts), market maps (static or simple interactive), and comprehensive forms for data management.
- **Routing**: `react-router-dom` for navigating between dashboards and public pages.
- **State Management**: React Context or local state with LocalStorage for "mock persistence".

## Assumptions
- The application will be a Single Page Application (SPA).
- User roles (Admin vs. Farmer) will be toggled or selected for demonstration purposes (Mock Auth).
- SMS/USSD components are UI mockups for conceptual demonstration.

## Phases

### Phase 1: Setup & Infrastructure
- Initialize routing and layout structures.
- Set up a mock data service (Local Storage) for Users, Markets, Crops, and Prices.
- Add necessary dependencies: `lucide-react`, `recharts`, `react-router-dom`.

### Phase 2: Shared UI Components
- Develop reusable components: Navigation, Sidebar, Sidebar (Mobile), Card wrappers, and Table components.

### Phase 3: Admin Dashboard Development
- **Users & Markets**: CRUD interfaces for managing system entities.
- **Crop Prices**: Management interface for updating prices.
- **Reports & Analytics**: Weekly/Monthly report generation view and Price trend charts.
- **Audit Logs & Comments**: Dedicated views for system logs and farmer feedback.

### Phase 4: Farmer Dashboard Development
- **Market Price View**: Searchable/filterable list of crops and prices.
- **Market Map/Location**: Visual representation of market locations.
- **Trends & Suggestions**: Personalized trend charts and a suggestion submission form.

### Phase 5: SMS/USSD Simulation & Final Polish
- Add a conceptual "SMS/USSD Preview" component to show how the system extends to those protocols.
- Final UI/UX polish and responsive design checks.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Implementation of the entire system (setup, dashboards, mock data).

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1-5
- **Scope:** Build the complete web application including both dashboards.
- **Files:**
  - `src/App.tsx`: Main router setup.
  - `src/layouts/AdminLayout.tsx` & `src/layouts/FarmerLayout.tsx`: Dashboard shells.
  - `src/pages/admin/*`: Admin views (Users, Markets, Prices, Reports, Logs).
  - `src/pages/farmer/*`: Farmer views (Prices, Trends, Suggestions).
  - `src/services/mockData.ts`: Centralized LocalStorage-based data management.
  - `src/components/*`: Reusable UI elements and charts.
- **Depends on:** none
- **Acceptance criteria:**
  - Navigating between Admin and Farmer dashboards works.
  - Admin can "add" a market or crop, and it appears in the Farmer view (via mock data).
  - Charts (Price Trends) render correctly with sample data.
  - Farmer "Welcome [Name]" message is visible.
  - All buttons (Logout, Home, etc.) have functional routes or feedback (toasts).
  - Professional, clean design using the provided Tailwind/OKLCH theme.

**Do not dispatch:**
- supabase_engineer (Out of scope)
