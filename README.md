# Odin Photo Tagging App

# [Live Demo](https://disco-elysium-cabinet-search.netlify.app/)

## Overview

**Odin Photo Tagging App** is a modern React application built with Vite.  
The project is inspired by _The Odin Project_ curriculum and focuses on building an interactive game where users must **identify and select specific elements inside an image**.

The app uses the **Firestore npm package** to store game sessions, target coordinates, timestamps, and leaderboard data.  
To run the project, you must have a **Firebase project**, a **Firestore database**, and a valid `.env` file containing the variables referenced in `store/config.js`.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Technologies Used](#technologies-used)

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/danielvelkov/odin-photo-tagging.git
   cd odin-photo-tagging
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure Firebase:**

   This project uses the **Firestore npm package** (`firebase/firestore`) and requires a Firebase app configuration.

   Create a `.env` file in the project root and include all variables:

   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   ```

   You must have a Firebase project and Firestore database set up for the app to function.

4. **Run the development server:**

   ```sh
   npm run dev
   ```

## Scripts

- `dev`: Start the Vite development server.
- `build`: Build the project for production.
- `lint`: Run ESLint to lint the project.
- `preview`: Preview the production build.
- `test`: Run tests using Vitest.
- `prepare`: Prepare Husky hooks.

## Dependencies

- **`firebase`**: Firestore database used for storing game sessions, timestamps, and target coordinates.
- **`prop-types`**: Runtime type checking for React props.
- **`react`**: Library for building user interfaces.
- **`react-dom`**: DOM renderer for React.
- **`react-router-dom`**: Declarative routing for React.
- **`styled-components`**: CSS-in-JS styling for components.

## Dev Dependencies

- **`@commitlint/cli`**: Lint commit messages.
- **`@commitlint/config-conventional`**: Conventional commit rules.
- **`@eslint/js`**: ESLint configuration for JS.
- **`@testing-library/jest-dom`**: DOM matchers for Jest.
- **`@testing-library/react`**: React testing utilities.
- **`@testing-library/user-event`**: Simulate user interactions.
- **`@types/react`**: TypeScript definitions for React.
- **`@types/react-dom`**: TypeScript definitions for React DOM.
- **`@vitejs/plugin-react`**: Vite plugin for React.
- **`eslint`**: JavaScript linter.
- **`eslint-plugin-react`**: React linting rules.
- **`eslint-plugin-react-hooks`**: Enforce hook rules.
- **`eslint-plugin-react-refresh`**: React Fast Refresh linting.
- **`globals`**: Global variables for ESLint.
- **`husky`**: Git hooks.
- **`jsdom`**: DOM implementation for testing.
- **`lint-staged`**: Run linters on staged files.
- **`prettier`**: Code formatter.
- **`vite`**: Fast build tool.
- **`vitest`**: Vite-native test runner.

## Technologies Used

- **Vite**: Fast dev server and build tool.
- **React**: UI library.
- **React Router**: Declarative routing.
- **Styled Components**: Component-scoped styling.
- **Firestore (Firebase)**: Cloud database for storing game data.
- **ESLint**: Code quality tool.
- **Prettier**: Code formatter.
- **Husky**: Git hooks.
- **Commitlint**: Enforce commit message conventions.
- **Testing Library**: User-focused testing utilities.
- **Vitest**: Fast test runner.
