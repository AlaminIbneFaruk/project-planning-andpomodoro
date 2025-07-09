# Supabase Setup Guide

This guide will help you connect your Task Manager to Supabase for data persistence.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in your project details:
   - **Name**: Task Manager Database
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
6. Click "Create new project"

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Configure Environment Variables

1. In your project root, create a `.env` file (if it doesn't exist)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Replace the placeholder values with your actual Supabase credentials.

## Step 4: Run the Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase/migrations/create_tasks_table.sql`
4. Click "Run" to execute the migration

Alternatively, you can copy this SQL directly:

```sql
-- Create the tasks table
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

-- Create policies for authenticated users
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON public.tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);
```

## Step 5: Verify the Setup

1. Restart your development server: `npm run dev`
2. Navigate to the Task Manager tab
3. You should now be able to create, edit, and delete tasks
4. Check your Supabase dashboard → **Table Editor** to see your tasks

## Step 6: Enable Authentication (Optional)

For production use, you may want to enable proper authentication:

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Configure your preferred authentication providers
3. Update the `useTasks.ts` hook to use `auth.user()` instead of demo user IDs

## Troubleshooting

### "Supabase is not configured" Error
- Check that your `.env` file exists and has the correct values
- Restart your development server after adding environment variables
- Verify the environment variable names match exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### "relation 'public.tasks' does not exist" Error
- Make sure you ran the SQL migration in your Supabase dashboard
- Check the **Table Editor** in Supabase to confirm the `tasks` table exists

### RLS Policy Issues
- Ensure Row Level Security is enabled on the `tasks` table
- Verify that the policies are created correctly
- For demo mode, the app uses local user IDs that match the `user_id` column

## Database Schema

The `tasks` table includes:

- **id**: Unique identifier (UUID)
- **title**: Task title (required)
- **description**: Optional task description
- **priority**: low, medium, or high (default: medium)
- **status**: pending, in_progress, or completed (default: pending)
- **category**: Optional category for organization
- **estimated_time**: Estimated time in minutes
- **due_date**: Optional due date
- **created_at**: Creation timestamp
- **updated_at**: Last update timestamp (auto-updated)
- **user_id**: User identifier for task ownership

## Security Features

- **Row Level Security (RLS)**: Enabled to ensure data isolation
- **User-specific policies**: Users can only access their own tasks
- **Input validation**: Database constraints prevent invalid data
- **Secure authentication**: Uses Supabase Auth for user management

Your Task Manager is now connected to Supabase! 🎉