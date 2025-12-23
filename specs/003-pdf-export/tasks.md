# Task Breakdown: Downloadable PDF Guidebook

## Overview

This document breaks down the PDF export implementation plan into detailed, actionable tasks organized by phase. Each task includes specific implementation steps and acceptance criteria.

**Property**: 9926 Ledgestone Ter, Austin, TX 78737 - A Hill Country retreat on 8.4 acres

**Integration**: This feature integrates with the existing guidebook website (spec 001) and uses the same content data files.

---

## Phase 1: MVP (Core Functionality)

**Goal**: Basic PDF generation and download functionality

**Deliverables**:
- PDF download button in header
- PDF generation hook
- Basic PDF document with all sections
- Markdown conversion utilities
- Image handling utilities
- Content processing utilities
- Download functionality

---

### Task 1.1: Install Dependencies

**Description**: Install required packages for PDF generation and markdown processing.

**Steps**:
1. Navigate to `guidebook-app/` directory
2. Install `@react-pdf/renderer`: `npm install @react-pdf/renderer`
3. Install `marked`: `npm install marked`
4. Install TypeScript types for marked: `npm install --save-dev @types/marked`
5. Verify installations in `package.json`

**Acceptance Criteria**:
- [ ] `@react-pdf/renderer` installed (version ^3.x.x)
- [ ] `marked` installed (version ^11.x.x)
- [ ] `@types/marked` installed as dev dependency
- [ ] Dependencies appear in `package.json`

**Estimated Time**: 5 minutes

---

### Task 1.2: Create Feature Folder Structure

**Description**: Set up the PDF export feature directory structure.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/` directory
2. Create subdirectories:
   - `components/`
   - `hooks/`
   - `templates/`
   - `utils/`
   - `types/`
3. Verify structure matches plan specification

**Acceptance Criteria**:
- [ ] All directories created
- [ ] Structure matches plan.md specification
- [ ] Ready for component files

**Estimated Time**: 5 minutes

---

### Task 1.3: Create Type Definitions

**Description**: Create TypeScript type definitions for PDF export feature.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/types/pdf.ts`
2. Define `PdfComponentProps` interfaces for section components
3. Define `FormattedRecommendation` type for local guide recommendations
4. Define `PdfGenerationState` type for hook state
5. Define `SectionHeading` type for table of contents
6. Export all types

**Acceptance Criteria**:
- [ ] Types file created
- [ ] All interfaces properly typed
- [ ] Types exported and documented

**Estimated Time**: 20 minutes

---

### Task 1.4: Create usePdfGeneration Hook

**Description**: Create hook to manage PDF generation state following codebase patterns (similar to useContent and useChatbot).

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/hooks/usePdfGeneration.ts`
2. Import `useState` from React
3. Define state:
   - `isGenerating: boolean`
   - `error: Error | null`
   - `progress?: number` (optional)
4. Create `generatePdf` function that:
   - Sets `isGenerating` to true
   - Calls PDF generation utility (to be created in Task 1.11)
   - Handles errors gracefully
   - Sets `isGenerating` to false on completion
5. Return `{ isGenerating, error, generatePdf, progress }`
6. Follow same pattern as `useContent` hook

**Acceptance Criteria**:
- [ ] Hook file created
- [ ] Manages async PDF generation state
- [ ] Handles errors gracefully
- [ ] Provides loading state for UI
- [ ] Follows same pattern as existing hooks
- [ ] TypeScript types defined

**Estimated Time**: 30 minutes

---

### Task 1.5: Create Image Handler Utilities

**Description**: Create utilities to handle image paths and URLs for PDF rendering.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/utils/imageHandler.ts`
2. Import `LocalRecommendation` type from `@shared/types/content`
3. Implement `resolveImagePath(path: string): string`:
   - Converts relative paths (`/images/...`) to absolute URLs
   - Uses `window.location.origin` for current domain
   - Handles different deployment scenarios (dev, production, Vercel)
   - Returns absolute URL
4. Implement `getImageAltText(recommendation: LocalRecommendation): string`:
   - Returns alt text from `imageAlt` field
   - Provides fallback if missing
5. Export both functions

**Acceptance Criteria**:
- [ ] Image handler file created
- [ ] `resolveImagePath` converts relative to absolute URLs
- [ ] `getImageAltText` returns alt text or fallback
- [ ] Functions properly typed
- [ ] Handles edge cases (missing paths, etc.)

**Estimated Time**: 30 minutes

---

### Task 1.6: Create Content Processor Utilities

**Description**: Create utilities to transform content data for PDF rendering.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/utils/contentProcessor.ts`
2. Import types from `@shared/types/content`:
   - `ContentData`, `ChecklistItem`, `LocalRecommendation`
3. Import `FormattedRecommendation` and `SectionHeading` from `@features/pdf-export/types/pdf`
4. Implement `formatChecklistByCategory(checklist: ChecklistItem[]): Record<string, ChecklistItem[]>`:
   - Groups checklist items by category (clean, return, trash, other)
   - Returns grouped object
5. Implement `formatLocalRecommendation(rec: LocalRecommendation): FormattedRecommendation`:
   - Formats recommendation with all fields (distance, priceRange, etc.)
   - Returns formatted object
6. Implement `extractSectionHeadings(content: ContentData): SectionHeading[]`:
   - Extracts headings for table of contents generation
   - Returns array of section headings
7. Export all functions

**Acceptance Criteria**:
- [ ] Content processor file created
- [ ] Checklist grouping works correctly
- [ ] Recommendation formatting includes all fields
- [ ] Section heading extraction works
- [ ] Functions properly typed
- [ ] Handles edge cases (empty arrays, missing fields)

**Estimated Time**: 45 minutes

---

### Task 1.7: Create Markdown Conversion Utilities

**Description**: Create utilities to convert markdown to PDF-compatible components.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/utils/markdownToPdf.ts`
2. Import `marked` library
3. Import `Text`, `View`, `Link` from `@react-pdf/renderer`
4. Import `Tokens` type from `marked` package
5. Implement `parseMarkdown(text: string): Tokens[]`:
   - Uses `marked.lexer()` to parse markdown to tokens
   - Returns token array for processing
4. Implement `renderMarkdownToPdf(tokens: Tokens[]): ReactPDFElement[]`:
   - Converts markdown tokens to @react-pdf/renderer components:
     - Headings → `<Text style={headingStyle}>` with appropriate fontSize
     - Bold → `<Text style={{ fontWeight: 'bold' }}>`
     - Italic → `<Text style={{ fontStyle: 'italic' }}>`
     - Links → `<Link src={url}>` for external links
     - Internal guidebook links: Display as text with URL
     - Lists → `<View>` with `<Text>` items for each list item
     - Paragraphs → `<Text>` with line breaks
   - Handles markdown in arrays (troubleshooting, safety, reminders)
   - Returns array of @react-pdf/renderer components
5. Implement `renderMarkdownString(text: string): ReactPDFElement`:
   - Convenience function for single markdown strings
   - Parses and renders in one call
6. Export all functions

**Acceptance Criteria**:
- [ ] Markdown utilities file created
- [ ] Parses markdown to tokens correctly
- [ ] Converts tokens to PDF components
- [ ] Handles all markdown elements (headings, bold, italic, links, lists)
- [ ] Handles markdown in arrays
- [ ] Functions properly typed
- [ ] Handles edge cases (empty strings, invalid markdown)

**Estimated Time**: 2 hours

---

### Task 1.8: Create PdfDocument Component

**Description**: Create main PDF document wrapper using @react-pdf/renderer.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/templates/PdfDocument.tsx`
2. Import `Document`, `Page`, `StyleSheet`, `View`, `Text` from `@react-pdf/renderer`
3. Import `ContentData` type from `@shared/types/content`
4. Import all section components (to be created in Task 1.9)
5. Set up `Document` component:
   - Use `size` prop for page size (US Letter: `size="LETTER"`)
   - Use default fonts for MVP: Helvetica (default), Times-Roman, Courier
   - Note: Custom font registration is out of scope for MVP
6. Create global styles using `StyleSheet.create()`:
   - Define base styles (body text, headings, spacing)
   - Professional color scheme (can be grayscale for printing)
7. Add all section components in order:
   - PdfCover
   - PdfPropertyOverview
   - PdfBeforeYouArrive
   - PdfDuringYourStay
   - PdfLocalGuide
   - PdfCheckout
   - Note: PdfTableOfContents skipped for MVP (will be added in Phase 2, Task 2.1)
8. Add page breaks between major sections using `<View break>` prop
9. Add basic page numbering in footer (placeholder for Phase 2):
   - Use `<Page render={({ pageNumber }) => <Footer />}>` pattern
   - For MVP: Simple placeholder, full implementation in Phase 2
10. Accept `content: ContentData` as prop

**Acceptance Criteria**:
- [ ] PdfDocument component created
- [ ] Uses Document from @react-pdf/renderer
- [ ] Sets up page size (US Letter)
- [ ] Configures default fonts
- [ ] Contains all PDF sections
- [ ] Page breaks between major sections
- [ ] Basic styling with StyleSheet
- [ ] Properly typed with TypeScript

**Estimated Time**: 1 hour

---

### Task 1.9: Create PDF Section Components

**Description**: Create all section components for PDF rendering.

**Steps**:
1. Import required types from `@shared/types/content`:
   - `ContentData`, `PropertyInfo`, `LocalRecommendation`, `ChecklistItem`
2. Import `Text`, `View`, `Image`, `Link` from `@react-pdf/renderer`
3. Import markdown utilities from `@features/pdf-export/utils/markdownToPdf`
4. Import image handler utilities from `@features/pdf-export/utils/imageHandler`
5. Import content processor utilities from `@features/pdf-export/utils/contentProcessor`
6. Create `guidebook-app/src/features/pdf-export/templates/PdfCover.tsx`:
   - Accept `property: PropertyInfo` as prop
   - Display property address
   - Display property details (bedrooms, bathrooms, square feet, acres)
   - Display generation date (use `new Date().toLocaleDateString()`)
   - Professional layout using StyleSheet
7. Create `guidebook-app/src/features/pdf-export/templates/PdfPropertyOverview.tsx`:
   - Accept relevant content data as props
   - Display property address, location, size
   - Use `renderMarkdownString` from markdown utilities for content
8. Create `guidebook-app/src/features/pdf-export/templates/PdfBeforeYouArrive.tsx`:
   - Accept relevant content data as props
   - Display address, parking, directions, check-in, smart lock
   - Use `renderMarkdownString` for markdown content
   - Handle optional fields gracefully (map, keyCollection) - conditionally render if present
9. Create `guidebook-app/src/features/pdf-export/templates/PdfDuringYourStay.tsx`:
   - Accept relevant content data as props
   - Display Wi-Fi, house rules, property features, how-to guides, sunsets
   - Use `renderMarkdownString` for markdown content
   - Handle optional fields gracefully (pool, limo) - conditionally render if present
10. Create `guidebook-app/src/features/pdf-export/templates/PdfLocalGuide.tsx`:
    - Accept relevant content data as props
    - Display restaurants, coffee, groceries, activities, attractions, transportation
    - Use `renderMarkdownString` for markdown content
    - For recommendations with images:
      - Use `<Image>` component from @react-pdf/renderer
      - Use `resolveImagePath` to convert relative paths to absolute URLs
      - Use `getImageAltText` for alt text
      - Note: Images use URLs directly (MVP approach - images not embedded)
    - Use `formatLocalRecommendation` from content processor
11. Create `guidebook-app/src/features/pdf-export/templates/PdfCheckout.tsx`:
    - Accept relevant content data as props
    - Display checklist, departure notes, contact info
    - Use `formatChecklistByCategory` from content processor for checklist grouping
    - Use `renderMarkdownString` for markdown content

**Acceptance Criteria**:
- [ ] All section components created
- [ ] Each component accepts relevant content data as props
- [ ] Uses reusable markdown rendering utilities
- [ ] Formats content appropriately for PDF
- [ ] Handles optional fields gracefully
- [ ] Uses consistent styling from shared StyleSheet
- [ ] Properly typed with TypeScript

**Estimated Time**: 4 hours

---

### Task 1.10: Create PDF Generator Utility

**Description**: Create main PDF generation orchestration utility.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/utils/pdfGenerator.ts`
2. Import `ContentData` type from `@shared/types/content`
3. Import `PdfDocument` component
4. Implement `generatePdf(content: ContentData): Promise<Blob>`:
   - Dynamically imports @react-pdf/renderer: `const { renderToBlob } = await import('@react-pdf/renderer')`
   - Handle dynamic import errors:
     - Wrap in try-catch
     - Throw user-friendly error if library fails to load
     - Error message: "PDF generation library failed to load. Please refresh and try again."
   - Creates PdfDocument component with content
   - Renders to Blob: `const blob = await renderToBlob(<PdfDocument content={content} />)`
   - Handle rendering errors gracefully:
     - Catch errors during renderToBlob
     - Throw user-friendly error: "PDF generation failed. Please try again."
   - Returns Blob for download
5. Implement `downloadPdf(blob: Blob, filename: string): void`:
   - Creates object URL: `const url = URL.createObjectURL(blob)`
   - Creates temporary `<a>` element with `download` attribute
   - Sets `href` to object URL
   - Sets `download` attribute to filename
   - Appends to document body (temporarily)
   - Triggers click to download
   - Removes element from DOM
   - Uses descriptive filename: "Guidebook-9926-Ledgestone-Ter.pdf"
   - Cleans up object URL after download: `URL.revokeObjectURL(url)`
   - Handle errors gracefully (e.g., if Blob is invalid)
6. Export both functions

**Acceptance Criteria**:
- [ ] PDF generator file created
- [ ] `generatePdf` uses dynamic import for code splitting
- [ ] Renders PDF to Blob correctly
- [ ] `downloadPdf` triggers browser download
- [ ] Filename is descriptive
- [ ] Object URL cleaned up after download
- [ ] Error handling implemented
- [ ] Functions properly typed

**Estimated Time**: 1 hour

---

### Task 1.11: Integrate PDF Generator with Hook

**Description**: Connect PDF generator utility to usePdfGeneration hook. Note: Content loading happens in PdfDownloadButton component (Task 1.12), not in the hook.

**Steps**:
1. Open `guidebook-app/src/features/pdf-export/hooks/usePdfGeneration.ts`
2. Import `generatePdf` and `downloadPdf` from `pdfGenerator.ts`
3. Import `ContentData` type from `@shared/types/content`
4. Update `generatePdf` function signature to accept content parameter:
   - `generatePdf: (content: ContentData) => Promise<void>`
   - Note: Content is passed from button component, not loaded in hook
5. Implement `generatePdf` function:
   - Set `isGenerating` to true
   - Clear any previous errors
   - Call `generatePdf(content)` from pdfGenerator to get Blob
   - Call `downloadPdf(blob, "Guidebook-9926-Ledgestone-Ter.pdf")`
   - Set `isGenerating` to false on success
   - Handle errors and update state:
     - Catch errors from pdfGenerator
     - Set error state with user-friendly message
     - Set `isGenerating` to false on error
6. Add error handling with user-friendly messages:
   - "PDF generation failed. Please try again."
   - "PDF download failed. Please try again."

**Acceptance Criteria**:
- [ ] Hook integrates with PDF generator
- [ ] Loads content correctly
- [ ] Generates and downloads PDF
- [ ] Error handling works
- [ ] State management correct

**Estimated Time**: 30 minutes

---

### Task 1.12: Create PdfDownloadButton Component

**Description**: Create download button component for header/navigation.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/components/PdfDownloadButton.tsx`
2. Import `useContent` hook from `@shared/hooks/useContent`
3. Import `usePdfGeneration` hook from `@features/pdf-export/hooks/usePdfGeneration`
4. Import `PdfGenerationProgress` component (from Task 1.13)
5. Import icon from Lucide React (Download, FileText, or BookOpen)
6. Use `useContent()` hook to load content (consistent with existing pages):
   - Get `content`, `loading`, `error` from hook
   - Handle content loading state
7. Use `usePdfGeneration()` hook for generation state:
   - Get `isGenerating`, `error`, `generatePdf` from hook
8. Implement button click handler:
   - Check if content is loaded
   - Call `generatePdf(content)` from hook
   - Pass content from `useContent()` to hook's `generatePdf` function
9. Implement button UI:
   - Clear label: "Download PDF Guidebook"
   - Icon from Lucide
   - Disabled during generation or content loading
   - Show loading state during generation
10. Implement error display:
    - Display error message below button (if error from hook)
    - Display content loading error (if error from useContent)
    - Use inline error message or toast notification
    - User-friendly messages: "Failed to load content" or "PDF generation failed"
11. Integrate PdfGenerationProgress component:
    - Show progress component when `isGenerating` is true
    - Display inline or as overlay
    - Pass `isGenerating` prop to progress component
12. Add accessibility:
    - Keyboard accessible (Enter/Space to trigger)
    - Proper ARIA labels: `aria-label="Download PDF Guidebook"`
    - `aria-busy={isGenerating}` during generation
    - Screen reader announcements for errors
13. Create `PdfDownloadButton.module.css` with styles
14. Match existing design system

**Acceptance Criteria**:
- [ ] PdfDownloadButton component created
- [ ] Uses `useContent()` hook
- [ ] Uses `usePdfGeneration()` hook
- [ ] Clear label and icon
- [ ] Loading state during generation
- [ ] Error handling with user-friendly messages
- [ ] Mobile-responsive
- [ ] Keyboard accessible with proper ARIA labels
- [ ] Styling matches design system

**Estimated Time**: 1.5 hours

---

### Task 1.13: Create PdfGenerationProgress Component

**Description**: Create progress indicator component for PDF generation. This component will be integrated into PdfDownloadButton in Task 1.12.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/components/PdfGenerationProgress.tsx`
2. Define props interface:
   - `isGenerating: boolean`
   - `progress?: number` (optional, for Phase 2 enhancement)
3. Implement loading spinner:
   - Use CSS animation or spinner component
   - Match existing design system
4. Add progress text ("Generating PDF...")
5. Show optional progress percentage if available:
   - Display as "Generating PDF... X%"
   - For MVP: Just show text, percentage enhancement in Phase 2
6. Use non-blocking overlay or inline indicator:
   - Inline display (within button area or below button)
   - Or small overlay notification
7. Create `PdfGenerationProgress.module.css` with styles
8. Match existing design system

**Acceptance Criteria**:
- [ ] PdfGenerationProgress component created
- [ ] Shows loading spinner
- [ ] Displays progress text
- [ ] Shows progress percentage if available (optional for MVP)
- [ ] Non-blocking display
- [ ] Styling matches design system
- [ ] Ready for integration in Task 1.12

**Estimated Time**: 30 minutes

---

### Task 1.14: Integrate Download Button into Header

**Description**: Add PDF download button to header for access on all pages. This follows the plan's "separate element in Header.tsx" approach (outside Navigation component).

**Steps**:
1. Open `guidebook-app/src/shared/components/Layout/Header.tsx`
2. Import `PdfDownloadButton` component from `@features/pdf-export/components/PdfDownloadButton`
3. Add button to header container:
   - Position after navigation (as separate element, not inside Navigation component)
   - Ensure visible but not intrusive
   - Mobile-responsive placement (consider mobile menu or separate placement)
4. Update `Header.module.css` if needed for button placement:
   - Add styles for button positioning
   - Ensure mobile responsiveness
5. Test on all pages to ensure button is visible and functional

**Acceptance Criteria**:
- [ ] Download button added to Header (outside Navigation component)
- [ ] Accessible from all pages
- [ ] Visible but not intrusive
- [ ] Mobile-responsive
- [ ] Styling matches design system
- [ ] Button functional on all pages

**Estimated Time**: 30 minutes

---

### Task 1.15: Add Basic PDF Styling

**Description**: Add basic styling to PDF document using StyleSheet.

**Steps**:
1. Open `guidebook-app/src/features/pdf-export/templates/PdfDocument.tsx`
2. Enhance `StyleSheet.create()` with:
   - Professional color scheme (can be grayscale for printing)
   - Readable fonts (10-12pt body, larger for headings)
   - Appropriate margins and spacing
   - Clear visual hierarchy
3. Apply styles to all section components
4. Ensure consistent styling across sections

**Acceptance Criteria**:
- [ ] Basic styling added
- [ ] Professional appearance
- [ ] Readable typography
- [ ] Appropriate margins and spacing
- [ ] Consistent across sections

**Estimated Time**: 1 hour

---

## Phase 2: Enhancement

**Goal**: Improve PDF quality and user experience

**Deliverables**:
- Table of contents with page numbers
- Improved styling and formatting
- Better image handling
- Enhanced error handling
- Loading states and progress

---

### Task 2.1: Implement Table of Contents

**Description**: Add table of contents component with approximate page numbers.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/templates/PdfTableOfContents.tsx`
2. Accept props: `sections: Array<{title: string, page?: number}>`
3. Implement TOC layout:
   - Lists all major sections
   - Page numbers (approximate for MVP)
   - Estimate pages: ~1 page per major section + content length estimates
4. Integrate into PdfDocument component
5. Use `extractSectionHeadings` from contentProcessor

**Acceptance Criteria**:
- [ ] Table of contents component created
- [ ] Lists all major sections
- [ ] Shows approximate page numbers
- [ ] Integrated into PDF document
- [ ] Professional layout

**Estimated Time**: 1.5 hours

---

### Task 2.2: Improve Styling and Formatting

**Description**: Enhance PDF styling for better readability and appearance.

**Steps**:
1. Review all section components
2. Improve typography (font sizes, line spacing)
3. Enhance visual hierarchy
4. Improve spacing and margins
5. Add better formatting for lists and structured content
6. Optimize for both screen viewing and printing

**Acceptance Criteria**:
- [ ] Improved typography
- [ ] Better visual hierarchy
- [ ] Enhanced spacing
- [ ] Better list formatting
- [ ] Optimized for screen and print

**Estimated Time**: 2 hours

---

### Task 2.3: Enhance Image Handling

**Description**: Improve image handling with better error handling and fallbacks.

**Steps**:
1. Open `guidebook-app/src/features/pdf-export/utils/imageHandler.ts`
2. Implement `isImageAccessible(url: string): Promise<boolean>`:
   - Checks if image can be loaded
   - Uses fetch with HEAD request
   - Handles CORS errors gracefully
3. Implement `renderImageWithFallback(url: string, alt: string): ReactPDFElement`:
   - Wraps `<Image>` component in try-catch
   - Falls back to placeholder or skips if image fails to load
4. Update section components to use enhanced image handling

**Acceptance Criteria**:
- [ ] Image accessibility checking implemented
- [ ] Fallback handling for failed images
- [ ] Better error handling
- [ ] Images skip gracefully if not accessible

**Estimated Time**: 1 hour

---

### Task 2.4: Enhance Error Handling

**Description**: Improve error handling throughout PDF generation.

**Steps**:
1. Review all PDF generation code
2. Add try-catch blocks where needed
3. Improve error messages (user-friendly)
4. Add error logging for debugging
5. Ensure website continues to work if PDF generation fails
6. Handle network errors for images
7. Handle missing or malformed content

**Acceptance Criteria**:
- [ ] Comprehensive error handling
- [ ] User-friendly error messages
- [ ] Error logging for debugging
- [ ] Graceful degradation
- [ ] Handles all error scenarios

**Estimated Time**: 1.5 hours

---

### Task 2.5: Add Loading States and Progress

**Description**: Enhance loading states and add progress tracking.

**Steps**:
1. Update `usePdfGeneration` hook to track progress
2. Add progress calculation during PDF generation
3. Update `PdfGenerationProgress` component to show progress
4. Integrate progress component into download button or header
5. Add smooth transitions and animations

**Acceptance Criteria**:
- [ ] Progress tracking implemented
- [ ] Progress displayed to user
- [ ] Smooth loading states
- [ ] Better user feedback

**Estimated Time**: 1 hour

---

## Phase 3: Polish

**Goal**: Final polish, testing, and optimization

**Deliverables**:
- Accessibility improvements
- Performance optimization
- Cross-browser testing
- Edge case handling
- Documentation

---

### Task 3.1: Accessibility Improvements

**Description**: Enhance accessibility for PDF and download button.

**Steps**:
1. Review PDF document structure for semantic headings
2. Ensure proper document structure for screen readers
3. Verify all images have alt text
4. Enhance download button accessibility (ARIA labels, keyboard navigation)
5. Test with screen readers

**Acceptance Criteria**:
- [ ] Semantic document structure
- [ ] All images have alt text
- [ ] Download button fully accessible
- [ ] Screen reader compatible

**Estimated Time**: 1.5 hours

---

### Task 3.2: Performance Optimization

**Description**: Optimize PDF generation performance.

**Steps**:
1. Measure PDF generation time using `performance.now()`
2. Optimize slow sections
3. Ensure dynamic import works correctly (code splitting)
4. Optimize image handling
5. Monitor file size and optimize if needed
6. Target: < 10 seconds generation time, < 5MB file size

**Acceptance Criteria**:
- [ ] Generation time < 10 seconds
- [ ] File size < 5MB
- [ ] Code splitting working
- [ ] Performance optimized

**Estimated Time**: 2 hours

---

### Task 3.3: Cross-Browser Testing

**Description**: Test PDF generation and download across browsers.

**Steps**:
1. Test in Chrome
2. Test in Firefox
3. Test in Safari
4. Test in Edge
5. Test on mobile browsers (iOS Safari, Chrome Mobile)
6. Verify Blob download works in all browsers
7. Test error handling in each browser

**Acceptance Criteria**:
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Works on mobile browsers
- [ ] Blob download works everywhere

**Estimated Time**: 2 hours

---

### Task 3.4: Edge Case Handling

**Description**: Handle edge cases and error scenarios.

**Steps**:
1. Test with missing content fields
2. Test with empty arrays
3. Test with very long content
4. Test with missing images
5. Test with malformed markdown
6. Test with network errors
7. Add handling for all edge cases

**Acceptance Criteria**:
- [ ] Handles missing fields gracefully
- [ ] Handles empty arrays
- [ ] Handles long content
- [ ] Handles missing images
- [ ] Handles malformed content
- [ ] Handles network errors

**Estimated Time**: 2 hours

---

### Task 3.5: Documentation

**Description**: Document PDF export feature.

**Steps**:
1. Add JSDoc comments to all functions
2. Document component props and usage
3. Document PDF generation process
4. Add README or documentation file
5. Document known limitations

**Acceptance Criteria**:
- [ ] All functions documented
- [ ] Component usage documented
- [ ] Process documented
- [ ] Limitations documented

**Estimated Time**: 1 hour

---

## Summary

**Total Estimated Time**: ~25 hours

**Phase 1 (MVP)**: ~13 hours
**Phase 2 (Enhancement)**: ~7 hours
**Phase 3 (Polish)**: ~8.5 hours

---

## Notes

- Tasks can be worked on in parallel where dependencies allow
- Some tasks may need to be adjusted during implementation
- Testing should be done incrementally, not just at the end
- Performance optimization is ongoing, not just in Phase 3

---

## Next Steps

1. ✅ **Tasks Generated** - Ready for implementation
2. ⏭️ **Begin Phase 1** - Start with dependency installation
3. ⏭️ **Track Progress** - Check off tasks as completed

