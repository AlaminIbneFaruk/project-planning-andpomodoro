# Deployment Guide: Netlify + Supabase

This guide covers deploying your Task Manager application to Netlify with Supabase integration.

## 🚀 Quick Deployment Steps

### 1. Prepare Your Repository
Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy to Netlify

#### Option A: Netlify Dashboard (Recommended)
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose your Git provider (GitHub, GitLab, etc.)
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 (set in netlify.toml)

#### Option B: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from your project directory
netlify deploy --prod --dir=dist
```

### 3. Set Up Supabase Database

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your Project URL and Anon Key

2. **Run Database Migration**:
   - Go to Supabase Dashboard → SQL Editor
   - Copy and paste the migration from `supabase/migrations/20250709034613_sparkling_night.sql`
   - Click "Run" to create the tasks table

### 4. Configure Environment Variables in Netlify

1. In Netlify Dashboard, go to your site
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

```
VITE_SUPABASE_URL = https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key-here
```

**Important**: Replace with your actual Supabase credentials!

### 5. Redeploy Your Site

After adding environment variables:
1. Go to **Deploys** tab in Netlify
2. Click "Trigger deploy" → "Deploy site"
3. Wait for deployment to complete

## 🔧 Configuration Files

### netlify.toml
The `netlify.toml` file configures:
- Build settings and Node.js version
- SPA routing redirects
- Security headers
- Static asset caching

### Environment Variables
Required for production:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🗄️ Database Setup

### Migration SQL
The app requires this table structure:

```sql
CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  priority text DEFAULT 'medium' NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  status text DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed')),
  category text,
  estimated_time integer,
  due_date date,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  user_id text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create user-specific policies
CREATE POLICY "Users can view their own tasks"
  ON public.tasks FOR SELECT TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own tasks"
  ON public.tasks FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own tasks"
  ON public.tasks FOR UPDATE TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own tasks"
  ON public.tasks FOR DELETE TO authenticated
  USING (auth.uid()::text = user_id);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON public.tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);
```

## 🧪 Testing Your Deployment

1. **Visit your Netlify URL**
2. **Test all features**:
   - ✅ GamifyMyLife build plan (works offline)
   - ✅ Tourism Management plan (works offline)
   - ✅ Pomodoro Timer (works offline)
   - ✅ QA Checklist (works offline)
   - ✅ Task Manager (requires Supabase)

3. **Task Manager Testing**:
   - Create a new task
   - Edit existing tasks
   - Delete tasks
   - Filter and search
   - Check data persistence

## 🔒 Security Considerations

### Row Level Security (RLS)
- Enabled on tasks table
- Users can only access their own data
- Demo mode uses local user IDs

### Environment Variables
- Never commit `.env` files to Git
- Use Netlify's environment variable system
- Supabase keys are safe for client-side use

### HTTPS
- Netlify provides HTTPS by default
- Supabase requires HTTPS connections

## 🚨 Troubleshooting

### Build Failures
```bash
# Check build logs in Netlify dashboard
# Common issues:
- Missing environment variables
- Node.js version mismatch
- Build command errors
```

### Supabase Connection Issues
```bash
# Check browser console for errors
# Verify:
- Environment variables are set correctly
- Supabase project is active
- Database migration was run
- RLS policies are configured
```

### Task Manager Not Working
1. Check if environment variables are set in Netlify
2. Verify Supabase project URL and key
3. Confirm database migration was successful
4. Check browser network tab for API errors

## 📊 Monitoring

### Netlify Analytics
- Monitor site performance
- Track deployment history
- View build logs

### Supabase Dashboard
- Monitor database usage
- Check API requests
- View table data

## 🔄 Continuous Deployment

Once set up, your site will automatically redeploy when you push to your main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Netlify automatically rebuilds and deploys
```

## 📱 Features Available

### Without Supabase (Offline)
- ✅ GamifyMyLife build plan
- ✅ Tourism Management plan
- ✅ Pomodoro Timer with statistics
- ✅ QA Checklist
- ✅ All progress saved to localStorage

### With Supabase (Full Features)
- ✅ All offline features
- ✅ Task Manager with CRUD operations
- ✅ Data persistence across devices
- ✅ User-specific task isolation
- ✅ Real-time updates

Your app is now live and ready for production use! 🎉

## 🔗 Useful Links

- [Netlify Documentation](https://docs.netlify.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)