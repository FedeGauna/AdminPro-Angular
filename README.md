# AdminPro

Brief
-----
AdminPro is an Angular frontend app generated with Angular CLI. 
This README covers quick setup, common commands for Windows/macOS/Linux, and recommended version information.

Requirements
------------
- Git
- Node.js (LTS recommended)
- npm (bundled with Node) or yarn
- Angular CLI (global)
- Optional: VS Code for development

Quick setup (commands)
----------------------
Replace <repo-url> with the repository URL.

Clone repository
```bash
git clone <repo-url>
cd AdminPro-Angular
```

Install Node.js
- Windows: install from https://nodejs.org or use nvm-windows.
- macOS: use Homebrew `brew install node` or download from nodejs.org.
- Linux (Debian/Ubuntu example):
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Verify:
```bash
node -v
npm -v
```

Install Angular CLI (global)
```bash
npm install -g @angular/cli
ng version
```

Install project dependencies
```bash
npm install
# or
yarn
```

Run development server
```bash
ng serve --open
# app served at http://localhost:4200
```

Build for production
```bash
ng build --prod
# output in /dist
```

Run tests
```bash
ng test
ng e2e
```

Documentation (Compodoc)
----------------------
Generates API documentation from TypeScript and JSDoc comments.

Purpose:
- Documents components, services, interfaces, classes, and functions
- Provides coverage reports showing documented vs undocumented code
- Generates navigable HTML documentation accessible via browser

JSDoc Requirements:

Compodoc reads JSDoc comments (/** */) from TypeScript code. 

Commands:

Build documentation (outputs to /docs folder):

```bash
npm run docs:build
```

After generating the docs, open `docs/index.html` in the browser to view the documentation.

Serve documentation (check terminal output for URL):

```bash
npm run docs:serve
```

Coverage:

Run `npm run docs:serve` and navigate to the Documentation coverage section in the documentation page.
Code with 100% coverage means all public API members have JSDoc comments.

>Optional: VS Code
- Install from https://code.visualstudio.com/
- Windows (winget): `winget install --id Microsoft.VisualStudioCode`
- macOS (Homebrew): `brew install --cask visual-studio-code`

Notes & security
----------------
- This project currently uses Angular CLI 20.3.20. Keep committed files in src/environments/*.ts unless they contain secrets; use .env or local override files (and add them to .gitignore) for secrets.
- Do not commit keys, certs, credentials, or environment files with secrets.
- If you must upgrade Angular/CLI, follow the Angular upgrade guide and run `ng update`. Verify compatibility with your project's Angular version before upgrading the global CLI.

Version recommendations
-----------------------
- Project CLI: Angular CLI 20.3.20
- Recommended Node.js: LTS (use >=18; 20+ recommended)
- Angular CLI: install the same major CLI version as the project (e.g. 20.x) or use the project-local CLI (`npx ng` / `npm explore @angular/cli -- npm run ng`) to avoid version mismatches

Further help
------------
Use `ng help` or visit the Angular CLI docs for more commands.
