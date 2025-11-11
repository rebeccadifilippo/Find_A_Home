export interface House {
  id: string;
  image: string;
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
}

export interface OpenHouse {
  id: string;
  house: House;
  date: string;
  time: string;
}

export type Screen = 'home' | 'favorites' | 'compare' | 'messages' | 'profile' | 'calendar';
