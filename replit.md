# Art Connect - Social Art Platform

## Overview
Art Connect is a social platform for artists to share their artwork and get feedback from the community. The application combines a modern React frontend with a traditional web game element, allowing users to view art galleries, upload their own creations, and play a pixel-style platformer game called "My Journey." The platform features user profiles, art feeds, and community interaction through likes and comments.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with React 18 using TypeScript and follows a component-based architecture:
- **Framework**: React with Vite as the build tool for fast development and hot module replacement
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **UI Components**: Custom component library built with Radix UI primitives and styled with Tailwind CSS
- **Styling**: Tailwind CSS with custom CSS variables for theming, featuring a pixel art aesthetic with "Press Start 2P" font
- **Design System**: Shadcn/ui components providing consistent, accessible UI elements

### Backend Architecture  
The backend uses a minimal Express.js server setup:
- **Framework**: Express.js with TypeScript for type safety
- **API Design**: RESTful API structure with routes prefixed under `/api`
- **Data Layer**: In-memory storage implementation with interfaces designed for easy database integration
- **Session Management**: Built-in session handling with middleware for request logging and error handling

### Data Storage Solutions
- **Current Implementation**: In-memory storage using Map data structures for development
- **Database Ready**: Drizzle ORM configured with PostgreSQL schema definitions in `shared/schema.ts`
- **Schema Design**: Zod schemas for runtime validation covering art posts, users, comments, and game statistics
- **Migration Support**: Drizzle Kit configured for database schema migrations

### Authentication and Authorization
- **Current State**: Basic authentication flow implemented in UI components
- **Architecture**: Prepared for session-based authentication with cookie support
- **User Management**: User creation and retrieval interfaces defined in storage layer

### Game Integration
- **Canvas-Based Game**: HTML5 Canvas implementation of a 2D pixel platformer
- **Game State**: Local state management for game statistics (stars, time, lives)
- **Asset Management**: Support for sprite images and background assets
- **Responsive Design**: Game canvas adapts to different screen sizes

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tools**: Vite with TypeScript support, esbuild for production builds

### UI and Styling
- **Component Library**: Complete Radix UI suite for accessible components (dialog, dropdown, tooltip, etc.)
- **Styling**: Tailwind CSS with PostCSS, custom pixel art theme
- **Icons**: Font Awesome for consistent iconography
- **Fonts**: Google Fonts integration for "Press Start 2P" pixel font

### Data and Validation
- **ORM**: Drizzle ORM with Neon Database serverless PostgreSQL adapter
- **Validation**: Zod for schema validation and TypeScript integration
- **Forms**: React Hook Form with Hookform Resolvers for form handling

### Development Tools
- **TypeScript**: Full TypeScript support across client and server
- **Linting**: ESLint configuration ready for code quality
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Utilities**: Date-fns for date manipulation, clsx for conditional styling

### Game Development
- **Canvas Rendering**: HTML5 Canvas API for 2D game graphics
- **Asset Loading**: Image loading system for sprites and backgrounds
- **Game Logic**: Custom JavaScript game engine for platformer mechanics

### Deployment Ready
- **Production Build**: Optimized bundling with Vite and esbuild
- **Environment Configuration**: Environment variable support for database and API configuration
- **Static Assets**: Proper handling of game assets and images