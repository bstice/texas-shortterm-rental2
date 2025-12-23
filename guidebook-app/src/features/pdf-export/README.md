# PDF Export Feature

## Overview

The PDF Export feature allows users to download a complete, offline-ready PDF version of the guest guidebook. The PDF includes all guidebook content, formatted for both screen viewing and printing.

## Features

- **Complete Content Export**: All guidebook sections are included in the PDF
- **Image Support**: Images are converted to base64 and embedded in the PDF
- **Markdown Rendering**: Markdown content is properly formatted in the PDF
- **Progress Tracking**: Real-time progress updates during PDF generation
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Performance Optimized**: Code splitting, image caching, and performance monitoring

## Architecture

### Components

- **`PdfDownloadButton`**: Main UI component for triggering PDF generation
- **`PdfGenerationProgress`**: Progress indicator with status messages
- **`PdfDocument`**: Root PDF document component
- **PDF Templates**: Section-specific components (`PdfCover`, `PdfTableOfContents`, `PdfPropertyOverview`, etc.)

### Hooks

- **`usePdfGeneration`**: Manages PDF generation state and logic

### Utilities

- **`pdfGenerator.ts`**: Core PDF generation logic
- **`imagePreprocessor.ts`**: Converts images to base64
- **`imageHandler.ts`**: Image path resolution and conversion utilities
- **`markdownToPdf.tsx`**: Markdown to PDF component conversion
- **`contentProcessor.ts`**: Content formatting utilities
- **`errors.ts`**: Custom error types and logging

## Usage

### Basic Usage

```tsx
import PdfDownloadButton from '@features/pdf-export/components/PdfDownloadButton';

function MyComponent() {
  return <PdfDownloadButton />;
}
```

### Programmatic Usage

```tsx
import { usePdfGeneration } from '@features/pdf-export/hooks/usePdfGeneration';
import { useContent } from '@shared/hooks/useContent';

function MyComponent() {
  const { content } = useContent();
  const { generatePdf, isGenerating, error, progress } = usePdfGeneration();

  const handleGenerate = async () => {
    if (content) {
      try {
        await generatePdf(content);
      } catch (err) {
        console.error('PDF generation failed:', err);
      }
    }
  };

  return (
    <button onClick={handleGenerate} disabled={isGenerating}>
      {isGenerating ? `Generating... ${progress}%` : 'Generate PDF'}
    </button>
  );
}
```

## PDF Generation Process

1. **Content Validation** (0-5%): Validates content structure and required fields
2. **Image Preprocessing** (5-40%): Converts all images to base64 data URLs
3. **Library Loading** (40-45%): Dynamically imports `@react-pdf/renderer`
4. **Document Creation** (45-50%): Creates PDF document structure
5. **PDF Rendering** (50-95%): Renders PDF to Blob
6. **Download** (95-100%): Triggers browser download

## Error Handling

The feature includes comprehensive error handling with custom error types:

- **`PdfGenerationError`**: Base error for PDF generation issues
- **`InvalidContentError`**: Content validation errors
- **`ImageProcessingError`**: Image conversion errors
- **`PdfRenderingError`**: PDF rendering errors
- **`PdfDownloadError`**: Download errors

All errors are logged with context and provide user-friendly messages.

## Performance

### Targets

- **Generation Time**: < 10 seconds
- **File Size**: < 5MB

### Optimizations

- Dynamic import of `@react-pdf/renderer` for code splitting
- Image caching using browser cache
- Base64 image skipping (already converted images)
- Network error retry logic (2 retries with exponential backoff)
- Performance monitoring with `performance.now()`

## Accessibility

### Features

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader announcements for progress and errors
- Focus indicators for keyboard users
- Semantic document structure in PDF

### ARIA Attributes

- `aria-label`: Descriptive labels for buttons
- `aria-busy`: Indicates when PDF is generating
- `aria-describedby`: Links error messages to buttons
- `aria-live`: Live regions for progress updates
- `role="alert"`: Error messages
- `role="status"`: Progress updates
- `role="progressbar"`: Progress bar with value attributes

## Edge Cases Handled

- **Missing Content Fields**: Graceful handling with fallbacks
- **Empty Arrays**: Logged as warnings, PDF still generated
- **Very Long Content**: Warned but allowed
- **Malformed Markdown**: Rendered as plain text fallback
- **Missing Images**: Placeholder shown, PDF continues
- **Network Errors**: Retry logic with exponential backoff
- **CORS Errors**: Images skipped with graceful degradation
- **Timeout Errors**: Images skipped after timeout

## Known Limitations

1. **Page Numbers**: Currently approximate (not dynamically calculated)
2. **Image Size**: Large images may increase PDF file size significantly
3. **External Images**: May fail due to CORS restrictions
4. **Markdown Support**: Limited to basic markdown features (headings, paragraphs, lists, links, bold, italic, code)
5. **Browser Support**: Requires modern browsers with Blob and URL APIs

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Mobile browsers: May have limitations with large PDFs

## Dependencies

- `@react-pdf/renderer`: PDF generation library
- `marked`: Markdown parsing
- `lucide-react`: Icons

## File Structure

```
pdf-export/
├── components/
│   ├── PdfDownloadButton.tsx
│   ├── PdfDownloadButton.module.css
│   ├── PdfGenerationProgress.tsx
│   └── PdfGenerationProgress.module.css
├── hooks/
│   └── usePdfGeneration.ts
├── templates/
│   ├── PdfDocument.tsx
│   ├── PdfCover.tsx
│   ├── PdfTableOfContents.tsx
│   ├── PdfPropertyOverview.tsx
│   ├── PdfBeforeYouArrive.tsx
│   ├── PdfDuringYourStay.tsx
│   ├── PdfLocalGuide.tsx
│   ├── PdfCheckout.tsx
│   └── sharedStyles.ts
├── types/
│   └── pdf.ts
└── utils/
    ├── pdfGenerator.ts
    ├── imagePreprocessor.ts
    ├── imageHandler.ts
    ├── markdownToPdf.tsx
    ├── contentProcessor.ts
    └── errors.ts
```

## Development

### Adding New PDF Sections

1. Create a new template component in `templates/`
2. Import and use in `PdfDocument.tsx`
3. Add section heading to `extractSectionHeadings()` in `contentProcessor.ts`
4. Update `sharedStyles.ts` if needed

### Customizing Styles

Styles are centralized in `templates/sharedStyles.ts`. Modify this file to change the appearance of all PDF sections.

### Testing

Test the following scenarios:

1. **Normal Generation**: Generate PDF with complete content
2. **Missing Images**: Generate PDF with some images missing
3. **Empty Sections**: Generate PDF with empty arrays
4. **Network Errors**: Test with network throttling
5. **Large Content**: Test with very long text fields
6. **Malformed Markdown**: Test with invalid markdown

## Troubleshooting

### PDF Generation Fails

1. Check browser console for errors
2. Verify content data structure
3. Check network connectivity for image loading
4. Verify `@react-pdf/renderer` is properly installed

### Images Not Appearing

1. Check CORS settings for external images
2. Verify image URLs are accessible
3. Check browser console for image loading errors
4. Images may be skipped if they fail to load (non-critical)

### Large File Size

1. Optimize images before adding to content
2. Consider image compression
3. Reduce number of images if possible
4. Check performance logs for file size warnings

### Slow Generation

1. Check performance logs for bottlenecks
2. Reduce number of images
3. Optimize image sizes
4. Check network speed for image loading

## Future Enhancements

- [ ] Dynamic page number calculation
- [ ] Image compression optimization
- [ ] Advanced markdown features (tables, code blocks)
- [ ] PDF customization options (theme, layout)
- [ ] Batch PDF generation
- [ ] PDF preview before download
- [ ] Print-specific optimizations

