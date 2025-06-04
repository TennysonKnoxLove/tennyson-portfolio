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

export interface Availability {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface ResourcesResponse {
  resources: Resource[];
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
  availability: Record<string, any>;
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
  availability: Record<string, any>;
  resourceOwner: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResourceResponse {
  resource: ResourceResponse;
  message: string;
}

export interface ImageUploadResponse {
  filename: string;
  url: string;
} 