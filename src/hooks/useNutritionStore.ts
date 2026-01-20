import { create } from 'zustand';
import { FoodItem } from '@/data/foodDatabase';
import { WeeklyPlan, getWeekPlan } from '@/data/mealPlans';

export type QuizStep = 1 | 2 | 3 | 4 | 5 | 6;
export type LivingSituation = 'hostel' | 'dayscholar' | 'pg';
export type MoodState = 'happy' | 'okay' | 'tired' | 'stressed';
export type CycleStatus = 'regular' | 'irregular' | 'currently' | 'notsure';
export type SleepPattern = 'before11' | '11to1' | 'after1';
export type StressLevel = 'low' | 'medium' | 'high';

export interface MealLog {
  id: string;
  food: FoodItem;
  timestamp: Date;
  completed: boolean;
}

export interface UserProfile {
  hasMedicalConditions: boolean | null;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  livingSituation: LivingSituation;
  isVegetarian: boolean;
  hasFullKitchenAccess: boolean;
  currentMood: MoodState;
  cycleStatus?: CycleStatus;
  sleepPattern: SleepPattern;
  stressLevel: StressLevel;
}

export interface NutritionState {
  // Quiz state
  currentStep: QuizStep;
  quizCompleted: boolean;
  showSafetyWarning: boolean;
  
  // User profile
  profile: UserProfile;
  
  // Tracking
  currentWeek: number;
  weeklyPlan: WeeklyPlan | null;
  todaysMeals: MealLog[];
  streak: number;
  totalCaloriesToday: number;
  calorieGoal: number;
  
  // Macros
  carbsToday: number;
  proteinToday: number;
  fatToday: number;
  
  carbsGoal: number;
  proteinGoal: number;
  fatGoal: number;
  
  // UI state
  selectedDay: number;
  
  // Actions
  setQuizStep: (step: QuizStep) => void;
  setMedicalConditions: (has: boolean) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeQuiz: () => void;
  logMeal: (food: FoodItem) => void;
  markMealComplete: (mealId: string) => void;
  resetQuiz: () => void;
  setSelectedDay: (day: number) => void;
  generateWeeklyPlan: () => void;
}

const defaultProfile: UserProfile = {
  hasMedicalConditions: null,
  age: 20,
  gender: 'female',
  height: 160,
  weight: 55,
  livingSituation: 'hostel',
  isVegetarian: true,
  hasFullKitchenAccess: false,
  currentMood: 'okay',
  cycleStatus: 'regular',
  sleepPattern: 'before11',
  stressLevel: 'medium',
};

export const useNutritionStore = create<NutritionState>((set, get) => ({
  // Initial state
  currentStep: 1,
  quizCompleted: false,
  showSafetyWarning: false,
  profile: defaultProfile,
  currentWeek: 1,
  weeklyPlan: null,
  todaysMeals: [],
  streak: 0,
  totalCaloriesToday: 0,
  calorieGoal: 2000,
  carbsToday: 0,
  proteinToday: 0,
  fatToday: 0,
  carbsGoal: 250,
  proteinGoal: 75,
  fatGoal: 65,
  selectedDay: 0,
  
  // Actions
  setQuizStep: (step) => set({ currentStep: step }),
  
  setMedicalConditions: (has) => {
    set((state) => ({
      profile: { ...state.profile, hasMedicalConditions: has },
      showSafetyWarning: has,
      currentStep: has ? 1 : 2,
    }));
  },
  
  updateProfile: (updates) => set((state) => ({
    profile: { ...state.profile, ...updates },
  })),
  
  completeQuiz: () => {
    const { profile } = get();
    // Calculate personalized goals based on profile
    const baseCalories = profile.gender === 'female' ? 1800 : 2200;
    const activityMultiplier = profile.stressLevel === 'high' ? 1.1 : 1.0;
    const calorieGoal = Math.round(baseCalories * activityMultiplier);
    
    set({
      quizCompleted: true,
      calorieGoal,
      carbsGoal: Math.round(calorieGoal * 0.5 / 4),
      proteinGoal: Math.round(calorieGoal * 0.22 / 4),
      fatGoal: Math.round(calorieGoal * 0.28 / 9),
      streak: 1,
    });
    
    get().generateWeeklyPlan();
  },
  
  logMeal: (food) => set((state) => ({
    todaysMeals: [...state.todaysMeals, {
      id: `${food.id}-${Date.now()}`,
      food,
      timestamp: new Date(),
      completed: true,
    }],
    totalCaloriesToday: state.totalCaloriesToday + food.calories,
    carbsToday: state.carbsToday + food.carbs,
    proteinToday: state.proteinToday + food.protein,
    fatToday: state.fatToday + food.fat,
  })),
  
  markMealComplete: (mealId) => set((state) => ({
    todaysMeals: state.todaysMeals.map((m) =>
      m.id === mealId ? { ...m, completed: true } : m
    ),
  })),
  
  resetQuiz: () => set({
    currentStep: 1,
    quizCompleted: false,
    showSafetyWarning: false,
    profile: defaultProfile,
    weeklyPlan: null,
    todaysMeals: [],
    totalCaloriesToday: 0,
    carbsToday: 0,
    proteinToday: 0,
    fatToday: 0,
  }),
  
  setSelectedDay: (day) => set({ selectedDay: day }),
  
  generateWeeklyPlan: () => {
    const { currentWeek, profile } = get();
    const plan = getWeekPlan(currentWeek, profile.isVegetarian);
    set({ weeklyPlan: plan });
  },
}));
