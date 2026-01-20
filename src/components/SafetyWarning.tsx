import { motion } from 'framer-motion';
import { AlertTriangle, Heart } from 'lucide-react';

interface SafetyWarningProps {
  onAcknowledge: () => void;
}

const SafetyWarning = ({ onAcknowledge }: SafetyWarningProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[70vh] p-6"
    >
      <div className="wellness-card max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="mx-auto w-20 h-20 rounded-full bg-lotus-light flex items-center justify-center"
        >
          <Heart className="w-10 h-10 text-lotus" />
        </motion.div>

        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-bold text-foreground">
            🌸 Health First Always 🌸
          </h2>
        </div>

        {/* Message */}
        <div className="space-y-4 text-left bg-lotus-light/50 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-lotus flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              Since you have medical conditions (diabetes/thyroid/PCOD/heart issues/medications), 
              please <strong>consult your doctor or registered nutritionist</strong> before any diet changes.
            </p>
          </div>
        </div>

        <p className="text-muted-foreground">
          Your wellbeing matters most 💕 Once medically approved, I'm ready to help!
        </p>

        {/* Action */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAcknowledge}
          className="w-full wellness-button-outline"
        >
          <span className="flex items-center justify-center gap-2">
            🙏 I Understand - Stay Healthy!
          </span>
        </motion.button>

        <p className="text-xs text-muted-foreground">
          We're here when you're ready with medical clearance ✨
        </p>
      </div>
    </motion.div>
  );
};

export default SafetyWarning;
