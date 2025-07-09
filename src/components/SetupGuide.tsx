import React, { useState } from 'react';
import { ArrowLeft, Database, Globe, CheckCircle2, ExternalLink, Copy, AlertTriangle, Zap, Shield, Clock } from 'lucide-react';

interface SetupGuideProps {
  onBack: () => void;
}

const SetupGuide: React.FC<SetupGuideProps> = ({ onBack }) => {
  const [copiedText, setCopiedText] = useState<string>('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const migrationSQL = `/*
  # Create tasks table for Task Manager

  1. New Tables
    - \`tasks\`
      - \`id\` (uuid, primary key, auto-generated)
      - \`title\` (text, required) - Task title
      - \`description\` (text, optional) - Task description
      - \`priority\` (text, default 'medium') - Priority level: low, medium, high
      - \`status\` (text, default 'pending') - Status: pending, in_progress, completed
      - \`category\` (text, optional) - Task category for organization
      - \`estimated_time\` (integer, optional) - Estimated time in minutes
      - \`due_date\` (date, optional) - Task due date
      - \`created_at\` (timestamptz, auto-generated) - Creation timestamp
      - \`updated_at\` (timestamptz, auto-generated) - Last update timestamp
      - \`user_id\` (text, required) - User identifier for task ownership

  2. Security
    - Enable RLS on \`tasks\` table
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
    EXECUTE FUNCTION update_updated_at_column();`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Setup Guide
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Complete guide to deploy your Project Builder app to Netlify with Supabase integration
            </p>
          </div>
        </div>

        {/* Quick Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            What You'll Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Works Immediately (No Setup)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  GamifyMyLife build plan (25 steps)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Tourism Management plan (29 steps)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Pomodoro Timer with statistics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  QA Checklist (48+ test cases)
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">After Supabase Setup</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  Custom Task Manager with CRUD
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  Data persistence across devices
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  User-specific task isolation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  Real-time updates
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 1: Deploy to Netlify */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-green-500" />
            Step 1: Deploy to Netlify
          </h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Estimated time: 5 minutes</span>
              </div>
              <p className="text-green-700 text-sm">
                Your app will work immediately after deployment! The build plans, timer, and checklist work offline.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Option A: Netlify Dashboard (Recommended)</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                <li>Push your code to GitHub (if not already done)</li>
                <li>Go to <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">netlify.com <ExternalLink className="w-3 h-3" /></a> and sign in</li>
                <li>Click "New site from Git"</li>
                <li>Choose GitHub and select your repository</li>
                <li>Build settings are automatically configured via <code className="bg-gray-100 px-2 py-1 rounded">netlify.toml</code></li>
                <li>Click "Deploy site"</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Option B: Netlify CLI</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Terminal Commands</span>
                  <button
                    onClick={() => copyToClipboard('npm install -g netlify-cli\nnetlify login\nnetlify deploy --prod --dir=dist', 'CLI Commands')}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    {copiedText === 'CLI Commands' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="text-sm text-gray-800 overflow-x-auto">
{`npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Setup Supabase */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-500" />
            Step 2: Setup Supabase (Optional - for Task Manager)
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Estimated time: 10 minutes</span>
              </div>
              <p className="text-blue-700 text-sm">
                Skip this step if you only want the build plans and timer. The Task Manager requires Supabase.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">2.1 Create Supabase Project</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                  <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">supabase.com <ExternalLink className="w-3 h-3" /></a></li>
                  <li>Sign up or log in to your account</li>
                  <li>Click "New Project"</li>
                  <li>Choose your organization</li>
                  <li>Fill in project details:
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li><strong>Name:</strong> Task Manager Database</li>
                      <li><strong>Database Password:</strong> Choose a strong password</li>
                      <li><strong>Region:</strong> Select closest to your users</li>
                    </ul>
                  </li>
                  <li>Click "Create new project" and wait for setup</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">2.2 Get Your Credentials</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                  <li>In your Supabase dashboard, go to <strong>Settings → API</strong></li>
                  <li>Copy these values (you'll need them later):
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li><strong>Project URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-xs">https://your-project-id.supabase.co</code></li>
                      <li><strong>Anon public key:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-xs">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</code></li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">2.3 Run Database Migration</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                  <li>In your Supabase dashboard, go to <strong>SQL Editor</strong></li>
                  <li>Click "New query"</li>
                  <li>Copy and paste the SQL below:</li>
                </ol>
                
                <div className="bg-gray-50 rounded-lg p-4 mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Database Migration SQL</span>
                    <button
                      onClick={() => copyToClipboard(migrationSQL, 'Migration SQL')}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedText === 'Migration SQL' ? 'Copied!' : 'Copy SQL'}
                    </button>
                  </div>
                  <pre className="text-xs text-gray-800 overflow-x-auto max-h-64 overflow-y-auto">
                    {migrationSQL}
                  </pre>
                </div>

                <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4 mt-3" start={4}>
                  <li>Click "Run" to execute the migration</li>
                  <li>Verify the <code className="bg-gray-100 px-2 py-1 rounded">tasks</code> table was created in <strong>Table Editor</strong></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Configure Environment Variables */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-purple-500" />
            Step 3: Configure Environment Variables
          </h2>

          <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-purple-800">Important</span>
              </div>
              <p className="text-purple-700 text-sm">
                This step is required only if you set up Supabase in Step 2. Skip if you only want the build plans.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">3.1 Add Variables to Netlify</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                <li>In your Netlify dashboard, go to your site</li>
                <li>Navigate to <strong>Site settings → Environment variables</strong></li>
                <li>Click "Add variable" and add these two variables:</li>
              </ol>

              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Environment Variables</span>
                  <button
                    onClick={() => copyToClipboard('VITE_SUPABASE_URL=https://your-project-id.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key-here', 'Env Variables')}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    {copiedText === 'Env Variables' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Variable 1:</strong><br />
                    <code className="bg-white px-2 py-1 rounded border">VITE_SUPABASE_URL</code><br />
                    <span className="text-gray-600">Value: Your Project URL from Step 2.2</span>
                  </div>
                  <div>
                    <strong>Variable 2:</strong><br />
                    <code className="bg-white px-2 py-1 rounded border">VITE_SUPABASE_ANON_KEY</code><br />
                    <span className="text-gray-600">Value: Your Anon Key from Step 2.2</span>
                  </div>
                </div>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4" start={4}>
                <li>Click "Save" for each variable</li>
                <li>Go to <strong>Deploys</strong> tab</li>
                <li>Click "Trigger deploy → Deploy site" to redeploy with new variables</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Testing & Verification */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            Step 4: Test Your Deployment
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">✅ Should Work Immediately</h3>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• GamifyMyLife build plan</li>
                  <li>• Tourism Management plan</li>
                  <li>• Pomodoro Timer</li>
                  <li>• QA Checklist</li>
                  <li>• Progress saves locally</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">🔧 After Supabase Setup</h3>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Task Manager tab works</li>
                  <li>• Create/edit/delete tasks</li>
                  <li>• Data persists across devices</li>
                  <li>• Real-time updates</li>
                  <li>• User-specific isolation</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Testing Checklist</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                <li>Visit your Netlify URL</li>
                <li>Test each tab (GamifyMyLife, Tourism, Pomodoro, QA)</li>
                <li>Check that progress saves when you refresh</li>
                <li>If you set up Supabase: Test Task Manager (create, edit, delete tasks)</li>
                <li>Test on mobile device for responsiveness</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            Troubleshooting
          </h2>

          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Common Issues</h3>
              
              <div className="space-y-3">
                <div className="border-l-4 border-red-400 pl-4">
                  <h4 className="font-medium text-red-800">Build fails on Netlify</h4>
                  <p className="text-sm text-red-600">Check build logs in Netlify dashboard. Usually missing dependencies or Node.js version issues.</p>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-medium text-yellow-800">Task Manager shows "Supabase not configured"</h4>
                  <p className="text-sm text-yellow-600">Environment variables not set correctly. Double-check Step 3.</p>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-medium text-blue-800">Database connection errors</h4>
                  <p className="text-sm text-blue-600">Verify migration was run successfully and RLS policies are enabled.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Getting Help</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Check browser console for error messages</li>
                <li>• Verify environment variables in Netlify dashboard</li>
                <li>• Test Supabase connection in their dashboard</li>
                <li>• Review deployment logs in Netlify</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle2 className="w-8 h-8" />
            <h2 className="text-2xl font-bold">You're All Set! 🎉</h2>
          </div>
          <p className="text-green-100 mb-4">
            Your Project Builder app is now live on Netlify with full functionality.
            Share it with your team and start building amazing projects!
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span>🚀 Fast deployment</span>
            <span>🔒 Secure by default</span>
            <span>📱 Mobile responsive</span>
            <span>⚡ Lightning fast</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Need help? Check the deployment logs or contact support. Happy building! 🛠️
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetupGuide;