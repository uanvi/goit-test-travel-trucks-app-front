# 🚐 TravelTrucks App

A modern, responsive frontend application for browsing and booking campers, built with **React**, **TypeScript**, and **Redux Toolkit**. Features advanced filtering, favorites management, and a comprehensive booking system.

## 🚀 Live Demo

[View Live Demo](https://vercel.com)

---

## 📦 Tech Stack

### Core Technologies

- **React 18** with **TypeScript** - Modern React with strict typing
- **Redux Toolkit** - Predictable state management
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors

### Styling & UI

- **CSS Custom Properties** - Design system with CSS variables
- **BEM Methodology** - Scalable CSS architecture
- **Responsive Design** - Mobile-first approach
- **CSS Grid & Flexbox** - Modern layout techniques

### Development & Build

- **Vite** - Fast build tool and dev server
- **ESLint + Prettier** - Code quality and formatting
- **TypeScript** - Static type checking

---

## ✨ Features

- **Homepage** with hero banner and call-to-action button leading to catalog
- **Camper catalog page** with:
- Filtering by location, vehicle type, and equipment
- Add/remove favorites (saved in `localStorage`)
- "Load More" button for incremental loading
- **Camper details page** with:
- Image gallery
- Detailed specs and description
- User reviews with 5-star rating system
- Booking form with validation
- **Responsive design** for mobile, tablet, and desktop
- **Error handling** with user-friendly messages
- **Loading states** and smooth animations

---

### Component Structure

```
src/
├── 📁 api/                    # API layer
│   └── campersApi.ts          # Axios services
├── 📁 components/             # Reusable UI components
│   ├── BookingForm/           # Booking form with validation
│   ├── CamperCard/            # Catalog item component
│   ├── FilterSidebar/         # Advanced filtering
│   ├── Header/                # Navigation header
│   ├── Icon/                  # SVG icon system
│   └── MainButton/            # Primary CTA button
├── 📁 config/                 # Configuration files
│   ├── apiConfig.ts           # API endpoints & settings
│   ├── featuresConfig.ts      # Feature definitions
│   └── textsConfig.ts         # Centralized text content
├── 📁 pages/                  # Route components
│   ├── HomePage/              # Landing page
│   ├── CatalogPage/           # Camper listing
│   └── CamperDetailsPage/     # Individual camper
├── 📁 redux/                  # State management
│   ├── campers/               # Catalog state & actions
│   ├── camperDetails/         # Detail page state
│   └── store.ts               # Redux store configuration
├── 📁 styles/                 # Global styles
│   └── design-system.css      # CSS custom properties
└── 📁 utils/                  # Helper functions
    └── featuresUtils.ts       # Feature mapping logic
```

### State Management

- **Redux Toolkit** for global state
- **RTK Query** patterns for async data fetching
- **Optimistic Updates** for favorites
- **Error Boundary** integration

---

## 📱 Responsive Design (Draft)

### Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🔄 API Integration

### Endpoints Used

```typescript
GET /campers              # Paginated camper list
GET /campers/:id          # Individual camper details
```

---

## 📌 TODO

- Add unit tests (Jest + React Testing Library)
- Split FilterSidebar into smaller components
- Improve error handling with global error boundary
- Add skeleton loading states
- Enhance image gallery with lightbox functionality
- Improve reviews component for better UX
- Finalize Icons module implementation
- Improve form validation and UX

## 📈 Future Enhancements

### High Priority

- [ ] **Unit & Integration Tests** - Jest + React Testing Library
- [ ] **Advanced Image Gallery** - Lightbox with zoom

### Medium Priority

- [ ] **Reviews System** - User-generated reviews
- [ ] **Map Integration** - Camper locations on map

### Low Priority

- [ ] **Internationalization** - Multi-language support
