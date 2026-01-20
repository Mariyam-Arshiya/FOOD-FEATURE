import { motion } from 'framer-motion';
import { Heart, Sparkles, Camera, Utensils } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center"
    >
      {/* Floating decorations */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-4xl opacity-30"
      >
        🌸
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-16 text-3xl opacity-30"
      >
        🥗
      </motion.div>
      <motion.div
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-20 text-3xl opacity-30"
      >
        🍛
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="wellness-card max-w-md w-full space-y-6"
      >
        {/* Header */}
        <div className="space-y-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl"
          >
            🌸
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-gradient-saffron">
            Welcome to Food & Diet
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Your nutrition companion for better mood, energy & focus 💕
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-saffron-light"
          >
            <Camera className="w-8 h-8 text-primary" />
            <span className="text-sm font-semibold text-foreground">Plate Snap</span>
            <span className="text-xs text-muted-foreground">Track with photos</span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-haldi-light"
          >
            <Utensils className="w-8 h-8 text-secondary" />
            <span className="text-sm font-semibold text-foreground">Smart Menus</span>
            <span className="text-xs text-muted-foreground">Indian hostel foods</span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-lotus-light"
          >
            <Heart className="w-8 h-8 text-lotus" />
            <span className="text-sm font-semibold text-foreground">Mood Boost</span>
            <span className="text-xs text-muted-foreground">Foods for wellness</span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted"
          >
            <Sparkles className="w-8 h-8 text-turmeric" />
            <span className="text-sm font-semibold text-foreground">Streaks</span>
            <span className="text-xs text-muted-foreground">Stay consistent</span>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full wellness-button-primary text-lg py-4"
        >
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Start Wellness Assessment
            <span className="text-xl">✨</span>
          </span>
        </motion.button>

        <p className="text-xs text-muted-foreground">
          Gentle 90-second quiz to personalize your nutrition plan
        </p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
