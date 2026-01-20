import { foodDatabase, FoodItem } from './foodDatabase';

export interface DayPlan {
  day: string;
  breakfast: FoodItem;
  lunch: FoodItem;
  dinner: FoodItem;
  snack: FoodItem;
  totalCalories: number;
}

export interface WeeklyPlan {
  week: number;
  cuisine: string;
  cuisineEmoji: string;
  days: DayPlan[];
  isVeg: boolean;
}

const getFood = (id: string): FoodItem => {
  return foodDatabase.find(f => f.id === id) || foodDatabase[0];
};

export const weeklyPlans: Record<string, (isVeg: boolean) => WeeklyPlan> = {
  north: (isVeg) => ({
    week: 1,
    cuisine: 'North/North-Eastern',
    cuisineEmoji: '🏔️',
    isVeg,
    days: [
      {
        day: 'Monday',
        breakfast: getFood('poha-curd'),
        lunch: getFood('palak-paneer'),
        dinner: getFood('veg-jadoh'),
        snack: getFood('curd-flaxseed'),
        totalCalories: 1700,
      },
      {
        day: 'Tuesday',
        breakfast: getFood('besan-cheela'),
        lunch: getFood('rajma-rice'),
        dinner: getFood('veg-thukpa'),
        snack: getFood('dark-choc-almonds'),
        totalCalories: 1600,
      },
      {
        day: 'Wednesday',
        breakfast: getFood('red-rice-poha'),
        lunch: getFood('methi-sabzi'),
        dinner: getFood('khar-greens'),
        snack: getFood('banana-pb'),
        totalCalories: 1130,
      },
      {
        day: 'Thursday',
        breakfast: getFood('paneer-paratha'),
        lunch: getFood('jeera-rice-bhindi'),
        dinner: getFood('galho-stew'),
        snack: getFood('roasted-chana'),
        totalCalories: 1590,
      },
      {
        day: 'Friday',
        breakfast: getFood('dalia-nuts'),
        lunch: getFood('veg-biryani'),
        dinner: getFood('phalap-pancakes'),
        snack: getFood('sprouts-chaat'),
        totalCalories: 1680,
      },
      {
        day: 'Saturday',
        breakfast: getFood('veg-upma'),
        lunch: getFood('aloo-gobi'),
        dinner: getFood('bamboo-stirfry'),
        snack: getFood('paneer-tomatoes'),
        totalCalories: 1330,
      },
      {
        day: 'Sunday',
        breakfast: getFood('oatmeal-seeds'),
        lunch: getFood('dal-makhani'),
        dinner: getFood('methi-rice'),
        snack: getFood('oats-laddoo'),
        totalCalories: 1730,
      },
    ],
  }),
  
  south: (isVeg) => ({
    week: 2,
    cuisine: 'South Indian',
    cuisineEmoji: '🌴',
    isVeg,
    days: [
      {
        day: 'Monday',
        breakfast: getFood('idli-sambar'),
        lunch: getFood('rasam-rice'),
        dinner: getFood('veg-thukpa'),
        snack: getFood('curd-flaxseed'),
        totalCalories: 1570,
      },
      {
        day: 'Tuesday',
        breakfast: getFood('dosa-chutney'),
        lunch: getFood('curd-rice'),
        dinner: getFood('khar-greens'),
        snack: getFood('ragi-laddu'),
        totalCalories: 1280,
      },
      {
        day: 'Wednesday',
        breakfast: getFood('medu-vada'),
        lunch: getFood('bisibelebath'),
        dinner: getFood('galho-stew'),
        snack: getFood('banana-pb'),
        totalCalories: 1520,
      },
      {
        day: 'Thursday',
        breakfast: getFood('rava-idli'),
        lunch: getFood('rasam-rice'),
        dinner: getFood('veg-jadoh'),
        snack: getFood('dark-choc-almonds'),
        totalCalories: 1610,
      },
      {
        day: 'Friday',
        breakfast: getFood('pongal'),
        lunch: getFood('curd-rice'),
        dinner: getFood('phalap-pancakes'),
        snack: getFood('roasted-chana'),
        totalCalories: 1400,
      },
      {
        day: 'Saturday',
        breakfast: getFood('idli-sambar'),
        lunch: getFood('bisibelebath'),
        dinner: getFood('bamboo-stirfry'),
        snack: getFood('sprouts-chaat'),
        totalCalories: 1490,
      },
      {
        day: 'Sunday',
        breakfast: getFood('dosa-chutney'),
        lunch: getFood('rasam-rice'),
        dinner: getFood('methi-rice'),
        snack: getFood('oats-laddoo'),
        totalCalories: 1780,
      },
    ],
  }),
  
  kerala: (isVeg) => ({
    week: 3,
    cuisine: 'Kerala',
    cuisineEmoji: '🥥',
    isVeg,
    days: [
      {
        day: 'Monday',
        breakfast: getFood('appam-stew'),
        lunch: getFood('avial-thoran'),
        dinner: getFood('veg-thukpa'),
        snack: getFood('curd-flaxseed'),
        totalCalories: 1460,
      },
      {
        day: 'Tuesday',
        breakfast: getFood('puttu-kadala'),
        lunch: getFood('moru-curry'),
        dinner: getFood('khar-greens'),
        snack: getFood('foxnuts-curd'),
        totalCalories: 1410,
      },
      {
        day: 'Wednesday',
        breakfast: getFood('idiyappam-kootu'),
        lunch: getFood('avial-thoran'),
        dinner: getFood('galho-stew'),
        snack: getFood('banana-pb'),
        totalCalories: 1360,
      },
      {
        day: 'Thursday',
        breakfast: getFood('appam-stew'),
        lunch: getFood('moru-curry'),
        dinner: getFood('veg-jadoh'),
        snack: getFood('dark-choc-almonds'),
        totalCalories: 1590,
      },
      {
        day: 'Friday',
        breakfast: getFood('puttu-kadala'),
        lunch: getFood('avial-thoran'),
        dinner: getFood('phalap-pancakes'),
        snack: getFood('roasted-chana'),
        totalCalories: 1430,
      },
      {
        day: 'Saturday',
        breakfast: getFood('idiyappam-kootu'),
        lunch: getFood('moru-curry'),
        dinner: getFood('bamboo-stirfry'),
        snack: getFood('sprouts-chaat'),
        totalCalories: 1380,
      },
      {
        day: 'Sunday',
        breakfast: getFood('appam-stew'),
        lunch: getFood('avial-thoran'),
        dinner: getFood('methi-rice'),
        snack: getFood('walnuts-dates'),
        totalCalories: 1650,
      },
    ],
  }),
};

export const cuisineRotation = ['north', 'south', 'kerala', 'indochinese', 'western'];

export const getWeekPlan = (weekNumber: number, isVeg: boolean): WeeklyPlan => {
  const cuisineIndex = (weekNumber - 1) % cuisineRotation.length;
  const cuisine = cuisineRotation[cuisineIndex];
  const planGenerator = weeklyPlans[cuisine] || weeklyPlans.north;
  return planGenerator(isVeg);
};
