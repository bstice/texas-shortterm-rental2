# Technical Decisions: Guidebook Website

## Decision Status

### ✅ Already Specified in spec.md

1. **Checklist (FR6.1)**: ✅ **Interactive with checkboxes** + printable version
   - Spec already includes: "Interactive checklist with checkboxes (optional, can be cleared)"
   - Also includes printable version with optimized print stylesheet

2. **Copy-to-clipboard (FR8.1)**: ✅ **Yes, included**
   - Spec already includes: "Copy-to-clipboard functionality for Wi-Fi password and smart lock code"

3. **Responsive Breakpoints (DR4.6)**: ✅ **Specified**
   - Mobile: 320px - 767px
   - Tablet: 768px - 1023px
   - Desktop: 1024px+

---

## Recommendations for Remaining Decisions

### 1. Content Format

**Recommendation**: **JSON files** (with Markdown support for rich text)

**Rationale**:
- ✅ Simple and version-controlled (easy to track changes in Git)
- ✅ No database needed (fits static site approach)
- ✅ Easy to edit with any text editor
- ✅ Can be validated with TypeScript types
- ✅ Fast to load (no API calls)
- ✅ Works perfectly with Vercel static deployment
- ✅ Can support Markdown for rich text content (descriptions, instructions)

**Alternative Considered**: Markdown files
- Good for content-heavy pages, but JSON is better for structured data (restaurants, rules, etc.)
- Can use Markdown strings within JSON for rich text fields

**Implementation**:
- Store content in `src/data/` or `public/data/` directory
- Use TypeScript interfaces for type safety
- Support Markdown in description fields for rich formatting

---

### 2. Build Tool: Vite vs Next.js

**Recommendation**: **Vite with React Router**

**Rationale**:
- ✅ Faster development experience (instant HMR)
- ✅ Simpler setup and configuration
- ✅ Perfect for static content sites (no server-side rendering needed)
- ✅ Smaller bundle size (no Next.js overhead)
- ✅ Easier to understand for this project scope
- ✅ Works great with Vercel (static export)
- ✅ React Router is mature and well-documented

**Next.js Alternative** (if SEO becomes critical):
- Better for SEO out of the box (server-side rendering)
- Built-in routing
- Image optimization built-in
- But adds complexity for a mostly static site

**Decision**: Start with **Vite** - can migrate to Next.js later if needed, but Vite is simpler and faster for this use case.

---

### 3. Analytics/Tracking

**Recommendation**: **Optional - Add Vercel Analytics (free tier)**

**Rationale**:
- Vercel Analytics is free and privacy-focused
- Provides basic page views and performance metrics
- No additional setup needed (integrated with Vercel)
- Can be added later without code changes (via Vercel dashboard)

**Implementation**:
- Add `@vercel/analytics` package
- Minimal code changes (just import and add component)
- Can be disabled if not needed

**Decision**: **Include Vercel Analytics** - it's free, privacy-focused, and provides useful insights without complexity.

---

## Summary of Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Checklist | Interactive + Printable | Already in spec |
| Copy-to-clipboard | Yes | Already in spec |
| Breakpoints | 320/768/1024px | Already in spec |
| Content Format | **JSON (with Markdown support)** | Simple, version-controlled, type-safe |
| Build Tool | **Vite + React Router** | Faster dev, simpler, perfect for static site |
| Analytics | **Vercel Analytics (optional)** | Free, privacy-focused, easy to add |
| Icons | **Lucide icons exclusively** | Professional, consistent, no emojis |

---

## Next Steps

1. Update spec.md with these decisions
2. Create implementation plan (plan.md) with these technical choices
3. Set up project structure based on these decisions

---

## Notes

- All decisions align with constitution standards
- Decisions prioritize simplicity and maintainability
- Can be adjusted during implementation if needed
- Vite can be migrated to Next.js later if SEO requirements change

