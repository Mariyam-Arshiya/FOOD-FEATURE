import { motion, AnimatePresence } from 'framer-motion';
import { useNutritionStore } from '@/hooks/useNutritionStore';
import MealCard from './MealCard';
import { ChevronLeft, ChevronRight, Calendar, Lightbulb, Star } from 'lucide-react';

const WeeklyMenu = () => {
  const { weeklyPlan, selectedDay, setSelectedDay, logMeal, profile } = useNutritionStore();

  if (!weeklyPlan) return null;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDayPlan = weeklyPlan.days[selectedDay];

  const handlePrevDay = () => {
    setSelectedDay(selectedDay === 0 ? 6 : selectedDay - 1);
  };

  const handleNextDay = () => {
    setSelectedDay(selectedDay === 6 ? 0 : selectedDay + 1);
  };

  const getPersonalizedTip = () => {
    if (profile.stressLevel === 'high') {
      return { emoji: '🫚', tip: 'Add ginger to your curd for extra stress relief!' };
    }
    if (profile.sleepPattern === 'after1') {
      return { emoji: '🍌', tip: 'Have a banana at 10PM for better sleep quality.' };
    }
    if (profile.cycleStatus === 'irregular') {
      return { emoji: '🎃', tip: 'Pumpkin seeds daily help with hormonal balance.' };
    }
    if (profile.currentMood === 'tired') {
      return { emoji: '🥬', tip: 'Double your sprouts for an energy boost!' };
    }
    return { emoji: '💡', tip: 'Keep almonds handy for the 3PM crash prevention.' };
  };

  const tip = getPersonalizedTip();

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="wellness-card"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-lg">
              Week {weeklyPlan.week}: {weeklyPlan.cuisineEmoji} {weeklyPlan.cuisine}
            </h3>
          </div>
          <span className="chip chip-active">
            {weeklyPlan.isVeg ? '🥗 Veg' : '🍗 Non-Veg'}
          </span>
        </div>

        {/* Day Selector */}
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevDay}
            className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex gap-1">
            {days.map((day, idx) => (
              <motion.button
                key={day}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedDay(idx)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedDay === idx
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
              >
                {day}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNextDay}
            className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Meals for selected day */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-3"
        >
          <h4 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
            <Star className="w-4 h-4 text-turmeric" />
            {currentDayPlan.day}'s Menu
            <span className="text-sm font-normal text-muted-foreground">
              (~{currentDayPlan.totalCalories} kcal)
            </span>
          </h4>

          <MealCard
            food={currentDayPlan.breakfast}
            mealTime="8:00 AM • Breakfast"
            onLog={() => logMeal(currentDayPlan.breakfast)}
          />
          <MealCard
            food={currentDayPlan.lunch}
            mealTime="1:00 PM • Lunch"
            onLog={() => logMeal(currentDayPlan.lunch)}
          />
          <MealCard
            food={currentDayPlan.snack}
            mealTime="4:00 PM • Snack"
            onLog={() => logMeal(currentDayPlan.snack)}
          />
          <MealCard
            food={currentDayPlan.dinner}
            mealTime="8:00 PM • Dinner"
            onLog={() => logMeal(currentDayPlan.dinner)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Personalized Tip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="wellness-card bg-turmeric/10 border-turmeric/30"
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl">{tip.emoji}</div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="w-4 h-4 text-turmeric" />
              <span className="font-semibold text-sm text-turmeric">Pro Tip</span>
            </div>
            <p className="text-sm text-foreground">{tip.tip}</p>
          </div>
        </div>
      </motion.div>

      {/* Nutrition Science */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="wellness-card bg-haldi-light/50"
      >
        <h4 className="font-display font-bold text-sm mb-3 flex items-center gap-2">
          🧬 Why This Menu Works
        </h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-secondary">🥬 {currentDayPlan.lunch.name}</span>
            {currentDayPlan.lunch.moodBenefit && (
              <> = {currentDayPlan.lunch.moodBenefit}</>
            )}
          </p>
          <p>
            <span className="font-semibold text-secondary">🥛 {currentDayPlan.snack.name}</span>
            {currentDayPlan.snack.moodBenefit && (
              <> = {currentDayPlan.snack.moodBenefit}</>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WeeklyMenu;
