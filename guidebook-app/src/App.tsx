import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import Layout from '@shared/components/Layout/Layout';
import Home from '@features/home/Home';
import BeforeYouArrivePage from '@features/before-you-arrive/pages/BeforeYouArrivePage';
import AddressParkingPage from '@features/before-you-arrive/pages/AddressParkingPage';
import CheckInPage from '@features/before-you-arrive/pages/CheckInPage';
import SmartLockPage from '@features/before-you-arrive/pages/SmartLockPage';
import DuringYourStayPage from '@features/during-your-stay/pages/DuringYourStayPage';
import WifiTechPage from '@features/during-your-stay/pages/WifiTechPage';
import HouseRulesPage from '@features/during-your-stay/pages/HouseRulesPage';
import PropertyFeaturesPage from '@features/during-your-stay/pages/PropertyFeaturesPage';
import IndoorSpacesPage from '@features/during-your-stay/pages/IndoorSpacesPage';
import OutdoorSpacesPage from '@features/during-your-stay/pages/OutdoorSpacesPage';
import WhatsIncludedPage from '@features/during-your-stay/pages/WhatsIncludedPage';
import SunsetsPage from '@features/during-your-stay/pages/SunsetsPage';
import HowToGuidesPage from '@features/during-your-stay/pages/HowToGuidesPage';
import HowToGuidePage from '@features/during-your-stay/pages/HowToGuidePage';
import LocalGuidePage from '@features/local-guide/pages/LocalGuidePage';
import RestaurantsCoffeePage from '@features/local-guide/pages/RestaurantsCoffeePage';
import GroceriesPage from '@features/local-guide/pages/GroceriesPage';
import OutdoorActivitiesLandingPage from '@features/local-guide/pages/OutdoorActivitiesLandingPage';
import OutdoorActivitiesPage from '@features/local-guide/pages/OutdoorActivitiesPage';
import AustinAttractionsLandingPage from '@features/local-guide/pages/AustinAttractionsLandingPage';
import AustinAttractionsPage from '@features/local-guide/pages/AustinAttractionsPage';
import TransportationPage from '@features/local-guide/pages/TransportationPage';
import CheckoutPage from '@features/checkout/pages/CheckoutPage';
import ChecklistPage from '@features/checkout/pages/ChecklistPage';
import DepartureNotesPage from '@features/checkout/pages/DepartureNotesPage';

function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Before You Arrive */}
              <Route
                path="/before-you-arrive"
                element={<BeforeYouArrivePage />}
              />
              <Route
                path="/before-you-arrive/address-parking"
                element={<AddressParkingPage />}
              />
              <Route
                path="/before-you-arrive/check-in"
                element={<CheckInPage />}
              />
              <Route
                path="/before-you-arrive/smart-lock"
                element={<SmartLockPage />}
              />
              {/* During Your Stay */}
              <Route
                path="/during-your-stay"
                element={<DuringYourStayPage />}
              />
              <Route
                path="/during-your-stay/wifi-tech"
                element={<WifiTechPage />}
              />
              <Route
                path="/during-your-stay/house-rules"
                element={<HouseRulesPage />}
              />
              <Route
                path="/during-your-stay/property-features"
                element={<PropertyFeaturesPage />}
              />
              <Route
                path="/during-your-stay/property-features/indoor-spaces"
                element={<IndoorSpacesPage />}
              />
              <Route
                path="/during-your-stay/property-features/outdoor-spaces"
                element={<OutdoorSpacesPage />}
              />
              <Route
                path="/during-your-stay/property-features/whats-included"
                element={<WhatsIncludedPage />}
              />
              <Route
                path="/during-your-stay/property-features/sunsets"
                element={<SunsetsPage />}
              />
              <Route
                path="/during-your-stay/how-to-guides"
                element={<HowToGuidesPage />}
              />
              <Route
                path="/during-your-stay/how-to-guides/:guideId"
                element={<HowToGuidePage />}
              />
              {/* Local Guide */}
              <Route
                path="/local-guide"
                element={<LocalGuidePage />}
              />
              <Route
                path="/local-guide/restaurants-coffee"
                element={<RestaurantsCoffeePage />}
              />
              <Route
                path="/local-guide/groceries"
                element={<GroceriesPage />}
              />
              <Route
                path="/local-guide/outdoor-activities"
                element={<OutdoorActivitiesLandingPage />}
              />
              <Route
                path="/local-guide/outdoor-activities/:activityType"
                element={<OutdoorActivitiesPage />}
              />
              <Route
                path="/local-guide/austin-attractions"
                element={<AustinAttractionsLandingPage />}
              />
              <Route
                path="/local-guide/austin-attractions/:attractionType"
                element={<AustinAttractionsPage />}
              />
              <Route
                path="/local-guide/transportation"
                element={<TransportationPage />}
              />
              {/* Checkout */}
              <Route
                path="/checkout"
                element={<CheckoutPage />}
              />
              <Route
                path="/checkout/checklist"
                element={<ChecklistPage />}
              />
              <Route
                path="/checkout/departure-notes"
                element={<DepartureNotesPage />}
              />
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
