# SproutHub - Plant Care Tracker

A modern, full-stack Progressive Web App (PWA) for plant care and collection management built with cutting-edge technologies and best practices.

## 🌱 Project Overview
SproutHub is a comprehensive plant care tracker that helps you manage your indoor garden, track plant care schedules, browse a rich plant catalog, and build your personal collection. Designed for plant lovers who want a beautiful, responsive, and intelligent plant management experience that works seamlessly across all devices.

## ✨ Key Features

### 🏠 Core Functionality
- **Plant Catalog:** Browse and search a curated library of plants with detailed care guides
- **My Plants Collection:** Track your personal plant collection with custom rooms and organization
- **Smart Care Tracking:** Log watering, fertilizing, and other care activities with timestamp tracking
- **Intelligent Reminders:** Never forget to care for your plants with smart notification system
- **Room Management:** Organize plants by rooms (Living Room, Bedroom, Kitchen, etc.)
- **Plant Health Monitoring:** Track and visualize plant health over time

### 📱 Modern User Experience
- **Progressive Web App (PWA):** Install and use like a native app on any device
- **Offline Support:** Access your plant data even without internet connection
- **Responsive Design:** Mobile-first design that works perfectly on all screen sizes
- **Dark/Light Theme:** System-aware theme switching with user preference persistence
- **Touch-Friendly Interface:** Optimized for mobile interactions and gestures

### 🔐 Authentication & Data
- **Secure Authentication:** Email/password and social login with Supabase Auth
- **Real-time Data Sync:** Live updates across all your devices
- **Image Upload:** Store and manage plant photos with cloud storage
- **Data Export:** Export your plant collection and care history

### 🛠️ Developer Experience
- **Type Safety:** Full TypeScript implementation with strict type checking
- **Modern Testing:** E2E testing with Playwright for reliable quality assurance
- **Component Library:** Consistent UI with shadcn/ui and Radix UI primitives
- **Code Quality:** ESLint, Prettier, and automated formatting
- **Performance Optimized:** Code splitting, lazy loading, and optimized bundles

## 🚀 Tech Stack

### Frontend
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool and dev server
- **[React 18](https://react.dev/)** - Modern React with hooks and concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and enhanced developer experience
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality, accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[React Router v6](https://reactrouter.com/)** - Client-side routing
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with validation
- **[Zod](https://zod.dev/)** - Schema validation and type inference

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service with PostgreSQL
- **[Supabase Auth](https://supabase.com/auth)** - Authentication and user management
- **[Supabase Storage](https://supabase.com/storage)** - File storage for plant images
- **[Supabase Edge Functions](https://supabase.com/edge-functions)** - Serverless functions

### State Management & Data Fetching
- **[TanStack Query](https://tanstack.com/query/)** - Powerful data synchronization
- **React Context** - Global state management for UI state
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management (where needed)

### PWA & Performance
- **[Vite PWA](https://vite-pwa-org.netlify.app/)** - Progressive Web App capabilities
- **[Workbox](https://developers.google.com/web/tools/workbox)** - Service worker and caching strategies
- **Code Splitting** - Optimized bundle sizes and lazy loading
- **Image Optimization** - WebP format and responsive images

### Testing & Quality
- **[Playwright](https://playwright.dev/)** - End-to-end testing across browsers
- **[ESLint](https://eslint.org/)** - Code linting and quality enforcement
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting rules

### Development Tools
- **[React DevTools](https://react.dev/learn/react-developer-tools)** - Component debugging
- **[Vite DevTools](https://github.com/webfansplz/vite-plugin-vue-devtools)** - Build and bundle analysis
- **Hot Module Replacement** - Instant development feedback

## 📦 Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm**, **yarn**, or **bun** package manager
- **Git** for version control

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/sprouthub-bloom-tracker.git
cd sprouthub-bloom-tracker

# Install dependencies
npm install
# or
yarn install
# or
bun install
```

### Environment Setup
1. Copy the environment variables:
```bash
cp .env.example .env.local
```

2. Configure your Supabase project:
   - Create a new project at [supabase.com](https://supabase.com)
   - Add your Supabase URL and anon key to `.env.local`
   - Run the database migrations (see Database Setup below)

### Running the Development Server
```bash
npm run dev
# or
yarn dev
# or
bun run dev
```

Visit [http://localhost:8080](http://localhost:8080) to view the app.

### Database Setup
The project uses Supabase with the following key tables:
- `profiles` - User profile information
- `plants` - Plant catalog data
- `user_plants` - User's plant collection
- `plant_care_logs` - Care activity tracking
- `plant_images` - Image storage metadata

Database migrations are located in the `supabase/migrations/` directory.

## 🧪 Testing

### End-to-End Testing
```bash
# Run Playwright tests
npm run test:e2e
# or
yarn test:e2e
# or
bun run test:e2e

# Run tests in headed mode (with browser UI)
npx playwright test --headed

# Run specific test file
npx playwright test tests/homepage.spec.ts
```

### Test Coverage
- **Authentication flows** - Login, signup, logout
- **Plant management** - Adding, editing, deleting plants
- **Care tracking** - Logging care activities
- **Responsive design** - Mobile and desktop layouts

## 🎨 Code Style & Quality

### Linting and Formatting
```bash
# Check for lint errors
npm run lint
# or
yarn lint
# or
bun run lint

# Auto-fix linting issues
npm run lint:fix
```

### Code Style Guidelines
- **Functional Components** - Using React hooks and functional patterns
- **TypeScript First** - Strict type checking and type safety
- **Mobile-First** - Responsive design starting from mobile
- **Accessibility** - WCAG 2.1 AA compliance with semantic HTML
- **Performance** - Optimized rendering and minimal re-renders

## 🏗️ Project Structure
```
src/
├── components/          # Reusable UI and feature components
│   ├── auth/           # Authentication components
│   ├── catalog/        # Plant catalog components
│   ├── edit-plant/     # Plant editing forms
│   ├── mobile/         # Mobile-specific components
│   ├── plant-details/  # Plant detail views
│   ├── profile/        # User profile components
│   ├── pwa/           # PWA-specific components
│   └── ui/            # Base UI components (shadcn/ui)
├── contexts/           # React context providers
├── data/              # Static data and mock data
│   └── plants/        # Plant catalog data
├── hooks/             # Custom React hooks
├── integrations/      # External service integrations
│   └── supabase/      # Supabase client and types
├── lib/               # Utility functions and helpers
├── pages/             # Top-level route components
├── types/             # TypeScript type definitions
└── utils/             # Utility functions

public/
├── icons/             # PWA app icons
└── ...               # Static assets

supabase/
├── functions/         # Edge functions
└── migrations/        # Database migrations

tests/                 # End-to-end tests
├── auth.spec.ts      # Authentication tests
└── homepage.spec.ts  # Homepage tests
```

## 🌍 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
# or
bun run build
```

### Deployment Options
The app can be deployed to any static hosting provider:

- **Vercel** (Recommended) - Automatic deployments with GitHub integration
- **Netlify** - Static site hosting with form handling
- **Supabase Hosting** - Integrated with your Supabase backend
- **AWS S3 + CloudFront** - Scalable static hosting
- **Your own infrastructure** - Deploy the `dist/` directory contents

### PWA Deployment Considerations
- Ensure HTTPS is enabled for PWA features
- Configure proper caching headers
- Test installation and offline functionality
- Set up push notification service (if applicable)

## 🔧 Configuration

### PWA Manifest
The app includes a comprehensive PWA manifest with:
- App icons for all device sizes (72px to 512px)
- Splash screens and maskable icons
- Standalone display mode
- Portrait orientation lock
- Theme and background colors

### Service Worker
Configured with Workbox for:
- **Asset Caching** - Static resources and images
- **API Caching** - Supabase API responses with smart invalidation
- **Offline Fallbacks** - Graceful offline experience
- **Background Sync** - Queue actions when offline

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Process
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow code style** guidelines and run linting
4. **Add tests** for new functionality
5. **Commit changes** with descriptive messages
6. **Push to branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request** with detailed description

### Commit Convention
We use conventional commits for automated versioning:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/modifications
- `chore:` Maintenance tasks

### Code Review Process
- All PRs require review before merging
- Tests must pass and coverage maintained
- Follow TypeScript and React best practices
- Ensure responsive design works on all devices

## 📄 License
MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Supabase](https://supabase.com/) for the powerful backend platform
- [Lucide](https://lucide.dev/) for the icon system
- Plant care community for inspiration and feedback

---

*Happy growing with SproutHub!* 🌿✨

> Built with ❤️ for plant lovers everywhere
