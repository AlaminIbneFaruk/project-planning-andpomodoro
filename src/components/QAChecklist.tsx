import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, AlertTriangle, Bug, Shield, Smartphone, Globe, Zap, ArrowLeft } from 'lucide-react';

interface QAItem {
  id: number;
  category: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

const qaItems: QAItem[] = [
  // Authentication & Security
  {
    id: 1,
    category: "Authentication & Security",
    description: "User registration works with valid email/password",
    priority: "High",
    completed: false
  },
  {
    id: 2,
    category: "Authentication & Security",
    description: "User login works with correct credentials",
    priority: "High",
    completed: false
  },
  {
    id: 3,
    category: "Authentication & Security",
    description: "Login fails with incorrect credentials",
    priority: "High",
    completed: false
  },
  {
    id: 4,
    category: "Authentication & Security",
    description: "User logout works properly",
    priority: "High",
    completed: false
  },
  {
    id: 5,
    category: "Authentication & Security",
    description: "Protected routes redirect to login when not authenticated",
    priority: "High",
    completed: false
  },
  {
    id: 6,
    category: "Authentication & Security",
    description: "JWT tokens expire and refresh properly",
    priority: "High",
    completed: false
  },
  {
    id: 7,
    category: "Authentication & Security",
    description: "Password validation enforces security requirements",
    priority: "Medium",
    completed: false
  },

  // Epic Quests Functionality
  {
    id: 8,
    category: "Epic Quests",
    description: "Create new Epic Quest with title and description",
    priority: "High",
    completed: false
  },
  {
    id: 9,
    category: "Epic Quests",
    description: "View list of all Epic Quests",
    priority: "High",
    completed: false
  },
  {
    id: 10,
    category: "Epic Quests",
    description: "Edit existing Epic Quest details",
    priority: "High",
    completed: false
  },
  {
    id: 11,
    category: "Epic Quests",
    description: "Delete Epic Quest with confirmation",
    priority: "High",
    completed: false
  },
  {
    id: 12,
    category: "Epic Quests",
    description: "Epic Quest status updates correctly (Active/Completed/Paused)",
    priority: "High",
    completed: false
  },
  {
    id: 13,
    category: "Epic Quests",
    description: "Epic Quest progress calculation is accurate",
    priority: "Medium",
    completed: false
  },

  // Sub-Quests Functionality
  {
    id: 14,
    category: "Sub-Quests",
    description: "Add Sub-Quest to Epic Quest",
    priority: "High",
    completed: false
  },
  {
    id: 15,
    category: "Sub-Quests",
    description: "Mark Sub-Quest as complete/incomplete",
    priority: "High",
    completed: false
  },
  {
    id: 16,
    category: "Sub-Quests",
    description: "Edit Sub-Quest details",
    priority: "Medium",
    completed: false
  },
  {
    id: 17,
    category: "Sub-Quests",
    description: "Delete Sub-Quest with confirmation",
    priority: "Medium",
    completed: false
  },
  {
    id: 18,
    category: "Sub-Quests",
    description: "Sub-Quest completion updates Epic Quest progress",
    priority: "High",
    completed: false
  },

  // Dashboard & Stats
  {
    id: 19,
    category: "Dashboard & Stats",
    description: "XP bar displays current level and progress",
    priority: "High",
    completed: false
  },
  {
    id: 20,
    category: "Dashboard & Stats",
    description: "Stats show correct counts (quests, completed, etc.)",
    priority: "High",
    completed: false
  },
  {
    id: 21,
    category: "Dashboard & Stats",
    description: "Recent activity feed updates in real-time",
    priority: "Medium",
    completed: false
  },
  {
    id: 22,
    category: "Dashboard & Stats",
    description: "Achievement badges display correctly",
    priority: "Medium",
    completed: false
  },

  // AI Copilot
  {
    id: 23,
    category: "AI Copilot",
    description: "AI chat interface loads and responds",
    priority: "High",
    completed: false
  },
  {
    id: 24,
    category: "AI Copilot",
    description: "AI provides relevant quest suggestions",
    priority: "Medium",
    completed: false
  },
  {
    id: 25,
    category: "AI Copilot",
    description: "AI handles error cases gracefully",
    priority: "Medium",
    completed: false
  },
  {
    id: 26,
    category: "AI Copilot",
    description: "Chat history persists during session",
    priority: "Low",
    completed: false
  },

  // UI/UX & Responsiveness
  {
    id: 27,
    category: "UI/UX & Responsiveness",
    description: "Mobile layout works on phones (320px-768px)",
    priority: "High",
    completed: false
  },
  {
    id: 28,
    category: "UI/UX & Responsiveness",
    description: "Tablet layout works (768px-1024px)",
    priority: "High",
    completed: false
  },
  {
    id: 29,
    category: "UI/UX & Responsiveness",
    description: "Desktop layout works (1024px+)",
    priority: "High",
    completed: false
  },
  {
    id: 30,
    category: "UI/UX & Responsiveness",
    description: "Navigation menu works on all screen sizes",
    priority: "High",
    completed: false
  },
  {
    id: 31,
    category: "UI/UX & Responsiveness",
    description: "Forms are usable on mobile devices",
    priority: "High",
    completed: false
  },
  {
    id: 32,
    category: "UI/UX & Responsiveness",
    description: "Loading states display during API calls",
    priority: "Medium",
    completed: false
  },
  {
    id: 33,
    category: "UI/UX & Responsiveness",
    description: "Error messages are clear and helpful",
    priority: "Medium",
    completed: false
  },

  // Performance & Browser Compatibility
  {
    id: 34,
    category: "Performance & Browser",
    description: "App loads in under 3 seconds on 3G",
    priority: "Medium",
    completed: false
  },
  {
    id: 35,
    category: "Performance & Browser",
    description: "Works in Chrome (latest version)",
    priority: "High",
    completed: false
  },
  {
    id: 36,
    category: "Performance & Browser",
    description: "Works in Firefox (latest version)",
    priority: "High",
    completed: false
  },
  {
    id: 37,
    category: "Performance & Browser",
    description: "Works in Safari (latest version)",
    priority: "High",
    completed: false
  },
  {
    id: 38,
    category: "Performance & Browser",
    description: "Works in Edge (latest version)",
    priority: "Medium",
    completed: false
  },
  {
    id: 39,
    category: "Performance & Browser",
    description: "No console errors in production",
    priority: "High",
    completed: false
  },

  // Data Persistence & API
  {
    id: 40,
    category: "Data & API",
    description: "Data persists after browser refresh",
    priority: "High",
    completed: false
  },
  {
    id: 41,
    category: "Data & API",
    description: "API handles network failures gracefully",
    priority: "High",
    completed: false
  },
  {
    id: 42,
    category: "Data & API",
    description: "Offline functionality works (if implemented)",
    priority: "Low",
    completed: false
  },
  {
    id: 43,
    category: "Data & API",
    description: "Database operations are atomic and consistent",
    priority: "High",
    completed: false
  },

  // Final Checks
  {
    id: 44,
    category: "Final Checks",
    description: "All links work and lead to correct pages",
    priority: "High",
    completed: false
  },
  {
    id: 45,
    category: "Final Checks",
    description: "Favicon and meta tags are properly set",
    priority: "Low",
    completed: false
  },
  {
    id: 46,
    category: "Final Checks",
    description: "App works with JavaScript disabled (graceful degradation)",
    priority: "Low",
    completed: false
  },
  {
    id: 47,
    category: "Final Checks",
    description: "Accessibility: keyboard navigation works",
    priority: "Medium",
    completed: false
  },
  {
    id: 48,
    category: "Final Checks",
    description: "Accessibility: screen reader compatibility",
    priority: "Medium",
    completed: false
  }
];

interface QAChecklistProps {
  onBack: () => void;
}

const QAChecklist: React.FC<QAChecklistProps> = ({ onBack }) => {
  const [items, setItems] = useState<QAItem[]>(qaItems);
  const [filter, setFilter] = useState<string>('all');

  // Load saved state from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('gamify-qa-checklist');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('gamify-qa-checklist', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const categories = Array.from(new Set(items.map(item => item.category)));
  const priorities = ['High', 'Medium', 'Low'];

  const getFilteredItems = () => {
    if (filter === 'completed') return items.filter(item => item.completed);
    if (filter === 'pending') return items.filter(item => !item.completed);
    if (filter === 'high') return items.filter(item => item.priority === 'High');
    if (filter === 'medium') return items.filter(item => item.priority === 'Medium');
    if (filter === 'low') return items.filter(item => item.priority === 'Low');
    if (filter === 'all') return items;
    return items.filter(item => item.category === filter);
  };

  const resetAll = () => {
    if (window.confirm('Are you sure you want to reset all QA items? This cannot be undone.')) {
      setItems(qaItems);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'Medium': return <Bug className="w-4 h-4 text-yellow-500" />;
      case 'Low': return <Shield className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Authentication & Security': return <Shield className="w-5 h-5 text-blue-600" />;
      case 'Epic Quests': return <Zap className="w-5 h-5 text-purple-600" />;
      case 'Sub-Quests': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'Dashboard & Stats': return <Globe className="w-5 h-5 text-indigo-600" />;
      case 'AI Copilot': return <Bug className="w-5 h-5 text-pink-600" />;
      case 'UI/UX & Responsiveness': return <Smartphone className="w-5 h-5 text-orange-600" />;
      case 'Performance & Browser': return <Zap className="w-5 h-5 text-yellow-600" />;
      case 'Data & API': return <Globe className="w-5 h-5 text-cyan-600" />;
      case 'Final Checks': return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default: return <Circle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Build Plan
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
                <Bug className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                QA Testing Checklist
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive quality assurance checklist for GamifyMyLife. 
              Test each feature thoroughly before marking as complete.
            </p>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Testing Progress</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tests Completed</span>
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
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">High Priority</h3>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                Critical tests that must pass
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {items.filter(item => item.priority === 'High' && item.completed).length}/
                {items.filter(item => item.priority === 'High').length}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Quality Status</h3>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                {progressPercentage === 100 
                  ? "Ready for production! 🚀" 
                  : progressPercentage >= 80 
                  ? "Almost ready for launch 🎯"
                  : "Testing in progress 🧪"
                }
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {progressPercentage === 100 ? '✅ Complete' : '🔄 Testing'}
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
                All Tests
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
              <button
                onClick={() => setFilter('high')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'high' 
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                High Priority
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === category 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
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

        {/* QA Items List */}
        <div className="space-y-4">
          {getFilteredItems().map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl ${
                item.completed ? 'bg-green-50 border-green-200' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    item.completed
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(item.category)}
                          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${getPriorityColor(item.priority)}`}>
                          {getPriorityIcon(item.priority)}
                          {item.priority}
                        </div>
                      </div>
                      <h3 className={`text-lg font-semibold ${
                        item.completed ? 'text-green-700 line-through' : 'text-gray-800'
                      }`}>
                        {item.description}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Thorough testing ensures a quality user experience. 
            Take your time with each test case! 🧪✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default QAChecklist;