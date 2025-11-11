import { Settings, ChevronRight, LogOut, Bell, MapPin, DollarSign, Home } from 'lucide-react';

export function ProfileScreen() {
  const settingsItems = [
    { icon: Bell, label: 'Notifications', value: 'On' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
    { icon: DollarSign, label: 'Price Range', value: '$400K - $1.2M' },
    { icon: Home, label: 'Property Type', value: 'House, Condo' }
  ];

  return (
    <div className="flex-1 px-5 pt-12 pb-20">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4 text-white">
          <span className="text-3xl">JD</span>
        </div>
        <h2 className="text-gray-800 mb-1">John Doe</h2>
        <p className="text-gray-600 text-sm">john.doe@email.com</p>
      </div>

      {/* Settings Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 text-gray-600">
          <Settings size={18} />
          <h3>Settings</h3>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {settingsItems.map((item, index) => (
            <button
              key={item.label}
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                index !== settingsItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className="text-gray-600" />
                <span className="text-gray-800">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">{item.value}</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Account Actions */}
      <div className="space-y-3">
        <button className="w-full bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <span className="text-gray-800">Edit Profile</span>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
        
        <button className="w-full bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <span className="text-gray-800">Help & Support</span>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
        
        <button className="w-full bg-red-50 rounded-xl shadow-md p-4 flex items-center justify-center gap-2 text-red-600 hover:bg-red-100 transition-colors">
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
