import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { CompareScreen } from './components/CompareScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { CalendarScreen } from './components/CalendarScreen';
import { BottomNav } from './components/BottomNav';
import { mockHouses, mockMessages, mockOpenHouses } from './data';
import { House, Screen } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [favorites, setFavorites] = useState<House[]>([]);

  const handleSwipeRight = (house: House) => {
    setFavorites((prev) => {
      if (!prev.find((h) => h.id === house.id)) {
        return [...prev, house];
      }
      return prev;
    });
  };

  const handleSwipeLeft = (house: House) => {
    // Just move to next house
  };

  const handleCompare = () => {
    setActiveScreen('compare');
  };

  const handleCalendar = () => {
    setActiveScreen('calendar');
  };

  const handleCloseCompare = () => {
    setActiveScreen('favorites');
  };

  const handleCloseCalendar = () => {
    setActiveScreen('messages');
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      <div className="h-screen flex flex-col">
        {activeScreen === 'home' && (
          <HomeScreen
            houses={mockHouses}
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
          />
        )}
        
        {activeScreen === 'favorites' && (
          <FavoritesScreen favorites={favorites} onCompare={handleCompare} />
        )}
        
        {activeScreen === 'compare' && favorites.length >= 2 && (
          <CompareScreen houses={favorites} onClose={handleCloseCompare} />
        )}
        
        {activeScreen === 'messages' && (
          <MessagesScreen messages={mockMessages} onCalendar={handleCalendar} />
        )}
        
        {activeScreen === 'profile' && <ProfileScreen />}
        
        {activeScreen === 'calendar' && (
          <CalendarScreen openHouses={mockOpenHouses} onClose={handleCloseCalendar} />
        )}

        {activeScreen !== 'compare' && activeScreen !== 'calendar' && (
          <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
        )}
      </div>
    </div>
  );
}
