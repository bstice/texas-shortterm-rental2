import { readFileSync } from 'fs';
import { join } from 'path';

// Define types locally to avoid ES module import issues
interface LocalRecommendation {
  name: string;
  type: 'restaurant' | 'coffee' | 'grocery' | 'activity' | 'attraction' | 'local';
  description: string;
  distance?: string;
  priceRange?: string;
  address?: string;
  phone?: string;
  website?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    yelp?: string;
    tripadvisor?: string;
  };
  image?: string;
  imageAlt?: string;
}

interface LocalGuideData {
  restaurants?: LocalRecommendation[];
  coffee?: LocalRecommendation[];
  groceries?: LocalRecommendation[];
  outdoorActivities?: {
    hiking?: LocalRecommendation[];
    hillCountry?: LocalRecommendation[];
    parks?: LocalRecommendation[];
  };
  austinAttractions?: {
    downtown?: LocalRecommendation[];
    localSpots?: LocalRecommendation[];
  };
}

/**
 * Extracts all website and social links from local guide data
 */
function extractAllLinks(data: LocalGuideData): Array<{
  name: string;
  type: 'website' | 'facebook' | 'instagram' | 'twitter' | 'yelp' | 'tripadvisor';
  url: string;
  recommendation: string;
}> {
  const links: Array<{
    name: string;
    type: 'website' | 'facebook' | 'instagram' | 'twitter' | 'yelp' | 'tripadvisor';
    url: string;
    recommendation: string;
  }> = [];

  // Helper to process a single recommendation
  const processRecommendation = (rec: LocalRecommendation) => {
    if (rec.website) {
      links.push({
        name: `${rec.name} - Website`,
        type: 'website',
        url: rec.website,
        recommendation: rec.name,
      });
    }

    if (rec.social) {
      if (rec.social.facebook) {
        links.push({
          name: `${rec.name} - Facebook`,
          type: 'facebook',
          url: rec.social.facebook,
          recommendation: rec.name,
        });
      }
      if (rec.social.instagram) {
        links.push({
          name: `${rec.name} - Instagram`,
          type: 'instagram',
          url: rec.social.instagram,
          recommendation: rec.name,
        });
      }
      if (rec.social.twitter) {
        links.push({
          name: `${rec.name} - Twitter/X`,
          type: 'twitter',
          url: rec.social.twitter,
          recommendation: rec.name,
        });
      }
      if (rec.social.yelp) {
        links.push({
          name: `${rec.name} - Yelp`,
          type: 'yelp',
          url: rec.social.yelp,
          recommendation: rec.name,
        });
      }
      if (rec.social.tripadvisor) {
        links.push({
          name: `${rec.name} - TripAdvisor`,
          type: 'tripadvisor',
          url: rec.social.tripadvisor,
          recommendation: rec.name,
        });
      }
    }
  };

  // Process all categories
  if (data.restaurants) {
    data.restaurants.forEach(processRecommendation);
  }
  if (data.coffee) {
    data.coffee.forEach(processRecommendation);
  }
  if (data.groceries) {
    data.groceries.forEach(processRecommendation);
  }
  if (data.outdoorActivities) {
    if (data.outdoorActivities.hiking) {
      data.outdoorActivities.hiking.forEach(processRecommendation);
    }
    if (data.outdoorActivities.hillCountry) {
      data.outdoorActivities.hillCountry.forEach(processRecommendation);
    }
    if (data.outdoorActivities.parks) {
      data.outdoorActivities.parks.forEach(processRecommendation);
    }
  }
  if (data.austinAttractions) {
    if (data.austinAttractions.downtown) {
      data.austinAttractions.downtown.forEach(processRecommendation);
    }
    if (data.austinAttractions.localSpots) {
      data.austinAttractions.localSpots.forEach(processRecommendation);
    }
  }

  return links;
}

/**
 * Validates a URL by making an HTTP request
 * Uses GET for all links as some sites don't properly support HEAD requests
 * Returns true if the link is accessible (status 200-399)
 */
async function validateLink(
  url: string,
  linkType?: 'website' | 'facebook' | 'instagram' | 'twitter' | 'yelp' | 'tripadvisor',
): Promise<{ valid: boolean; status?: number; error?: string; finalUrl?: string }> {
  try {
    // Use GET for all links - more reliable as some sites block HEAD requests
    // or return different status codes for HEAD vs GET
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(10000), // 10 second timeout
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    // Consider 2xx and 3xx status codes as valid
    // Note: Some sites may return 404 for automated requests but work in browsers
    // due to bot protection, so we'll log but still consider 404 as invalid
    const valid = response.status >= 200 && response.status < 400;
    return {
      valid,
      status: response.status,
      finalUrl: response.url,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Load data and extract links before tests run
const filePath = join(process.cwd(), 'src', 'data', 'local-guide.json');
const fileContent = readFileSync(filePath, 'utf-8');
const localGuideData: LocalGuideData = JSON.parse(fileContent);
const allLinks = extractAllLinks(localGuideData);

describe('Link Validation', () => {
  test('should load local guide data and extract links', () => {
    expect(allLinks.length).toBeGreaterThan(0);
    console.log(`Found ${allLinks.length} total links to validate`);
  });

  // Group tests by link type for better organization
  describe('Website Links', () => {
    const websiteLinks = allLinks.filter(link => link.type === 'website');

    test.each(websiteLinks.length > 0 ? websiteLinks.map(link => [link.name, link.url, link.recommendation]) : [['skip', '', '']])(
      'should validate website link: %s',
      async (name: string, url: string, recommendation: string) => {
        if (name === 'skip') {
          return; // Skip if no links
        }
        const result = await validateLink(url, 'website');
        if (!result.valid) {
          console.error(`❌ Broken website link: ${name} (${url})`);
          console.error(`   Recommendation: ${recommendation}`);
          if (result.status) {
            console.error(`   Status: ${result.status}`);
            // Note: 403/404/429 might be false positives due to bot protection
            if ([403, 404, 429].includes(result.status)) {
              console.error(`   ⚠️  Note: This may be a false positive - site may block automated requests`);
            }
          }
          if (result.finalUrl && result.finalUrl !== url) {
            console.error(`   Redirected to: ${result.finalUrl}`);
          }
          if (result.error) {
            console.error(`   Error: ${result.error}`);
          }
        }
        // For websites, we'll still fail the test but with informative output
        // Manual verification recommended for 403/404/429 status codes
        expect(result.valid).toBe(true);
      },
      15000, // 15 second timeout per test
    );
  });

  describe('Facebook Links', () => {
    const facebookLinks = allLinks.filter(link => link.type === 'facebook');

    test.each(facebookLinks.length > 0 ? facebookLinks.map(link => [link.name, link.url, link.recommendation]) : [['skip', '', '']])(
      'should validate Facebook link: %s',
      async (name: string, url: string, recommendation: string) => {
        if (name === 'skip') {
          return; // Skip if no links
        }
        const result = await validateLink(url, 'facebook');
        expect(result.valid).toBe(true);
        if (!result.valid) {
          console.error(`❌ Broken Facebook link: ${name} (${url})`);
          console.error(`   Recommendation: ${recommendation}`);
          if (result.status) {
            console.error(`   Status: ${result.status}`);
          }
          if (result.error) {
            console.error(`   Error: ${result.error}`);
          }
        }
      },
      15000,
    );
  });

  describe('Instagram Links', () => {
    const instagramLinks = allLinks.filter(link => link.type === 'instagram');

    test.each(instagramLinks.length > 0 ? instagramLinks.map(link => [link.name, link.url, link.recommendation]) : [['skip', '', '']])(
      'should validate Instagram link: %s',
      async (name: string, url: string, recommendation: string) => {
        if (name === 'skip') {
          return; // Skip if no links
        }
        const result = await validateLink(url, 'instagram');
        expect(result.valid).toBe(true);
        if (!result.valid) {
          console.error(`❌ Broken Instagram link: ${name} (${url})`);
          console.error(`   Recommendation: ${recommendation}`);
          if (result.status) {
            console.error(`   Status: ${result.status}`);
          }
          if (result.error) {
            console.error(`   Error: ${result.error}`);
          }
        }
      },
      15000,
    );
  });

  describe('Twitter/X Links', () => {
    const twitterLinks = allLinks.filter(link => link.type === 'twitter');

    test.each(twitterLinks.length > 0 ? twitterLinks.map(link => [link.name, link.url, link.recommendation]) : [['skip', '', '']])(
      'should validate Twitter/X link: %s',
      async (name: string, url: string, recommendation: string) => {
        if (name === 'skip') {
          return; // Skip if no links
        }
        const result = await validateLink(url, 'twitter');
        expect(result.valid).toBe(true);
        if (!result.valid) {
          console.error(`❌ Broken Twitter/X link: ${name} (${url})`);
          console.error(`   Recommendation: ${recommendation}`);
          if (result.status) {
            console.error(`   Status: ${result.status}`);
          }
          if (result.error) {
            console.error(`   Error: ${result.error}`);
          }
        }
      },
      15000,
    );
  });

  describe('Yelp Links', () => {
    const yelpLinks = allLinks.filter(link => link.type === 'yelp');

    test.each(yelpLinks.length > 0 ? yelpLinks.map(link => [link.name, link.url, link.recommendation]) : [['skip', '', '']])(
      'should validate Yelp link: %s',
      async (name: string, url: string, recommendation: string) => {
        if (name === 'skip') {
          return; // Skip if no links
        }
        const result = await validateLink(url, 'yelp');
        expect(result.valid).toBe(true);
        if (!result.valid) {
          console.error(`❌ Broken Yelp link: ${name} (${url})`);
          console.error(`   Recommendation: ${recommendation}`);
          if (result.status) {
            console.error(`   Status: ${result.status}`);
          }
          if (result.error) {
            console.error(`   Error: ${result.error}`);
          }
        }
      },
      15000,
    );
  });

  describe('TripAdvisor Links', () => {
    const tripadvisorLinks = allLinks.filter(link => link.type === 'tripadvisor');

    test.each(tripadvisorLinks.length > 0 ? tripadvisorLinks.map(link => [link.name, link.url, link.recommendation]) : [['skip', '', '']])(
      'should validate TripAdvisor link: %s',
      async (name: string, url: string, recommendation: string) => {
        if (name === 'skip') {
          return; // Skip if no links
        }
        const result = await validateLink(url, 'tripadvisor');
        expect(result.valid).toBe(true);
        if (!result.valid) {
          console.error(`❌ Broken TripAdvisor link: ${name} (${url})`);
          console.error(`   Recommendation: ${recommendation}`);
          if (result.status) {
            console.error(`   Status: ${result.status}`);
          }
          if (result.error) {
            console.error(`   Error: ${result.error}`);
          }
        }
      },
      15000,
    );
  });

  describe('Link Summary', () => {
    test('should provide a summary of all links', () => {
      const summary = {
        total: allLinks.length,
        byType: {
          website: allLinks.filter(l => l.type === 'website').length,
          facebook: allLinks.filter(l => l.type === 'facebook').length,
          instagram: allLinks.filter(l => l.type === 'instagram').length,
          twitter: allLinks.filter(l => l.type === 'twitter').length,
          yelp: allLinks.filter(l => l.type === 'yelp').length,
          tripadvisor: allLinks.filter(l => l.type === 'tripadvisor').length,
        },
      };

      console.log('\n📊 Link Summary:');
      console.log(`   Total links: ${summary.total}`);
      console.log(`   Websites: ${summary.byType.website}`);
      console.log(`   Facebook: ${summary.byType.facebook}`);
      console.log(`   Instagram: ${summary.byType.instagram}`);
      console.log(`   Twitter/X: ${summary.byType.twitter}`);
      console.log(`   Yelp: ${summary.byType.yelp}`);
      console.log(`   TripAdvisor: ${summary.byType.tripadvisor}`);

      expect(summary.total).toBeGreaterThan(0);
    });
  });
});

