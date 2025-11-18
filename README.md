# WorldWildlifeWatch

A global wildlife streaming platform where lodge owners can monetize their wildlife cameras through subscriptions and ad revenue.

## Features

### Core Functionality
- **Live Wildlife Streaming**: Watch live camera feeds from lodges around the world
- **Browse & Filter**: Search cameras by region (Africa, Asia, etc.) and animal type (Big Cats, Birds, Marine, etc.)
- **Real-time Chat**: Engage with other viewers in live chat on stream pages
- **Subscription System**: Single camera ($4.99/month) or All-Access Pass ($19.99/month)
- **Creator Dashboard**: Lodge owners can add cameras, view analytics, and track revenue
- **Admin Panel**: Approve new cameras, view platform stats, and manage payouts

### Technical Features
- **Next.js 14 App Router**: Modern React framework with server components
- **Supabase Backend**: PostgreSQL database with real-time subscriptions and auth
- **Stripe Integration**: Secure payment processing for subscriptions
- **Cloudflare Stream**: HLS video streaming with quality selector
- **Dark Mode**: Toggle between light and dark themes
- **Fully Responsive**: Mobile-first design with Tailwind CSS
- **TypeScript**: Type-safe development
- **Row Level Security**: Database-level security policies

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Payments**: Stripe
- **Video**: Cloudflare Stream, Video.js
- **UI Components**: Radix UI, Lucide Icons
- **State Management**: Zustand, React Context

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account ([supabase.com](https://supabase.com))
- Stripe account ([stripe.com](https://stripe.com))
- Cloudflare account ([cloudflare.com](https://cloudflare.com))

### Installation

1. **Clone the repository**
   ```bash
   cd worldwildlifewatch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your credentials:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

   # Cloudflare Stream
   NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
   CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
   NEXT_PUBLIC_CLOUDFLARE_STREAM_CUSTOMER_CODE=your-stream-customer-code

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME=WorldWildlifeWatch
   ```

4. **Set up Supabase database**

   Run the migration file to create all tables and policies:

   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the content from `supabase/migrations/20240101000000_initial_schema.sql`
   - Run the migration

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following main tables:

- **users**: User profiles with roles (viewer, creator, admin)
- **cameras**: Wildlife camera streams with metadata
- **subscriptions**: User subscription records
- **transactions**: Payment and payout tracking
- **alerts**: AI-powered wildlife alerts
- **favorite_cameras**: User bookmarks
- **chat_messages**: Real-time chat messages
- **camera_presence**: Track active viewers

## Project Structure

```
worldwildlifewatch/
├── app/                          # Next.js app router pages
│   ├── account/                  # User account pages
│   ├── admin/                    # Admin dashboard
│   ├── auth/                     # Authentication pages
│   ├── browse/                   # Browse cameras page
│   ├── creator/                  # Creator dashboard
│   ├── stream/[id]/             # Individual stream page
│   └── page.tsx                  # Homepage
├── components/                   # React components
│   ├── auth/                     # Auth forms
│   ├── dashboard/                # Dashboard components
│   ├── layout/                   # Layout components
│   ├── stream/                   # Video player & chat
│   └── ui/                       # Reusable UI components
├── lib/                          # Utility libraries
│   ├── supabase/                # Supabase client configs
│   ├── stripe/                  # Stripe configuration
│   └── utils/                   # Helper functions
├── types/                        # TypeScript type definitions
├── supabase/                     # Database migrations
└── public/                       # Static assets
```

## Key Features Implementation

### Authentication
- Email/password signup and login
- OAuth with Google (optional)
- Protected routes with middleware
- Role-based access control

### Video Streaming
- HLS streaming with Video.js player
- Quality selector
- Real-time viewer count
- AI alert overlays

### Monetization
- Single camera subscriptions: $4.99/month
- All-access pass: $19.99/month
- 60/40 revenue split (creators get 60%)
- Payout tracking for creators

### Real-time Features
- Live chat with Supabase Realtime
- Viewer presence tracking
- Real-time viewer counts

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

### Adding a New Camera (as Creator)

1. Sign up and request creator role (contact admin)
2. Navigate to Creator Dashboard
3. Fill in camera details:
   - Name, description, lodge name
   - Region and animal type
   - RTMP ingest URL
   - Optional booking URL
4. Submit for admin approval
5. Once approved, camera goes live

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Docker

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes |
| `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID | Yes |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token | Yes |
| `NEXT_PUBLIC_CLOUDFLARE_STREAM_CUSTOMER_CODE` | Stream customer subdomain | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app URL | Yes |
| `CREATOR_REVENUE_SPLIT` | Creator revenue percentage (default: 60) | No |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email hello@worldwildlifewatch.com or join our Discord community.

## Acknowledgments

- Wildlife footage from lodge partners worldwide
- Built with Next.js, Supabase, and Stripe
- UI components from Radix UI
- Icons from Lucide
