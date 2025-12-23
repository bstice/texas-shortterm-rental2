import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function extractAllLinks(data) {
  const links = [];

  const processRecommendation = (rec) => {
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

async function validateLink(url, linkType) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

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

// Load data
const filePath = join(__dirname, '..', 'src', 'data', 'local-guide.json');
const fileContent = readFileSync(filePath, 'utf-8');
const localGuideData = JSON.parse(fileContent);
const allLinks = extractAllLinks(localGuideData);

// Validate all links and collect failures
async function validateAllLinks() {
  const failures = {
    website: [],
    facebook: [],
    instagram: [],
    twitter: [],
    yelp: [],
    tripadvisor: [],
  };

  console.log(`Validating ${allLinks.length} links...\n`);

  for (const link of allLinks) {
    const result = await validateLink(link.url, link.type);
    if (!result.valid) {
      failures[link.type].push({
        name: link.name,
        url: link.url,
        recommendation: link.recommendation,
        status: result.status,
        error: result.error,
        finalUrl: result.finalUrl,
      });
    }
  }

  // Print failures
  console.log('='.repeat(80));
  console.log('FAILED LINKS SUMMARY');
  console.log('='.repeat(80));
  console.log();

  const types = ['website', 'facebook', 'instagram', 'twitter', 'yelp', 'tripadvisor'];
  
  for (const type of types) {
    if (failures[type].length > 0) {
      console.log(`\n${type.toUpperCase()} LINKS (${failures[type].length} failed):`);
      console.log('-'.repeat(80));
      
      for (const failure of failures[type]) {
        console.log(`\n❌ ${failure.name}`);
        console.log(`   URL: ${failure.url}`);
        console.log(`   Recommendation: ${failure.recommendation}`);
        if (failure.status) {
          console.log(`   Status: ${failure.status}`);
          if ([403, 404, 429].includes(failure.status)) {
            console.log(`   ⚠️  Note: May be a false positive - site may block automated requests`);
          }
        }
        if (failure.finalUrl && failure.finalUrl !== failure.url) {
          console.log(`   Redirected to: ${failure.finalUrl}`);
        }
        if (failure.error) {
          console.log(`   Error: ${failure.error}`);
        }
      }
    }
  }

  const totalFailures = Object.values(failures).reduce((sum, arr) => sum + arr.length, 0);
  console.log('\n' + '='.repeat(80));
  console.log(`Total Failed Links: ${totalFailures} out of ${allLinks.length}`);
  console.log('='.repeat(80));
}

validateAllLinks().catch(console.error);

