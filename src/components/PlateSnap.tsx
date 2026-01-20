import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Search, ImageIcon, Sparkles, X } from 'lucide-react';
import { foodDatabase, FoodItem, searchFood } from '@/data/foodDatabase';
import { useNutritionStore } from '@/hooks/useNutritionStore';

const PlateSnap = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [analyzedFood, setAnalyzedFood] = useState<FoodItem | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { logMeal } = useNutritionStore();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const results = searchFood(query);
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  const handleQuickSearch = (term: string) => {
    const results = searchFood(term);
    if (results.length > 0) {
      handleSelectFood(results[0]);
    }
  };

  const handleSelectFood = (food: FoodItem) => {
    setAnalyzedFood(food);
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleLogFood = () => {
    if (analyzedFood) {
      logMeal(analyzedFood);
      setAnalyzedFood(null);
      setIsOpen(false);
    }
  };

  const simulatePlateSnap = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const randomFood = foodDatabase[Math.floor(Math.random() * foodDatabase.length)];
      setAnalyzedFood(randomFood);
      setIsAnalyzing(false);
    }, 2000);
  };

  const quickSearches = [
    { term: 'mess dal rice', display: '🍛 Mess Dal Rice' },
    { term: 'idli sambar', display: '🍚 Idli Sambar' },
    { term: 'chicken curry', display: '🍗 Chicken Curry' },
    { term: 'dosa', display: '🥞 Dosa' },
  ];

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-sunrise text-white shadow-glow flex items-center justify-center z-50"
      >
        <Camera className="w-7 h-7" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-xl flex items-center gap-2">
                  📸 Log Your Meal
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-muted hover:bg-muted/80"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Plate Snap Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={simulatePlateSnap}
                disabled={isAnalyzing}
                className="w-full p-6 rounded-2xl border-2 border-dashed border-primary/30 bg-saffron-light/50 flex flex-col items-center gap-3 mb-6 hover:border-primary transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-12 h-12 text-primary" />
                    </motion.div>
                    <span className="font-semibold text-primary">Analyzing your plate...</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-12 h-12 text-primary" />
                    <span className="font-semibold text-primary">Tap to snap your plate</span>
                    <span className="text-sm text-muted-foreground">AI will detect calories instantly</span>
                  </>
                )}
              </motion.button>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search food... (e.g., 'mess dal rice')"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-border bg-white/80 font-medium focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2 mb-4">
                  {searchResults.map((food) => (
                    <motion.button
                      key={food.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSelectFood(food)}
                      className="w-full p-3 rounded-xl bg-white border border-border text-left flex items-center gap-3 hover:border-primary transition-colors"
                    >
                      <span className="text-2xl">{food.emoji}</span>
                      <div>
                        <p className="font-semibold">{food.name}</p>
                        <p className="text-sm text-muted-foreground">{food.calories} kcal</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Quick Searches */}
              {!analyzedFood && searchResults.length === 0 && (
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Quick add:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickSearches.map((item) => (
                      <motion.button
                        key={item.term}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickSearch(item.term)}
                        className="chip hover:bg-primary/10"
                      >
                        {item.display}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Analyzed Food Result */}
              {analyzedFood && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="wellness-card bg-haldi-light border-secondary mb-4"
                >
                  <div className="text-center mb-4">
                    <span className="text-4xl">{analyzedFood.emoji}</span>
                    <h4 className="font-display font-bold text-lg mt-2">{analyzedFood.name}</h4>
                    <p className="text-2xl font-bold text-secondary">{analyzedFood.calories} kcal ✓</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div className="p-2 rounded-lg bg-white/50">
                      <p className="text-xs text-muted-foreground">Carbs</p>
                      <p className="font-bold text-primary">{analyzedFood.carbs}g</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/50">
                      <p className="text-xs text-muted-foreground">Protein</p>
                      <p className="font-bold text-secondary">{analyzedFood.protein}g</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/50">
                      <p className="text-xs text-muted-foreground">Fat</p>
                      <p className="font-bold text-turmeric">{analyzedFood.fat}g</p>
                    </div>
                  </div>

                  {analyzedFood.moodBenefit && (
                    <p className="text-sm text-center text-secondary flex items-center justify-center gap-1 mb-4">
                      <Sparkles className="w-4 h-4" />
                      {analyzedFood.moodBenefit}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogFood}
                    className="w-full wellness-button-secondary"
                  >
                    ✓ Log This Meal
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PlateSnap;
