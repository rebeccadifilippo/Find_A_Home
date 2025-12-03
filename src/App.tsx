import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { CompareScreen } from './components/CompareScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { MessageDetailScreen } from './components/MessageDetailScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { CalendarScreen } from './components/CalendarScreen';
import { BottomNav } from './components/BottomNav';
import { mockHouses, mockMessages, mockOpenHouses } from './data'; // Import mock data
import { House, Screen, Message } from './types';

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

  // When user wants to message the realtor for a specific house,
  // find an existing message thread for that house and open it.
  const handleMessageRealtor = (house: House) => {
    // Try to find a message associated with this house
    const msg = mockMessages.find(m => (m as any).house?.id === house.id);
    if (msg) {
      setSelectedMessage(msg as Message);
      setActiveScreen('detail');
      return;
    }

    // If none exists, create a temporary message object and open it
    const newMsg: Message = {
      id: `temp-${house.id}`,
      agent: 'Listing Agent',
      preview: `Hi, I'm interested in ${house.address}`,
      time: 'Now',
      unread: false,
      // attach house for display in message detail (loose typing)
      // @ts-ignore
      house,
    } as any;

    setSelectedMessage(newMsg);
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
            onMessageRealtor={handleMessageRealtor} // Pass handler accepts House
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
            messages={mockMessages} // Use imported mockMessages
            onCalendar={handleCalendar}
            onMessageSelect={handleMessageSelect}
          />
        )}
        
        {activeScreen === 'detail' && selectedMessage && (
          <MessageDetailScreen message={selectedMessage} onBack={() => setActiveScreen('home')} />
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
