import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Coffee, Zap, ArrowLeft, Volume2, VolumeX } from 'lucide-react';

interface PomodoroTimerProps {
  onBack?: () => void;
}

type TimerMode = 'work' | 'break';
type TimerStatus = 'idle' | 'running' | 'paused';

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ onBack }) => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [completedSessions, setCompletedSessions] = useState(0);
  const [completedBreaks, setCompletedBreaks] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Load saved state from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('pomodoro-timer-data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setCompletedSessions(data.completedSessions || 0);
      setCompletedBreaks(data.completedBreaks || 0);
      setSoundEnabled(data.soundEnabled !== undefined ? data.soundEnabled : true);
    }
  }, []);

  // Save to localStorage whenever stats change
  useEffect(() => {
    const data = {
      completedSessions,
      completedBreaks,
      soundEnabled
    };
    localStorage.setItem('pomodoro-timer-data', JSON.stringify(data));
  }, [completedSessions, completedBreaks, soundEnabled]);

  // Create audio context for alarm sounds
  const createAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  // Play alarm sound using Web Audio API
  const playAlarm = (frequency: number = 800, duration: number = 1000) => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = createAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);

      // Play multiple beeps for work session completion
      if (mode === 'work') {
        setTimeout(() => playAlarm(600, 500), 300);
        setTimeout(() => playAlarm(1000, 500), 600);
      }
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  };

  // Timer countdown logic
  useEffect(() => {
    if (status === 'running' && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && status === 'running') {
      // Timer completed
      playAlarm();
      setStatus('idle');
      
      if (mode === 'work') {
        setCompletedSessions(prev => prev + 1);
        setMode('break');
        setTimeLeft(5 * 60); // 5 minutes break
      } else {
        setCompletedBreaks(prev => prev + 1);
        setMode('work');
        setTimeLeft(25 * 60); // 25 minutes work
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, timeLeft, mode, soundEnabled]);

  const startTimer = () => {
    setStatus('running');
  };

  const pauseTimer = () => {
    setStatus('paused');
  };

  const resetTimer = () => {
    setStatus('idle');
    if (mode === 'work') {
      setTimeLeft(25 * 60);
    } else {
      setTimeLeft(5 * 60);
    }
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setStatus('idle');
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const resetStats = () => {
    if (window.confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
      setCompletedSessions(0);
      setCompletedBreaks(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalTime = mode === 'work' ? 25 * 60 : 5 * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getModeColor = () => {
    return mode === 'work' ? 'from-red-500 to-orange-500' : 'from-green-500 to-emerald-500';
  };

  const getModeIcon = () => {
    return mode === 'work' ? <Zap className="w-8 h-8" /> : <Coffee className="w-8 h-8" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Build Plan
            </button>
          )}
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`bg-gradient-to-r ${getModeColor()} p-3 rounded-full text-white`}>
                <Clock className="w-8 h-8" />
              </div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${getModeColor()} bg-clip-text text-transparent`}>
                Pomodoro Timer
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Stay focused with the Pomodoro Technique. Work for 25 minutes, then take a 5-minute break.
            </p>
          </div>
        </div>

        {/* Timer Display */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 mb-8">
          <div className="text-center">
            {/* Mode Indicator */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className={`bg-gradient-to-r ${getModeColor()} p-3 rounded-full text-white`}>
                {getModeIcon()}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {mode === 'work' ? 'Focus Time' : 'Break Time'}
              </h2>
            </div>

            {/* Timer Circle */}
            <div className="relative w-80 h-80 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-gray-200"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className={mode === 'work' ? 'stop-red-500' : 'stop-green-500'} />
                    <stop offset="100%" className={mode === 'work' ? 'stop-orange-500' : 'stop-emerald-500'} />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Timer text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-800 mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-lg text-gray-600 font-medium">
                    {status === 'running' ? 'Running' : status === 'paused' ? 'Paused' : 'Ready'}
                  </div>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {status === 'running' ? (
                <button
                  onClick={pauseTimer}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105"
                >
                  <Pause className="w-8 h-8" />
                </button>
              ) : (
                <button
                  onClick={startTimer}
                  className={`bg-gradient-to-r ${getModeColor()} hover:opacity-90 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105`}
                >
                  <Play className="w-8 h-8" />
                </button>
              )}
              
              <button
                onClick={resetTimer}
                className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105"
              >
                <RotateCcw className="w-8 h-8" />
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`${soundEnabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'} text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105`}
              >
                {soundEnabled ? <Volume2 className="w-8 h-8" /> : <VolumeX className="w-8 h-8" />}
              </button>
            </div>

            {/* Mode Switch */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => switchMode('work')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  mode === 'work'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Zap className="w-4 h-4 inline mr-2" />
                Work (25m)
              </button>
              <button
                onClick={() => switchMode('break')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  mode === 'break'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Coffee className="w-4 h-4 inline mr-2" />
                Break (5m)
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-red-100 p-2 rounded-full">
                <Zap className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Work Sessions</h3>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">{completedSessions}</div>
            <div className="text-sm text-gray-600">
              {completedSessions * 25} minutes focused
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Coffee className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Breaks Taken</h3>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">{completedBreaks}</div>
            <div className="text-sm text-gray-600">
              {completedBreaks * 5} minutes rested
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Total Time</h3>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {Math.round((completedSessions * 25 + completedBreaks * 5) / 60 * 10) / 10}h
            </div>
            <div className="text-sm text-gray-600">
              Time invested today
            </div>
          </div>
        </div>

        {/* Tips & Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Pomodoro Tips</h3>
            <button
              onClick={resetStats}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Reset Stats
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="space-y-2">
              <p>🎯 <strong>Focus fully</strong> during work sessions</p>
              <p>📱 <strong>Eliminate distractions</strong> - put phone away</p>
              <p>✅ <strong>Complete one task</strong> per session when possible</p>
            </div>
            <div className="space-y-2">
              <p>☕ <strong>Take real breaks</strong> - step away from screen</p>
              <p>🚶 <strong>Move around</strong> during break time</p>
              <p>🔔 <strong>Sound alerts</strong> help you stay on track</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            The Pomodoro Technique® was created by Francesco Cirillo. 
            Stay focused, stay productive! 🍅⏰
          </p>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;