# Quick Setup Guide

## Step-by-Step Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to initialize (takes ~2 minutes)
3. Go to Project Settings > API to get your keys:
   - Project URL
   - Anon/Public Key
   - Service Role Key (keep this secret!)

### 3. Run Database Migration

1. In your Supabase dashboard, go to SQL Editor
2. Open `supabase/migrations/20240101000000_initial_schema.sql` from this project
3. Copy and paste the entire contents into the SQL Editor
4. Click "Run" to execute the migration
5. Verify tables were created in the Table Editor

### 4. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Go to Developers > API Keys
3. Copy your Publishable Key and Secret Key
4. For webhooks (optional for development):
   - Install Stripe CLI: `brew install stripe/stripe-cli/stripe` (or download from Stripe)
   - Run: `stripe login`
   - Run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   - Copy the webhook signing secret

### 5. Set Up Cloudflare Stream

1. Create a Cloudflare account at [cloudflare.com](https://cloudflare.com)
2. Navigate to Stream in the dashboard
3. Get your Account ID from the URL or Account Settings
4. Create an API Token:
   - Go to My Profile > API Tokens
   - Create Token with Stream:Edit permissions
5. Your customer code is part of your stream URLs

### 6. Configure Environment Variables

Create `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # Optional for development

# Cloudflare Stream
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
NEXT_PUBLIC_CLOUDFLARE_STREAM_CUSTOMER_CODE=your-customer-code

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=WorldWildlifeWatch
CREATOR_REVENUE_SPLIT=60
PRICE_SINGLE_CAMERA=499
PRICE_ALL_ACCESS=1999
```

### 7. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Creating Your First Admin User

Since you need an admin to approve cameras, you'll need to manually set a user as admin:

1. Sign up for an account through the UI
2. Go to your Supabase dashboard > Table Editor > users
3. Find your user row
4. Change the `role` column from `viewer` to `admin`
5. Refresh the app - you should now see the Admin link in the header

## Creating Test Cameras

1. Create a second account or change your role to `creator`
2. Navigate to Creator Dashboard
3. Add a new camera with test data:
   - Use any valid RTMP URL (or a placeholder for testing)
   - Fill in all required fields
4. As admin, go to Admin Dashboard to approve the camera
5. Camera will now appear on Browse and Homepage

## Testing Video Streaming

For development, you can use test HLS streams:

Example test stream URL:
```
https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
```

Or create a simple test camera feed using OBS:
1. Download OBS Studio
2. Set up a scene with test content
3. Configure streaming to an RTMP server
4. Use that RTMP URL in your camera setup

## Common Issues

### Database connection errors
- Check that your Supabase URL and keys are correct
- Verify the migration ran successfully
- Check Supabase dashboard for any service issues

### Authentication not working
- Clear your browser cookies
- Check that NEXT_PUBLIC_SUPABASE_URL starts with https://
- Verify middleware.ts is properly configured

### Video not playing
- Check browser console for errors
- Verify the stream URL is accessible
- Ensure CORS is configured correctly in Cloudflare
- Try with a test HLS stream URL first

### Styles not loading
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Restart the dev server

## Next Steps

1. **Add real camera streams**: Configure actual RTMP streams from cameras
2. **Set up Stripe products**: Create products in Stripe dashboard matching your pricing
3. **Configure OAuth**: Set up Google OAuth in Supabase auth settings
4. **Customize branding**: Update colors, logo, and copy to match your brand
5. **Deploy**: Deploy to Vercel or your preferred hosting platform

## Development Tips

- Use `npm run build` to check for TypeScript errors before committing
- The database has Row Level Security enabled - test with different user roles
- Real-time features (chat, viewer count) require websocket connections
- For production, set up proper Cloudflare Stream ingestion and delivery

## Support

If you run into issues:
1. Check the main README.md for detailed documentation
2. Review Supabase logs in the dashboard
3. Check browser console for client-side errors
4. Verify all environment variables are set correctly

Happy coding! 🦁
