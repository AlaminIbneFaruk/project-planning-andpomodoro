import React, { useState } from 'react';
import { Trophy, MapPin, Gamepad2, Timer } from 'lucide-react';
import ChecklistApp from './ChecklistApp';
import TourismManagement from './TourismManagement';
import PomodoroTimer from './PomodoroTimer';

type TabType = 'gamify' | 'tourism' | 'pomodoro';

const TabSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('gamify');

  const tabs = [
    {
      id: 'gamify' as TabType,
      name: 'GamifyMyLife',
      icon: <Trophy className="w-5 h-5" />,
      description: 'Gamified productivity app build plan',
      color: 'from-purple-600 to-blue-600',
      bgColor: 'from-indigo-50 via-white to-purple-50'
    },
    {
      id: 'tourism' as TabType,
      name: 'Tourism Management',
      icon: <MapPin className="w-5 h-5" />,
      description: 'Complete TMS with bookings & payments',
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'from-blue-50 via-white to-cyan-50'
    },
    {
      id: 'pomodoro' as TabType,
      name: 'Pomodoro Timer',
      icon: <Timer className="w-5 h-5" />,
      description: 'Focus timer for productive work sessions',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 via-white to-red-50'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gamify':
        return <ChecklistApp />;
      case 'tourism':
        return <TourismManagement />;
      case 'pomodoro':
        return <PomodoroTimer onBack={() => setActiveTab('gamify')} />;
      default:
        return <ChecklistApp />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Tab Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Project Builder</h1>
                <p className="text-xs text-gray-600">Time-boxed development plans</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Description */}
          <div className="pb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {tabs.find(tab => tab.id === activeTab)?.icon}
              <span>{tabs.find(tab => tab.id === activeTab)?.description}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative">
        {renderTabContent()}
      </div>

      {/* Quick Stats Bar */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-gray-200">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${tabs.find(tab => tab.id === activeTab)?.color}`}></div>
              <span className="font-medium text-gray-700">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </span>
            </div>
            <div className="text-gray-500">
              Active Project
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSystem;