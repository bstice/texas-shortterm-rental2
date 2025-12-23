# Project Constitution

## Project Overview

**Project Name**: Texas Short-Term Rental

**Purpose**: Build a digital guidebook website for short-term rental guests, providing essential information about the property, local area, and stay experience. The website will help guests navigate their stay from arrival to checkout with clear, organized information.

## Core Principles

### 1. Development Philosophy
- **Spec-Driven Development**: All features start with detailed specifications before implementation
- **Intent-First**: Define what to build before how to build it
- **Iterative Refinement**: Specifications and plans evolve through clarification and feedback

### 2. Technical Standards

#### React Framework Standards
- **React Version**: Use React 19+ with modern features and patterns
- **Component Architecture**: 
  - Prefer functional components with hooks over class components
  - Use React Server Components where applicable for better performance
  - Implement component composition over inheritance
  - Keep components small, focused, and single-responsibility
- **Hooks Best Practices**:
  - Use custom hooks to extract reusable logic
  - Follow Rules of Hooks (only call hooks at the top level)
  - Use `useMemo` and `useCallback` judiciously (prefer React Compiler for automatic optimization)
  - Leverage React Compiler 1.0+ for automatic memoization when available
- **State Management**:
  - Use local state (`useState`) for component-specific state
  - Use Context API for shared state that doesn't require complex updates
  - Consider state management libraries (Zustand, Jotai) for complex global state
  - Avoid prop drilling beyond 2-3 levels

#### TypeScript Integration
- **Type Safety**: Use TypeScript for all new code
- **Type Definitions**: 
  - Define proper types/interfaces for all props, state, and data structures
  - Avoid `any` type; use `unknown` when type is truly unknown
  - Leverage TypeScript's improved type inference
- **Type-Safe Hooks**: Use typed hooks and ensure proper return types

#### Code Style & Quality
- **Code Formatting**: 
  - Use Prettier for consistent code formatting
  - Use ESLint with React-specific rules (eslint-plugin-react, eslint-plugin-react-hooks)
  - Enforce consistent naming conventions (PascalCase for components, camelCase for functions/variables)
- **File Organization**:
  - One component per file
  - Co-locate related files (component, styles, tests, types) when appropriate
  - Use index files for clean imports
- **Code Conventions**:
  - Use descriptive, meaningful variable and function names
  - Extract magic numbers and strings into constants
  - Keep functions pure when possible
  - Use early returns to reduce nesting

#### Performance Standards
- **Rendering Optimization**:
  - Leverage React Compiler for automatic memoization
  - Use `React.memo` for expensive components when compiler isn't available
  - Implement code splitting with `React.lazy()` and `Suspense`
  - Optimize images and assets for web delivery
- **Bundle Size**: 
  - Keep initial bundle size under 200KB (gzipped)
  - Use dynamic imports for route-based code splitting
  - Tree-shake unused code
- **Performance Targets**:
  - First Contentful Paint (FCP) < 1.8s
  - Largest Contentful Paint (LCP) < 2.5s
  - Time to Interactive (TTI) < 3.8s

#### Testing Requirements
- **Testing Stack**:
  - Jest for unit testing and test runner
  - React Testing Library for component testing
  - Playwright or Cypress for end-to-end testing
- **Testing Standards**:
  - Write tests for all business logic and user interactions
  - Test user behavior, not implementation details
  - Maintain minimum 80% code coverage for critical paths
  - Write tests before fixing bugs (test-driven bug fixing)
- **Component Testing**:
  - Test components in isolation
  - Use accessible queries (getByRole, getByLabelText)
  - Mock external dependencies and API calls

#### Accessibility (a11y)
- **WCAG Compliance**: Follow WCAG 2.1 Level AA guidelines
- **Semantic HTML**: Use semantic HTML elements appropriately
- **ARIA**: Use ARIA roles and labels when semantic HTML isn't sufficient
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Screen Readers**: Test with screen readers and ensure proper announcements
- **Focus Management**: Implement visible focus indicators and logical tab order

#### Styling Standards
- **CSS Approach**: 
  - Use CSS Modules, styled-components, or Tailwind CSS for scoped styles
  - Avoid inline styles for complex styling
  - Use CSS custom properties (variables) for theming
- **Responsive Design**:
  - Mobile-first approach
  - Test on multiple device sizes
  - Use relative units (rem, em, %) over fixed pixels where appropriate

#### Assets & Media Standards
- **Image Strategy**:
  - Use high-quality, beautiful photos throughout the application
  - Optimize all images for web (WebP format preferred, with fallbacks)
  - Implement responsive images with `srcset` for different screen sizes
  - Use lazy loading for images below the fold
  - Maintain aspect ratios to prevent layout shift
- **Development Placeholders**:
  - Use placeholder images/services during development:
    - Unsplash API or similar for beautiful placeholder photos
    - Placeholder.com or placeholder image generators
    - Maintain same aspect ratios as final images
  - Create a consistent placeholder system that matches final image dimensions
  - Document placeholder-to-final-image mapping for easy replacement
- **Image Organization**:
  - Organize images in dedicated `assets/images/` or `public/images/` directory
  - Use descriptive, semantic file names
  - Group images by section/feature (e.g., `hero/`, `local-guide/`, `property/`)
- **Image Performance**:
  - Compress images before committing (use tools like ImageOptim, Squoosh)
  - Target file sizes: < 200KB for hero images, < 100KB for content images
  - Use modern formats (WebP, AVIF) with fallbacks (JPEG, PNG)
  - Consider using Next.js Image component or similar optimized image components

#### Build & Development Tools
- **Build Tool**: Use Vite or Next.js for modern build tooling
- **Package Management**: Use npm, yarn, or pnpm consistently
- **Development Environment**:
  - Hot Module Replacement (HMR) for fast development
  - Source maps for debugging
  - Environment variables for configuration
- **Code Quality Tools**:
  - Pre-commit hooks (Husky) for linting and formatting
  - Automated dependency updates (Dependabot, Renovate)

#### Deployment Standards
- **Hosting Platform**: Vercel (primary choice for free hosting)
  - Free tier includes: Automatic HTTPS, global CDN, preview deployments
  - Zero-config deployment for React applications
  - Automatic deployments from Git (GitHub, GitLab, Bitbucket)
  - Environment variables management
  - Analytics and performance monitoring
- **Deployment Workflow**:
  - Automatic deployments on push to main/master branch
  - Preview deployments for all pull requests
  - Branch-based deployments for feature testing
- **Domain & SSL**:
  - Use Vercel's free SSL certificates
  - Custom domain support (if needed in future)
  - Automatic HTTPS redirects
- **Build Configuration**:
  - Optimize production builds (minification, tree-shaking)
  - Set proper build output directory
  - Configure environment-specific variables
- **Alternative Options** (if needed):
  - Netlify (similar free tier with good React support)
  - GitHub Pages (for static sites)
  - Cloudflare Pages (free tier with good performance)

#### Documentation Standards
- **Component Documentation**: 
  - Document component props with JSDoc or TypeScript types
  - Include usage examples for complex components
  - Document component behavior and edge cases
- **Code Comments**: 
  - Comment "why" not "what"
  - Keep comments up-to-date with code changes
  - Remove commented-out code before committing

### 3. Quality Guidelines
- [Add your quality guidelines here, e.g., code review process, documentation standards, etc.]

## Technology Stack

- **Frontend Framework**: React 19+ with TypeScript
- **Build Tool**: Vite or Next.js (to be determined based on requirements)
- **Styling**: CSS Modules, styled-components, or Tailwind CSS
- **Design Inspiration**: WordPress theme "Outdoor Adventure" (https://websitedemos.net/outdoor-adventure-02/)
- **Testing**: Jest, React Testing Library, Playwright/Cypress
- **Code Quality**: ESLint, Prettier, TypeScript
- **Deployment**: Vercel (free tier)
- **Content Management**: Static content with potential for dynamic updates

## Architecture Principles

### 1. Component-Based Architecture
- **Modular Design**: Build the application using reusable, self-contained components
- **Single Responsibility**: Each component should have one clear purpose and responsibility
- **Composition Over Inheritance**: Favor component composition to build complex UIs from simple components
- **Component Hierarchy**: Organize components in a clear parent-child hierarchy that reflects the UI structure

### 2. Declarative Programming
- **State-Driven UI**: Describe what the UI should look like for a given state, not how to achieve it
- **Predictable Rendering**: Let React handle the rendering logic based on state changes
- **Immutable Updates**: Treat state as immutable, creating new objects/arrays rather than mutating existing ones

### 3. Unidirectional Data Flow
- **Props Down, Events Up**: Data flows down from parent to child via props; events flow up via callbacks
- **Single Source of Truth**: Maintain state at the appropriate level (local, context, or global store)
- **Controlled Components**: Use controlled components for form inputs and user interactions
- **Predictable State Updates**: State changes should be explicit and traceable

### 4. Separation of Concerns
- **UI Components**: Focus on presentation and user interaction
- **Business Logic**: Extract logic into custom hooks, utilities, or services
- **Data Layer**: Separate data fetching and state management from UI components
- **Styling**: Keep styles co-located with components or in dedicated style modules

### 5. Feature-Based Organization
- **Feature Modules**: Organize code by features/sections rather than by file type
  ```
  src/
    features/
      before-you-arrive/
        components/
        hooks/
        types/
        utils/
      during-your-stay/
      local-guide/
      checkout/
    shared/
      components/
      hooks/
      utils/
      types/
  ```
- **Shared Resources**: Place reusable components, hooks, and utilities in a `shared/` directory
- **Co-location**: Keep related files (component, styles, tests, types) close together

### 6. Custom Hooks Pattern
- **Logic Extraction**: Extract reusable logic into custom hooks
- **Hook Naming**: Use `use` prefix for all custom hooks
- **Single Purpose**: Each hook should handle one specific concern
- **Composability**: Build complex hooks by composing simpler ones

### 7. TypeScript-First Architecture
- **Type Safety**: Leverage TypeScript for compile-time error detection
- **Interface-Driven**: Define interfaces/types before implementation
- **Type Inference**: Use TypeScript's inference where appropriate, explicit types where needed
- **Generic Components**: Use generics for reusable, type-safe components

### 8. Performance-First Design
- **Code Splitting**: Implement route-based and component-based code splitting
- **Lazy Loading**: Load components and assets on-demand
- **Memoization**: Use React Compiler or manual memoization for expensive computations
- **Optimistic Updates**: Provide immediate feedback while async operations complete

### 9. Progressive Enhancement
- **Core Functionality First**: Ensure core features work without JavaScript
- **Enhanced Experience**: Add interactive features as enhancements
- **Graceful Degradation**: Handle missing features or API failures gracefully
- **Accessibility Baseline**: Ensure accessibility regardless of JavaScript state

### 10. Server-Side Considerations (if using Next.js)
- **Server Components**: Use React Server Components for static content when applicable
- **Static Generation**: Prefer static generation for content that doesn't change frequently
- **Incremental Static Regeneration**: Use ISR for content that updates periodically
- **API Routes**: Use API routes or serverless functions for dynamic server-side logic

### 11. Vercel-Optimized Architecture
- **Static-First**: Design for static site generation where possible
- **Edge Functions**: Consider edge functions for lightweight serverless logic
- **CDN Optimization**: Structure assets to leverage Vercel's global CDN
- **Environment Configuration**: Use environment variables for configuration, not hardcoded values

### 12. Testing Architecture
- **Testable Design**: Write components and functions that are easy to test
- **Isolation**: Components should be testable in isolation
- **Mock Boundaries**: Define clear boundaries for mocking external dependencies
- **Test Organization**: Mirror source structure in test directories

### 13. Scalability Principles
- **Horizontal Scalability**: Design for easy addition of new features/sections
- **Maintainability**: Write code that future developers can understand and modify
- **Documentation**: Document architectural decisions and patterns
- **Refactoring-Friendly**: Structure code to allow safe refactoring

### 14. Error Handling & Resilience
- **Error Boundaries**: Implement React Error Boundaries for graceful error handling
- **Fallback UI**: Provide meaningful fallback UI for error states
- **User Feedback**: Communicate errors and loading states clearly to users
- **Logging**: Implement appropriate logging for debugging and monitoring

## Development Workflow

1. **Constitution First**: All development follows these principles
2. **Specify**: Create detailed feature specifications
3. **Plan**: Develop technical implementation plans
4. **Task Breakdown**: Generate actionable task lists
5. **Implement**: Execute with clear requirements

## Communication & Collaboration

[Define how team members communicate and collaborate]

---

*This constitution should be updated as the project evolves and new principles emerge.*

