import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppStateProvider } from './context/AppStateContext';
import { FestivalPage } from './pages/FestivalPage';
import { HomePage } from './pages/HomePage';
import { ItineraryPage } from './pages/ItineraryPage';
import { MapPage } from './pages/MapPage';
import { PhrasesPage } from './pages/PhrasesPage';
import { PlaceDetailPage } from './pages/PlaceDetailPage';
import { PlacesPage } from './pages/PlacesPage';
import { SavedPage } from './pages/SavedPage';
import { ShoppingPage } from './pages/ShoppingPage';

export default function App() {
  return (
    <AppStateProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/places" element={<PlacesPage />} />
            <Route path="/places/:placeId" element={<PlaceDetailPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/phrases" element={<PhrasesPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/shopping" element={<ShoppingPage />} />
            <Route path="/festival" element={<FestivalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppStateProvider>
  );
}
