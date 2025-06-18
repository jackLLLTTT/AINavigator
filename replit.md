# AI Tool Navigation Platform

## Overview

This is a full-stack web application that serves as a navigation platform for AI tools. It's built with a modern tech stack featuring a React frontend, Express backend, and PostgreSQL database. The application allows users to browse, search, and filter various AI tools across different categories like text generation, image processing, code assistance, and more.

## System Architecture

The application follows a clean separation between frontend and backend:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions

### Database Schema
The application uses two main tables:
- **users**: Stores user authentication data (id, username, password)
- **tools**: Stores AI tool information (name, description, URL, category, tags, rating, pricing, logo, online status)

## Key Components

### Data Flow
1. **Frontend Components**: React components fetch data using TanStack Query
2. **API Layer**: Express routes handle HTTP requests and responses
3. **Storage Layer**: Memory storage implementation (with interface for future database integration)
4. **Database Layer**: Drizzle ORM with PostgreSQL for persistent data storage

### Authentication System
- User authentication schema defined with Drizzle
- Password-based authentication (ready for implementation)
- Session management with PostgreSQL backing

### Search and Filtering
- Category-based filtering (text, image, code, audio, video, business, research)
- Full-text search across tool names, descriptions, and tags
- Sorting options (newest, popular, name, rating)
- Grid and list view modes

## External Dependencies

### Core Dependencies
- **Database**: Neon serverless PostgreSQL
- **UI Components**: Radix UI primitives for accessibility
- **Icons**: React Icons and Lucide React
- **Date Handling**: date-fns for date manipulation
- **CSS**: PostCSS with Autoprefixer

### Development Tools
- **TypeScript**: Full type safety across the stack
- **ESBuild**: Fast bundling for production builds
- **Drizzle Kit**: Database migration and schema management

## Deployment Strategy

### Development Environment
- Replit configuration with Node.js 20, web, and PostgreSQL 16 modules
- Vite dev server on port 5000 with HMR
- Automatic database provisioning through environment variables

### Production Build
- Vite builds the frontend to `dist/public`
- ESBuild bundles the backend to `dist/index.js`
- Deployment target set to "autoscale" for automatic scaling

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Drizzle configuration points to PostgreSQL dialect
- Migration files stored in `./migrations` directory

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 18, 2025. Initial setup