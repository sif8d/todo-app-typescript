# todo-app-typescript

[![build status](https://img.shields.io/badge/build-passing-brightgreen)]() [![license](https://img.shields.io/badge/license-MIT-blue)]() [![typescript](https://img.shields.io/badge/TypeScript-%3E%3D4.0-3178c6)]()

A minimal Vite + React + TypeScript starter template with HMR and ESLint configuration — a lightweight starting point for a Todo app or single-page React projects.

Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [ESLint and Type-checked linting](#eslint-and-type-checked-linting)
- [React Compiler (optional)](#react-compiler-optional)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

Demo
- Add a live demo link or screenshots here. For local screenshots, include `/docs` or `/assets` and reference images.

Features
- Fast dev server with Vite and HMR
- TypeScript + React + ESLint
- Suggested configuration for type-aware linting
- Minimal opinionated starter suitable for small apps

Tech Stack
- React
- TypeScript
- Vite
- ESLint (config provided)
- Optional: React Compiler (link below)

Prerequisites
- Node.js (LTS recommended)
- npm, yarn, or pnpm

Quick Start (npm)
1. Install dependencies
   `npm install`

2. Run development server
   `npm run dev`

3. Build for production
   `npm run build`

4. Preview production build locally
   `npm run preview`

(If you use yarn or pnpm, replace `npm run` with `yarn` or `pnpm` equivalents.)

Available Scripts
- `npm run dev` — Start dev server (Vite)
- `npm run build` — Build production bundle
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint
- `npm run type-check` — Run TypeScript type checks (if configured)
- `npm run format` — Run Prettier (if configured)
(Adjust script names to match your package.json.)

ESLint and type-checked linting
This template includes a basic ESLint setup. For production apps, enable type-aware lint rules to catch more issues at lint time.

Example ESLint config to enable type-checked rules:
```js
// eslint.config.js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      tseslint.configs.recommendedTypeChecked,
      // Optionally use for stricter rules
      // tseslint.configs.strictTypeChecked,
      // Optionally stylistic rules
      // tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
