import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, ExternalLink, MapPin, Target, Zap, Users, CreditCard, Shield, Smartphone, Globe, Database, TestTube } from 'lucide-react';

interface TourismTask {
  id: number;
  phase: string;
  description: string;
  time: string;
  resource: string;
  resourceUrl: string;
  completed: boolean;
}

const tourismTasks: TourismTask[] = [
  // Phase 1: Planning & Setup
  {
    id: 1,
    phase: "Planning & Setup",
    description: "Define functional requirements & roles (Tourist, Guide, Admin)",
    time: "25m",
    resource: "Functional spec tips",
    resourceUrl: "https://www.justinmind.com/blog/how-to-write-a-functional-specification/",
    completed: false
  },
  {
    id: 2,
    phase: "Planning & Setup",
    description: "Design high-level architecture (frontend, backend, DB)",
    time: "25m",
    resource: "System design 101",
    resourceUrl: "https://roadmap.sh/system-design",
    completed: false
  },
  {
    id: 3,
    phase: "Planning & Setup",
    description: "Create folder structure (frontend/backend/docs)",
    time: "25m",
    resource: "Folder structure guide",
    resourceUrl: "https://www.freecodecamp.org/news/scalable-folder-structure-for-modern-web-apps/",
    completed: false
  },
  {
    id: 4,
    phase: "Planning & Setup",
    description: "Initialize Git repo & push to GitHub",
    time: "25m",
    resource: "GitHub basics",
    resourceUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk",
    completed: false
  },
  {
    id: 5,
    phase: "Planning & Setup",
    description: "Setup .env.example & Tailwind config",
    time: "25m",
    resource: "Tailwind config",
    resourceUrl: "https://tailwindcss.com/docs/configuration",
    completed: false
  },

  // Phase 2: Backend Development
  {
    id: 6,
    phase: "Backend Development",
    description: "Scaffold Express.js app & test hello world",
    time: "25m",
    resource: "Express intro",
    resourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction",
    completed: false
  },
  {
    id: 7,
    phase: "Backend Development",
    description: "Connect MongoDB Atlas & define schemas (User, Package, Booking, Story)",
    time: "25m",
    resource: "Mongoose",
    resourceUrl: "https://mongoosejs.com/docs/index.html",
    completed: false
  },
  {
    id: 8,
    phase: "Backend Development",
    description: "Build auth (JWT, Google login, logout)",
    time: "25m",
    resource: "JWT auth",
    resourceUrl: "https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs",
    completed: false
  },
  {
    id: 9,
    phase: "Backend Development",
    description: "Build password reset & forgot",
    time: "25m",
    resource: "Password reset",
    resourceUrl: "https://www.smashingmagazine.com/2018/01/secure-password-reset/",
    completed: false
  },
  {
    id: 10,
    phase: "Backend Development",
    description: "Build bookings CRUD (with guide assignment & status)",
    time: "25m",
    resource: "REST + Mongoose",
    resourceUrl: "https://mongoosejs.com/docs/guide.html",
    completed: false
  },
  {
    id: 11,
    phase: "Backend Development",
    description: "Build stories CRUD (with images)",
    time: "25m",
    resource: "REST + Mongoose",
    resourceUrl: "https://mongoosejs.com/docs/guide.html",
    completed: false
  },
  {
    id: 12,
    phase: "Backend Development",
    description: "Build admin dashboards endpoints & analytics",
    time: "25m",
    resource: "MongoDB Aggregation",
    resourceUrl: "https://docs.mongodb.com/manual/aggregation/",
    completed: false
  },
  {
    id: 13,
    phase: "Backend Development",
    description: "Integrate Stripe payments endpoint & webhooks",
    time: "25m",
    resource: "Stripe",
    resourceUrl: "https://stripe.com/docs/payments",
    completed: false
  },
  {
    id: 14,
    phase: "Backend Development",
    description: "Test all APIs in Postman",
    time: "25m",
    resource: "Postman",
    resourceUrl: "https://www.postman.com/api-platform/",
    completed: false
  },

  // Phase 3: Frontend Development
  {
    id: 15,
    phase: "Frontend Development",
    description: "Scaffold Next.js app with Tailwind & DaisyUI",
    time: "25m",
    resource: "Next.js Learn",
    resourceUrl: "https://nextjs.org/learn",
    completed: false
  },
  {
    id: 16,
    phase: "Frontend Development",
    description: "Setup global layout, navbar & footer",
    time: "25m",
    resource: "Tailwind & DaisyUI",
    resourceUrl: "https://daisyui.com/",
    completed: false
  },
  {
    id: 17,
    phase: "Frontend Development",
    description: "Build login/register pages (connect to backend)",
    time: "25m",
    resource: "Clerk or custom",
    resourceUrl: "https://clerk.dev/docs",
    completed: false
  },
  {
    id: 18,
    phase: "Frontend Development",
    description: "Build Tourist dashboard: profile, bookings, stories",
    time: "25m",
    resource: "Next.js dynamic routes",
    resourceUrl: "https://nextjs.org/docs/routing/dynamic-routes",
    completed: false
  },
  {
    id: 19,
    phase: "Frontend Development",
    description: "Build Guide dashboard: assigned tours, stories",
    time: "25m",
    resource: "Tailwind components",
    resourceUrl: "https://tailwindcss.com/docs/",
    completed: false
  },
  {
    id: 20,
    phase: "Frontend Development",
    description: "Build Admin dashboard: manage users, packages, analytics",
    time: "25m",
    resource: "DaisyUI tables/cards",
    resourceUrl: "https://daisyui.com/components/",
    completed: false
  },
  {
    id: 21,
    phase: "Frontend Development",
    description: "Build booking table with pay & cancel actions",
    time: "25m",
    resource: "Tailwind tables",
    resourceUrl: "https://tailwindcss.com/docs/",
    completed: false
  },
  {
    id: 22,
    phase: "Frontend Development",
    description: "Add mobile responsiveness & animations",
    time: "25m",
    resource: "Tailwind responsive",
    resourceUrl: "https://tailwindcss.com/docs/responsive-design",
    completed: false
  },
  {
    id: 23,
    phase: "Frontend Development",
    description: "Polish notifications & loading states",
    time: "25m",
    resource: "React Toastify",
    resourceUrl: "https://fkhadra.github.io/react-toastify/introduction",
    completed: false
  },

  // Phase 4: Data, QA & Deployment
  {
    id: 24,
    phase: "Data, QA & Deployment",
    description: "Seed DB with sample data & test users",
    time: "25m",
    resource: "MongoDB scripts",
    resourceUrl: "https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/",
    completed: false
  },
  {
    id: 25,
    phase: "Data, QA & Deployment",
    description: "Write README & API docs",
    time: "25m",
    resource: "Make a README",
    resourceUrl: "https://www.makeareadme.com/",
    completed: false
  },
  {
    id: 26,
    phase: "Data, QA & Deployment",
    description: "Deploy frontend on Vercel",
    time: "25m",
    resource: "Vercel deploy",
    resourceUrl: "https://vercel.com/docs",
    completed: false
  },
  {
    id: 27,
    phase: "Data, QA & Deployment",
    description: "Deploy backend on Render",
    time: "25m",
    resource: "Render deploy",
    resourceUrl: "https://render.com/docs",
    completed: false
  },
  {
    id: 28,
    phase: "Data, QA & Deployment",
    description: "Run end-to-end QA test all flows",
    time: "25m",
    resource: "QA checklist",
    resourceUrl: "https://www.softwaretestinghelp.com/qa-testing-checklist/",
    completed: false
  },
  {
    id: 29,
    phase: "Data, QA & Deployment",
    description: "Collect feedback & iterate",
    time: "25m",
    resource: "User interviews",
    resourceUrl: "https://www.nngroup.com/articles/user-interviews/",
    completed: false
  }
];

const TourismManagement: React.FC = () => {
  const [tasks, setTasks] = useState<TourismTask[]>(tourismTasks);
  const [filter, setFilter] = useState<string>('all');

  // Load saved state from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tourism-checklist-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tourism-checklist-tasks', JSON.stringify(tasks));
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
      setTasks(tourismTasks);
    }
  };

  const totalTime = tasks.reduce((acc, task) => acc + parseInt(task.time), 0);
  const completedTime = tasks.filter(task => task.completed).reduce((acc, task) => acc + parseInt(task.time), 0);

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'Planning & Setup': return <Target className="w-5 h-5 text-blue-600" />;
      case 'Backend Development': return <Database className="w-5 h-5 text-green-600" />;
      case 'Frontend Development': return <Smartphone className="w-5 h-5 text-purple-600" />;
      case 'Data, QA & Deployment': return <TestTube className="w-5 h-5 text-orange-600" />;
      default: return <Circle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-full">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Tourism Management System
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Complete build plan for a production-ready Tourism Management System with role-based access, 
            bookings, payments, and admin controls. Built from the ground up.
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
              <div className="bg-cyan-100 p-2 rounded-full">
                <Users className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">System Status</h3>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                {completedCount > 0 
                  ? `${completedCount} tasks completed! 🎉` 
                  : "Ready to build your TMS? 🚀"
                }
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {completedCount === totalCount ? '🏆 Complete!' : '🔨 Building'}
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
                    ? 'bg-blue-600 text-white shadow-lg' 
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
                      ? 'bg-cyan-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {phase}
                </button>
              ))}
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
                      : 'border-gray-300 hover:border-blue-500'
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
                        <div className="flex items-center gap-1">
                          {getPhaseIcon(task.phase)}
                          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            {task.phase}
                          </span>
                        </div>
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
            Built for developers who want to create production-ready tourism platforms. 
            Keep building, keep growing! 🌍✈️
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourismManagement;