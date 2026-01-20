import { motion } from 'framer-motion';
import { FoodItem } from '@/data/foodDatabase';
import { Check, Flame, Sparkles } from 'lucide-react';

interface MealCardProps {
  food: FoodItem;
  mealTime: string;
  completed?: boolean;
  onComplete?: () => void;
  onLog?: () => void;
}

const MealCard = ({ food, mealTime, completed = false, onComplete, onLog }: MealCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`meal-card relative overflow-hidden ${
        completed ? 'bg-haldi-light border-secondary' : ''
      }`}
    >
      {/* Completed overlay */}
      {completed && (
        <div className="absolute top-2 right-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Emoji */}
        <div className="text-3xl">{food.emoji}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Time & Name */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              {mealTime}
            </span>
            {food.moodBenefit && (
              <Sparkles className="w-3 h-3 text-turmeric" />
            )}
          </div>
          <h4 className="font-display font-bold text-foreground truncate">
            {food.name}
          </h4>

          {/* Calories & Macros */}
          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center gap-1 text-sm font-bold text-primary">
              <Flame className="w-3 h-3" />
              {food.calories}kcal
            </span>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span className="macro-badge bg-saffron-light text-primary">
                C:{food.carbs}g
              </span>
              <span className="macro-badge bg-haldi-light text-secondary">
                P:{food.protein}g
              </span>
              <span className="macro-badge bg-muted">
                F:{food.fat}g
              </span>
            </div>
          </div>

          {/* Mood benefit */}
          {food.moodBenefit && (
            <p className="text-xs text-turmeric mt-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {food.moodBenefit}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      {!completed && (
        <div className="flex gap-2 mt-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="flex-1 py-2 px-3 rounded-lg bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
          >
            ✓ Mark Done
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLog}
            className="py-2 px-3 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
          >
            📸
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default MealCard;
