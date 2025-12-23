import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import type { ContentData } from '@shared/types/content';
import { renderMarkdownString } from '../utils/markdownToPdf';
import { sharedStyles } from './sharedStyles';

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
    borderLeft: '3 solid #2196f3',
  },
});

interface PdfDuringYourStayProps {
  content: ContentData['duringYourStay'];
}

/**
 * During Your Stay section component
 */
export default function PdfDuringYourStay({ content }: PdfDuringYourStayProps) {
  return (
    <View style={styles.section}>
      <Text style={sharedStyles.heading}>During Your Stay</Text>

      <Text style={sharedStyles.subheading}>Wi-Fi Information</Text>
      <Text style={sharedStyles.text}>
        <Text style={{ fontWeight: 'bold' }}>Network (SSID): </Text>
        {content.wifi.ssid}
      </Text>
      <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#d0021b' }}>
        Password: {content.wifi.password}
      </Text>
      {content.wifi.instructions && (
        <View style={{ marginBottom: 8 }}>
          {renderMarkdownString(content.wifi.instructions)}
        </View>
      )}
      {content.wifi.troubleshooting && content.wifi.troubleshooting.length > 0 && (
        <View style={{ marginTop: 8 }}>
          <Text style={sharedStyles.subheading}>Troubleshooting</Text>
          {content.wifi.troubleshooting.map((item, index) => (
            <View key={`wifi-troubleshooting-${index}`} style={{ marginBottom: 4 }}>
              {renderMarkdownString(item)}
            </View>
          ))}
        </View>
      )}

      <View style={sharedStyles.divider} />
      <Text style={sharedStyles.subheading}>House Rules</Text>
      {content.houseRules.rules && content.houseRules.rules.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          {content.houseRules.rules.map((rule, index) => (
            <View key={`house-rules-${index}`} style={{ marginBottom: 4 }}>
              {renderMarkdownString(rule)}
            </View>
          ))}
        </View>
      )}
      <Text style={sharedStyles.text}>
        <Text style={sharedStyles.label}>Quiet Hours: </Text>
        {content.houseRules.quietHours}
      </Text>
      <Text style={sharedStyles.text}>
        <Text style={sharedStyles.label}>Guest Capacity: </Text>
        {content.houseRules.guestCapacity}
      </Text>
      {content.houseRules.petPolicy && (
        <Text style={sharedStyles.text}>
          <Text style={sharedStyles.label}>Pet Policy: </Text>
          {content.houseRules.petPolicy}
        </Text>
      )}
      <Text style={sharedStyles.text}>
        <Text style={sharedStyles.label}>Smoking Policy: </Text>
        {content.houseRules.smokingPolicy}
      </Text>
      {content.houseRules.outdoorGuidelines && content.houseRules.outdoorGuidelines.length > 0 && (
        <View style={{ marginTop: 8 }}>
          <Text style={sharedStyles.subheading}>Outdoor Guidelines</Text>
          {content.houseRules.outdoorGuidelines.map((guideline, index) => (
            <View key={`outdoor-guidelines-${index}`} style={{ marginBottom: 4 }}>
              {renderMarkdownString(guideline)}
            </View>
          ))}
        </View>
      )}

      <View style={sharedStyles.divider} />
      <Text style={sharedStyles.subheading}>Property Features</Text>
      
      <Text style={sharedStyles.subsubheading}>Indoor Spaces</Text>
      {content.propertyFeatures.indoor.content && (
        <View style={{ marginBottom: 8 }}>
          {renderMarkdownString(content.propertyFeatures.indoor.content)}
        </View>
      )}
      {content.propertyFeatures.indoor.highlights && content.propertyFeatures.indoor.highlights.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          {content.propertyFeatures.indoor.highlights.map((highlight, index) => (
            <Text key={`indoor-highlight-${index}`} style={sharedStyles.listItem}>• {highlight}</Text>
          ))}
        </View>
      )}

      <Text style={sharedStyles.subsubheading}>Outdoor Spaces</Text>
      {content.propertyFeatures.outdoor.content && (
        <View style={{ marginBottom: 8 }}>
          {renderMarkdownString(content.propertyFeatures.outdoor.content)}
        </View>
      )}
      {content.propertyFeatures.outdoor.highlights && content.propertyFeatures.outdoor.highlights.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          {content.propertyFeatures.outdoor.highlights.map((highlight, index) => (
            <Text key={`outdoor-highlight-${index}`} style={sharedStyles.listItem}>• {highlight}</Text>
          ))}
        </View>
      )}

      {content.propertyFeatures.pool && (
        <View style={{ marginBottom: 12 }}>
          <Text style={sharedStyles.subsubheading}>Pool</Text>
          {content.propertyFeatures.pool.content && (
            <View style={{ marginBottom: 8 }}>
              {renderMarkdownString(content.propertyFeatures.pool.content)}
            </View>
          )}
          {content.propertyFeatures.pool.location && (
            <Text style={sharedStyles.text}>
              <Text style={sharedStyles.label}>Location: </Text>
              {content.propertyFeatures.pool.location}
            </Text>
          )}
          {content.propertyFeatures.pool.features && content.propertyFeatures.pool.features.length > 0 && (
            <View style={{ marginTop: 8 }}>
              {content.propertyFeatures.pool.features.map((feature, index) => (
                <Text key={`pool-feature-${index}`} style={sharedStyles.listItem}>• {feature}</Text>
              ))}
            </View>
          )}
        </View>
      )}

      {content.propertyFeatures.limo && (
        <View style={{ marginBottom: 12 }}>
          <Text style={sharedStyles.text}>Limo</Text>
          {content.propertyFeatures.limo.content && (
            <View style={{ marginBottom: 8 }}>
              {renderMarkdownString(content.propertyFeatures.limo.content)}
            </View>
          )}
          {content.propertyFeatures.limo.access && (
            <View style={{ marginBottom: 8 }}>
              {renderMarkdownString(content.propertyFeatures.limo.access)}
            </View>
          )}
          {content.propertyFeatures.limo.guidelines && content.propertyFeatures.limo.guidelines.length > 0 && (
            <View style={{ marginTop: 8 }}>
              {content.propertyFeatures.limo.guidelines.map((guideline, index) => (
                <View key={`limo-guideline-${index}`} style={{ marginBottom: 4 }}>
                  {renderMarkdownString(guideline)}
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      <Text style={sharedStyles.subheading}>What's Included</Text>
      {content.whatsIncluded.furniture && content.whatsIncluded.furniture.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          <Text style={sharedStyles.text}>Furniture</Text>
          {content.whatsIncluded.furniture.map((item, index) => (
            <Text key={`furniture-${index}`} style={sharedStyles.listItem}>• {item}</Text>
          ))}
        </View>
      )}
      {content.whatsIncluded.kitchen && content.whatsIncluded.kitchen.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          <Text style={sharedStyles.text}>Kitchen</Text>
          {content.whatsIncluded.kitchen.map((item, index) => (
            <Text key={`kitchen-${index}`} style={sharedStyles.listItem}>• {item}</Text>
          ))}
        </View>
      )}
      {content.whatsIncluded.linens && content.whatsIncluded.linens.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          <Text style={sharedStyles.text}>Linens</Text>
          {content.whatsIncluded.linens.map((item, index) => (
            <Text key={`linens-${index}`} style={sharedStyles.listItem}>• {item}</Text>
          ))}
        </View>
      )}
      {content.whatsIncluded.entertainment && content.whatsIncluded.entertainment.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          <Text style={sharedStyles.text}>Entertainment</Text>
          {content.whatsIncluded.entertainment.map((item, index) => (
            <Text key={`entertainment-${index}`} style={sharedStyles.listItem}>• {item}</Text>
          ))}
        </View>
      )}
      {content.whatsIncluded.outdoor && content.whatsIncluded.outdoor.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          <Text style={sharedStyles.text}>Outdoor</Text>
          {content.whatsIncluded.outdoor.map((item, index) => (
            <Text key={`outdoor-item-${index}`} style={sharedStyles.listItem}>• {item}</Text>
          ))}
        </View>
      )}
      {content.whatsIncluded.limo && (
        <View style={{ marginBottom: 8 }}>
          <Text style={sharedStyles.text}>Limo: {content.whatsIncluded.limo}</Text>
        </View>
      )}
      {content.whatsIncluded.guestsNeedToBring && content.whatsIncluded.guestsNeedToBring.length > 0 && (
        <View style={{ marginBottom: 12 }}>
          <Text style={sharedStyles.text}>What Guests Need to Bring</Text>
          {content.whatsIncluded.guestsNeedToBring.map((item, index) => (
            <Text key={`guests-bring-${index}`} style={sharedStyles.listItem}>• {item}</Text>
          ))}
        </View>
      )}

      {content.sunsets && (
        <View style={{ marginBottom: 12 }}>
          <Text style={sharedStyles.subheading}>Hill Country Sunsets</Text>
          {content.sunsets.locations && content.sunsets.locations.length > 0 && (
            <View style={{ marginBottom: 8 }}>
              <Text style={sharedStyles.text}>Best Locations:</Text>
              {content.sunsets.locations.map((location, index) => (
                <Text key={`sunset-location-${index}`} style={sharedStyles.listItem}>• {location}</Text>
              ))}
            </View>
          )}
          {content.sunsets.bestTimes && (
            <Text style={sharedStyles.text}>
              <Text style={{ fontWeight: 'bold' }}>Best Times: </Text>
              {content.sunsets.bestTimes}
            </Text>
          )}
          {content.sunsets.tips && (
            <View style={{ marginBottom: 8 }}>
              {renderMarkdownString(content.sunsets.tips)}
            </View>
          )}
          {content.sunsets.photography && (
            <View style={{ marginBottom: 8 }}>
              {renderMarkdownString(content.sunsets.photography)}
            </View>
          )}
        </View>
      )}

      {content.howToGuides && content.howToGuides.length > 0 && (
        <View style={{ marginBottom: 12 }}>
          <Text style={sharedStyles.subheading}>How-to Guides</Text>
          {content.howToGuides.map((guide) => (
            <View key={guide.id} style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 6 }}>
                {guide.title}
              </Text>
              {guide.steps && guide.steps.map((step, index) => (
                <View key={`${guide.id}-step-${index}`} style={{ marginBottom: 8 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
                    Step {index + 1}: {step.title}
                  </Text>
                  {step.description && (
                    <View>
                      {renderMarkdownString(step.description)}
                    </View>
                  )}
                  {step.image && (
                    <View style={{ marginTop: 8, marginBottom: 8 }}>
                      {step.image.startsWith('data:') || step.image.startsWith('http') ? (
                        <Image
                          src={step.image}
                          style={{ width: '100%', maxHeight: 200, objectFit: 'contain' }}
                        />
                      ) : (
                        <View style={{
                          width: '100%',
                          height: 150,
                          backgroundColor: '#f5f5f5',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 4,
                          border: '1 solid #e0e0e0',
                        }}>
                          <Text style={{ fontSize: 9, color: '#999', textAlign: 'center' }}>
                            Image unavailable: Step {index + 1} illustration
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ))}
              {guide.safety && guide.safety.length > 0 && (
                <View style={{ marginTop: 8 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Safety Guidelines:</Text>
                  {guide.safety.map((item, index) => (
                    <View key={`${guide.id}-safety-${index}`} style={{ marginBottom: 4 }}>
                      {renderMarkdownString(item)}
                    </View>
                  ))}
                </View>
              )}
              {guide.troubleshooting && guide.troubleshooting.length > 0 && (
                <View style={{ marginTop: 8 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Troubleshooting:</Text>
                  {guide.troubleshooting.map((item, index) => (
                    <View key={`${guide.id}-troubleshooting-${index}`} style={{ marginBottom: 4 }}>
                      {renderMarkdownString(item)}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

