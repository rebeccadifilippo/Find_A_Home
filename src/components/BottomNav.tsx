import { Home, Heart, MessageCircle, User } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'favorites' as Screen, icon: Heart, label: 'Favorites' },
    { id: 'messages' as Screen, icon: MessageCircle, label: 'Messages' },
    { id: 'profile' as Screen, icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white border-t border-gray-200">
      <div className="max-w-md w-full h-16 flex items-center justify-around px-4">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
              activeScreen === id ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
