export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber?: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cuisine: 'north' | 'south' | 'kerala' | 'indochinese' | 'western';
  isVeg: boolean;
  moodBenefit?: string;
  emoji: string;
}

export const foodDatabase: FoodItem[] = [
  // NORTH/NORTH-EASTERN VEG
  { id: 'poha-curd', name: 'Poha + Curd + Flax', calories: 380, carbs: 55, protein: 12, fat: 15, fiber: 6, category: 'breakfast', cuisine: 'north', isVeg: true, moodBenefit: 'Omega-3 for brain health', emoji: '🥣' },
  { id: 'besan-cheela', name: 'Besan Cheela', calories: 320, carbs: 35, protein: 14, fat: 14, category: 'breakfast', cuisine: 'north', isVeg: true, emoji: '🥞' },
  { id: 'red-rice-poha', name: 'Red Rice Poha', calories: 350, carbs: 58, protein: 8, fat: 10, category: 'breakfast', cuisine: 'north', isVeg: true, emoji: '🍚' },
  { id: 'paneer-paratha', name: 'Paneer Paratha', calories: 450, carbs: 48, protein: 18, fat: 22, category: 'breakfast', cuisine: 'north', isVeg: true, emoji: '🫓' },
  { id: 'dalia-nuts', name: 'Dalia + Nuts', calories: 400, carbs: 52, protein: 14, fat: 16, category: 'breakfast', cuisine: 'north', isVeg: true, moodBenefit: 'Complex carbs for sustained energy', emoji: '🥜' },
  { id: 'veg-upma', name: 'Veg Upma', calories: 340, carbs: 48, protein: 10, fat: 12, category: 'breakfast', cuisine: 'north', isVeg: true, emoji: '🍲' },
  { id: 'oatmeal-seeds', name: 'Oatmeal + Seeds', calories: 360, carbs: 50, protein: 12, fat: 14, category: 'breakfast', cuisine: 'north', isVeg: true, moodBenefit: 'Fiber for gut-brain connection', emoji: '🥣' },
  
  // Lunch items
  { id: 'palak-paneer', name: 'Palak Paneer + Beet Salad', calories: 650, carbs: 45, protein: 28, fat: 42, category: 'lunch', cuisine: 'north', isVeg: true, moodBenefit: 'Magnesium + Folate = 28% less irritability', emoji: '🥬' },
  { id: 'rajma-rice', name: 'Rajma + Curd Rice', calories: 620, carbs: 95, protein: 22, fat: 18, category: 'lunch', cuisine: 'north', isVeg: true, emoji: '🍛' },
  { id: 'methi-sabzi', name: 'Methi Sabzi + Roti', calories: 280, carbs: 35, protein: 10, fat: 12, category: 'lunch', cuisine: 'north', isVeg: true, emoji: '🥗' },
  { id: 'jeera-rice-bhindi', name: 'Jeera Rice + Bhindi', calories: 580, carbs: 85, protein: 14, fat: 20, category: 'lunch', cuisine: 'north', isVeg: true, emoji: '🍚' },
  { id: 'veg-biryani', name: 'Veg Biryani', calories: 680, carbs: 90, protein: 18, fat: 28, category: 'lunch', cuisine: 'north', isVeg: true, emoji: '🍛' },
  { id: 'aloo-gobi', name: 'Aloo Gobi + Roti', calories: 450, carbs: 55, protein: 12, fat: 22, category: 'lunch', cuisine: 'north', isVeg: true, emoji: '🥔' },
  { id: 'dal-makhani', name: 'Dal Makhani + Rice', calories: 550, carbs: 75, protein: 20, fat: 20, category: 'lunch', cuisine: 'north', isVeg: true, emoji: '🍲' },
  
  // Dinner items
  { id: 'veg-jadoh', name: 'Veg Jadoh + Bamboo', calories: 450, carbs: 60, protein: 14, fat: 18, category: 'dinner', cuisine: 'north', isVeg: true, emoji: '🍛' },
  { id: 'veg-thukpa', name: 'Veg Thukpa', calories: 420, carbs: 55, protein: 16, fat: 16, category: 'dinner', cuisine: 'north', isVeg: true, moodBenefit: 'Warm soup for comfort', emoji: '🍜' },
  { id: 'khar-greens', name: 'Khar Greens', calories: 300, carbs: 30, protein: 12, fat: 16, category: 'dinner', cuisine: 'north', isVeg: true, emoji: '🥬' },
  { id: 'galho-stew', name: 'Galho Stew', calories: 380, carbs: 45, protein: 14, fat: 18, category: 'dinner', cuisine: 'north', isVeg: true, emoji: '🥣' },
  { id: 'phalap-pancakes', name: 'Phalap Pancakes', calories: 400, carbs: 50, protein: 12, fat: 18, category: 'dinner', cuisine: 'north', isVeg: true, emoji: '🥞' },
  { id: 'bamboo-stirfry', name: 'Bamboo Stir-fry', calories: 320, carbs: 35, protein: 10, fat: 16, category: 'dinner', cuisine: 'north', isVeg: true, emoji: '🥢' },
  { id: 'methi-rice', name: 'Methi Rice', calories: 580, carbs: 85, protein: 14, fat: 22, category: 'dinner', cuisine: 'north', isVeg: true, emoji: '🍚' },
  
  // SOUTH INDIAN
  { id: 'idli-sambar', name: 'Idli + Sambar', calories: 350, carbs: 50, protein: 12, fat: 12, category: 'breakfast', cuisine: 'south', isVeg: true, emoji: '🍚' },
  { id: 'dosa-chutney', name: 'Dosa + Chutney', calories: 380, carbs: 60, protein: 10, fat: 12, category: 'breakfast', cuisine: 'south', isVeg: true, emoji: '🥞' },
  { id: 'medu-vada', name: 'Medu Vada', calories: 320, carbs: 35, protein: 12, fat: 16, category: 'breakfast', cuisine: 'south', isVeg: true, emoji: '🍩' },
  { id: 'rava-idli', name: 'Rava Idli', calories: 340, carbs: 48, protein: 10, fat: 14, category: 'breakfast', cuisine: 'south', isVeg: true, emoji: '🍚' },
  { id: 'pongal', name: 'Pongal', calories: 420, carbs: 55, protein: 14, fat: 18, category: 'breakfast', cuisine: 'south', isVeg: true, emoji: '🍲' },
  { id: 'rasam-rice', name: 'Rasam Rice + Poriyal', calories: 580, carbs: 85, protein: 14, fat: 20, category: 'lunch', cuisine: 'south', isVeg: true, moodBenefit: 'Digestive comfort', emoji: '🍛' },
  { id: 'curd-rice', name: 'Curd Rice', calories: 400, carbs: 55, protein: 12, fat: 16, category: 'lunch', cuisine: 'south', isVeg: true, moodBenefit: 'Probiotics for gut health', emoji: '🍚' },
  { id: 'bisibelebath', name: 'Bisibelebath', calories: 620, carbs: 85, protein: 18, fat: 24, category: 'lunch', cuisine: 'south', isVeg: true, emoji: '🍛' },
  
  // KERALA
  { id: 'appam-stew', name: 'Appam + Veg Stew', calories: 420, carbs: 55, protein: 12, fat: 18, category: 'breakfast', cuisine: 'kerala', isVeg: true, emoji: '🥣' },
  { id: 'puttu-kadala', name: 'Puttu + Kadala Curry', calories: 450, carbs: 60, protein: 16, fat: 18, category: 'breakfast', cuisine: 'kerala', isVeg: true, emoji: '🍲' },
  { id: 'idiyappam-kootu', name: 'Idiyappam + Kootu', calories: 380, carbs: 52, protein: 12, fat: 14, category: 'breakfast', cuisine: 'kerala', isVeg: true, emoji: '🍜' },
  { id: 'avial-thoran', name: 'Avial + Thoran', calories: 400, carbs: 35, protein: 10, fat: 28, category: 'lunch', cuisine: 'kerala', isVeg: true, moodBenefit: 'Coconut for brain fuel', emoji: '🥥' },
  { id: 'moru-curry', name: 'Moru Curry Rice', calories: 480, carbs: 65, protein: 14, fat: 20, category: 'lunch', cuisine: 'kerala', isVeg: true, emoji: '🍛' },
  
  // INDO-CHINESE
  { id: 'veg-momos', name: 'Veg Momos + Schezwan', calories: 420, carbs: 50, protein: 14, fat: 20, category: 'lunch', cuisine: 'indochinese', isVeg: true, emoji: '🥟' },
  { id: 'fried-rice-manchurian', name: 'Brown Fried Rice + Manchurian', calories: 650, carbs: 85, protein: 16, fat: 28, category: 'lunch', cuisine: 'indochinese', isVeg: true, emoji: '🍛' },
  { id: 'hakka-noodles', name: 'Hakka Noodles + Paneer Chili', calories: 580, carbs: 70, protein: 20, fat: 26, category: 'dinner', cuisine: 'indochinese', isVeg: true, emoji: '🍜' },
  { id: 'gobi-manchurian', name: 'Gobi Manchurian', calories: 450, carbs: 45, protein: 12, fat: 26, category: 'snack', cuisine: 'indochinese', isVeg: true, emoji: '🥦' },
  
  // WESTERN-ADAPTED
  { id: 'oats-upma', name: 'Oats Upma + Milk', calories: 360, carbs: 48, protein: 14, fat: 14, category: 'breakfast', cuisine: 'western', isVeg: true, emoji: '🥣' },
  { id: 'quinoa-salad', name: 'Quinoa Salad + Beans', calories: 450, carbs: 55, protein: 18, fat: 20, category: 'lunch', cuisine: 'western', isVeg: true, emoji: '🥗' },
  { id: 'multigrain-paneer', name: 'Multigrain Roti + Paneer Grill', calories: 520, carbs: 45, protein: 28, fat: 28, category: 'lunch', cuisine: 'western', isVeg: true, emoji: '🫓' },
  
  // MOOD BOOSTER SNACKS
  { id: 'curd-flaxseed', name: 'Curd + Flaxseed', calories: 220, carbs: 15, protein: 10, fat: 14, category: 'snack', cuisine: 'north', isVeg: true, moodBenefit: 'Omega-3 + Probiotics = Serotonin boost', emoji: '🥛' },
  { id: 'dark-choc-almonds', name: 'Dark Choc + Almonds', calories: 240, carbs: 18, protein: 8, fat: 18, category: 'snack', cuisine: 'western', isVeg: true, moodBenefit: 'Magnesium for stress relief', emoji: '🍫' },
  { id: 'banana-pb', name: 'Banana + Peanut Butter', calories: 200, carbs: 28, protein: 6, fat: 10, category: 'snack', cuisine: 'western', isVeg: true, moodBenefit: 'Tryptophan for calm', emoji: '🍌' },
  { id: 'roasted-chana', name: 'Roasted Chana + Buttermilk', calories: 180, carbs: 25, protein: 10, fat: 6, category: 'snack', cuisine: 'north', isVeg: true, emoji: '🥜' },
  { id: 'sprouts-chaat', name: 'Sprouts Chaat', calories: 200, carbs: 25, protein: 12, fat: 8, category: 'snack', cuisine: 'north', isVeg: true, emoji: '🥗' },
  { id: 'paneer-tomatoes', name: 'Cherry Tomatoes + Paneer', calories: 220, carbs: 12, protein: 14, fat: 16, category: 'snack', cuisine: 'north', isVeg: true, emoji: '🍅' },
  { id: 'oats-laddoo', name: 'Oats Laddoo', calories: 240, carbs: 30, protein: 8, fat: 12, category: 'snack', cuisine: 'north', isVeg: true, emoji: '🍪' },
  { id: 'pumpkin-seeds', name: 'Pumpkin Seeds + Nuts', calories: 230, carbs: 10, protein: 10, fat: 20, category: 'snack', cuisine: 'western', isVeg: true, moodBenefit: 'Zinc for hormonal balance', emoji: '🎃' },
  { id: 'walnuts-dates', name: 'Walnuts + Dates', calories: 250, carbs: 32, protein: 6, fat: 14, category: 'snack', cuisine: 'north', isVeg: true, moodBenefit: 'Brain-boosting omega-3', emoji: '🥜' },
  { id: 'ragi-laddu', name: 'Ragi Laddu', calories: 200, carbs: 28, protein: 6, fat: 10, category: 'snack', cuisine: 'south', isVeg: true, emoji: '🍪' },
  { id: 'foxnuts-curd', name: 'Foxnuts + Curd', calories: 180, carbs: 22, protein: 8, fat: 8, category: 'snack', cuisine: 'north', isVeg: true, emoji: '🥛' },
  
  // NON-VEG OPTIONS
  { id: 'egg-bhurji', name: 'Egg Bhurji + Roti', calories: 420, carbs: 35, protein: 22, fat: 24, category: 'breakfast', cuisine: 'north', isVeg: false, emoji: '🍳' },
  { id: 'chicken-curry', name: 'Chicken Curry + Roti', calories: 650, carbs: 45, protein: 42, fat: 36, category: 'lunch', cuisine: 'north', isVeg: false, emoji: '🍗' },
  { id: 'egg-thukpa', name: 'Egg Thukpa', calories: 450, carbs: 50, protein: 22, fat: 20, category: 'dinner', cuisine: 'north', isVeg: false, emoji: '🍜' },
  { id: 'fish-curry', name: 'Fish Curry + Rice', calories: 620, carbs: 70, protein: 35, fat: 24, category: 'lunch', cuisine: 'south', isVeg: false, moodBenefit: 'Omega-3 for brain health', emoji: '🐟' },
  { id: 'chicken-momos', name: 'Chicken Momos', calories: 450, carbs: 45, protein: 28, fat: 20, category: 'lunch', cuisine: 'indochinese', isVeg: false, emoji: '🥟' },
];

export const getRandomSnack = (isVeg: boolean): FoodItem => {
  const snacks = foodDatabase.filter(f => f.category === 'snack' && f.isVeg === isVeg);
  return snacks[Math.floor(Math.random() * snacks.length)];
};

export const searchFood = (query: string): FoodItem[] => {
  const lowered = query.toLowerCase();
  return foodDatabase.filter(f => 
    f.name.toLowerCase().includes(lowered) ||
    f.cuisine.includes(lowered) ||
    f.category.includes(lowered)
  );
};

export const getMealsByCuisine = (cuisine: string, category?: string, isVeg?: boolean): FoodItem[] => {
  return foodDatabase.filter(f => 
    f.cuisine === cuisine &&
    (category ? f.category === category : true) &&
    (isVeg !== undefined ? f.isVeg === isVeg : true)
  );
};
