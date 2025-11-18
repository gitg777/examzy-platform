// Database Types
export type UserRole = 'viewer' | 'creator' | 'admin';

export type CameraStatus = 'pending' | 'active' | 'inactive' | 'rejected';

export type Region = 'Africa' | 'North America' | 'South America' | 'Asia' | 'Europe' | 'Australia' | 'Antarctica';

export type AnimalType = 'Big Cats' | 'Birds' | 'Marine' | 'Primates' | 'Elephants' | 'Bears' | 'Reptiles' | 'Other';

export type SubscriptionTier = 'free' | 'single' | 'all-access';

export type TransactionType = 'subscription' | 'payout';

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Camera {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  lodge_name: string;
  region: Region;
  animal_type: AnimalType;
  rtmp_url: string;
  cloudflare_stream_id: string | null;
  thumbnail_url: string | null;
  status: CameraStatus;
  booking_url: string | null;
  featured: boolean;
  viewer_count: number;
  total_views: number;
  created_at: string;
  updated_at: string;
  creator?: User;
}

export interface Subscription {
  id: string;
  user_id: string;
  camera_id: string | null;
  tier: SubscriptionTier;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  status: 'active' | 'cancelled' | 'past_due';
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
  camera?: Camera;
}

export interface Transaction {
  id: string;
  user_id: string;
  camera_id: string | null;
  type: TransactionType;
  amount: number;
  stripe_payment_intent_id: string | null;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface Alert {
  id: string;
  camera_id: string;
  type: string;
  message: string;
  metadata: Record<string, any> | null;
  is_active: boolean;
  created_at: string;
  expires_at: string | null;
}

export interface FavoriteCamera {
  id: string;
  user_id: string;
  camera_id: string;
  created_at: string;
  camera?: Camera;
}

export interface ChatMessage {
  id: string;
  camera_id: string;
  user_id: string;
  message: string;
  created_at: string;
  user?: Pick<User, 'id' | 'full_name' | 'avatar_url'>;
}

// Analytics Types
export interface CameraAnalytics {
  camera_id: string;
  total_viewers: number;
  total_revenue: number;
  creator_revenue: number;
  subscription_count: number;
  average_watch_time: number;
  period_start: string;
  period_end: string;
}

export interface CreatorStats {
  total_cameras: number;
  active_cameras: number;
  total_revenue: number;
  pending_payout: number;
  total_subscribers: number;
  total_views: number;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  full_name: string;
}

export interface AddCameraFormData {
  name: string;
  description: string;
  lodge_name: string;
  region: Region;
  animal_type: AnimalType;
  rtmp_url: string;
  booking_url?: string;
}

// Stripe Types
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  tier: SubscriptionTier;
  features: string[];
}
