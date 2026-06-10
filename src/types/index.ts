export interface Practice {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface Variety {
  id: string;
  name: string;
  village: string;
  commodity: string;
  physicalDescription: string;
  conservationStatus: string;
  altitude: string;
  landType: string;
  rainfall: string;
  images: string[];
  practices: Practice[];
  calendarEvents: Record<string, string[]>;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  description: string;
  content?: string;
  category?: string;
  date?: string;
  author_name?: string;
  author_title?: string;
  author_image?: string;
  is_verified?: boolean;
  year?: string | number;
  variety_id?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  description: string;
  iconName: string;
}

export interface Village {
  id: string;
  name: string;
  varieties: string; // List of key varieties (text)
  image: string;
  description: string;
  practices_count?: number;
  varieties_count?: number;
  conservation_status?: string;
  location_map_url?: string;
  latitude?: number;
  longitude?: number;
}

export interface MapPin {
  varietyId: string;
  cx: number;
  cy: number;
  label: string;
  commodity: string;
  status: string;
  province?: string;
  ecosystem?: string;
}
