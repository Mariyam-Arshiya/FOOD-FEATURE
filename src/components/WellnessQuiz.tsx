import { motion, AnimatePresence } from 'framer-motion';
import { useNutritionStore, QuizStep, LivingSituation, MoodState, CycleStatus, SleepPattern, StressLevel } from '@/hooks/useNutritionStore';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';

const WellnessQuiz = () => {
  const {
    currentStep,
    profile,
    setQuizStep,
    setMedicalConditions,
    updateProfile,
    completeQuiz,
  } = useNutritionStore();
  
  const [isLoading, setIsLoading] = useState(false);

  const progressDots = Array.from({ length: 6 }, (_, i) => i + 1);

  const handleNext = () => {
    if (currentStep < 6) {
      setQuizStep((currentStep + 1) as QuizStep);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    completeQuiz();
    setIsLoading(false);
  };

  const OptionButton = ({ 
    selected, 
    onClick, 
    children, 
    emoji,
    variant = 'default'
  }: { 
    selected: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
    emoji?: string;
    variant?: 'default' | 'danger' | 'success';
  }) => {
    const baseClasses = "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 font-medium";
    const variantClasses = {
      default: selected 
        ? "border-primary bg-saffron-light text-primary" 
        : "border-border bg-white/80 hover:border-primary/50",
      danger: selected
        ? "border-destructive bg-destructive/10 text-destructive"
        : "border-border bg-white/80 hover:border-destructive/50",
      success: selected
        ? "border-secondary bg-haldi-light text-secondary"
        : "border-border bg-white/80 hover:border-secondary/50",
    };

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]}`}
      >
        {emoji && <span className="text-xl">{emoji}</span>}
        {children}
      </motion.button>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-display font-bold mb-2">Health Safety</h3>
              <p className="text-muted-foreground">
                Do you have any of these conditions?
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Diabetes, thyroid, PCOD, heart issues, or medications
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <OptionButton
                selected={profile.hasMedicalConditions === true}
                onClick={() => setMedicalConditions(true)}
                emoji="🚨"
                variant="danger"
              >
                Yes
              </OptionButton>
              <OptionButton
                selected={profile.hasMedicalConditions === false}
                onClick={() => setMedicalConditions(false)}
                emoji="✅"
                variant="success"
              >
                No - Continue
              </OptionButton>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-display font-bold mb-2">Your Profile</h3>
              <p className="text-muted-foreground">Help us personalize your plan</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Age</label>
                <select
                  value={profile.age}
                  onChange={(e) => updateProfile({ age: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border-2 border-border bg-white/80 font-medium"
                >
                  {Array.from({ length: 15 }, (_, i) => i + 17).map(age => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Gender</label>
                <select
                  value={profile.gender}
                  onChange={(e) => updateProfile({ gender: e.target.value as 'male' | 'female' | 'other' })}
                  className="w-full p-3 rounded-xl border-2 border-border bg-white/80 font-medium"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Height (cm)</label>
                <input
                  type="number"
                  value={profile.height}
                  onChange={(e) => updateProfile({ height: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border-2 border-border bg-white/80 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Weight (kg)</label>
                <input
                  type="number"
                  value={profile.weight}
                  onChange={(e) => updateProfile({ weight: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border-2 border-border bg-white/80 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Living Situation</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'hostel', label: 'Hostel', emoji: '🏠' },
                  { value: 'dayscholar', label: 'Day Scholar', emoji: '🏡' },
                  { value: 'pg', label: 'PG/Cooking', emoji: '☕' },
                ].map(option => (
                  <OptionButton
                    key={option.value}
                    selected={profile.livingSituation === option.value}
                    onClick={() => updateProfile({ livingSituation: option.value as LivingSituation })}
                    emoji={option.emoji}
                  >
                    <span className="text-sm">{option.label}</span>
                  </OptionButton>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="w-full wellness-button-primary mt-4"
            >
              Continue <ChevronRight className="w-4 h-4 inline ml-1" />
            </motion.button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-display font-bold mb-2">Food Preferences</h3>
              <p className="text-muted-foreground">What do you eat?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <OptionButton
                selected={profile.isVegetarian}
                onClick={() => updateProfile({ isVegetarian: true })}
                emoji="🥗"
                variant="success"
              >
                Vegetarian
              </OptionButton>
              <OptionButton
                selected={!profile.isVegetarian}
                onClick={() => updateProfile({ isVegetarian: false })}
                emoji="🍗"
              >
                Non-Vegetarian
              </OptionButton>
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium text-muted-foreground">Kitchen Access</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: true, label: 'Mess/Thali', emoji: '🍛' },
                  { value: false, label: 'Home Cooking', emoji: '🔥' },
                  { value: null, label: 'Limited', emoji: '❌' },
                ].map((option, idx) => (
                  <OptionButton
                    key={idx}
                    selected={profile.hasFullKitchenAccess === option.value}
                    onClick={() => updateProfile({ hasFullKitchenAccess: option.value as boolean })}
                    emoji={option.emoji}
                  >
                    <span className="text-xs">{option.label}</span>
                  </OptionButton>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="w-full wellness-button-primary mt-4"
            >
              Continue <ChevronRight className="w-4 h-4 inline ml-1" />
            </motion.button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-display font-bold mb-2">How are you feeling?</h3>
              <p className="text-muted-foreground">Your current mood helps us customize</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'happy', emoji: '😊', label: 'Happy' },
                { value: 'okay', emoji: '👍', label: 'Okay' },
                { value: 'tired', emoji: '😴', label: 'Tired' },
                { value: 'stressed', emoji: '😣', label: 'Stressed' },
              ].map(mood => (
                <motion.button
                  key={mood.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateProfile({ currentMood: mood.value as MoodState })}
                  className={`emoji-button flex flex-col items-center gap-2 ${
                    profile.currentMood === mood.value ? 'border-primary bg-saffron-light' : ''
                  }`}
                >
                  <span className="text-4xl">{mood.emoji}</span>
                  <span className="font-medium">{mood.label}</span>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="w-full wellness-button-primary mt-4"
            >
              Continue <ChevronRight className="w-4 h-4 inline ml-1" />
            </motion.button>
          </div>
        );

      case 5:
        if (profile.gender !== 'female') {
          handleNext();
          return null;
        }
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-display font-bold mb-2">Wellness Check</h3>
              <p className="text-muted-foreground">For hormonal balance nutrition</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'regular', emoji: '✅', label: 'Regular' },
                { value: 'irregular', emoji: '⚠️', label: 'Irregular' },
                { value: 'currently', emoji: '🔴', label: 'Currently' },
                { value: 'notsure', emoji: '❓', label: 'Not Sure' },
              ].map(option => (
                <OptionButton
                  key={option.value}
                  selected={profile.cycleStatus === option.value}
                  onClick={() => updateProfile({ cycleStatus: option.value as CycleStatus })}
                  emoji={option.emoji}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="w-full wellness-button-primary mt-4"
            >
              Continue <ChevronRight className="w-4 h-4 inline ml-1" />
            </motion.button>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-display font-bold mb-2">Lifestyle</h3>
              <p className="text-muted-foreground">Almost done! 🌟</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Sleep Pattern</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'before11', emoji: '🌙', label: 'Before 11PM' },
                    { value: '11to1', emoji: '🦉', label: '11PM-1AM' },
                    { value: 'after1', emoji: '🌌', label: 'After 1AM' },
                  ].map(option => (
                    <OptionButton
                      key={option.value}
                      selected={profile.sleepPattern === option.value}
                      onClick={() => updateProfile({ sleepPattern: option.value as SleepPattern })}
                      emoji={option.emoji}
                    >
                      <span className="text-xs">{option.label}</span>
                    </OptionButton>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Stress Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'low', emoji: '😌', label: 'Low' },
                    { value: 'medium', emoji: '📚', label: 'Medium' },
                    { value: 'high', emoji: '😰', label: 'High' },
                  ].map(option => (
                    <OptionButton
                      key={option.value}
                      selected={profile.stressLevel === option.value}
                      onClick={() => updateProfile({ stressLevel: option.value as StressLevel })}
                      emoji={option.emoji}
                    >
                      {option.label}
                    </OptionButton>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full wellness-button-secondary mt-6 py-4 text-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Your Plan...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  ✨ Generate Week 1 Menu 👑
                </span>
              )}
            </motion.button>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto p-6"
    >
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-sm text-muted-foreground font-medium">
          [{currentStep}/6]
        </span>
        <div className="flex gap-1.5">
          {progressDots.map((dot) => (
            <motion.div
              key={dot}
              initial={{ scale: 0.8 }}
              animate={{ scale: dot === currentStep ? 1.2 : 1 }}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                dot < currentStep
                  ? 'bg-secondary'
                  : dot === currentStep
                  ? 'bg-primary'
                  : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quiz content */}
      <div className="wellness-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WellnessQuiz;
