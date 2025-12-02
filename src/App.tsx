import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { CompareScreen } from './components/CompareScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { MessageDetailScreen } from './components/MessageDetailScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { CalendarScreen } from './components/CalendarScreen';
import { BottomNav } from './components/BottomNav';
import { mockHouses, mockOpenHouses } from './data';
import { House, Screen, Message } from './types';

const mockMessages: Message[] = [
  { id: '1', agent: 'Sarah Johnson', preview: 'The open house is scheduled...', time: '10:30 AM', unread: true },
  { id: '2', agent: 'Mike Davis', preview: 'Would you like to schedule...', time: 'Yesterday', unread: false },
  { id: '3', agent: 'Emily Chen', preview: 'The seller accepted your offer!', time: 'Monday', unread: true },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen | 'detail'>('home');
  const [favorites, setFavorites] = useState<House[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

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

  const handleMessageSelect = (message: Message) => {
    setSelectedMessage(message);
    setActiveScreen('detail');
  };

  const handleBack = () => {
    setActiveScreen('messages');
    setSelectedMessage(null);
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
          <MessagesScreen
            messages={mockMessages}
            onCalendar={handleCalendar}
            onMessageSelect={handleMessageSelect}
          />
        )}
        
        {activeScreen === 'detail' && selectedMessage && (
          <MessageDetailScreen message={selectedMessage} onBack={handleBack} />
        )}
        
        {activeScreen === 'profile' && <ProfileScreen />}
        
        {activeScreen === 'calendar' && (
          <CalendarScreen openHouses={mockOpenHouses} onClose={handleCloseCalendar} />
        )}

        {activeScreen !== 'compare' && activeScreen !== 'calendar' && activeScreen !== 'detail' && (
          <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
        )}
      </div>
    </div>
  );
}
