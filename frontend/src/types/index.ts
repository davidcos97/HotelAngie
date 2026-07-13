export interface RoomAmenity {
  icon: string;
  label: string;
}

export interface Room {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  pricePerNight: number;
  currency: "COP" | "USD";
  capacityAdults: number;
  capacityChildren: number;
  beds: number;
  sizeM2: number;
  view: string;
  amenities: string[];
  images: string[];
  video?: string;
  rating: number;
  reviewsCount: number;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingMinutes: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  photo?: string;
  roomName?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  validUntil: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}
