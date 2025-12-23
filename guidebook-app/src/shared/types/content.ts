// Content type definitions for the guidebook website

export interface PropertyInfo {
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

export interface WiFiInfo {
  ssid: string;
  password: string;
  instructions: string; // Markdown supported
  troubleshooting: string[]; // Markdown supported
}

export interface SmartLockInfo {
  code: string;
  instructions: string; // Markdown supported
  troubleshooting: string[];
}

export interface HouseRules {
  rules: string[];
  quietHours: string;
  guestCapacity: number;
  petPolicy?: string;
  smokingPolicy: string;
  outdoorGuidelines: string[];
}

export interface HowToGuide {
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

export interface LocalRecommendation {
  name: string;
  type: 'restaurant' | 'coffee' | 'grocery' | 'activity' | 'attraction';
  description: string; // Markdown supported
  distance?: string;
  priceRange?: string;
  address?: string;
  phone?: string;
  website?: string;
  social?: {
    facebook?: string; // Facebook page URL
    instagram?: string; // Instagram profile URL
    twitter?: string; // Twitter/X profile URL
    yelp?: string; // Yelp business page URL
    tripadvisor?: string; // TripAdvisor page URL
  };
  image?: string; // URL to image from company website or placeholder
  imageAlt?: string; // Alt text for accessibility
}

export interface ChecklistItem {
  id: string;
  category: 'clean' | 'return' | 'trash' | 'other';
  text: string;
}

export interface ContentData {
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

