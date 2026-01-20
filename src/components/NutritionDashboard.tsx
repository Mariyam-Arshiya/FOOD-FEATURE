import { motion } from 'framer-motion';
import { useNutritionStore } from '@/hooks/useNutritionStore';
import { Flame, Target, TrendingUp, Trophy, Camera, Search, CheckCircle2 } from 'lucide-react';

const NutritionDashboard = () => {
  const {
    streak,
    totalCaloriesToday,
    calorieGoal,
    carbsToday,
    proteinToday,
    fatToday,
    carbsGoal,
    proteinGoal,
    fatGoal,
    todaysMeals,
    profile,
  } = useNutritionStore();

  const caloriePercent = Math.min((totalCaloriesToday / calorieGoal) * 100, 100);
  const carbsPercent = Math.min((carbsToday / carbsGoal) * 100, 100);
  const proteinPercent = Math.min((proteinToday / proteinGoal) * 100, 100);
  const fatPercent = Math.min((fatToday / fatGoal) * 100, 100);

  const completedMeals = todaysMeals.filter(m => m.completed).length;

  const getMoodEmoji = () => {
    switch (profile.currentMood) {
      case 'happy': return '😊';
      case 'okay': return '👍';
      case 'tired': return '😴';
      case 'stressed': return '😣';
      default: return '😊';
    }
  };

  const getStreakBadge = () => {
    if (streak >= 21) return { emoji: '🌟', title: 'Nutrition Champion!', color: 'bg-gradient-to-r from-yellow-400 to-orange-500' };
    if (streak >= 14) return { emoji: '💎', title: 'Energy Master!', color: 'bg-gradient-to-r from-green-400 to-emerald-500' };
    if (streak >= 7) return { emoji: '👑', title: 'Week Warrior!', color: 'bg-gradient-to-r from-yellow-300 to-yellow-500' };
    if (streak >= 3) return { emoji: '🔥', title: 'Mood Balance Unlocked!', color: 'bg-gradient-sunrise' };
    return { emoji: '🌱', title: 'Getting Started', color: 'bg-gradient-wellness' };
  };

  const badge = getStreakBadge();

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="wellness-card"
      >
        <div className="text-center mb-4">
          <h2 className="text-xl font-display font-bold text-gradient-saffron">
            🌸 Your Nutrition Journey 🌸
          </h2>
        </div>

        {/* Quick Stats Row */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary" />
            <span className="font-semibold">Streak: {streak} days</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-secondary" />
            <span className="font-semibold">
              TODAY: {totalCaloriesToday}/{calorieGoal} kcal
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">{getMoodEmoji()}</span>
            <span className="text-muted-foreground capitalize">{profile.currentMood}</span>
          </div>
        </div>

        {/* Macros */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>Macros Today</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {/* Carbs */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-primary">Carbs</span>
                <span className="text-muted-foreground">{carbsToday}g/{carbsGoal}g</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${carbsPercent}%` }}
                  className="progress-fill bg-gradient-sunrise"
                />
              </div>
              <span className="text-xs text-muted-foreground">({Math.round(carbsPercent)}%)</span>
            </div>

            {/* Protein */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-secondary">Protein</span>
                <span className="text-muted-foreground">{proteinToday}g/{proteinGoal}g</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${proteinPercent}%` }}
                  className="progress-fill bg-gradient-wellness"
                />
              </div>
              <span className="text-xs text-muted-foreground">({Math.round(proteinPercent)}%)</span>
            </div>

            {/* Fat */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-turmeric">Fat</span>
                <span className="text-muted-foreground">{fatToday}g/{fatGoal}g</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${fatPercent}%` }}
                  className="progress-fill bg-turmeric"
                />
              </div>
              <span className="text-xs text-muted-foreground">({Math.round(fatPercent)}%)</span>
            </div>
          </div>
        </div>

        {/* Calorie Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Daily Progress</span>
            <span className="text-muted-foreground">{Math.round(caloriePercent)}% Complete</span>
          </div>
          <div className="h-4 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${caloriePercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-sunrise"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{completedMeals} meals logged</span>
            <span>{calorieGoal - totalCaloriesToday} kcal remaining</span>
          </div>
        </div>

        {/* Achievement Badge */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className={`mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl ${badge.color} text-white`}
        >
          <Trophy className="w-5 h-5" />
          <span className="font-bold">{badge.title}</span>
          <span className="text-xl">{badge.emoji}</span>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="wellness-card p-4 flex flex-col items-center gap-2 hover:shadow-glow transition-shadow"
        >
          <div className="w-12 h-12 rounded-full bg-saffron-light flex items-center justify-center">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <span className="text-sm font-semibold">Snap Plate</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="wellness-card p-4 flex flex-col items-center gap-2 hover:shadow-glow transition-shadow"
        >
          <div className="w-12 h-12 rounded-full bg-haldi-light flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-secondary" />
          </div>
          <span className="text-sm font-semibold">Mark Done</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="wellness-card p-4 flex flex-col items-center gap-2 hover:shadow-glow transition-shadow"
        >
          <div className="w-12 h-12 rounded-full bg-lotus-light flex items-center justify-center">
            <Search className="w-6 h-6 text-lotus" />
          </div>
          <span className="text-sm font-semibold">Food Lookup</span>
        </motion.button>
      </div>
    </div>
  );
};

export default NutritionDashboard;
