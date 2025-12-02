import { House, Message, OpenHouse } from './types';

export const mockHouses: House[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2Mjg2MzgwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 850000,
    address: '123 Modern Lane, San Francisco, CA',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    description: 'Stunning modern home with open concept living and city views.'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1696986681606-b156ccd761c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lfGVufDF8fHx8MTc2Mjg1Mzc2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 1250000,
    address: '456 Luxury Drive, Los Angeles, CA',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    description: 'Luxurious estate with pool, spa, and panoramic mountain views.'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZXxlbnwxfHx8fDE3NjI4MjY4MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 675000,
    address: '789 Contemporary Blvd, Austin, TX',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    description: 'Contemporary design with smart home features and eco-friendly upgrades.'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ1cmJhbiUyMGhvbWV8ZW58MXx8fHwxNzYyODU2MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 425000,
    address: '321 Suburban Street, Portland, OR',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    description: 'Charming family home in quiet neighborhood with great schools.'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHl8ZW58MXx8fHwxNzYyODgxNzU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 950000,
    address: '654 Estate Avenue, Seattle, WA',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3100,
    description: 'Beautiful property with hardwood floors and updated kitchen.'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1565363887715-8884629e09ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MjgwMTU3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 550000,
    address: '987 Residential Way, Denver, CO',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    description: 'Move-in ready home with large backyard and mountain proximity.'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    agent: 'Piero Roppoli',
    preview: 'Please Message me if you have any questions about the property.',
    time: '10:30 AM',
    unread: true,
    house: mockHouses[0], // Associate with the first house
  },
  {
    id: '2',
    agent: 'Erik Smith',
    preview: 'Please Message me if you have any questions about the property.',
    time: 'Yesterday',
    unread: false,
    house: mockHouses[1], // Associate with the second house
  },
  {
    id: '3',
    agent: 'Brenna Williams',
    preview: 'Please Message me if you have any questions about the property.',
    time: 'Monday',
    unread: true,
    house: mockHouses[2], // Associate with the third house
  },
  {
    id: '4',
    agent: 'Julio Fernandez',
    preview: 'Please Message me if you have any questions about the property.',
    time: 'Monday',
    unread: true,
    house: mockHouses[3], // Associate with the fourth house
  },
  {
    id: '5',
    agent: 'Sophia Martinez',
    preview: 'Please Message me if you have any questions about the property.',
    time: 'Tuesday',
    unread: true,
    house: mockHouses[4], // Associate with the fifth house
  },
  {
    id: '6',
    agent: 'Liam Johnson',
    preview: 'Please Message me if you have any questions about the property.',
    time: 'Wednesday',
    unread: true,
    house: mockHouses[5], // Associate with the sixth house
  },
];

export const mockOpenHouses: OpenHouse[] = [
  {
    id: '1',
    house: mockHouses[0],
    date: 'Saturday, Nov 16',
    time: '2:00 PM - 4:00 PM'
  },
  {
    id: '2',
    house: mockHouses[1],
    date: 'Sunday, Nov 17',
    time: '1:00 PM - 3:00 PM'
  },
  {
    id: '3',
    house: mockHouses[2],
    date: 'Saturday, Nov 16',
    time: '10:00 AM - 12:00 PM'
  }
];
