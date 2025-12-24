# Task Breakdown: Downloadable PDF Guidebook

## Overview

This document breaks down the PDF download implementation into detailed, actionable tasks. The implementation is much simpler than PDF generation - we're just downloading a pre-existing PDF file.

**Property**: 9926 Ledgestone Ter, Austin, TX 78737 - A Hill Country retreat on 8.4 acres

**Integration**: This feature integrates with the existing guidebook website (spec 001). The PDF file is manually created and stored in the public directory.

---

## Phase 1: Core Functionality

**Goal**: Basic PDF download functionality

**Deliverables**:
- PDF download button in header
- Download utility function
- Error handling
- Integration with header

---

### Task 1.1: Create Feature Folder Structure

**Description**: Set up the PDF export feature directory structure.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/` directory
2. Create subdirectories:
   - `components/`
   - `utils/`
3. Verify structure matches plan specification

**Acceptance Criteria**:
- [ ] All directories created
- [ ] Structure matches plan.md specification
- [ ] Ready for component files

**Estimated Time**: 5 minutes

---

### Task 1.2: Create Download Utility Function

**Description**: Create utility function to handle PDF file download.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/utils/downloadPdf.ts`
2. Implement function:
   - Accept optional filename parameter
   - Create anchor element
   - Set href to `/guidebook.pdf`
   - Set download attribute with filename
   - Append to DOM
   - Trigger click
   - Remove from DOM
   - Handle errors
3. Export function

**Acceptance Criteria**:
- [ ] Function created
- [ ] Function triggers download correctly
- [ ] Function handles errors gracefully
- [ ] Function cleans up DOM elements

**Estimated Time**: 30 minutes

---

### Task 1.3: Create PdfDownloadButton Component

**Description**: Create download button component for header integration.

**Steps**:
1. Create `guidebook-app/src/features/pdf-export/components/PdfDownloadButton.tsx`
2. Import Download icon from lucide-react
3. Import downloadPdf utility
4. Create button component:
   - Use Download icon
   - Label: "Download PDF Guidebook"
   - onClick handler calls downloadPdf
   - Proper ARIA labels
   - Keyboard accessible
5. Create `PdfDownloadButton.module.css`:
   - Style button to match design system
   - Mobile-responsive
   - Hover and focus states
6. Add error handling:
   - Try-catch around downloadPdf call
   - Show user-friendly error message if download fails

**Acceptance Criteria**:
- [ ] Component created
- [ ] Button triggers download
- [ ] Button is styled correctly
- [ ] Button is accessible
- [ ] Error handling works
- [ ] Mobile-responsive

**Estimated Time**: 45 minutes

---

### Task 1.4: Integrate Download Button into Header

**Description**: Add PDF download button to the main header component.

**Steps**:
1. Open `guidebook-app/src/shared/components/Layout/Header.tsx`
2. Import `PdfDownloadButton` component
3. Add button to header layout:
   - Position in header actions area
   - Ensure proper spacing
   - Maintain responsive design
4. Update `Header.module.css` if needed:
   - Ensure button fits in header
   - Mobile layout adjustments

**Acceptance Criteria**:
- [ ] Button appears in header
- [ ] Button is accessible from all pages
- [ ] Button doesn't break existing layout
- [ ] Button is mobile-responsive
- [ ] Button is properly positioned

**Estimated Time**: 30 minutes

---

### Task 1.5: Add PDF File to Public Directory

**Description**: Place the PDF file in the public directory for download.

**Steps**:
1. Create or copy PDF file
2. Place file in `guidebook-app/public/` directory
3. Name file `guidebook.pdf` (or update path in code if different)
4. Verify file is accessible:
   - In development: `http://localhost:5173/guidebook.pdf`
   - In production: `/guidebook.pdf`

**Acceptance Criteria**:
- [ ] PDF file exists in public directory
- [ ] File is accessible via URL
- [ ] File path matches code implementation
- [ ] File is included in build output

**Estimated Time**: 5 minutes (plus time to create PDF if needed)

---

### Task 1.6: Test Download Functionality

**Description**: Test PDF download in various scenarios.

**Steps**:
1. Test download in Chrome
2. Test download in Firefox
3. Test download in Safari
4. Test download in Edge
5. Test on mobile device
6. Test with missing file (error handling)
7. Test keyboard navigation
8. Test screen reader accessibility

**Acceptance Criteria**:
- [ ] Download works in all tested browsers
- [ ] Download works on mobile
- [ ] Error handling works correctly
- [ ] Keyboard navigation works
- [ ] Screen reader announces button correctly

**Estimated Time**: 30 minutes

---

## Phase 2: Polish & Enhancement

**Goal**: Improve user experience and error handling

---

### Task 2.1: Enhance Error Handling

**Description**: Improve error messages and handling.

**Steps**:
1. Add better error detection:
   - Check if file exists before attempting download
   - Handle network errors
   - Handle browser download restrictions
2. Improve error messages:
   - User-friendly messages
   - Actionable suggestions
   - Optional retry mechanism
3. Add error logging for debugging

**Acceptance Criteria**:
- [ ] Better error detection
- [ ] User-friendly error messages
- [ ] Error logging works
- [ ] Users understand what went wrong

**Estimated Time**: 30 minutes

---

### Task 2.2: Add Download Feedback

**Description**: Provide visual feedback when download is triggered.

**Steps**:
1. Add brief success message or visual indicator
2. Optional: Show download progress (if possible)
3. Ensure feedback doesn't block UI
4. Make feedback accessible

**Acceptance Criteria**:
- [ ] Users get feedback when download starts
- [ ] Feedback is non-intrusive
- [ ] Feedback is accessible
- [ ] Feedback works on mobile

**Estimated Time**: 20 minutes

---

### Task 2.3: Improve Accessibility

**Description**: Ensure download button is fully accessible.

**Steps**:
1. Review ARIA labels
2. Test with screen readers
3. Ensure keyboard navigation works
4. Add focus indicators
5. Test with keyboard-only navigation

**Acceptance Criteria**:
- [ ] Button is fully accessible
- [ ] Screen readers announce correctly
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible

**Estimated Time**: 20 minutes

---

## Summary

**Total Estimated Time**: ~3 hours

**Key Deliverables**:
- PDF download button in header
- Download utility function
- Error handling
- Accessibility features
- Mobile responsiveness

**Dependencies**: None (no new npm packages)

**Complexity**: Low (simple file download)
