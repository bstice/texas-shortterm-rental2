# Specification: Downloadable PDF Guidebook

## Overview

Add functionality to generate and download a comprehensive PDF version of the guidebook website content. This PDF will serve as an offline reference for guests, containing all essential information about the property, check-in/check-out procedures, local recommendations, and stay guidelines.

**Property**: 9926 Ledgestone Ter, Austin, TX 78737 - A Hill Country retreat on 8.4 acres

**Integration**: This feature will be integrated into the existing guidebook website (spec 001) and will use the same content data files.

## User Stories

### As a Guest
- I want to download a PDF version of the guidebook to access offline during my stay
- I want to have all essential property information in a single document I can print or save
- I want the PDF to include all sections: property info, check-in, during stay, local guide, and checkout
- I want the PDF to be well-formatted and easy to read on any device
- I want to be able to download the PDF from any page on the website
- I want the PDF to include important details like Wi-Fi password, smart lock code, and emergency contacts

### As a Property Owner/Host
- I want guests to have offline access to property information
- I want to provide a professional, printable version of the guidebook
- I want the PDF to be automatically generated from the same content files used by the website
- I want the PDF to stay in sync with website content updates
- I want the PDF to include branding and property information

## Functional Requirements

### FR1: PDF Generation
- **FR1.1**: PDF should be generated from the same JSON content files used by the website
- **FR1.2**: PDF should include all major sections:
  - Property overview and address
  - Before You Arrive (address, parking, check-in, smart lock)
  - During Your Stay (Wi-Fi, house rules, property features, how-to guides, what's included)
  - Local Guide (restaurants, coffee, groceries, activities, attractions)
  - Checkout procedures and checklist
- **FR1.3**: PDF should preserve markdown formatting (headings, lists, links, bold, italic)
- **FR1.4**: PDF should include images where available (local guide recommendations, property features)
- **FR1.5**: PDF should be generated on-demand when user clicks download button
- **FR1.6**: PDF generation should show loading/progress indicator
- **FR1.7**: PDF should handle missing or optional content gracefully
  - Optional fields (e.g., `map`, `keyCollection`, `petPolicy`, `pool`, `limo`, `carRental`) should be included if present in data
  - Empty arrays or missing sections should not break PDF generation
  - Optional subsections should be conditionally rendered

### FR2: PDF Content Structure
- **FR2.1**: PDF should have a cover page with:
  - Property address
  - Property size (bedrooms, bathrooms, square feet, acres)
  - Date generated
  - Note: Property image/logo is out of scope for MVP (see Out of Scope section)
- **FR2.2**: PDF should have a table of contents with section references
  - Page numbers will be generated dynamically after content layout (may be approximate for initial MVP)
- **FR2.3**: PDF should organize content in logical sections matching website structure
- **FR2.4**: PDF should include page numbers and headers/footers
- **FR2.5**: PDF should have clear section breaks and visual hierarchy
- **FR2.6**: PDF should include important information prominently (Wi-Fi password, smart lock code)

### FR3: Download Interface
- **FR3.1**: Download button should be accessible from all pages (in header/navigation)
- **FR3.2**: Download button should have clear label (e.g., "Download PDF Guidebook")
- **FR3.3**: Download button should use appropriate icon (Download, FileText, or BookOpen from Lucide)
- **FR3.4**: Download should trigger PDF generation and download automatically
- **FR3.5**: Download should show loading state during generation
- **FR3.6**: Download should handle errors gracefully with user-friendly messages
- **FR3.7**: Downloaded PDF filename should be descriptive (e.g., "Guidebook-9926-Ledgestone-Ter.pdf")

### FR4: PDF Formatting & Design
- **FR4.1**: PDF should use professional typography (readable fonts, appropriate sizes)
- **FR4.2**: PDF should have consistent styling matching website design system (colors, fonts)
- **FR4.3**: PDF should be optimized for both screen viewing and printing
- **FR4.4**: PDF should use appropriate page margins and spacing
- **FR4.5**: PDF should handle long content with proper page breaks
- **FR4.6**: PDF should format lists, tables, and structured content clearly
- **FR4.7**: PDF should include hyperlinks where appropriate (for websites, social media)

### FR5: Content Processing
- **FR5.1**: PDF should convert markdown content to formatted text
- **FR5.2**: PDF should handle markdown lists (ordered and unordered)
- **FR5.3**: PDF should handle markdown headings (H1, H2, H3)
- **FR5.4**: PDF should handle markdown links (display URL or link text)
- **FR5.5**: PDF should handle markdown bold and italic text
- **FR5.6**: PDF should format how-to guides with step-by-step instructions clearly
  - Include step titles and descriptions
  - Include optional step images if available
  - Format safety guidelines and troubleshooting tips as lists
- **FR5.7**: PDF should format local guide recommendations in a readable layout
  - Include all recommendation fields:
    - Name, description (markdown supported)
    - Distance (if available)
    - Price range (if available, for restaurants/coffee)
    - Address, phone (if available)
    - Website and social links (Facebook, Instagram, Twitter/X, Yelp, TripAdvisor)
    - Images with alt text for accessibility
- **FR5.8**: PDF should include images from local guide (if URLs are available)
- **FR5.9**: PDF should format structured lists properly (highlights, features, guidelines, troubleshooting)
- **FR5.10**: PDF should handle markdown in array elements (troubleshooting, safety, reminders)

### FR6: Error Handling & Edge Cases
- **FR6.1**: PDF generation should handle network errors when fetching images
- **FR6.2**: PDF generation should handle missing or malformed content data
- **FR6.3**: PDF generation should handle very long content (proper pagination)
- **FR6.4**: PDF generation should handle missing images gracefully
- **FR6.5**: PDF generation should provide error messages if generation fails
- **FR6.6**: PDF should work even if some optional content is missing

## Design Requirements

### DR1: Visual Design
- **DR1.1**: Download button should match website design system
- **DR1.2**: Download button should be clearly visible but not intrusive
- **DR1.3**: Loading state should provide clear feedback (spinner, progress text)
- **DR1.4**: PDF should use professional color scheme (can be grayscale for printing)

### DR2: Layout & Positioning
- **DR2.1**: Download button should be in the main navigation/header
- **DR2.2**: Download button should be accessible on all pages
- **DR2.3**: Download button should be mobile-responsive
- **DR2.4**: PDF layout should be optimized for standard paper sizes (US Letter, A4)

### DR3: Responsive Design
- **DR3.1**: Download button should work on all screen sizes
- **DR3.2**: PDF should be readable on mobile devices when downloaded
- **DR3.3**: PDF should be optimized for printing on standard printers

## Technical Requirements

### TR1: PDF Generation Library
- **TR1.1**: Use a JavaScript PDF generation library suitable for React
- **TR1.2**: Options to consider:
  - `jsPDF` with `html2canvas` (client-side, simple)
  - `react-pdf` / `@react-pdf/renderer` (React components to PDF, recommended)
  - `puppeteer` (server-side, more complex but powerful)
  - `pdfkit` (Node.js, would require backend)
- **TR1.3**: Library should support:
  - Text formatting (fonts, sizes, colors)
  - Images
  - Page breaks
  - Headers/footers
  - Hyperlinks
  - Note: Markdown conversion will be handled separately (see TR5)

### TR2: Implementation Approach
- **TR2.1**: Option A: Client-side generation (simpler, no backend needed)
  - Use `@react-pdf/renderer` or `jsPDF`
  - Generate PDF in browser
  - Pros: No server costs, works offline
  - Cons: Limited by browser capabilities, may be slower for large PDFs
- **TR2.2**: Option B: Server-side generation (more powerful, requires backend)
  - Use Vercel Serverless Function with `puppeteer` or `pdfkit`
  - Generate PDF on server
  - Pros: More control, better performance, can use headless browser
  - Cons: Requires backend, server costs, API endpoint needed
- **TR2.3**: Recommended: Start with client-side (`@react-pdf/renderer`) for MVP
- **TR2.4**: Can migrate to server-side if needed for advanced features

### TR3: Content Processing
- **TR3.1**: Load content from existing JSON data files
  - Note: Data structure uses camelCase (e.g., `beforeYouArrive`, `duringYourStay`) while display uses spaces (e.g., "Before You Arrive", "During Your Stay")
- **TR3.2**: Convert markdown to formatted text for PDF
- **TR3.3**: Process images from local guide recommendations and how-to guide steps
  - Handle relative image paths (e.g., `/images/local-guide/...`) by converting to absolute URLs or embedding from public directory
  - For MVP: Use image URLs directly if available, skip gracefully if not accessible
  - Include image alt text for accessibility
  - Future: Implement image fetching and embedding with proper error handling and CORS management
- **TR3.4**: Handle special formatting (lists, tables)
  - Note: Code blocks are out of scope for MVP (not present in current content)
- **TR3.5**: Generate table of contents from section headings
  - Page numbers will be calculated after content is laid out

### TR4: Performance
- **TR4.1**: PDF generation should complete within 10 seconds for typical content
- **TR4.2**: PDF generation should not block UI (use async/loading states)
- **TR4.3**: PDF file size should be reasonable (< 5MB for typical content)
- **TR4.4**: Optimize images before embedding in PDF (if image embedding is implemented)
- **TR4.5**: Consider lazy loading images during PDF generation

### TR5: Markdown Processing
- **TR5.1**: Convert markdown to PDF-compatible format
- **TR5.2**: Handle common markdown elements:
  - Headings (# ## ###)
  - Bold (**text**)
  - Italic (*text*)
  - Links ([text](url))
  - Lists (ordered and unordered)
  - Line breaks
  - Markdown within array elements (troubleshooting, safety, reminders, guidelines)
  - Note: Code blocks are not needed for current content structure
- **TR5.3**: Use a markdown parser (e.g., `marked`, `remark`) to convert to AST
- **TR5.4**: Render AST nodes as PDF elements

## Content Requirements

### CR1: PDF Sections
- **CR1.1**: Cover Page
  - Property address (9926 Ledgestone Ter, Austin, TX 78737)
  - Property details (5 bed, 5 bath, 2738 sq ft, 8.4 acres)
  - Generation date
- **CR1.2**: Table of Contents
  - All major sections with page numbers
- **CR1.3**: Property Overview
  - Address (street, city, state, zip)
  - Location details (distance to downtown, minutes away)
  - Size and amenities summary (bedrooms, bathrooms, square feet, acres)
- **CR1.4**: Before You Arrive
  - Address and parking information (including optional map reference if available)
  - Directions
  - Check-in steps (including optional key collection instructions if available)
  - Arrival expectations (from `checkIn.arrivalExpectations`)
  - Smart lock instructions, code, and troubleshooting tips
- **CR1.5**: During Your Stay
  - Wi-Fi information (SSID and password prominently displayed, including troubleshooting tips)
  - House rules (including quiet hours, guest capacity, smoking policy, pet policy if available, outdoor guidelines)
  - Property features:
    - Indoor spaces (content and highlights)
    - Outdoor spaces (content and highlights)
    - Pool (if available: content, location, features)
    - Limo (if available: content, access instructions, guidelines)
  - What's included (furniture, kitchen, linens, entertainment, outdoor, limo, and items guests need to bring)
  - How-to guides (A/C, pool, appliances, limo, etc.) including:
    - Step-by-step instructions (with optional step images)
    - Safety guidelines (if available)
    - Troubleshooting tips (if available)
  - Sunset viewing tips (locations, best times, tips, and photography guidance if available)
- **CR1.6**: Local Guide
  - Restaurants (with descriptions, addresses, contact info, social links, images with alt text)
  - Coffee shops (with descriptions, addresses, contact info, social links, images with alt text)
  - Grocery stores (with descriptions, addresses, contact info, social links, images with alt text)
  - Outdoor activities:
    - Hiking trails
    - Hill Country attractions
    - Parks and nature areas
  - Austin attractions:
    - Downtown Austin attractions
    - Local spots in the area
  - Transportation information (driving, ride-sharing, parking, car rental if available)
- **CR1.7**: Checkout
  - Checkout time (from `checkout.departureNotes.checkoutTime`)
  - Key return/lock instructions (from `checkout.departureNotes.keyLockInstructions`)
  - Departure reminders (from `checkout.departureNotes.reminders`)
  - Checklist items grouped by category (clean, return, trash, other)
  - Contact information (phone, email, emergency from `checkout.departureNotes.contactInfo`)

### CR2: Important Information Highlighting
- **CR2.1**: Wi-Fi password should be prominently displayed (large, bold)
- **CR2.2**: Smart lock code should be prominently displayed
- **CR2.3**: Contact information should be easy to find:
  - Host phone (from `checkout.departureNotes.contactInfo.phone` if available)
  - Host email (from `checkout.departureNotes.contactInfo.email` if available)
  - Emergency contact (from `checkout.departureNotes.contactInfo.emergency` if available)
- **CR2.4**: Checkout time (from `checkout.departureNotes.checkoutTime`) should be clearly stated
  - Note: Check-in time is not currently in the data structure

### CR3: Formatting Guidelines
- **CR3.1**: Use clear hierarchy (H1 for sections, H2 for subsections, H3 for details)
- **CR3.2**: Use consistent spacing and margins
- **CR3.3**: Use readable font sizes (10-12pt body, larger for headings)
- **CR3.4**: Use appropriate line spacing for readability
- **CR3.5**: Break long content across pages appropriately

## Non-Functional Requirements

### NFR1: Performance
- **NFR1.1**: PDF generation should complete within 10 seconds for typical content
- **NFR1.2**: PDF download should start immediately after generation
- **NFR1.3**: PDF generation should not significantly impact website performance
- **NFR1.4**: PDF file size should be optimized (< 5MB typical)

### NFR2: Browser Compatibility
- **NFR2.1**: PDF generation should work in modern browsers (Chrome, Firefox, Safari, Edge)
- **NFR2.2**: PDF download should work on mobile browsers
- **NFR2.3**: PDF should be readable in standard PDF viewers (Adobe, Preview, etc.)

### NFR3: Accessibility
- **NFR3.1**: Download button should be keyboard accessible
- **NFR3.2**: Download button should have proper ARIA labels
- **NFR3.3**: PDF should have proper document structure for screen readers
- **NFR3.4**: PDF should use semantic headings and structure
- **NFR3.5**: PDF images should include alt text for accessibility (from `imageAlt` field in local guide recommendations)

### NFR4: Maintainability
- **NFR4.1**: PDF generation should use same content files as website
- **NFR4.2**: Changes to content files should automatically reflect in PDF
- **NFR4.3**: PDF generation code should be modular and testable
- **NFR4.4**: PDF template should be easy to update and customize

## Dependencies

### New Dependencies
- PDF generation library:
  - `@react-pdf/renderer` (recommended for React-based approach)
  - OR `jsPDF` + `html2canvas` (alternative client-side approach)
  - OR `puppeteer` (if using server-side approach)
- Markdown processing (if not already available):
  - `marked` or `remark` for markdown parsing
- Image processing (optional):
  - Image optimization library if needed

### Existing Dependencies
- React 19+
- TypeScript
- Content data files (JSON)
- Lucide React (for icons)

## Out of Scope (Future Enhancements)

- Customizable PDF templates (different styles/themes)
- PDF generation with user-selected sections only
- PDF generation with custom branding/logo
- PDF generation with property photos embedded (cover page image/logo)
- Server-side PDF caching
- PDF versioning or update notifications
- Multi-language PDF support
- Interactive PDF elements (forms, buttons)
- PDF compression optimization
- Batch PDF generation for multiple properties
- Code block formatting in markdown (not present in current content)
- Image fetching and embedding (MVP will use URLs directly)

## Success Criteria

1. PDF can be generated and downloaded successfully from the website
2. PDF contains all essential guidebook content from JSON data files
3. PDF is well-formatted and readable on screen and when printed
4. PDF generation completes within 10 seconds for typical content
5. PDF file size is reasonable (< 5MB)
6. PDF works in standard PDF viewers
7. PDF content stays in sync with website content
8. Download button is accessible and works on all pages
9. PDF includes all critical information (Wi-Fi, smart lock, checkout time, emergency contacts)
10. PDF has professional appearance matching website quality

## Notes

- PDF generation should be a progressive enhancement - website should work without it
- Consider starting with a simpler PDF (text-only) and adding images later
- PDF can be optimized for printing (grayscale, page breaks) vs. screen viewing (color, links)
- Consider providing both "screen" and "print" optimized PDF versions (future enhancement)
- PDF generation may require handling CORS issues if fetching external images
- Consider caching generated PDF if content doesn't change frequently (future optimization)
- PDF should be useful for guests who prefer offline access or want to print the guidebook

