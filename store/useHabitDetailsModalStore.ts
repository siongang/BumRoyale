import { create } from "zustand";
import { type Habit } from "./useHabitStore";

type HabitDetailsModalStore = {
  selectedHabit: Habit | null;
  setSelectedHabit: (habit: Habit | null) => void;
};

export const useHabitDetailsModalStore = create<HabitDetailsModalStore>(
  (set) => ({
    selectedHabit: null,
    setSelectedHabit: (habit) => {
      set({ selectedHabit: habit });
      console.log(habit?.name + "aa");
    },

  })
);
