# Project Planning & Pomodoro Timer

A comprehensive project management application featuring interactive build plans, custom task management, and an integrated Pomodoro timer for focused productivity.

## 🚀 Features

### Project Build Plans
- **GamifyMyLife**: 25-step build plan for creating a gamified productivity application
- **Tourism Management System**: 29-step comprehensive plan for a production-ready TMS
- Interactive checklists with progress tracking
- Resource links for each development step
- Time estimates for focused work sessions

### Task Manager
- **Custom Task Creation**: Full CRUD operations for personal tasks
- **Priority Management**: High, medium, and low priority levels
- **Status Tracking**: Pending, in progress, and completed states
- **Categories & Time Estimation**: Organize tasks with custom categories
- **Due Date Management**: Set and track task deadlines
- **Search & Filtering**: Find tasks quickly with advanced filters
- **Progress Analytics**: Visual progress tracking and statistics

### Pomodoro Timer
- 25-minute work sessions with 5-minute breaks
- Visual countdown with progress ring
- Sound alerts for session completion
- Statistics tracking (sessions completed, time invested)
- Customizable sound settings

### Quality Assurance
- Comprehensive QA checklist with 48+ test cases
- Categorized testing (Authentication, UI/UX, Performance, etc.)
- Priority-based filtering (High, Medium, Low)
- Progress tracking for quality assurance

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (demo mode with local user IDs)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify (frontend)

## 🗄️ Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  category text,
  estimated_time integer,
  due_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id text NOT NULL
);
```

**Row Level Security (RLS)** is enabled with policies ensuring users can only access their own tasks.

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for Task Manager functionality)

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-planning-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase (Optional - for Task Manager)**
   - Create a new Supabase project
   - Copy the project URL and anon key
   - Create a `.env` file:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - Run the migration to create the tasks table

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### Without Supabase
The app works perfectly without Supabase! The GamifyMyLife build plan, Tourism Management plan, Pomodoro timer, and QA checklist all use local storage and work offline. Only the Task Manager requires Supabase for data persistence.

## 📱 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Local Storage**: Progress automatically saved and restored
- **Tab Navigation**: Easy switching between different project plans
- **Interactive UI**: Beautiful animations and micro-interactions
- **Time Management**: Built-in Pomodoro technique integration
- **Data Persistence**: Supabase integration with offline fallback
- **User Isolation**: Secure task management with RLS

## 🎨 Design Philosophy

Built with production-quality design principles:
- Clean, modern interface with thoughtful spacing
- Consistent color system and typography
- Smooth animations and transitions
- Accessible and user-friendly navigation
- Mobile-first responsive design

## 📊 Project Structure

```
src/
├── components/
│   ├── ChecklistApp.tsx       # GamifyMyLife build plan
│   ├── TourismManagement.tsx  # Tourism system build plan
│   ├── PomodoroTimer.tsx      # Focus timer component
│   ├── QAChecklist.tsx        # Quality assurance testing
│   ├── TaskManager.tsx        # Custom task management
│   ├── TaskForm.tsx           # Task creation/editing form
│   └── TabSystem.tsx          # Main navigation system
├── hooks/
│   └── useTasks.ts            # Task management logic
├── lib/
│   └── supabase.ts            # Supabase client configuration
├── App.tsx                   # Root application component
└── main.tsx                  # Application entry point
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration (Optional - for Task Manager)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚀 Deployment

### Frontend (Netlify)
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Database (Supabase)
1. Create a new Supabase project
2. Run the provided SQL migration
3. Configure RLS policies
4. Update environment variables

## 🧪 Testing

The app includes a comprehensive QA checklist with 48+ test cases covering:
- Authentication & Security
- CRUD Operations
- UI/UX & Responsiveness
- Performance & Browser Compatibility
- Data Persistence & API

## 🚀 Deployment

This application can be deployed on Netlify with automatic builds from the main branch. The Task Manager requires Supabase for full functionality.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

MIT License - feel free to use this project for your own development planning and productivity needs!

---
