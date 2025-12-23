# Implementation Plan: Guidebook Website

## Overview

This plan outlines the technical implementation approach for building the guidebook website for 9926 Ledgestone Ter, Austin, TX 78737. The plan follows the specification requirements and aligns with the project constitution.

**Property**: Hill Country retreat on 8.4 acres, 20 minutes from downtown Austin

---

## Technology Stack

### Core Framework
- **React**: 19+ with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Icons**: Lucide React (`lucide-react`) - no emojis

### Styling
- **Approach**: CSS Modules (recommended for simplicity and performance)
  - Alternative: Tailwind CSS (if preferred for rapid development)
  - Avoid: styled-components (adds runtime overhead)

### Content Processing
- **Markdown Parser**: `react-markdown` (React-friendly, supports plugins)
- **SEO**: `react-helmet-async` (for meta tags and Open Graph)

### Development Tools
- **TypeScript**: Full type safety
- **ESLint**: Code linting with React rules
- **Prettier**: Code formatting
- **Vite**: Fast HMR and build

### Testing
- **Jest**: Unit testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing (optional for MVP)

### Deployment
- **Platform**: Vercel
- **Analytics**: Vercel Analytics (optional)

---

## Project Structure

Following feature-based organization from constitution:

```
guidebook-app/
├── public/
│   ├── images/              # Optimized images
│   │   ├── hero/
│   │   ├── property/
│   │   └── local-guide/
│   └── favicon.ico
│
├── src/
│   ├── data/                # JSON content files
│   │   ├── before-you-arrive.json
│   │   ├── during-your-stay.json
│   │   ├── local-guide.json
│   │   ├── checkout.json
│   │   └── property.json
│   │
│   ├── features/            # Feature-based organization
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   └── QuickLinks.tsx
│   │   │   ├── HomePage.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── before-you-arrive/
│   │   │   ├── components/
│   │   │   │   ├── AddressParking.tsx
│   │   │   │   ├── CheckInInstructions.tsx
│   │   │   │   └── SmartLockCode.tsx
│   │   │   ├── pages/
│   │   │   │   ├── AddressParkingPage.tsx
│   │   │   │   ├── CheckInPage.tsx
│   │   │   │   └── SmartLockPage.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── during-your-stay/
│   │   │   ├── components/
│   │   │   │   ├── WiFiTech.tsx
│   │   │   │   ├── HouseRules.tsx
│   │   │   │   ├── PropertyFeatures.tsx
│   │   │   │   └── HowToGuides/
│   │   │   ├── pages/
│   │   │   └── hooks/
│   │   │       └── useCopyToClipboard.ts
│   │   │
│   │   ├── local-guide/
│   │   │   ├── components/
│   │   │   └── pages/
│   │   │
│   │   └── checkout/
│   │       ├── components/
│   │       │   ├── Checklist.tsx
│   │       │   └── DepartureNotes.tsx
│   │       └── pages/
│   │
│   ├── shared/               # Shared resources
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Breadcrumbs.tsx
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── ExpandableSection.tsx
│   │   │   │   ├── BackToTop.tsx
│   │   │   │   └── LoadingSpinner.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── usePrint.ts
│   │   │   └── useSmoothScroll.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── markdown.ts      # Markdown parser wrapper
│   │   │   ├── content.ts       # Content loading utilities
│   │   │   └── constants.ts     # Navigation paths, breakpoints, property info
│   │   │
│   │   ├── types/
│   │   │   ├── content.ts       # Content type definitions
│   │   │   └── navigation.ts
│   │   │
│   │   └── styles/
│   │       ├── variables.css    # CSS custom properties
│   │       ├── reset.css
│   │       └── globals.css
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .eslintrc.json
├── .prettierrc
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json              # Vercel configuration
```

---

## Component Architecture

### Layout Components

#### Header
- Logo/branding
- Main navigation menu
- Mobile hamburger menu
- Responsive behavior

#### Navigation
- Hierarchical menu structure
- Expandable/collapsible sub-sections
- Active state indicators
- Mobile-friendly touch targets

#### Footer
- Site navigation links
- Contact information
- Copyright information

#### Breadcrumbs
- Show current location in navigation hierarchy
- Clickable navigation path

### UI Components

#### Button
- Variants: primary, secondary, text link
- Sizes: small, medium, large
- States: default, hover, active, disabled
- Accessible (keyboard navigation, ARIA)

#### Card
- Container for content sections
- Consistent spacing and styling
- Optional header/footer

#### ExpandableSection
- Collapsible content sections
- Smooth animations
- Accessible (ARIA expanded)

#### BackToTop
- Appears on scroll
- Smooth scroll to top
- Fixed position

#### LoadingSpinner
- Skeleton screens for content (matching content layout)
- Loading indicators for async operations
- Route transition loading states
- Implement using CSS animations for smooth experience

#### ErrorBoundary
- React Error Boundary wrapper
- Fallback UI for errors
- Error logging

### Feature Components

Each feature section will have:
- Page components (route-level)
- Presentational components (UI)
- Custom hooks (logic)
- Type definitions

---

## Content Data Model

### JSON Structure

Content stored in `src/data/` with TypeScript interfaces:

```typescript
// src/shared/types/content.ts

interface PropertyInfo {
  address: string;
  city: string;
  state: string;
  zip: string;
  size: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    acres: number;
  };
  location: {
    distanceToDowntown: string;
    minutes: number;
  };
}

interface WiFiInfo {
  ssid: string;
  password: string;
  instructions: string; // Markdown supported
  troubleshooting: string[]; // Markdown supported
}

interface SmartLockInfo {
  code: string;
  instructions: string; // Markdown supported
  troubleshooting: string[];
}

interface HouseRules {
  rules: string[];
  quietHours: string;
  guestCapacity: number;
  petPolicy?: string;
  smokingPolicy: string;
  outdoorGuidelines: string[];
}

interface HowToGuide {
  id: string;
  title: string;
  category: 'ac' | 'pool' | 'hottub' | 'tv' | 'appliances' | 'limo';
  steps: Array<{
    title: string;
    description: string; // Markdown supported
    image?: string;
  }>;
  safety?: string[]; // Markdown supported
  troubleshooting?: string[];
}

interface LocalRecommendation {
  name: string;
  type: 'restaurant' | 'coffee' | 'grocery' | 'activity' | 'attraction';
  description: string; // Markdown supported
  distance?: string;
  priceRange?: string;
  address?: string;
  phone?: string;
  website?: string; // Required where available per FR5.1-FR5.5 and CR2.4
  social?: {
    facebook?: string; // Facebook page URL
    instagram?: string; // Instagram profile URL
    twitter?: string; // Twitter/X profile URL
    yelp?: string; // Yelp business page URL
    tripadvisor?: string; // TripAdvisor page URL
  };
}

interface ChecklistItem {
  id: string;
  category: 'clean' | 'return' | 'trash' | 'other';
  text: string;
}

interface ContentData {
  property: PropertyInfo;
  beforeYouArrive: {
    addressParking: {
      address: string;
      parking: string[]; // Markdown supported
      map?: string;
      directions: string; // Markdown supported
    };
    checkIn: {
      steps: string[]; // Markdown supported
      keyCollection?: string;
      arrivalExpectations: string; // Markdown supported
    };
    smartLock: SmartLockInfo;
  };
  duringYourStay: {
    wifi: WiFiInfo;
    houseRules: HouseRules;
    propertyFeatures: {
      indoor: {
        content: string; // Markdown supported
        highlights?: string[];
      };
      outdoor: {
        content: string; // Markdown supported
        highlights?: string[];
      };
      pool?: {
        content: string; // Markdown supported
        location?: string;
        features?: string[];
      };
      limo?: {
        content: string; // Markdown supported
        access?: string;
        guidelines?: string[];
      };
    };
    whatsIncluded: {
      furniture: string[];
      kitchen: string[];
      linens: string[];
      entertainment: string[];
      outdoor: string[];
      limo?: string;
      guestsNeedToBring: string[];
    };
    sunsets: {
      locations: string[];
      bestTimes: string;
      tips: string; // Markdown supported
      photography?: string; // Markdown supported
    };
    howToGuides: HowToGuide[];
  };
  localGuide: {
    restaurants: LocalRecommendation[];
    coffee: LocalRecommendation[];
    groceries: LocalRecommendation[];
    outdoorActivities: {
      hiking: LocalRecommendation[];
      hillCountry: LocalRecommendation[];
      parks: LocalRecommendation[];
    };
    austinAttractions: {
      downtown: LocalRecommendation[];
      localSpots: LocalRecommendation[];
    };
    transportation: {
      driving: string; // Markdown supported
      rideSharing: string; // Markdown supported
      parking: string; // Markdown supported
      carRental?: string; // Markdown supported
    };
  };
  checkout: {
    checklist: ChecklistItem[];
    departureNotes: {
      checkoutTime: string;
      keyLockInstructions: string; // Markdown supported
      reminders: string[]; // Markdown supported
      contactInfo: {
        phone?: string;
        email?: string;
        emergency?: string;
      };
    };
  };
}
```

### Content File Organization

- `property.json` - Property information
- `before-you-arrive.json` - Check-in content
- `during-your-stay.json` - Stay information
- `local-guide.json` - Local recommendations
- `checkout.json` - Checkout information

### Markdown Support

Use `react-markdown` for rich text fields:
- Descriptions
- Instructions
- Long-form content
- Supports plugins for enhanced features (tables, code blocks, etc.)

**Package**: `react-markdown` with optional `remark-gfm` for GitHub Flavored Markdown

### LocalRecommendation Component

The `LocalRecommendation` component should display all available information for each recommendation:

- **Name**: Prominent heading
- **Type**: Visual indicator (restaurant, coffee, grocery, activity, attraction)
- **Description**: Markdown-supported description
- **Distance**: From property (78737 area)
- **Price Range**: For restaurants/coffee (if applicable)
- **Address**: Physical location
- **Phone**: Contact number (if available)
- **Website**: **External link with icon** (required where available per FR5.1-FR5.5 and CR2.4)
  - Should open in new tab (`target="_blank"`)
  - Should include `rel="noopener noreferrer"` for security
  - Use Lucide icon (e.g., `ExternalLink`) to indicate external link
  - Display as clickable link, not just URL text
- **Social Media Links**: **Clickable icons** (where available per FR5.1-FR5.4 and CR2.5)
  - Support Facebook, Instagram, Twitter/X, Yelp, TripAdvisor
  - Display as icon buttons with hover effects
  - Use Lucide icons for each platform (or appropriate social media icons)
  - Should open in new tab with security attributes
  - Group icons together visually (e.g., in a row or grid)
  - Only show icons for platforms that have URLs provided

**Implementation Notes**:
- Website links should be prominently displayed and easily accessible
- Social media icons should be visually grouped and clearly associated with the recommendation
- If website/social links are not available, omit them (don't show broken/placeholder links)
- All links should be validated and kept up-to-date (CR2.4, CR2.5)

---

## Routing Structure

### Route Configuration

```typescript
// Routes matching navigation structure

/                                    → Home
/before-you-arrive                   → Before You Arrive (index/overview)
/before-you-arrive/address-parking    → Address & Parking
/before-you-arrive/check-in          → Check-in Instructions
/before-you-arrive/smart-lock        → Smart Lock Code

/during-your-stay                    → During Your Stay (index/overview)
/during-your-stay/wifi-tech          → Wi-Fi & Tech
/during-your-stay/house-rules        → House Rules
/during-your-stay/property-features  → Property Features (index)
/during-your-stay/property-features/indoor-spaces → Indoor Spaces
/during-your-stay/property-features/outdoor-spaces → Outdoor Spaces
/during-your-stay/property-features/whats-included → What's Included
/during-your-stay/property-features/sunsets → Hill Country Sunsets
/during-your-stay/how-to-guides      → How-to Guides (index)
/during-your-stay/how-to-guides/ac-heating → A/C & Heating
/during-your-stay/how-to-guides/pool → Pool
/during-your-stay/how-to-guides/hot-tub → Hot Tub (conditional)
/during-your-stay/how-to-guides/tv-streaming → TV & Streaming
/during-your-stay/how-to-guides/appliances → Appliances
/during-your-stay/how-to-guides/limo → Limo

/local-guide                         → Local Guide (index/overview)
/local-guide/restaurants-coffee      → Restaurants & Coffee
/local-guide/groceries               → Groceries
/local-guide/outdoor-activities      → Outdoor Activities (index)
/local-guide/outdoor-activities/hiking-trails → Hiking & Trails
/local-guide/outdoor-activities/hill-country → Hill Country Attractions
/local-guide/outdoor-activities/parks-nature → Parks & Nature
/local-guide/austin-attractions      → Austin Attractions (index)
/local-guide/austin-attractions/downtown → Downtown Austin
/local-guide/austin-attractions/local-spots → Local Spots
/local-guide/transportation          → Transportation

/checkout                            → Checkout (index/overview)
/checkout/checklist                  → Checklist
/checkout/departure-notes            → Departure Notes

/*                                   → 404 Page
```

### Route Implementation

- Use React Router v6 with `createBrowserRouter`
- Lazy load route components for code splitting
- Implement route-level error boundaries
- Add loading states for route transitions

---

## Styling Approach

### Decision: CSS Modules

**Rationale**:
- ✅ Zero runtime overhead
- ✅ Scoped styles (no conflicts)
- ✅ TypeScript support
- ✅ Simple and maintainable
- ✅ Works well with Vite
- ✅ Easy to migrate to Tailwind later if needed

### CSS Architecture

```
src/shared/styles/
├── variables.css        # CSS custom properties (colors, spacing, typography)
├── reset.css            # CSS reset
└── globals.css          # Global styles

src/features/*/components/
└── ComponentName.module.css  # Component-specific styles
```

### Design Tokens (CSS Variables)

```css
:root {
  /* Colors - Nature/outdoor inspired */
  --color-primary: #2d5016;      /* Deep green */
  --color-secondary: #6b8e23;    /* Olive green */
  --color-accent: #8b4513;      /* Earth brown */
  --color-text: #2c3e50;        /* Dark blue-gray */
  --color-text-light: #7f8c8d;   /* Light gray */
  --color-background: #ffffff;
  --color-surface: #f8f9fa;
  
  /* Typography */
  --font-family-base: system-ui, -apple-system, sans-serif;
  --font-family-heading: Georgia, serif;
  
  /* Spacing (rem-based) */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  
  /* Breakpoints (for media queries) */
  --breakpoint-mobile: 320px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
}
```

---

## Implementation Phases

### Phase 1: Foundation & Setup (Week 1)
**Goal**: Project setup and core infrastructure

- [ ] Initialize Vite + React + TypeScript project
- [ ] Configure ESLint, Prettier, TypeScript
- [ ] Set up project folder structure
- [ ] Install dependencies:
  - [ ] React Router, Lucide React
  - [ ] react-markdown, remark-gfm
  - [ ] react-helmet-async
  - [ ] Testing libraries (Jest, React Testing Library)
- [ ] Create base layout components (Header, Footer, Navigation)
- [ ] Set up routing structure
- [ ] Configure CSS Modules and design tokens
- [ ] Create content type definitions
- [ ] Set up error boundaries
- [ ] Create 404 page

**Deliverable**: Working navigation and layout skeleton

### Phase 2: Core Features (Week 2)
**Goal**: Implement main content sections

- [ ] Home page with hero section
- [ ] Before You Arrive section (all pages)
- [ ] During Your Stay section (Wi-Fi, House Rules, Property Features)
- [ ] Content loading utilities
- [ ] Markdown rendering
- [ ] Basic styling and responsive design

**Deliverable**: Core content pages functional

### Phase 3: Interactive Features (Week 3)
**Goal**: Add interactivity and enhanced features

- [ ] How-to Guides pages
- [ ] Copy-to-clipboard functionality
- [ ] Expandable sections
- [ ] Interactive checklist
- [ ] Print stylesheet for checklist
- [ ] Back-to-top button
- [ ] Smooth scrolling

**Deliverable**: All interactive features working

### Phase 4: Local Guide & Polish (Week 4)
**Goal**: Complete content and polish

- [ ] Local Guide section (all pages)
- [ ] Checkout section
- [ ] Image optimization and lazy loading
- [ ] SEO meta tags (react-helmet-async)
- [ ] Open Graph tags
- [ ] Structured data (JSON-LD)
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] Testing (unit and component tests)
- [ ] Final styling polish

**Deliverable**: Complete, polished website

### Phase 5: Deployment (Week 5)
**Goal**: Deploy to production

- [ ] Vercel deployment setup
- [ ] Environment configuration
- [ ] Analytics integration (optional)
- [ ] Final testing on production
- [ ] Documentation

**Deliverable**: Live website on Vercel

---

## Key Implementation Details

### Copy-to-Clipboard

```typescript
// src/shared/hooks/useCopyToClipboard.ts
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return { copy, copied };
}
```

### Interactive Checklist

- Use `localStorage` to persist checklist state
- Checkbox state management
- Print stylesheet hides interactive elements
- Clear/reset functionality

### Image Handling

**Strategy**: Manual optimization with Vite asset handling

- Use WebP format with fallbacks (JPEG/PNG)
- Implement `srcset` for responsive images manually
- Lazy loading using native `loading="lazy"` attribute
- Placeholder images during development (Unsplash API or placeholder services)
- Optimize images before committing (ImageOptim, Squoosh, etc.)
- Store optimized images in `public/images/` directory

**Alternative**: Consider `vite-imagetools` plugin for automatic optimization (optional)

### Error Handling

**Error Boundaries**:
- Route-level error boundaries using React Error Boundary
- Component-level boundaries for critical sections
- Fallback UI with helpful messages and navigation
- Error logging to console in development

**Implementation**:
```typescript
// src/shared/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  // Implementation details...
}
```

**Content Error Handling**:
- Graceful fallbacks for missing content
- Default messages when content unavailable
- User-friendly error messages

### Performance Optimization

- Code splitting with `React.lazy()` and `Suspense`
- Route-based code splitting
- Image optimization
- Bundle size monitoring
- Performance metrics tracking

---

## Testing Strategy

### Unit Tests
- Utility functions
- Custom hooks
- Content loading functions

### Component Tests
- UI components (Button, Card, etc.)
- Layout components
- Feature components

### Integration Tests
- Navigation flow
- Content rendering
- Interactive features

### E2E Tests (Optional)
- Critical user flows
- Cross-browser testing

---

## Deployment Configuration

### Vercel Setup

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Environment Variables

- No sensitive data needed (static site)
- Analytics can be configured via Vercel dashboard

---

## Dependencies

### Production Dependencies

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^6.26.0",
  "lucide-react": "^0.400.0",
  "react-markdown": "^9.0.0",
  "remark-gfm": "^4.0.0",
  "react-helmet-async": "^2.0.0"
}
```

### Development Dependencies

```json
{
  "@types/react": "^19.0.0",
  "@types/react-dom": "^19.0.0",
  "@vitejs/plugin-react": "^4.3.0",
  "@typescript-eslint/eslint-plugin": "^7.0.0",
  "@typescript-eslint/parser": "^7.0.0",
  "typescript": "^5.5.0",
  "vite": "^5.4.0",
  "eslint": "^8.57.0",
  "eslint-plugin-react": "^7.34.0",
  "eslint-plugin-react-hooks": "^4.6.0",
  "prettier": "^3.3.0",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.1.0",
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0"
}
```

---

## Vite Configuration

### Key Configuration Points

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@features': path.resolve(__dirname, './src/features'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'markdown': ['react-markdown', 'remark-gfm'],
        },
      },
    },
  },
});
```

### CSS Modules Configuration

CSS Modules work out of the box with Vite. Files ending in `.module.css` are automatically processed.

---

## Content Loading Strategy

### Approach: Static Imports

- JSON files imported directly: `import content from '@/data/property.json'`
- Vite handles JSON imports natively
- TypeScript provides type checking
- No runtime fetch needed (faster, simpler)

### Content Validation

- TypeScript interfaces ensure type safety at compile time
- Runtime validation optional (can add with `zod` if needed)
- Error boundaries handle missing content gracefully

### Example

```typescript
// src/shared/utils/content.ts
import propertyData from '@/data/property.json';
import beforeYouArriveData from '@/data/before-you-arrive.json';
// ... other imports

export const content = {
  property: propertyData as PropertyInfo,
  beforeYouArrive: beforeYouArriveData,
  // ... other content
};
```

---

## Success Metrics

- ✅ All navigation items functional
- ✅ Performance targets met (FCP < 1.8s, LCP < 2.5s, TTI < 3.8s)
- ✅ WCAG 2.1 Level AA compliance
- ✅ Mobile-responsive across all breakpoints
- ✅ All interactive features working
- ✅ Content easily updatable via JSON files

---

## Notes

- Start with CSS Modules, can migrate to Tailwind if preferred
- Content structure allows for easy updates without code changes
- Architecture supports future feature additions
- Can add CMS integration later if needed
- Hot tub guide can be conditionally rendered based on content

---

## Next Steps

1. ✅ **Plan Complete** - Ready for task breakdown
2. ⏭️ **Generate Tasks (tasks.md)** - Break down into actionable tasks
3. ⏭️ **Begin Implementation** - Start with Phase 1

