<!--
Sync Impact Report:
- Version: 2.0.0 (Major revision - scope change)
- Previous version was over-engineered for multi-property booking platform
- Updated to reflect single-property guest guidebook website
- Removed: Payment processing, booking systems, complex security, multi-tenancy
- Added: Content-first principles, mobile-first design, guest experience focus
- Simplified from 6 to 4 core principles
- Templates: ✅ All templates reviewed and compatible
-->

# Texas Short-Term Rental Guidebook Constitution

## Project Scope

This is a **single-property digital guidebook website** for short-term rental guests. The guidebook provides comprehensive property information, local recommendations, and helpful resources to enhance the guest experience during their stay.

## Core Principles

### I. Content Clarity First

All information MUST be clear, accurate, and easy for guests to understand:

- Information organized by logical categories (property details, local recommendations, emergency contacts)
- Plain language - no jargon or complex terminology
- Key information accessible within 2 clicks from homepage
- Search functionality to quickly find specific items (e.g., "WiFi password", "coffee maker")
- Content must be scannable with clear headings and bullet points
- All room-specific information clearly labeled by room name/number
- Emergency information prominently displayed and easy to find

**Rationale**: Guests arrive tired, may be in a hurry, or dealing with issues (broken appliance, can't find supplies). Information must be immediately accessible and understandable.

### II. Mobile-First Design (NON-NEGOTIABLE)

The guidebook MUST work beautifully on mobile devices as this is how 90%+ of guests will access it:

- Responsive design that adapts to phone, tablet, and desktop
- Touch-friendly navigation with large tap targets
- Fast loading times (< 2 seconds on mobile network)
- Readable text without zooming (minimum 16px font size)
- Images optimized for mobile (compressed but high quality)
- Offline-capable or cached for areas with poor signal
- No horizontal scrolling required

**Rationale**: Guests will primarily access the guidebook on their phones while standing in the kitchen, looking at an appliance, or exploring the area. Desktop optimization is secondary.

### III. Guest Experience Excellence

The guidebook MUST enhance the guest experience and reduce host inquiries:

- Answers common questions proactively (WiFi, parking, check-out procedures)
- Visual aids where helpful (photos of appliances, maps, diagrams)
- Step-by-step instructions for complex items (smart TV, thermostat, hot tub)
- Local recommendations with addresses, hours, and phone numbers
- Tone should be warm, welcoming, and helpful
- Anticipate guest needs at different times (arrival, during stay, checkout)
- Reduce need for guests to contact host for basic information

**Rationale**: A great guidebook improves guest satisfaction, reduces host interruptions, and leads to better reviews and repeat bookings.

### IV. Easy Content Management

Property information MUST be easy to update without technical knowledge:

- Content changes should not require code deployment
- Updates should be immediately visible to guests
- Non-technical property owner should be able to edit content
- Version history or backup of previous content
- Ability to add/update photos without developer help
- Changes should be testable before going live

**Rationale**: Property details change frequently (WiFi password, local restaurant hours, new amenities). Updates must be quick and simple to keep information accurate.

## Design & User Experience Standards

### Navigation Structure

- **Homepage**: Welcome message, property highlights, quick links to key info
- **Property Information**: House rules, WiFi, parking, trash, check-in/out
- **Rooms**: Bedroom and bathroom details organized by room
- **Kitchen & Appliances**: Inventory, locations, instructions
- **Amenities**: Pool, hot tub, game room, outdoor spaces, equipment
- **Local Area**: Restaurants, activities, shopping, emergency contacts
- **Housekeeping**: Cleaning supplies, laundry, maintenance contacts

### Content Presentation

- Use icons and visual indicators for quick scanning
- Group related information together
- Use collapsible sections for lengthy content
- Include photos for visual reference (appliances, locations, views)
- Highlight emergency and critical information
- Use consistent formatting throughout

### Accessibility

- WCAG 2.1 AA compliance minimum
- High contrast text for readability
- Alt text for all images
- Keyboard navigation support
- Screen reader friendly

## Technical Constraints

### Technology Stack

- **Frontend**: Modern, mobile-responsive framework (React, Vue, or similar)
- **Content Management**: Simple CMS or structured data files (JSON, Markdown)
- **Hosting**: Fast, reliable hosting with SSL certificate
- **Images**: Optimized and compressed, with lazy loading
- **Search**: Client-side search for instant results (Fuse.js or similar)

### Performance Standards

- Page load time: < 2 seconds on 3G mobile connection
- First Contentful Paint: < 1.5 seconds
- Time to Interactive: < 3 seconds
- Images: WebP format with fallbacks, max 200KB per image
- Bundle size: < 500KB total for initial load

### Optional Enhancements

- **Password Protection**: Optional simple password for guest-only access
- **QR Code**: Generate QR code for easy access from printed card
- **Offline Mode**: Service worker for offline access
- **Print-Friendly**: CSS for clean printing if guests want hard copy
- **Dark Mode**: Optional dark theme for night reading

## Development Workflow

### Feature Development Process

1. **Specification**: Define what content/features to add using `/speckit.specify`
2. **Planning**: Create technical plan using `/speckit.plan`
3. **Task Breakdown**: Break into actionable tasks using `/speckit.tasks`
4. **Implementation**: Build the feature using `/speckit.implement`
5. **Review**: Verify design, usability, and mobile experience
6. **Test**: Test on actual mobile devices (iOS and Android)
7. **Deploy**: Push changes to production

### Quality Gates

Before any feature can be deployed:

- [ ] Works perfectly on mobile devices (iPhone and Android)
- [ ] Loads quickly on 3G mobile connection
- [ ] Content is clear and easy to understand
- [ ] Navigation is intuitive (no user confusion)
- [ ] Images are optimized and load fast
- [ ] Guest can find information in 2 clicks or less
- [ ] Tested by someone unfamiliar with the property
- [ ] No broken links or missing information

### Testing Requirements

- **Device Testing**: Test on actual phones and tablets, not just browser responsive mode
- **User Testing**: Have someone unfamiliar with property find specific information
- **Performance Testing**: Verify load times on slow connections
- **Content Review**: Property owner approves all content for accuracy
- **Cross-browser**: Works in Safari (iOS), Chrome (Android), and major desktop browsers

## Content Standards

### Writing Style

- **Friendly & Welcoming**: Warm tone as if talking to a friend
- **Concise**: Get to the point quickly, respect guest's time
- **Action-Oriented**: Tell guests what to do, not just what exists
- **Anticipatory**: Answer questions before they're asked

### Required Information Sections

Based on the guidebook questionnaire, these sections are required:

1. **Property Basics**: Address, capacity, WiFi, security cameras, house rules
2. **Check-In/Out**: Procedures, times, parking, trash collection
3. **Bedrooms**: Per-room details (location, bed sizes, amenities, linens)
4. **Bathrooms**: Per-bathroom details (supplies, amenities)
5. **Kitchen**: Appliances, inventory, locations of items
6. **Amenities**: Pool, hot tub, game room, outdoor spaces, equipment available
7. **Housekeeping**: Cleaning supplies locations, laundry, maintenance contacts
8. **Local Recommendations**: Restaurants, activities, shopping, attractions
9. **Emergency Info**: Contacts, nearest hospital, property manager

### Content Accuracy

- All information must be current and accurate
- WiFi passwords, lock codes updated immediately if changed
- Local business hours verified within last 3 months
- Photos reflect current state of property
- Outdated information removed or marked as "call to verify"

## Governance

### Constitutional Authority

This constitution guides all development decisions for the guidebook website. When in doubt, prioritize: **Guest Experience > Content Clarity > Mobile Experience > Easy Updates**

### Amendment Process

Constitution changes require:

1. Written rationale for change
2. Version bump (MAJOR for principle changes, MINOR for additions, PATCH for clarifications)
3. Update of this Sync Impact Report
4. Review of existing features for compatibility

### Simplicity Commitment

This project intentionally avoids:

- Complex authentication systems
- Payment processing
- Booking/reservation functionality
- Multi-property management
- Guest data collection beyond basic analytics
- Social features or guest-to-guest communication

**If a feature doesn't directly help guests use the property or find local information, it's out of scope.**

**Version**: 2.0.0 | **Ratified**: 2025-11-16 | **Last Amended**: 2025-11-16
