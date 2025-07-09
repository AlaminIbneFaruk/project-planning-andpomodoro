/*
  # Create tasks table for Task Manager

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key, auto-generated)
      - `title` (text, required) - Task title
      - `description` (text, optional) - Task description
      - `priority` (text, default 'medium') - Priority level: low, medium, high
      - `status` (text, default 'pending') - Status: pending, in_progress, completed
      - `category` (text, optional) - Task category for organization
      - `estimated_time` (integer, optional) - Estimated time in minutes
      - `due_date` (date, optional) - Task due date
      - `created_at` (timestamptz, auto-generated) - Creation timestamp
      - `updated_at` (timestamptz, auto-generated) - Last update timestamp
      - `user_id` (text, required) - User identifier for task ownership

  2. Security
    - Enable RLS on `tasks` table
    - Add policies for authenticated users to manage their own tasks
    - Users can only access tasks where user_id matches their auth.uid()

  3. Performance
    - Add indexes on frequently queried columns (user_id, status, priority, due_date)
    - Optimize for filtering and sorting operations

  4. Constraints
    - Priority must be one of: 'low', 'medium', 'high'
    - Status must be one of: 'pending', 'in_progress', 'completed'
*/

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
  ON public.tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own tasks"
  ON public.tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own tasks"
  ON public.tasks
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own tasks"
  ON public.tasks
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON public.tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();