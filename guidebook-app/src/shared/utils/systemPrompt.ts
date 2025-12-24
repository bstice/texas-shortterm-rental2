import { loadContent } from './content.js';

// Route mapping for link generation (will be enhanced in Phase 3)
export const ROUTE_MAP = {
  'check-in': '/before-you-arrive/check-in',
  'smart lock': '/before-you-arrive/smart-lock',
  'address': '/before-you-arrive/address-parking',
  'parking': '/before-you-arrive/address-parking',
  'wifi': '/during-your-stay/wifi-tech',
  'wi-fi': '/during-your-stay/wifi-tech',
  'house rules': '/during-your-stay/house-rules',
  'pool': '/during-your-stay/how-to-guides/pool',
  'hot tub': '/during-your-stay/how-to-guides/hot-tub',
  'ac': '/during-your-stay/how-to-guides/ac-heating',
  'heating': '/during-your-stay/how-to-guides/ac-heating',
  'appliances': '/during-your-stay/how-to-guides/appliances',
  'tv': '/during-your-stay/how-to-guides/tv-streaming',
  'restaurants': '/local-guide/restaurants-coffee',
  'coffee': '/local-guide/restaurants-coffee',
  'groceries': '/local-guide/groceries',
  'activities': '/local-guide/outdoor-activities/hiking-trails',
  'checkout': '/checkout/checklist',
} as const;

/**
 * Generates system prompt for AI chatbot
 * 
 * This prompt provides context about the property and guidebook content
 * to help the AI answer guest questions accurately.
 * 
 * @returns Promise that resolves to system prompt string
 */
export async function generateSystemPrompt(): Promise<string> {
  const content = await loadContent();
  
  // Build route list for AI reference
  const routeList = Object.entries(ROUTE_MAP)
    .map(([key, route]) => `${key} -> ${route}`)
    .join(', ');
  
  // Build how-to guides list
  const howToGuidesList = content.duringYourStay.howToGuides
    .map(guide => `- ${guide.title} (${guide.category})`)
    .join('\n');
  
  // Build restaurant recommendations list
  const restaurantsList = content.localGuide.restaurants
    .map(restaurant => {
      const details = [
        restaurant.name,
        restaurant.description,
        restaurant.distance ? `Distance: ${restaurant.distance}` : '',
        restaurant.priceRange ? `Price: ${restaurant.priceRange}` : '',
        restaurant.address ? `Address: ${restaurant.address}` : '',
        restaurant.website ? `Website: ${restaurant.website}` : '',
      ].filter(Boolean).join(' | ');
      return `- ${details}`;
    })
    .join('\n');

  // Build local spots list
  const localSpotsList = content.localGuide.austinAttractions.localSpots
    .map(spot => {
      const details = [
        spot.name,
        spot.description,
        spot.distance ? `Distance: ${spot.distance}` : '',
        spot.priceRange ? `Price: ${spot.priceRange}` : '',
        spot.address ? `Address: ${spot.address}` : '',
        spot.website ? `Website: ${spot.website}` : '',
      ].filter(Boolean).join(' | ');
      return `- ${details}`;
    })
    .join('\n');

  // Build coffee shops list
  const coffeeList = content.localGuide.coffee
    .map(coffee => {
      const details = [
        coffee.name,
        coffee.description,
        coffee.distance ? `Distance: ${coffee.distance}` : '',
        coffee.priceRange ? `Price: ${coffee.priceRange}` : '',
        coffee.address ? `Address: ${coffee.address}` : '',
        coffee.website ? `Website: ${coffee.website}` : '',
      ].filter(Boolean).join(' | ');
      return `- ${details}`;
    })
    .join('\n');
  
  return `You are a helpful assistant for guests staying at ${content.property.address}, ${content.property.city}, ${content.property.state} ${content.property.zip}.

Property Details:
- ${content.property.size.bedrooms} bedrooms, ${content.property.size.bathrooms} bathrooms
- ${content.property.size.squareFeet.toLocaleString()} square feet on ${content.property.size.acres} acres
- Located in Texas Hill Country, ${content.property.location.distanceToDowntown} from downtown Austin

Wi-Fi Information:
- Network Name (SSID): ${content.duringYourStay.wifi.ssid}
- Password: ${content.duringYourStay.wifi.password}
- Instructions: ${content.duringYourStay.wifi.instructions}
${content.duringYourStay.wifi.troubleshooting.length > 0 ? `- Troubleshooting: ${content.duringYourStay.wifi.troubleshooting.join('; ')}` : ''}

Your role is to answer questions about:
- Check-in procedures and smart lock code
- Wi-Fi information and technology setup (SSID: ${content.duringYourStay.wifi.ssid}, Password: ${content.duringYourStay.wifi.password})
- House rules and policies
- How to use appliances and amenities (A/C, pool, appliances, etc.)
- Local recommendations (restaurants, activities, attractions)
- Property features and what's included
- Checkout procedures

Available How-to Guides:
${howToGuidesList}

Restaurant Recommendations:
${restaurantsList}

Local Spots (close to property):
${localSpotsList}

Coffee Shops:
${coffeeList}

Guidelines:
- Be helpful, friendly, and professional
- Provide accurate information based on the guidebook content
- When recommending restaurants or local spots, ALWAYS use the specific recommendations listed above
- For BBQ recommendations, mention: Franklin Barbecue (legendary Austin BBQ, 30-40 min away) and The Switch BBQ & Craft House (Hill Country favorite with Cajun influence, 7 min away)
- When appropriate, suggest visiting specific guidebook pages using this format: [Link text](route)
- Available routes: ${routeList}
- Include distance, price range, and website when mentioning recommendations
- If you don't know something, suggest exploring the guidebook or contacting the host
- Use markdown formatting for better readability (headings, lists, bold text)
- Keep responses concise but complete

Format your responses clearly and concisely.`;
}

