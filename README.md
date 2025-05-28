# SproutHub Bloom Tracker

A modern, full-stack plant care and collection tracker built with Vite, React, TypeScript, Tailwind CSS, and shadcn-ui.

## 🌱 Project Overview
SproutHub Bloom Tracker helps you manage your indoor garden, track plant care schedules, browse a rich plant catalog, and build your personal collection. Designed for plant lovers who want a beautiful, responsive, and easy-to-use experience.

## 🚀 Features
- **Plant Catalog:** Browse and search a curated library of plants with care guides.
- **My Plants:** Track your own collection, log watering and care events.
- **Smart Reminders:** Never forget to water or care for your plants.
- **Responsive UI:** Mobile-first, accessible, and visually appealing.
- **Authentication:** Secure sign-in and sign-up flows.
- **Modern UI:** Built with shadcn-ui and Tailwind CSS for a delightful user experience.

## 🛠️ Tech Stack
- [Vite](https://vitejs.dev/) (build tool)
- [React](https://react.dev/) (UI library)
- [TypeScript](https://www.typescriptlang.org/) (type safety)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)
- [shadcn-ui](https://ui.shadcn.com/) (UI components)
- [Supabase](https://supabase.com/) (backend/auth, if configured)

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/) or [yarn](https://yarnpkg.com/)

### Installation
```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd sprouthub-bloom-tracker

# Install dependencies
npm install
# or
yarn install
# or
bun install
```

### Running the Development Server
```sh
npm run dev
# or
yarn dev
# or
bun run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

## 🧪 Testing
- Unit tests: Coming soon (Jest + React Testing Library)
- E2E tests: Coming soon (Playwright or Cypress)

## 🖌️ Code Style & Linting
- ESLint and Prettier are configured for code quality and consistency.
- Run `npm run lint` to check for lint errors.

## 🏗️ Project Structure
```
src/
  components/      # Reusable UI and feature components
  contexts/        # React context providers
  data/            # Static data and mock data
  hooks/           # Custom React hooks
  integrations/    # API and service integrations (e.g., Supabase)
  lib/             # Utility functions and helpers
  pages/           # Top-level route components
  supabase/        # Supabase config and migrations (if used)
public/            # Static assets
```

## 🌍 Deployment
You can deploy this app to any static hosting provider (Vercel, Netlify, etc.) or your own infrastructure.

1. Build the app:
   ```sh
   npm run build
   # or
yarn build
   # or
bun run build
   ```
2. Deploy the contents of the `dist/` directory.

## 🤝 Contributing
Contributions are welcome! Please open issues or pull requests for bug fixes, features, or improvements.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## 📄 License
MIT

---

*Happy growing with SproutHub!* 🌿
