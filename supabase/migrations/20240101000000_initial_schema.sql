-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('viewer', 'creator', 'admin');
CREATE TYPE camera_status AS ENUM ('pending', 'active', 'inactive', 'rejected');
CREATE TYPE region_type AS ENUM ('Africa', 'North America', 'South America', 'Asia', 'Europe', 'Australia', 'Antarctica');
CREATE TYPE animal_type AS ENUM ('Big Cats', 'Birds', 'Marine', 'Primates', 'Elephants', 'Bears', 'Reptiles', 'Other');
CREATE TYPE subscription_tier AS ENUM ('free', 'single', 'all-access');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'past_due');
CREATE TYPE transaction_type AS ENUM ('subscription', 'payout');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'viewer' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Cameras table
CREATE TABLE public.cameras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  lodge_name TEXT NOT NULL,
  region region_type NOT NULL,
  animal_type animal_type NOT NULL,
  rtmp_url TEXT NOT NULL,
  cloudflare_stream_id TEXT,
  thumbnail_url TEXT,
  status camera_status DEFAULT 'pending' NOT NULL,
  booking_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  viewer_count INTEGER DEFAULT 0,
  total_views BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  camera_id UUID REFERENCES public.cameras(id) ON DELETE CASCADE,
  tier subscription_tier NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  status subscription_status DEFAULT 'active' NOT NULL,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT single_camera_required CHECK (
    (tier = 'single' AND camera_id IS NOT NULL) OR
    (tier != 'single' AND camera_id IS NULL)
  )
);

-- Transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  camera_id UUID REFERENCES public.cameras(id) ON DELETE SET NULL,
  type transaction_type NOT NULL,
  amount INTEGER NOT NULL,
  stripe_payment_intent_id TEXT,
  status transaction_status DEFAULT 'pending' NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Alerts table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  camera_id UUID NOT NULL REFERENCES public.cameras(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ
);

-- Favorite cameras table
CREATE TABLE public.favorite_cameras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  camera_id UUID NOT NULL REFERENCES public.cameras(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, camera_id)
);

-- Chat messages table
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  camera_id UUID NOT NULL REFERENCES public.cameras(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Camera presence table (for real-time viewer counts)
CREATE TABLE public.camera_presence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  camera_id UUID NOT NULL REFERENCES public.cameras(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  last_seen TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(camera_id, user_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_cameras_status ON public.cameras(status);
CREATE INDEX idx_cameras_creator ON public.cameras(creator_id);
CREATE INDEX idx_cameras_region ON public.cameras(region);
CREATE INDEX idx_cameras_animal_type ON public.cameras(animal_type);
CREATE INDEX idx_cameras_featured ON public.cameras(featured) WHERE featured = TRUE;
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_camera ON public.subscriptions(camera_id);
CREATE INDEX idx_subscriptions_stripe ON public.subscriptions(stripe_subscription_id);
CREATE INDEX idx_transactions_user ON public.transactions(user_id);
CREATE INDEX idx_transactions_camera ON public.transactions(camera_id);
CREATE INDEX idx_chat_messages_camera ON public.chat_messages(camera_id);
CREATE INDEX idx_chat_messages_created ON public.chat_messages(created_at DESC);
CREATE INDEX idx_favorite_cameras_user ON public.favorite_cameras(user_id);
CREATE INDEX idx_camera_presence_camera ON public.camera_presence(camera_id);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cameras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_cameras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.camera_presence ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Cameras policies
CREATE POLICY "Anyone can view active cameras" ON public.cameras
  FOR SELECT USING (status = 'active' OR creator_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Creators can insert cameras" ON public.cameras
  FOR INSERT WITH CHECK (
    creator_id = auth.uid() AND
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('creator', 'admin'))
  );

CREATE POLICY "Creators can update their own cameras" ON public.cameras
  FOR UPDATE USING (creator_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- Subscriptions policies
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own subscriptions" ON public.subscriptions
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own subscriptions" ON public.subscriptions
  FOR UPDATE USING (user_id = auth.uid());

-- Transactions policies
CREATE POLICY "Users can view their own transactions" ON public.transactions
  FOR SELECT USING (
    user_id = auth.uid() OR
    (camera_id IN (SELECT id FROM public.cameras WHERE creator_id = auth.uid())) OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "System can create transactions" ON public.transactions
  FOR INSERT WITH CHECK (true);

-- Alerts policies
CREATE POLICY "Anyone can view active alerts for active cameras" ON public.alerts
  FOR SELECT USING (
    is_active = true AND
    camera_id IN (SELECT id FROM public.cameras WHERE status = 'active')
  );

CREATE POLICY "Creators can manage alerts for their cameras" ON public.alerts
  FOR ALL USING (
    camera_id IN (SELECT id FROM public.cameras WHERE creator_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Favorite cameras policies
CREATE POLICY "Users can view their own favorites" ON public.favorite_cameras
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can add favorites" ON public.favorite_cameras
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can remove their favorites" ON public.favorite_cameras
  FOR DELETE USING (user_id = auth.uid());

-- Chat messages policies
CREATE POLICY "Anyone can view chat messages for active cameras" ON public.chat_messages
  FOR SELECT USING (
    camera_id IN (SELECT id FROM public.cameras WHERE status = 'active')
  );

CREATE POLICY "Authenticated users can post messages" ON public.chat_messages
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND user_id = auth.uid()
  );

-- Camera presence policies
CREATE POLICY "Users can manage their own presence" ON public.camera_presence
  FOR ALL USING (user_id = auth.uid() OR user_id IS NULL);

-- Functions and Triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cameras_updated_at BEFORE UPDATE ON public.cameras
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update viewer count based on presence
CREATE OR REPLACE FUNCTION update_camera_viewer_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.cameras
  SET viewer_count = (
    SELECT COUNT(DISTINCT user_id)
    FROM public.camera_presence
    WHERE camera_id = COALESCE(NEW.camera_id, OLD.camera_id)
      AND last_seen > NOW() - INTERVAL '5 minutes'
  )
  WHERE id = COALESCE(NEW.camera_id, OLD.camera_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_viewer_count_on_presence
AFTER INSERT OR UPDATE OR DELETE ON public.camera_presence
FOR EACH ROW EXECUTE FUNCTION update_camera_viewer_count();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
