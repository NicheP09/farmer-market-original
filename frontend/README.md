# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

HOW TO GET STARTED:


then change directory to your folder you just cloned by writting: 


# 🚀 Contributing Guide – Community Internship Project

Welcome!  
This guide explains how to contribute to our project, whether you’re working on **frontend** or **backend**.  
Even if this is your first time using GitHub, you can follow along easily.

---

## 1️⃣ Clone the Repository

1. On our GitHub repo page, click the green **"Code"** button.
2. Copy the HTTPS link (example: `https://github.com/Elydeboss/Farmer-market.git`).
3. Open your terminal/command prompt and run:

```bash
first open your terminal and write git clone https://github.com/Elydeboss/Farmer-market.git
cd cd Farmer-market
````

---

## 2️⃣ Create or Switch to Your Branch

**DO NOT** work directly on the `main` branch!!!

Branch naming rules:

* **Frontend**: `yourname` (example: `john`)


To create a new branch:

```bash
git checkout -b yourname
```

If your branch already exists:

```bash
git checkout branch yourname
```

---

## 3️⃣ Keep Your Branch Updated

Before you start working **every time**:

```bash
git pull origin main
git merge main
```

This ensures you’re working with the latest code.

---

## 4️⃣ Make Your Changes

1. Open the project in VS Code:

   ```bash
   code .
   ```

2. Add or edit files for your assigned task.

3. Save your changes.

---

## 5️⃣ Commit Your Changes

```bash
git add .
git commit -m "Brief description of your changes"
```

Example:

```bash
git commit -m "Added login page UI"
```

---

## 6️⃣ Push to GitHub

```bash
git push origin yourname-[fe or be]
```

---

## 7️⃣ Create a Pull Request (PR)

1. Go to the GitHub repository in your browser.
2. Click **"Compare & pull request"**.
3. Make sure:

   * **Base branch**: `main`
   * **Compare branch**: your branch (e.g., `john-fe`)
4. Describe your changes.
5. Click **"Create Pull Request"**.

---

## 8️⃣ Review Process

* **Frontend Lead** reviews frontend PRs.
* They may:

  * Approve and merge your code into `main`.
  * Request changes for you to fix.

---

## ✅ Rules

* **Never** push directly to `main`.
* Always pull latest changes before starting work.
* Use clear, short commit messages.
* Test your code before pushing.
* Ask if you’re unsure — we’re here to help.

---

## 🔄 Example Workflow (Frontend)

```bash
git clone https://github.com/Elydeboss/Farmer-market.git
cd certificate-verification-system
git checkout main
git pull origin main
git checkout -b ade-fe
git merge main
code .
# make changes in VS Code
git add .
git commit -m "Added dashboard UI"
git push origin ade-fe
# create PR to main on GitHub
```

---
