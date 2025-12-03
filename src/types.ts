export interface House {
  id: string;
  image: string;
  // Optional array of images to support multiple photos per house
  images?: string[];
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
}

export interface Message {
  id: string;
  agent: string;
  preview: string;
  time: string;
  unread: boolean;
  // Optionally associate a message with a house
  house?: House;
}

export interface OpenHouse {
  id: string;
  house: House;
  date: string;
  time: string;
}

export type Screen = 'home' | 'favorites' | 'compare' | 'messages' | 'profile' | 'calendar';
