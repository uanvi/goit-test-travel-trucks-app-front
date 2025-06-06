# 🚐 TravelTrucks App

A modern, responsive frontend application for browsing and booking campers, built with **React**, **TypeScript**, and **Redux Toolkit**. Features advanced filtering, favorites management, and a comprehensive booking system.

## 🚀 Live Demo

[View Live Demo](https://goit-test-travel-trucks-app-front.vercel.app/)

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
├── api/                          # API layer
├── assets/                      # Static assets
│   └── icons/                   # SVG icons
├── components/                  # Reusable components
│   ├── camper/                 # Camper-specific components
│   ├── common/                 # Common UI components
│   ├── forms/                  # Form components
│   └── layout/                 # Layout components
├── config/                     # Configuration files
├── pages/                     # Page components
├── redux/                     # State management
├── styles/                    # Global styles
└── utils/                     # Utility functions

public/
├── icons/                    # Public icon assets
└── images/                   # Public image assets
```

### State Management

- **Redux Toolkit** for global state
- **RTK Query** patterns for async data fetching
- **Optimistic Updates** for favorites
- **Error Boundary** integration

---

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

## Getting Started

**Prerequisites**: Node.js 16+ and npm/yarn

```bash
# Clone and install
git clone <repository-url>
cd travel-trucks
npm install

# Start development server
npm run dev
```
