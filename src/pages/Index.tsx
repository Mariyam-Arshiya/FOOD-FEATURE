import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNutritionStore } from '@/hooks/useNutritionStore';
import WelcomeScreen from '@/components/WelcomeScreen';
import WellnessQuiz from '@/components/WellnessQuiz';
import SafetyWarning from '@/components/SafetyWarning';
import NutritionDashboard from '@/components/NutritionDashboard';
import WeeklyMenu from '@/components/WeeklyMenu';
import PlateSnap from '@/components/PlateSnap';

type View = 'welcome' | 'quiz' | 'dashboard';

const Index = () => {
  const [view, setView] = useState<View>('welcome');
  const { quizCompleted, showSafetyWarning, resetQuiz } = useNutritionStore();

  const handleStartQuiz = () => {
    setView('quiz');
  };

  const handleSafetyAcknowledge = () => {
    resetQuiz();
    setView('welcome');
  };

  // If quiz is completed, show dashboard
  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-cream">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border"
        >
          <div className="container max-w-2xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌸</span>
                <h1 className="font-display font-bold text-lg text-gradient-saffron">
                  Food & Diet
                </h1>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  resetQuiz();
                  setView('welcome');
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Reset
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container max-w-2xl mx-auto px-4 py-6 pb-24">
          <NutritionDashboard />
          <div className="mt-6">
            <WeeklyMenu />
          </div>
        </main>

        {/* Plate Snap FAB */}
        <PlateSnap />

        {/* Roommate Challenge Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-24 left-4 right-4 max-w-md mx-auto"
        >
          <div className="wellness-card bg-lotus-light/80 backdrop-blur border-lotus/30 p-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👭</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Roommate Challenge
                </p>
                <p className="text-xs text-muted-foreground">
                  Beat Priya's 5-day streak! 💪
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 rounded-full bg-lotus text-white text-sm font-semibold"
              >
                Join
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show safety warning if medical conditions
  if (showSafetyWarning) {
    return (
      <div className="min-h-screen bg-gradient-cream">
        <SafetyWarning onAcknowledge={handleSafetyAcknowledge} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cream relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {view === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WelcomeScreen onStart={handleStartQuiz} />
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WellnessQuiz />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
