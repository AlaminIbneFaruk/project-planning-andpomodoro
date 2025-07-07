import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, ExternalLink, Trophy, Target, Zap, Bug, Timer } from 'lucide-react';
import QAChecklist from './QAChecklist';
import PomodoroTimer from './PomodoroTimer';

interface Task {
  id: number;
  phase: string;
  description: string;
  time: string;
  resource: string;
  resourceUrl: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  // Phase 1: Setup & Planning
  {
    id: 1,
    phase: "Setup & Planning",
    description: "Create project folder structure (frontend/backend/docs/scripts)",
    time: "25m",
    resource: "Project structure guide",
    resourceUrl: "https://www.freecodecamp.org/news/scalable-folder-structure-for-modern-web-apps/",
    completed: false
  },
  {
    id: 2,
    phase: "Setup & Planning",
    description: "Initialize Git repo & push to GitHub",
    time: "25m",
    resource: "Git & GitHub basics",
    resourceUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk",
    completed: false
  },
  {
    id: 3,
    phase: "Setup & Planning",
    description: "Setup .env files & Tailwind config",
    time: "25m",
    resource: "TailwindCSS config",
    resourceUrl: "https://tailwindcss.com/docs/configuration",
    completed: false
  },
  // Phase 2: Backend Setup
  {
    id: 4,
    phase: "Backend Setup",
    description: "Scaffold Express.js app with routes & test hello world",
    time: "25m",
    resource: "Node+Express crash course",
    resourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction",
    completed: false
  },
  {
    id: 5,
    phase: "Backend Setup",
    description: "Connect MongoDB Atlas & create first schema (User)",
    time: "25m",
    resource: "MongoDB + Mongoose",
    resourceUrl: "https://mongoosejs.com/docs/index.html",
    completed: false
  },
  {
    id: 6,
    phase: "Backend Setup",
    description: "Build auth routes (register/login/logout)",
    time: "25m",
    resource: "JWT auth tutorial",
    resourceUrl: "https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs",
    completed: false
  },
  {
    id: 7,
    phase: "Backend Setup",
    description: "Build Epic Quest CRUD endpoints",
    time: "25m",
    resource: "Mongoose & REST docs",
    resourceUrl: "https://mongoosejs.com/docs/guide.html",
    completed: false
  },
  {
    id: 8,
    phase: "Backend Setup",
    description: "Build Sub-Quest CRUD endpoints",
    time: "25m",
    resource: "Mongoose & REST docs",
    resourceUrl: "https://mongoosejs.com/docs/guide.html",
    completed: false
  },
  {
    id: 9,
    phase: "Backend Setup",
    description: "Build AI endpoint that calls OpenAI API",
    time: "25m",
    resource: "OpenAI API",
    resourceUrl: "https://platform.openai.com/docs/",
    completed: false
  },
  {
    id: 10,
    phase: "Backend Setup",
    description: "Test backend using Postman",
    time: "25m",
    resource: "Postman basics",
    resourceUrl: "https://www.postman.com/api-platform/",
    completed: false
  },
  // Phase 3: Frontend Setup
  {
    id: 11,
    phase: "Frontend Setup",
    description: "Scaffold Next.js app with Tailwind & ShadCN UI",
    time: "25m",
    resource: "Next.js tutorial",
    resourceUrl: "https://nextjs.org/learn",
    completed: false
  },
  {
    id: 12,
    phase: "Frontend Setup",
    description: "Create global layout & sidebar navigation",
    time: "25m",
    resource: "ShadCN UI docs",
    resourceUrl: "https://ui.shadcn.com/",
    completed: false
  },
  {
    id: 13,
    phase: "Frontend Setup",
    description: "Build login/register pages connected to backend",
    time: "25m",
    resource: "Clerk/Firebase/Custom",
    resourceUrl: "https://clerk.dev/docs",
    completed: false
  },
  {
    id: 14,
    phase: "Frontend Setup",
    description: "Build dashboard page with XP bar & stats",
    time: "25m",
    resource: "Tailwind & Framer Motion",
    resourceUrl: "https://tailwindcss.com/docs/",
    completed: false
  },
  {
    id: 15,
    phase: "Frontend Setup",
    description: "Build Epic Quest List & Epic Details page",
    time: "25m",
    resource: "Next.js dynamic routes",
    resourceUrl: "https://nextjs.org/docs/routing/dynamic-routes",
    completed: false
  },
  {
    id: 16,
    phase: "Frontend Setup",
    description: "Build Sub-Quest checklist UI",
    time: "25m",
    resource: "Reusable components",
    resourceUrl: "https://react.dev/learn/your-first-component",
    completed: false
  },
  {
    id: 17,
    phase: "Frontend Setup",
    description: "Build AI Copilot chat UI",
    time: "25m",
    resource: "OpenAI frontend integration",
    resourceUrl: "https://platform.openai.com/docs/",
    completed: false
  },
  {
    id: 18,
    phase: "Frontend Setup",
    description: "Add badges gallery & leaderboard UI",
    time: "25m",
    resource: "ShadCN tables & cards",
    resourceUrl: "https://ui.shadcn.com/docs/components/table",
    completed: false
  },
  // Phase 4: Polish & Deploy
  {
    id: 19,
    phase: "Polish & Deploy",
    description: "Add mobile responsiveness & animations",
    time: "25m",
    resource: "Tailwind responsive design",
    resourceUrl: "https://tailwindcss.com/docs/responsive-design",
    completed: false
  },
  {
    id: 20,
    phase: "Polish & Deploy",
    description: "Seed DB with badges & test data",
    time: "25m",
    resource: "Run seed.js",
    resourceUrl: "https://mongoosejs.com/docs/populate.html",
    completed: false
  },
  {
    id: 21,
    phase: "Polish & Deploy",
    description: "Deploy frontend on Vercel",
    time: "25m",
    resource: "Vercel deploy",
    resourceUrl: "https://vercel.com/docs",
    completed: false
  },
  {
    id: 22,
    phase: "Polish & Deploy",
    description: "Deploy backend on Render",
    time: "25m",
    resource: "Render deploy",
    resourceUrl: "https://render.com/docs",
    completed: false
  },
  {
    id: 23,
    phase: "Polish & Deploy",
    description: "Final QA test all flows",
    time: "25m",
    resource: "QA checklist",
    resourceUrl: "https://www.softwaretestinghelp.com/qa-testing-checklist/",
    completed: false
  },
  {
    id: 24,
    phase: "Polish & Deploy",
    description: "Write README & basic docs",
    time: "25m",
    resource: "Good README guide",
    resourceUrl: "https://www.makeareadme.com/",
    completed: false
  },
  {
    id: 25,
    phase: "Polish & Deploy",
    description: "Demo & feedback session",
    time: "25m",
    resource: "Demo best practices",
    resourceUrl: "https://blog.ycombinator.com/how-to-build-a-great-product-demo/",
    completed: false
  }
];

const ChecklistApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<string>('all');
  const [showQAChecklist, setShowQAChecklist] = useState<boolean>(false);
  const [showPomodoroTimer, setShowPomodoroTimer] = useState<boolean>(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('gamify-checklist-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('gamify-checklist-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const phases = Array.from(new Set(tasks.map(task => task.phase)));
  
  const getFilteredTasks = () => {
    if (filter === 'completed') return tasks.filter(task => task.completed);
    if (filter === 'pending') return tasks.filter(task => !task.completed);
    if (filter === 'all') return tasks;
    return tasks.filter(task => task.phase === filter);
  };

  const resetAll = () => {
    if (window.confirm('Are you sure you want to reset all tasks? This cannot be undone.')) {
      setTasks(initialTasks);
    }
  };

  const totalTime = tasks.reduce((acc, task) => acc + parseInt(task.time), 0);
  const completedTime = tasks.filter(task => task.completed).reduce((acc, task) => acc + parseInt(task.time), 0);

  if (showQAChecklist) {
    return <QAChecklist onBack={() => setShowQAChecklist(false)} />;
  }

  if (showPomodoroTimer) {
    return <PomodoroTimer onBack={() => setShowPomodoroTimer(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              GamifyMyLife Build Plan
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your productivity with this comprehensive 25-step build plan. 
            Each task is designed to be completed in focused 25-minute sessions.
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tasks Completed</span>
                <span>{completedCount}/{totalCount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="text-2xl font-bold text-gray-800">{progressPercentage.toFixed(1)}%</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Time Invested</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Completed</span>
                <span>{completedTime} min</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Remaining</span>
                <span>{totalTime - completedTime} min</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{(completedTime / 60).toFixed(1)}h</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Momentum</h3>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                {completedCount > 0 
                  ? `${completedCount} tasks completed! 🎉` 
                  : "Ready to start your journey? 🚀"
                }
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {completedCount === totalCount ? '🏆 Complete!' : '💪 Building'}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'all' 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'pending' 
                    ? 'bg-orange-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'completed' 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed
              </button>
              {phases.map(phase => (
                <button
                  key={phase}
                  onClick={() => setFilter(phase)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === phase 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {phase}
                </button>
              ))}
              <button
                onClick={() => setShowQAChecklist(true)}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors flex items-center gap-2"
              >
                <Bug className="w-4 h-4" />
                QA Checklist
              </button>
              <button
                onClick={() => setShowPomodoroTimer(true)}
                className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors flex items-center gap-2"
              >
                <Timer className="w-4 h-4" />
                Pomodoro Timer
              </button>
            </div>
            <button
              onClick={resetAll}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Reset All
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {getFilteredTasks().map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl ${
                task.completed ? 'bg-green-50 border-green-200' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.completed
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'border-gray-300 hover:border-purple-500'
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          {task.phase}
                        </span>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.time}
                        </span>
                      </div>
                      <h3 className={`text-lg font-semibold ${
                        task.completed ? 'text-green-700 line-through' : 'text-gray-800'
                      }`}>
                        Step {task.id}: {task.description}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>📚 Resource:</span>
                    <a
                      href={task.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 hover:underline"
                    >
                      {task.resource}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Built with ❤️ for developers who want to gamify their productivity. 
            Keep building, keep growing! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChecklistApp;