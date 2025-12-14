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

Optional: VS Code
- Install from https://code.visualstudio.com/
- Windows (winget): `winget install --id Microsoft.VisualStudioCode`
- macOS (Homebrew): `brew install --cask visual-studio-code`

Notes & security
----------------
- This project currently uses Angular CLI 20.3.13. Keep committed files in src/environments/*.ts unless they contain secrets; use .env or local override files (and add them to .gitignore) for secrets.
- Do not commit keys, certs, credentials, or environment files with secrets.
- If you must upgrade Angular/CLI, follow the Angular upgrade guide and run `ng update`. Verify compatibility with your project's Angular version before upgrading the global CLI.

Version recommendations
-----------------------
- Project CLI: Angular CLI 20.3.13
- Recommended Node.js: LTS (use >=18; 20+ recommended)
- Angular CLI: install the same major CLI version as the project (e.g. 20.x) or use the project-local CLI (`npx ng` / `npm explore @angular/cli -- npm run ng`) to avoid version mismatches

Further help
------------
Use `ng help` or visit the Angular CLI docs for more commands.
