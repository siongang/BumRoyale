import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "hi";

// Define Habit
export type Habit = {
  id: string;
  name: string;
  frequency: number[];
  type: "positive" | "negative";
  createdAt: string;
  selected: boolean;
};

// Define Habit Store
type HabitStore = {
  habits: Habit[];
  loadHabits: () => Promise<void>;
  addHabit: (habit: Habit) => Promise<void>;
  clearHabits: () => Promise<void>;
  updateHabit: (updatedHabit: Habit) => Promise<void>;
  removeHabit: (removedHabit: Habit) => Promise<void>
  toggleSelected: (id: string) => Promise<void>;
};

// Habit Store manages setting and getting habit-related data
export const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],

  loadHabits: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        set({ habits: JSON.parse(data) });
      }
    } catch (error) {
      console.error("Failed to load habits", error);
    }
  },

  addHabit: async (habit: Habit) => {
    const current = get().habits;
    if (!current.includes(habit)) {
      const updatedHabits = [...current, habit];
      set({ habits: updatedHabits });
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHabits));
      } catch (error) {
        console.log("Failed to save habit", error);
      }
    }
  },

  updateHabit: async (updatedHabit: Habit) => {
    const currentHabits = get().habits;
    const updatedHabits = currentHabits.map((habit) =>
      habit.id === updatedHabit.id ? updatedHabit : habit
    );

    set({ habits: updatedHabits });
  },
  removeHabit: async (removedHabit: Habit) => {
    const currentHabits = get().habits;
    const updatedHabits = currentHabits.filter(
      (habit) => habit.id !== removedHabit.id
    );
    set({ habits: updatedHabits });
  },

  clearHabits: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      set({ habits: [] });
    } catch (error) {
      console.log("Failed to clear habits", error);
    }
  },

  // Handles habit selection by flipping selected habit to selected or deselected
  toggleSelected: async (id: string) => {
    console.log("toggling button");
    const currentHabits = get().habits;
    const updatedHabits = currentHabits.map((habit) =>
      habit.id === id ? { ...habit, selected: !habit.selected } : habit
    );
    set({ habits: updatedHabits });
  },
}));
