export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'viewer' | 'creator' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'viewer' | 'creator' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'viewer' | 'creator' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      cameras: {
        Row: {
          id: string
          creator_id: string
          name: string
          description: string
          lodge_name: string
          region: 'Africa' | 'North America' | 'South America' | 'Asia' | 'Europe' | 'Australia' | 'Antarctica'
          animal_type: 'Big Cats' | 'Birds' | 'Marine' | 'Primates' | 'Elephants' | 'Bears' | 'Reptiles' | 'Other'
          rtmp_url: string
          cloudflare_stream_id: string | null
          thumbnail_url: string | null
          status: 'pending' | 'active' | 'inactive' | 'rejected'
          booking_url: string | null
          featured: boolean
          viewer_count: number
          total_views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          name: string
          description: string
          lodge_name: string
          region: 'Africa' | 'North America' | 'South America' | 'Asia' | 'Europe' | 'Australia' | 'Antarctica'
          animal_type: 'Big Cats' | 'Birds' | 'Marine' | 'Primates' | 'Elephants' | 'Bears' | 'Reptiles' | 'Other'
          rtmp_url: string
          cloudflare_stream_id?: string | null
          thumbnail_url?: string | null
          status?: 'pending' | 'active' | 'inactive' | 'rejected'
          booking_url?: string | null
          featured?: boolean
          viewer_count?: number
          total_views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          creator_id?: string
          name?: string
          description?: string
          lodge_name?: string
          region?: 'Africa' | 'North America' | 'South America' | 'Asia' | 'Europe' | 'Australia' | 'Antarctica'
          animal_type?: 'Big Cats' | 'Birds' | 'Marine' | 'Primates' | 'Elephants' | 'Bears' | 'Reptiles' | 'Other'
          rtmp_url?: string
          cloudflare_stream_id?: string | null
          thumbnail_url?: string | null
          status?: 'pending' | 'active' | 'inactive' | 'rejected'
          booking_url?: string | null
          featured?: boolean
          viewer_count?: number
          total_views?: number
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          camera_id: string | null
          tier: 'free' | 'single' | 'all-access'
          stripe_subscription_id: string | null
          stripe_customer_id: string | null
          status: 'active' | 'cancelled' | 'past_due'
          current_period_start: string
          current_period_end: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          camera_id?: string | null
          tier: 'free' | 'single' | 'all-access'
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          status?: 'active' | 'cancelled' | 'past_due'
          current_period_start: string
          current_period_end: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          camera_id?: string | null
          tier?: 'free' | 'single' | 'all-access'
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          status?: 'active' | 'cancelled' | 'past_due'
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          camera_id: string | null
          type: 'subscription' | 'payout'
          amount: number
          stripe_payment_intent_id: string | null
          status: 'pending' | 'completed' | 'failed'
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          camera_id?: string | null
          type: 'subscription' | 'payout'
          amount: number
          stripe_payment_intent_id?: string | null
          status?: 'pending' | 'completed' | 'failed'
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          camera_id?: string | null
          type?: 'subscription' | 'payout'
          amount?: number
          stripe_payment_intent_id?: string | null
          status?: 'pending' | 'completed' | 'failed'
          metadata?: Json | null
          created_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          camera_id: string
          type: string
          message: string
          metadata: Json | null
          is_active: boolean
          created_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          camera_id: string
          type: string
          message: string
          metadata?: Json | null
          is_active?: boolean
          created_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          camera_id?: string
          type?: string
          message?: string
          metadata?: Json | null
          is_active?: boolean
          created_at?: string
          expires_at?: string | null
        }
      }
      favorite_cameras: {
        Row: {
          id: string
          user_id: string
          camera_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          camera_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          camera_id?: string
          created_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          camera_id: string
          user_id: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          camera_id: string
          user_id: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          camera_id?: string
          user_id?: string
          message?: string
          created_at?: string
        }
      }
      camera_presence: {
        Row: {
          id: string
          camera_id: string
          user_id: string | null
          last_seen: string
        }
        Insert: {
          id?: string
          camera_id: string
          user_id?: string | null
          last_seen?: string
        }
        Update: {
          id?: string
          camera_id?: string
          user_id?: string | null
          last_seen?: string
        }
      }
    }
  }
}
