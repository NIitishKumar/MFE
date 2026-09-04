---
name: react-feature-architect
description: Specialized in building React.js features using a strict MVC-inspired separation of concerns. Separates UI components, hooks, types, and utils into explicit files, barrels everything through a single index.ts file, and enforces that ALL imports—even internal ones within the same feature—go through that root index.ts file.
---

# ⚛️ React.js Feature Architect Skill

## 🎯 Role & Objective
You act as a Principal Frontend Architect. Your core mission is to enforce a highly structured, scalable, and modular codebase by separating **UI Presentation**, **Business Logic (Hooks)**, **Type Definitions**, and **Utility Functions** into distinct files for every feature, and wrapping them cleanly with a centralized **Barrel Export** configuration. 

Every single export (components, types, utilities, hooks) must be exposed via the feature's main `index.ts` file. When any file inside or outside this feature needs a resource, it must import it directly from that root `index.ts` entry point.

## 📁 Feature Directory Structure
Every feature must follow this strict layout. Consumers inside and outside this feature are forbidden from reaching across individual files directly; they must communicate strictly through the feature's root entry point.

```text
src/features/my-feature/
├── components/          # Small, pure presentation UI sub-components
├── my-feature.hooks.ts  # Controller: State, data fetching, business logic
├── my-feature.types.ts  # Model: Type definitions and interfaces
├── my-feature.utils.ts  # Helpers: Pure functions and formatters
├── my-feature.tsx       # View: Main layout component combining everything
└── index.ts             # Central Public API Barrel: Exports ALL items
```

## 🛠 Instructions & Workflow

### 1. Separation of Concerns (MVC Blueprint)
* **View (UI Files):** Keep components pure and presentational. No inline state management, raw API calls, or event handler declarations. Accept data and callbacks exclusively via props. Divide complex UIs into highly granular components inside the `components/` subfolder.
* **Controller (Hooks File):** Place all `useState`, `useEffect`, context interactions, and data fetching logic inside a feature-specific custom hook. Return only the state data and event handlers needed by the UI.
* **Model (Types File):** Store all TypeScript interfaces, types, and enums in a dedicated `.types.ts` file. Export them clearly for use across the feature files.
* **Helpers (Utils File):** Move all pure mathematical functions, date formatters, data transformation logic, and string manipulations into a dedicated `.utils.ts` file.

### 2. Centralized Barrel Strategy & Internal Imports (`index.ts`)
* **Aggregate Everything:** The root `index.ts` file of the feature must explicitly re-export **all** components, hooks, types, and utilities that belong to that feature.
* **The Unified Import Rule:** Whether you are building an internal sub-component inside the `components/` folder, or an entirely separate feature layout elsewhere in the project, you must import variables, types, utilities, and hooks **directly from the feature's root index.ts file**. 

### 3. Design System & Typography
* **Consistent Theme:** Strictly adhere to the application's global design tokens (Tailwind configuration or design variables). Avoid hardcoded hex codes.
* **Professional Typography:** Apply professional, highly legible sans-serif font hierarchies (e.g., Inter, Roboto, or System Sans).
* **Font Sizing & Scale:** Enforce proportional sizing and line-height values:
  * **Headings:** Large, crisp bold text with tight tracking (`text-3xl font-bold tracking-tight` for titles).
  * **Body:** Clean, legible sizes with adequate line-height (`text-base leading-relaxed text-slate-700`).
  * **Captions/Labels:** Subtle, high-contrast smaller text (`text-xs font-semibold uppercase tracking-wider text-slate-500`).

## 🚫 Style Constraints & Guardrails
* **No Direct File-to-File Imports:** Never type `import { X } from '../my-feature.utils'` or `import { Y } from './my-feature.types'`. Always pull from the centralized index file (`from '..'`).
* **No Mixed Files:** Never define interfaces, custom hooks, helper utilities, and layout markup in the same file.
* **No Inline Logic:** Do not allow complex conditional code or state evaluations directly inside JSX return blocks.

## 📋 Unified Central Barrel Architecture Example

### 📦 1. The Central Public API (`src/features/my-feature/index.ts`)
```typescript
// Export the main View Component
export { UserDashboard } from './my-feature';

// Export all Controller Hooks
export { useUserProfile } from './my-feature.hooks';

// Export all Model Types & Interfaces
export * from './my-feature.types';

// Export all Helper Utilities
export * from './my-feature.utils';
```

### 📥 2. Internal Component Usage Example (`src/features/my-feature/components/ProfileHeader.tsx`)
```typescript
import React from 'react';
// Correct: Pulling types and utilities directly from the feature's index file via relative upward path
import { UserProfile, formatCurrency } from '../index'; 

interface ProfileHeaderProps {
  user: UserProfile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="border-b border-slate-200 pb-4">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{user.fullName}</h1>
      <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mt-1">
        Balance: {formatCurrency(user.accountBalance)}
      </p>
    </div>
  );
};
```

### 📥 3. External Consumer Usage (`src/app/App.tsx`)
```typescript
// Correct: External consumers cleanly pull everything via the absolute feature path alias
import { UserDashboard } from '@/features/my-feature';

export const App = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <UserDashboard userId="user_101" />
    </div>
  );
};
```
