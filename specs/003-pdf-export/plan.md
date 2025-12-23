# Implementation Plan: Downloadable PDF Guidebook

## Overview

This plan outlines the technical implementation approach for adding PDF generation and download functionality to the guidebook website. The PDF will be generated client-side from the same JSON content files used by the website, providing guests with an offline, printable version of the guidebook.

**Property**: 9926 Ledgestone Ter, Austin, TX 78737 - A Hill Country retreat on 8.4 acres

**Integration**: This feature integrates with the existing guidebook website (spec 001) and uses the same content data files.

---

## Technology Stack

### PDF Generation Library
- **Primary Choice**: `@react-pdf/renderer` (recommended for MVP)
  - React-based component approach (fits existing architecture)
  - Declarative API similar to React
  - Good TypeScript support
  - Client-side generation (no backend needed)
  - Supports images, styling, page breaks, headers/footers
  - Active maintenance and community support
- **Alternative**: `jsPDF` + `html2canvas` (if @react-pdf/renderer doesn't meet needs)
  - More flexible but less React-friendly
  - Requires DOM rendering then conversion
- **Future Option**: Server-side with `puppeteer` (if client-side limitations are encountered)
  - More powerful but requires backend
  - Better for complex layouts and image handling

### Markdown Processing
- **Library**: `marked` (NOT `react-markdown` - that's for React DOM, not PDF)
  - Parse markdown to AST using `marked.lexer()` or `marked.parse()`
  - Manually convert AST nodes to @react-pdf/renderer components
  - Handle markdown in strings and arrays
  - Support headings, lists, links, bold, italic
  - Custom renderers for each AST node type (heading → Text with fontSize, link → Link component, etc.)
- **Note**: `react-markdown` is for DOM rendering and cannot be used with @react-pdf/renderer

### Image Handling
- **Approach**: Use image URLs directly (MVP)
  - Handle relative paths (`/images/...`) by converting to absolute URLs
  - Skip gracefully if images are not accessible
  - Include alt text for accessibility
- **Future**: Fetch and embed images (requires CORS handling, image optimization)

### Development Tools
- **TypeScript**: Full type safety for PDF components and content processing
- **CSS Modules**: For download button styling (consistent with existing approach)
- **Testing**: Jest + React Testing Library for PDF generation logic tests

---

## Project Structure

```
guidebook-app/
├── src/
│   ├── features/
│   │   └── pdf-export/              # New PDF export feature
│   │       ├── components/
│   │       │   ├── PdfDownloadButton.tsx
│   │       │   │   └── PdfDownloadButton.module.css
│   │       │   └── PdfGenerationProgress.tsx
│   │       │       └── PdfGenerationProgress.module.css
│   │       ├── hooks/
│   │       │   └── usePdfGeneration.ts    # Hook for PDF generation state
│   │       ├── templates/
│   │       │   ├── PdfDocument.tsx          # Main PDF document component
│   │       │   ├── PdfCover.tsx             # Cover page component
│   │       │   ├── PdfTableOfContents.tsx   # TOC component
│   │       │   ├── PdfPropertyOverview.tsx
│   │       │   ├── PdfBeforeYouArrive.tsx
│   │       │   ├── PdfDuringYourStay.tsx
│   │       │   ├── PdfLocalGuide.tsx
│   │       │   └── PdfCheckout.tsx
│   │       ├── utils/
│   │       │   ├── pdfGenerator.ts          # Main PDF generation logic
│   │       │   ├── markdownToPdf.ts         # Markdown conversion utilities
│   │       │   ├── imageHandler.ts          # Image path resolution
│   │       │   └── contentProcessor.ts      # Content transformation utilities
│   │       └── types/
│   │           └── pdf.ts                   # PDF-specific types
│   │               # PdfComponentProps interfaces
│   │               # FormattedRecommendation type
│   │               # PdfGenerationState type
│   │               # SectionHeading type for TOC
│   │
│   ├── shared/
│   │   └── utils/
│   │       └── content.ts                   # Existing content loader (reuse)
│   │
├── public/
│   └── images/                              # Existing images (reuse)
│
└── package.json                            # Add @react-pdf/renderer dependency
```

---

## Component Architecture

### PdfDownloadButton Component
- **Location**: `src/features/pdf-export/components/PdfDownloadButton.tsx`
- **Purpose**: Download button in navigation/header
- **Props**: None (uses content from shared hooks)
- **Features**:
  - Uses `useContent()` hook to load content (consistent with existing pages)
  - Uses `usePdfGeneration()` hook for generation state
  - Accessible from all pages (in Layout/Navigation)
  - Clear label: "Download PDF Guidebook"
  - Lucide icon (Download, FileText, or BookOpen)
  - Loading state during generation (from hook)
  - Error handling with user-friendly messages
  - Triggers PDF generation and download
  - Mobile-responsive
  - Keyboard accessible with proper ARIA labels

### PdfGenerationProgress Component
- **Location**: `src/features/pdf-export/components/PdfGenerationProgress.tsx`
- **Purpose**: Show progress during PDF generation
- **Props**: `isGenerating: boolean`, `progress?: number`
- **Features**:
  - Loading spinner
  - Progress text ("Generating PDF...")
  - Optional progress percentage if available
  - Non-blocking overlay or inline indicator

### PdfDocument Component
- **Location**: `src/features/pdf-export/templates/PdfDocument.tsx`
- **Purpose**: Main PDF document wrapper using @react-pdf/renderer
- **Props**: `content: ContentData`
- **Features**:
  - Uses `Document` from @react-pdf/renderer
  - Sets up page size (US Letter, A4) via `size` prop
  - Configures fonts:
    - Uses default fonts for MVP (Helvetica, Times-Roman, Courier)
    - Or registers custom fonts using `Font.register()` if needed
  - Contains all PDF sections with page breaks between major sections
  - Handles page numbering and headers/footers:
    - Uses `<Page render={({ pageNumber }) => <Header />}>` pattern
    - Or fixed position Views with `fixed` prop
    - Footer includes page numbers
  - Defines global styles using StyleSheet.create()

### PdfCover Component
- **Location**: `src/features/pdf-export/templates/PdfCover.tsx`
- **Purpose**: PDF cover page
- **Props**: `property: PropertyInfo`
- **Features**:
  - Property address
  - Property details (bedrooms, bathrooms, square feet, acres)
  - Generation date
  - Professional layout

### PdfTableOfContents Component
- **Location**: `src/features/pdf-export/templates/PdfTableOfContents.tsx`
- **Purpose**: Table of contents with section references
- **Props**: `sections: Array<{title: string, page?: number}>`
- **Features**:
  - Lists all major sections
  - Page numbers (calculated after layout)
  - MVP Approach: Approximate page numbers based on content length
    - Estimate pages: ~1 page per major section + content length estimates
    - Not exact but functional for MVP
  - Future: Two-pass rendering (calculate exact page numbers, then render with numbers)

### Section Components
Each major section gets its own component:
- **PdfPropertyOverview**: Property address, location, size
- **PdfBeforeYouArrive**: Address, parking, directions, check-in, smart lock
- **PdfDuringYourStay**: Wi-Fi, house rules, property features, how-to guides, sunsets
- **PdfLocalGuide**: Restaurants, coffee, groceries, activities, attractions, transportation
- **PdfCheckout**: Checklist, departure notes, contact info

All section components:
- Accept relevant content data as props
- Use reusable markdown rendering utilities
- Format content appropriately for PDF
- Handle optional fields gracefully
- Use `<View break>` between major sections for page breaks
- Use consistent styling from shared StyleSheet

### usePdfGeneration Hook
- **Location**: `src/features/pdf-export/hooks/usePdfGeneration.ts`
- **Purpose**: Manage PDF generation state and logic
- **Returns**:
  - `isGenerating: boolean` - Generation in progress
  - `error: Error | null` - Generation error if any
  - `generatePdf: () => Promise<void>` - Function to trigger generation
  - `progress?: number` - Optional progress percentage
- **Features**:
  - Manages async PDF generation state
  - Handles errors gracefully
  - Provides loading state for UI
  - Follows same pattern as `useContent` and `useChatbot` hooks

---

## Utility Functions

### pdfGenerator.ts
- **Purpose**: Main PDF generation orchestration
- **Functions**:
  - `generatePdf(content: ContentData): Promise<Blob>`
    - Uses `renderToBlob` from `@react-pdf/renderer` to render PDF
    - Dynamically imports @react-pdf/renderer for code splitting
    - Creates PdfDocument component with content
    - Renders to Blob: `const blob = await renderToBlob(<PdfDocument content={content} />)`
    - Handles errors gracefully
    - Returns Blob for download
  - `downloadPdf(blob: Blob, filename: string): void`
    - Creates download link: `const url = URL.createObjectURL(blob)`
    - Triggers browser download using `<a>` element with `download` attribute
    - Uses descriptive filename: "Guidebook-9926-Ledgestone-Ter.pdf"
    - Cleans up object URL after download

### markdownToPdf.ts
- **Purpose**: Convert markdown to PDF-compatible components
- **Functions**:
  - `parseMarkdown(text: string): Tokens[]`
    - Uses `marked.lexer()` to parse markdown to tokens
    - Returns token array for processing
  - `renderMarkdownToPdf(tokens: Tokens[]): ReactPDFElement[]`
    - Converts markdown tokens to @react-pdf/renderer components:
      - Headings → `<Text style={headingStyle}>` with appropriate fontSize
      - Bold → `<Text style={{ fontWeight: 'bold' }}>`
      - Italic → `<Text style={{ fontStyle: 'italic' }}>`
      - Links → `<Link src={url}>` for external links (opens in browser)
        - Internal guidebook links: Display as text with URL (PDFs don't support internal navigation well)
        - Format: `[text](url)` → `<Text>text (url)</Text>`
      - Lists → `<View>` with `<Text>` items for each list item
      - Paragraphs → `<Text>` with line breaks
    - Handles markdown in arrays (troubleshooting, safety, reminders)
    - Returns array of @react-pdf/renderer components
  - `renderMarkdownString(text: string): ReactPDFElement`
    - Convenience function for single markdown strings
    - Parses and renders in one call

### imageHandler.ts
- **Purpose**: Handle image paths and URLs
- **Functions**:
  - `resolveImagePath(path: string): string`
    - Converts relative paths (`/images/...`) to absolute URLs
    - Uses `window.location.origin` for current domain
    - Handles different deployment scenarios (dev, production, Vercel)
    - Returns absolute URL for @react-pdf/renderer `<Image src={url}>` component
  - `isImageAccessible(url: string): Promise<boolean>`
    - Checks if image can be loaded (optional, for error handling)
    - Uses fetch with HEAD request to check accessibility
    - Handles CORS errors gracefully
  - `getImageAltText(recommendation: LocalRecommendation): string`
    - Returns alt text from `imageAlt` field or fallback
    - Used for PDF accessibility (alt text in Image component)
  - `renderImageWithFallback(url: string, alt: string): ReactPDFElement`
    - Wraps `<Image>` component in try-catch
    - Falls back to placeholder or skips if image fails to load

### contentProcessor.ts
- **Purpose**: Transform content data for PDF rendering
- **Functions**:
  - `formatChecklistByCategory(checklist: ChecklistItem[]): Record<string, ChecklistItem[]>`
    - Groups checklist items by category (clean, return, trash, other)
  - `formatLocalRecommendation(rec: LocalRecommendation): FormattedRecommendation`
    - Formats recommendation with all fields (distance, priceRange, etc.)
  - `extractSectionHeadings(content: ContentData): SectionHeading[]`
    - Extracts headings for table of contents generation

---

## Integration Points

### Layout/Header Integration
- **Location**: `src/shared/components/Layout/Navigation.tsx`
- **Change**: Add PdfDownloadButton to navigation items
- **Alternative**: Add as separate element in `Header.tsx` (outside Navigation component)
- **Position**: Accessible from all pages, visible but not intrusive
- **Styling**: Matches existing design system
- **Implementation**: 
  - Import PdfDownloadButton in Navigation.tsx
  - Add as nav item or separate button element
  - Ensure mobile-responsive placement

### Content Loading
- **Pattern**: Follow existing `useContent` hook pattern for consistency
- **Option A**: Use `useContent()` hook in PdfDownloadButton component
  - `const { content, loading, error } = useContent()`
  - Consistent with existing pages
- **Option B**: Directly call `loadContent()` in pdfGenerator
  - Reuses same function but handles loading/error differently
  - Simpler but less consistent with codebase patterns
- **Recommendation**: Use `useContent` hook for consistency
- **Sync**: Automatic - changes to content files reflect in PDF

### Error Handling
- **User-Facing**: Friendly error messages in UI (via `usePdfGeneration` hook error state)
- **Logging**: Console errors for debugging
- **Error Boundaries**: Wrap PDF generation in try-catch, use existing ErrorBoundary if appropriate
- **Fallback**: Website continues to work if PDF generation fails (progressive enhancement)
- **Image Errors**: Skip images gracefully if they fail to load
- **Content Errors**: Handle missing or malformed content gracefully

---

## Styling Approach

### PDF Styling
- **Library**: @react-pdf/renderer StyleSheet API
- **Approach**: Define styles matching website design system
- **Colors**: Professional color scheme (can be grayscale for printing)
- **Typography**: Readable fonts (10-12pt body, larger for headings)
- **Layout**: Appropriate margins, spacing, page breaks

### Download Button Styling
- **Approach**: CSS Modules (consistent with existing)
- **Location**: `PdfDownloadButton.module.css`
- **Design**: Matches website design system
- **States**: Default, hover, active, loading, disabled

---

## Data Flow

1. **User clicks download button**
   - PdfDownloadButton uses `usePdfGeneration()` hook
   - Hook triggers `generatePdf()` function
   - Shows loading state via hook's `isGenerating` state

2. **Content loading**
   - PdfDownloadButton uses `useContent()` hook (consistent with existing pages)
   - Gets complete ContentData structure
   - Handles loading and error states

3. **PDF library loading (code splitting)**
   - `generatePdf()` dynamically imports @react-pdf/renderer
   - `const { renderToBlob } = await import('@react-pdf/renderer')`
   - Reduces initial bundle size

4. **PDF generation**
   - Creates PdfDocument component with all section components
   - Each section component processes its content:
     - Converts markdown to PDF components using `markdownToPdf` utilities
     - Formats structured data (lists, highlights, etc.)
     - Resolves image paths using `imageHandler` utilities
     - Handles optional fields gracefully

5. **PDF rendering**
   - Uses `renderToBlob()` from @react-pdf/renderer
   - `const blob = await renderToBlob(<PdfDocument content={content} />)`
   - Renders all components to PDF Blob
   - Calculates approximate page numbers for TOC (MVP approach)

6. **Download**
   - Creates object URL: `const url = URL.createObjectURL(blob)`
   - Creates temporary `<a>` element with `download` attribute
   - Triggers click to download
   - Filename: "Guidebook-9926-Ledgestone-Ter.pdf"
   - Cleans up object URL after download
   - User's browser downloads the file

---

## Performance Considerations

### Generation Time
- **Target**: < 10 seconds for typical content
- **Optimization**:
  - Lazy load PDF library (dynamic import for code splitting)
  - Process content in chunks if needed
  - Optimize image handling (use URLs, don't fetch/embed for MVP)
  - Use `performance.now()` to measure and log generation time
  - Monitor and optimize slow sections

### File Size
- **Target**: < 5MB for typical content
- **Optimization**:
  - Use image URLs instead of embedding (MVP) - images not included in PDF file
  - Future: Optimize images before embedding
  - Compress PDF if library supports it
  - Log file size after generation: `blob.size` in bytes
  - Monitor and optimize if size exceeds target

### UI Responsiveness
- **Approach**: Async generation with loading states
- **Non-blocking**: PDF generation doesn't block UI
- **Progress**: Show progress indicator during generation

### Browser Compatibility
- **Tested Browsers**: Chrome, Firefox, Safari, Edge (modern versions)
- **Blob Download**: Uses standard Blob API (supported in all modern browsers)
- **Fallback**: If PDF generation fails, show error message, website continues to work
- **Mobile**: Test download functionality on iOS Safari and Chrome Mobile
- **Limitations**: 
  - Some older browsers may not support Blob downloads
  - Provide fallback message if unsupported

---

## Error Handling Strategy

### Network Errors
- **Images**: Skip gracefully if images can't be loaded
- **Content**: Use cached content if available
- **User Message**: "Some images may not appear in PDF"

### Generation Errors
- **Try-Catch**: Wrap PDF generation in try-catch
- **User Message**: "PDF generation failed. Please try again."
- **Logging**: Log errors for debugging
- **Fallback**: Website continues to work normally

### Missing Content
- **Optional Fields**: Handle gracefully (don't render if missing)
- **Empty Arrays**: Skip sections if empty
- **Malformed Data**: Validate and handle edge cases

---

## Accessibility Considerations

### Download Button
- **Keyboard**: Fully keyboard accessible
- **ARIA**: Proper ARIA labels and roles
- **Screen Readers**: Clear announcements

### PDF Document
- **Structure**: Semantic headings and structure
- **Images**: Alt text from `imageAlt` field
- **Screen Readers**: Proper document structure for PDF readers

---

## Testing Strategy

### Unit Tests
- **Markdown Conversion**: Test markdown parsing and rendering
  - Mock `marked.lexer()` or use actual parsing
  - Test AST to PDF component conversion
  - Test various markdown elements (headings, lists, links, etc.)
- **Content Processing**: Test content transformation utilities
  - Test checklist grouping by category
  - Test recommendation formatting
  - Test section heading extraction
- **Image Handling**: Test path resolution
  - Test relative to absolute URL conversion
  - Test image accessibility checking (mock fetch)
- **Error Handling**: Test error scenarios
  - Test PDF generation failures
  - Test image loading failures
  - Test malformed content handling
- **PDF Generation**: Mock `renderToBlob` for testing
  - Test blob creation
  - Test download functionality

### Integration Tests
- **PDF Generation**: Test full PDF generation flow
- **Content Loading**: Test with actual content files
- **Download**: Test download functionality

### Manual Testing
- **PDF Quality**: Verify formatting, layout, readability
- **Content Completeness**: Verify all sections included
- **Cross-Browser**: Test in Chrome, Firefox, Safari, Edge
- **Mobile**: Test download on mobile devices

---

## Implementation Phases

### Phase 1: MVP (Core Functionality)
1. Install dependencies: @react-pdf/renderer, marked
2. Create `usePdfGeneration` hook following codebase patterns
3. Create basic PDF document structure (PdfDocument component)
4. Set up font configuration (use default fonts for MVP)
5. Implement PdfDownloadButton with useContent and usePdfGeneration hooks
6. Create section components for all major sections
7. Implement markdown conversion utilities (markdownToPdf.ts)
8. Implement image handling utilities (imageHandler.ts)
9. Implement content processing utilities (contentProcessor.ts)
10. Add page breaks between major sections
11. Basic styling with StyleSheet
12. Download functionality with renderToBlob

### Phase 2: Enhancement
1. Table of contents with page numbers
2. Improved styling and formatting
3. Better image handling
4. Error handling improvements
5. Loading states and progress

### Phase 3: Polish
1. Accessibility improvements
2. Performance optimization
3. Cross-browser testing
4. Edge case handling
5. Documentation

---

## Dependencies

### New Dependencies
```json
{
  "@react-pdf/renderer": "^3.x.x",
  "marked": "^11.x.x"  // Required for markdown parsing (react-markdown is for DOM, not PDF)
}
```

**Note**: `react-markdown` is already in project but is for React DOM rendering, not PDF. We need `marked` to parse markdown to AST, then manually convert to @react-pdf/renderer components.

### Existing Dependencies (Reuse)
- React 19+
- TypeScript
- CSS Modules
- Lucide React (for icons)
- Content data files (JSON)

---

## Future Enhancements (Out of Scope for MVP)

- Server-side PDF generation with puppeteer
- Image fetching and embedding
- Custom PDF templates
- User-selected sections only
- Property photos on cover page
- PDF caching
- Print-optimized vs screen-optimized versions
- Multi-language support

---

## Success Metrics

1. ✅ PDF generates successfully from all content
2. ✅ PDF generation completes within 10 seconds
3. ✅ PDF file size < 5MB
4. ✅ PDF is readable and well-formatted
5. ✅ Download button works on all pages
6. ✅ All critical information included (Wi-Fi, smart lock, etc.)
7. ✅ PDF works in standard PDF viewers
8. ✅ Accessible and keyboard navigable

---

## Notes

- PDF generation is a progressive enhancement - website works without it
- Start with simpler PDF (text-focused) and add images later if needed
- Consider both screen viewing and printing optimization
- Monitor PDF generation performance and optimize as needed
- Keep PDF template maintainable and easy to update

