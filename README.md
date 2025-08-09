# ⚡ Pokédex Browser

A modern, responsive Pokémon browser built with React + TypeScript, featuring a feature-based architecture, code splitting, and comprehensive error handling. Explore Pokémon with two distinct viewing experiences and detailed individual pages.

---

## 🌐 Live Demo

**🚀 [Experience the app live →](https://pokemon-browser-umber.vercel.app/pokemon)**

Try out all the features:

- 📄 **[Paginated View](https://pokemon-browser-umber.vercel.app/pokemon)** - Browse with traditional pagination controls
- 📜 **[Load More View](https://pokemon-browser-umber.vercel.app/pokemon/scroll)** - Infinite scroll experience
- 🔍 **[Pokémon Details](https://pokemon-browser-umber.vercel.app/pokemon/25)** - Rich detail pages (try Pikachu!)

---

## 🎯 Features

- **Dual List Views**: Browse Pokémon with pagination controls or load-more functionality
- **Rich Details Pages**: Comprehensive Pokémon information with stats, abilities, and artwork
- **Responsive Design**: Seamlessly adapts to mobile, tablet, and desktop screens
- **Smart Loading**: Skeleton states, suspense boundaries, and animated loaders
- **Error Resilience**: Global error boundary for graceful failure handling
- **Type Safety**: Full TypeScript coverage across the entire application

## 🚀 Tech Stack

### Core Framework

- **React 19** with **TypeScript** - Modern React with full type safety
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling with custom design system
- **ShadCn/UI** - building my component library with accessible and ready to use components

### Architecture & Routing

- **React Router v6** - File-based routing with lazy loading
- **Feature-Based Architecture** - Domain-driven folder structure
- **Code Splitting** - `React.lazy` + `Suspense` for optimal loading

### Data Management

- **TanStack Query v5** - Powerful data fetching with caching and synchronization
- **Axios** - HTTP client with pre-configured base settings
- **PokeAPI** - RESTful Pokémon data source

### UI Components

- **Custom shadcn/ui-inspired components** - Badge, Progress, Spinner
- **Lucide React** - Beautiful, customizable icons
- **Class Variance Authority (CVA)** - Component variant management

## 📁 Architecture Overview

This project follows a **feature-based architecture** where each domain owns its complete implementation:

```
src/
├── components/
│   ├── ui/                     # Shared design system components
│   │   ├── button.tsx
│   │   ├── pagination.tsx
│   │   ├── skeleton.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   ├── spinner.tsx
│   │   └── loader-screen.tsx
│   └── common/
│       └── error-boundary.tsx   # Global error handling
│
├── features/
│   ├── pokemons-list/          # Pokémon listing feature
│   │   ├── api.ts              # Data fetching logic
│   │   ├── types.ts            # TypeScript definitions
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useGetPokemonList.tsx
│   │   │   └── useInfinitePokemonList.tsx
│   │   ├── components/         # Feature-specific components
│   │   │   ├── pokemon-card.tsx
│   │   │   ├── pokemon-grid.tsx
│   │   │   ├── pokemon-grid-skeleton.tsx
│   │   │   └── numbered-pagination.tsx
│   │   ├── pages/              # Route components
│   │   │   ├── pokemon-pagination-list.tsx
│   │   │   └── pokemon-load-more-list.tsx
│   │   ├── layouts/
│   │   │   └── list-layout.tsx  # Feature layout wrapper
│   │   └── routes.tsx          # Feature routing configuration
│   │
│   └── pokemon-details/        # Pokémon details feature
│       ├── api.ts
│       ├── types.ts
│       ├── hooks/
│       │   └── usePokemonDetails.tsx
│       ├── components/
│       │   └── details-skeleton.tsx
│       ├── pages/
│       │   └── pokemon-details.tsx
│       └── routes.tsx
│
├── layouts/
│   └── root-layout.tsx         # Application-level layout
│
├── lib/                        # Shared utilities
│   ├── axios.ts                # HTTP client configuration
│   ├── query-client-provider.tsx
│   ├── use-media-query.ts      # Responsive design hook
│   └── utils.ts                # General utilities
│
├── routes/
│   ├── index.tsx               # Root router configuration
│   └── not-found.tsx           # 404 page
│
└── App.tsx                     # Application entry point
```

## 🛣️ Routing Strategy

### Route Structure

```
/                           → Redirect to /pokemon
/pokemon                    → Paginated list view
/pokemon/scroll             → Load-more list view
/pokemon/:id                → Individual Pokémon details
/*                          → 404 Not Found
```

### Code Splitting Implementation

- **Lazy Loading**: All route components are loaded on-demand using `React.lazy`
- **Suspense Boundaries**: Custom loading screens during route transitions
- **Error Boundaries**: Graceful error handling at the application level

## 📊 Data Flow Architecture

### API Layer

```typescript
// Centralized axios instance
const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

// Feature-specific API objects
const pokemonsListApi = {
  fetchPokemonPage: (limit, offset) => Promise<PokemonListResponse>,
  extractPokemonIdFromUrl: (url) => number | null,
  buildPokemonSpriteUrl: (id) => string,
};
```

### Custom Hooks Pattern

```typescript
// Pagination approach
const useGetPokemonList = ({ limit, offset }) => {
  return useQuery({
    queryKey: ['pokemon-list', limit, offset],
    queryFn: () => pokemonsListApi.fetchPokemonPage(limit, offset)
  });
};

// Infinite loading approach
const useInfinitePokemonList = ({ pageSize }) => {
  const query = useInfiniteQuery({
    queryKey: ['pokemon-infinite'],
    queryFn: ({ pageParam = 0 }) => pokemonsListApi.fetchPokemonPage(pageSize, pageParam),
    getNextPageParam: (lastPage, pages) => // pagination logic
  });
};
```

## 🎨 Design System

### Component Variants

Built with **Class Variance Authority** for consistent, type-safe component APIs:

```typescript
const buttonVariants = cva("base-styles", {
  variants: {
    variant: { default: "...", outline: "...", destructive: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
});
```

### Responsive Design

- **Mobile-first approach** with Tailwind breakpoints
- **Custom `useMediaQuery` hook** for JavaScript-based responsive logic
- **Flexible grid layouts** that adapt to screen size

## 🔧 Key Features Deep Dive

### 1. Dual List Experiences

- **Pagination Mode**: Traditional page-by-page navigation with numbered controls
- **Load More Mode**: Infinite scroll pattern with manual trigger button

### 2. Rich Pokémon Details

- **Gradient headers** with dynamic backgrounds
- **High-resolution artwork** from official Pokémon sprites
- **Type badges** with color-coded styling
- **Stat visualization** using progress bars
- **Responsive layout** adapting to mobile/desktop

### 3. Performance Optimizations

- **Image optimization** using official artwork URLs
- **Query caching** with TanStack Query
- **Component memoization** where beneficial
- **Bundle splitting** with lazy-loaded routes

### 4. Error Handling

- **Error Boundary** catches and displays JavaScript errors gracefully
- **Query error states** with retry mechanisms
- **Loading states** prevent layout shifts
- **404 handling** for invalid routes

## 🎯 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation & Development

```bash
# Clone and install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser to http://localhost:5173
```

### Build & Deploy

```bash
# Type-check and build for production
pnpm build

# Preview production build locally
pnpm preview

# Run linting
pnpm lint
```

## 🧪 Available Scripts

| Script         | Description                            |
| -------------- | -------------------------------------- |
| `pnpm dev`     | Start Vite development server with HMR |
| `pnpm build`   | TypeScript check + production build    |
| `pnpm preview` | Preview production build locally       |
| `pnpm lint`    | Run ESLint with project configuration  |

## 🏗️ Extending the Application

### Adding a New Feature

1. Create `src/features/new-feature/` directory
2. Implement the feature modules:
   ```
   new-feature/
   ├── api.ts          # Data fetching logic
   ├── types.ts        # TypeScript definitions
   ├── hooks/          # Custom hooks
   ├── components/     # UI components
   ├── pages/          # Route components
   └── routes.tsx      # Route configuration
   ```
3. Register routes in `src/routes/index.tsx`
4. Add navigation links as needed

### Component Development

- Follow shadcn/ui API patterns for consistency
- Use TypeScript for all component props
- Implement responsive design with Tailwind utilities
- Add proper loading and error states

## 📝 Technical Decisions

### Why Feature-Based Architecture?

- **Scalability**: Easy to add new features without affecting existing code
- **Maintainability**: Related code is co-located and easier to understand
- **Team Collaboration**: Different developers can work on different features independently

### Why TanStack Query?

- **Caching**: Intelligent background updates and cache management
- **Developer Experience**: Built-in loading, error, and success states
- **Performance**: Automatic request deduplication and background refetching

### Why Custom Components vs. Library?

- **Bundle Size**: Only include components actually used
- **Customization**: Full control over styling and behavior
- **Learning**: Better understanding of component patterns and accessibility

## 🔮 Future Enhancements

- **Search & Filtering**: Add Pokémon search with type/generation filters
- **Favorites System**: Local storage-based favorite Pokémon tracking
- **Dark Mode**: Theme switching with system preference detection
- **PWA Features**: Offline support and install prompts
- **Testing**: Unit tests with Vitest and component tests with Testing Library

---

**Built with ❤️ using React, TypeScript, Vite, and TanStack Query**
