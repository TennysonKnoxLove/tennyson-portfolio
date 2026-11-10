export interface Resource {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  location: ResourceLocation;
  availability: Availability;
  resourceOwner: string;
  price: number;
  category?: string;
  status?: string;
}

export interface ResourceLocation {
  address: string;
  zip: string;
  city: string;
  state: string;
}

export const WEEK_DAYS = [
  { key: 'monday', label: 'Monday', shortLabel: 'Mon' },
  { key: 'tuesday', label: 'Tuesday', shortLabel: 'Tue' },
  { key: 'wednesday', label: 'Wednesday', shortLabel: 'Wed' },
  { key: 'thursday', label: 'Thursday', shortLabel: 'Thu' },
  { key: 'friday', label: 'Friday', shortLabel: 'Fri' },
  { key: 'saturday', label: 'Saturday', shortLabel: 'Sat' },
  { key: 'sunday', label: 'Sunday', shortLabel: 'Sun' },
] as const;

export type DayOfWeek = (typeof WEEK_DAYS)[number]['key'];

export interface DayHours {
  start: string;
  end: string;
}

export type Availability = Partial<Record<DayOfWeek, DayHours>>;

export function availabilityFromHours(
  hoursByDay: Partial<Record<DayOfWeek, DayHours>> | null | undefined
): Availability {
  const availability: Availability = {};
  if (!hoursByDay) {
    return availability;
  }

  for (const day of WEEK_DAYS) {
    const hours = hoursByDay[day.key];
    const start = hours?.start?.trim() ?? '';
    if (!start) {
      continue;
    }

    availability[day.key] = {
      start,
      end: hours?.end?.trim() ?? ''
    };
  }

  return availability;
}

export interface ResourceFilter {
  description?: string;
  priceMin?: number;
  priceMax?: number;
  availabilityFrom?: Date;
  availabilityTo?: Date;
  tags?: string[];
  category?: string;
}

// API Request/Response interfaces
export interface ResourceCreateRequest {
  name: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  availability: Availability;
  image?: string;
}

export interface ResourceResponse {
  id: string;
  name: string;
  description: string;
  image?: string;
  tags: string[];
  category: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  availability: Availability;
  resourceOwner: string;
  status: string;
  createdAt: string;
  updatedAt: string;
} 