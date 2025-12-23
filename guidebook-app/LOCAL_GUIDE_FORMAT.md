# Local Guide Content Format

This document explains the format for adding local recommendations to `src/data/local-guide.json`.

## File Structure

The file has the following sections:
- `restaurants` - Array of restaurant recommendations
- `coffee` - Array of coffee shop recommendations
- `groceries` - Array of grocery store recommendations
- `outdoorActivities` - Object with three arrays:
  - `hiking` - Hiking trails
  - `hillCountry` - Hill Country attractions
  - `parks` - Parks and nature areas
- `austinAttractions` - Object with two arrays:
  - `downtown` - Downtown Austin attractions
  - `localSpots` - Local spots in the 78737 area
- `transportation` - Object with text content (not recommendations)

## Recommendation Object Format

Each recommendation is a JSON object with the following fields:

```json
{
  "name": "Business or Place Name",
  "type": "restaurant" | "coffee" | "grocery" | "activity" | "attraction",
  "description": "Description text (supports Markdown formatting)",
  "distance": "5 minutes" | "10 minutes" | "20 minutes" | etc.,
  "priceRange": "$" | "$$" | "$$$" | "$$$$" (optional, for restaurants/coffee),
  "address": "Full street address, City, State ZIP",
  "phone": "(512) 555-1234" (optional),
  "website": "https://example.com" (optional but recommended),
  "social": {
    "facebook": "https://facebook.com/page" (optional),
    "instagram": "https://instagram.com/profile" (optional),
    "twitter": "https://twitter.com/profile" (optional),
    "yelp": "https://yelp.com/biz/business" (optional),
    "tripadvisor": "https://tripadvisor.com/restaurant" (optional)
  },
  "image": "https://example.com/image.jpg" (optional),
  "imageAlt": "Descriptive alt text for accessibility" (optional, required if image provided)
}
```

## Field Details

### Required Fields
- **`name`** (string): The name of the business or place
- **`type`** (string): One of: `"restaurant"`, `"coffee"`, `"grocery"`, `"activity"`, or `"attraction"`
- **`description`** (string): A description of the place. Supports Markdown formatting (bold, italic, links, lists)

### Optional Fields
- **`distance`** (string): Distance from the property (e.g., "5 minutes", "10 minutes", "20 minutes")
- **`priceRange`** (string): Price range indicator. Typically used for restaurants/coffee:
  - `"$"` = Budget-friendly
  - `"$$"` = Moderate
  - `"$$$"` = Expensive
  - `"$$$$"` = Very expensive
- **`address`** (string): Full street address
- **`phone`** (string): Phone number in any format
- **`website`** (string): Full URL (must start with `http://` or `https://`). **Recommended per spec requirements**
- **`social`** (object): Social media links object with optional fields:
  - `facebook` (string): Facebook page URL
  - `instagram` (string): Instagram profile URL
  - `twitter` (string): Twitter/X profile URL
  - `yelp` (string): Yelp business page URL
  - `tripadvisor` (string): TripAdvisor page URL
  - All social links are optional - only include platforms that the business uses
  - Social links will display as clickable icons
- **`image`** (string): URL to an image. Can be:
  - Unsplash URL (e.g., `https://images.unsplash.com/photo-...`)
  - Business website image URL
  - Any publicly accessible image URL
- **`imageAlt`** (string): Descriptive text for screen readers. Required if `image` is provided

## Examples

### Restaurant Example
```json
{
  "name": "Salt Lick BBQ",
  "type": "restaurant",
  "description": "Famous Texas BBQ restaurant with live music and outdoor seating. Known for their brisket and ribs.",
  "distance": "15 minutes",
  "priceRange": "$$",
  "address": "18300 Farm to Market Rd 1826, Driftwood, TX 78619",
  "phone": "(512) 858-4959",
  "website": "https://saltlickbbq.com",
  "social": {
    "facebook": "https://facebook.com/saltlickbbq",
    "instagram": "https://instagram.com/saltlickbbq",
    "yelp": "https://yelp.com/biz/salt-lick-bbq-driftwood"
  },
  "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
  "imageAlt": "Salt Lick BBQ restaurant with outdoor seating"
}
```

### Coffee Shop Example
```json
{
  "name": "Summer Moon Coffee",
  "type": "coffee",
  "description": "Local coffee roaster with wood-fired coffee. Great for morning espresso or afternoon pick-me-up.",
  "distance": "8 minutes",
  "priceRange": "$",
  "address": "12345 Brodie Ln, Austin, TX 78737",
  "phone": "(512) 555-1234",
  "website": "https://summermooncoffee.com",
  "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop",
  "imageAlt": "Summer Moon Coffee shop interior"
}
```

### Grocery Store Example
```json
{
  "name": "H-E-B",
  "type": "grocery",
  "description": "Full-service grocery store with fresh produce, local products, and prepared foods. Open 24/7.",
  "distance": "5 minutes",
  "address": "2501 W Slaughter Ln, Austin, TX 78748",
  "phone": "(512) 292-4100",
  "website": "https://www.heb.com",
  "image": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
  "imageAlt": "H-E-B grocery store exterior"
}
```

### Outdoor Activity Example
```json
{
  "name": "Barton Creek Greenbelt",
  "type": "activity",
  "description": "Popular hiking and biking trail system with swimming holes and scenic views. Great for outdoor recreation.",
  "distance": "25 minutes",
  "address": "Barton Creek Greenbelt, Austin, TX",
  "website": "https://www.austintexas.gov/department/barton-creek-greenbelt",
  "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  "imageAlt": "Barton Creek Greenbelt hiking trail"
}
```

### Attraction Example
```json
{
  "name": "Zilker Park",
  "type": "attraction",
  "description": "Large park with Barton Springs Pool, botanical gardens, and plenty of space for picnics and recreation.",
  "distance": "25 minutes",
  "address": "2100 Barton Springs Rd, Austin, TX 78746",
  "website": "https://www.austintexas.gov/department/zilker-metropolitan-park",
  "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
  "imageAlt": "Zilker Park with downtown Austin skyline"
}
```

## Markdown Support in Description

The `description` field supports Markdown formatting:

- **Bold text**: `**bold**` → **bold**
- *Italic text*: `*italic*` → *italic*
- Links: `[Link text](https://example.com)` → [Link text](https://example.com)
- Lists:
  ```
  - Item 1
  - Item 2
  ```
- Line breaks: Use double space + newline or two newlines

## Complete File Structure Example

```json
{
  "restaurants": [
    {
      "name": "Restaurant Name",
      "type": "restaurant",
      "description": "Description here",
      "distance": "10 minutes",
      "priceRange": "$$",
      "address": "123 Main St, Austin, TX 78737",
      "phone": "(512) 555-1234",
      "website": "https://restaurant.com",
      "image": "https://images.unsplash.com/photo-...",
      "imageAlt": "Restaurant description"
    }
  ],
  "coffee": [
    {
      "name": "Coffee Shop Name",
      "type": "coffee",
      "description": "Description here",
      "distance": "5 minutes",
      "priceRange": "$",
      "address": "456 Oak Ave, Austin, TX 78737",
      "website": "https://coffeeshop.com",
      "image": "https://images.unsplash.com/photo-...",
      "imageAlt": "Coffee shop description"
    }
  ],
  "groceries": [
    {
      "name": "Grocery Store Name",
      "type": "grocery",
      "description": "Description here",
      "distance": "5 minutes",
      "address": "789 Market St, Austin, TX 78737",
      "website": "https://grocery.com",
      "image": "https://images.unsplash.com/photo-...",
      "imageAlt": "Grocery store description"
    }
  ],
  "outdoorActivities": {
    "hiking": [
      {
        "name": "Trail Name",
        "type": "activity",
        "description": "Description here",
        "distance": "15 minutes",
        "website": "https://trail.com",
        "image": "https://images.unsplash.com/photo-...",
        "imageAlt": "Trail description"
      }
    ],
    "hillCountry": [
      {
        "name": "Attraction Name",
        "type": "attraction",
        "description": "Description here",
        "distance": "20 minutes",
        "website": "https://attraction.com",
        "image": "https://images.unsplash.com/photo-...",
        "imageAlt": "Attraction description"
      }
    ],
    "parks": [
      {
        "name": "Park Name",
        "type": "activity",
        "description": "Description here",
        "distance": "25 minutes",
        "website": "https://park.com",
        "image": "https://images.unsplash.com/photo-...",
        "imageAlt": "Park description"
      }
    ]
  },
  "austinAttractions": {
    "downtown": [
      {
        "name": "Downtown Attraction",
        "type": "attraction",
        "description": "Description here",
        "distance": "20 minutes",
        "website": "https://attraction.com",
        "image": "https://images.unsplash.com/photo-...",
        "imageAlt": "Attraction description"
      }
    ],
    "localSpots": [
      {
        "name": "Local Spot",
        "type": "attraction",
        "description": "Description here",
        "distance": "10 minutes",
        "website": "https://localspot.com",
        "image": "https://images.unsplash.com/photo-...",
        "imageAlt": "Local spot description"
      }
    ]
  },
  "transportation": {
    "driving": "Driving directions text (supports Markdown)",
    "rideSharing": "Ride-sharing information (supports Markdown)",
    "parking": "Parking information (supports Markdown)",
    "carRental": "Car rental information (supports Markdown, optional)"
  }
}
```

## Tips

1. **Website URLs**: Always include `https://` or `http://` at the beginning
2. **Distance**: Use consistent format like "5 minutes", "10 minutes", "20 minutes"
3. **Images**: 
   - Use Unsplash for generic images: `https://images.unsplash.com/photo-...`
   - Use business websites for specific business photos
   - Always include `imageAlt` for accessibility
4. **Phone Numbers**: Any format is fine, but consistent formatting looks better
5. **Multiple Entries**: Add as many recommendations as you want to each array
6. **Order**: Order them by distance or preference - the order they appear in the array is how they'll display

## Quick Reference

**Minimum required fields:**
- `name`
- `type`
- `description`

**Recommended fields:**
- `distance`
- `address`
- `website` (per spec requirement)
- `social` (per spec requirement - include where available)
- `image` + `imageAlt`

**Optional but helpful:**
- `priceRange` (for restaurants/coffee)
- `phone`

