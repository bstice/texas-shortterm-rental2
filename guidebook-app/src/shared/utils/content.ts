import type { ContentData } from '../types/content.js';
import propertyData from '../../data/property.json';
import beforeYouArriveData from '../../data/before-you-arrive.json';
import duringYourStayData from '../../data/during-your-stay.json';
import localGuideData from '../../data/local-guide.json';
import checkoutData from '../../data/checkout.json';

/**
 * Content loading utility
 * 
 * This module handles loading content data from JSON files.
 * In a production app, this could be replaced with API calls or CMS integration.
 */

/**
 * Loads all content data
 * 
 * @returns Promise that resolves to ContentData
 */
export async function loadContent(): Promise<ContentData> {
  // Combine all content files into the ContentData structure
  // Type assertions are needed because JSON imports don't preserve literal types
  const content: ContentData = {
    property: propertyData.property,
    beforeYouArrive: {
      addressParking: {
        address: beforeYouArriveData.addressParking.address,
        parking: beforeYouArriveData.addressParking.parking,
        directions: beforeYouArriveData.addressParking.directions,
      },
      checkIn: {
        steps: beforeYouArriveData.checkIn.steps,
        arrivalExpectations: beforeYouArriveData.checkIn.arrivalExpectations,
      },
      smartLock: beforeYouArriveData.smartLock,
    },
    duringYourStay: {
      wifi: duringYourStayData.wifi,
      houseRules: duringYourStayData.houseRules,
      propertyFeatures: {
        indoor: duringYourStayData.propertyFeatures.indoor,
        outdoor: duringYourStayData.propertyFeatures.outdoor,
        pool: duringYourStayData.propertyFeatures.pool,
        limo: duringYourStayData.propertyFeatures.limo,
      },
      whatsIncluded: duringYourStayData.whatsIncluded,
      sunsets: duringYourStayData.sunsets,
      howToGuides: duringYourStayData.howToGuides as ContentData['duringYourStay']['howToGuides'],
    },
    localGuide: {
      restaurants: localGuideData.restaurants as ContentData['localGuide']['restaurants'],
      coffee: localGuideData.coffee as ContentData['localGuide']['coffee'],
      groceries: localGuideData.groceries as ContentData['localGuide']['groceries'],
      outdoorActivities: localGuideData.outdoorActivities as ContentData['localGuide']['outdoorActivities'],
      austinAttractions: localGuideData.austinAttractions as ContentData['localGuide']['austinAttractions'],
      transportation: localGuideData.transportation,
    },
    checkout: {
      checklist: checkoutData.checklist as ContentData['checkout']['checklist'],
      departureNotes: checkoutData.departureNotes,
    },
  };

  validateContent(content);
  return content;
}

/**
 * Validates content data structure
 * 
 * @param data - Data to validate
 * @returns True if valid, throws error if invalid
 */
export function validateContent(data: unknown): data is ContentData {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Content data must be an object');
  }

  const content = data as Partial<ContentData>;

  // Basic validation - can be expanded
  if (!content.property) {
    throw new Error('Content data must include property information');
  }

  return true;
}

