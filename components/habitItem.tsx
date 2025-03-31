import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useHabitStore, type Habit } from "@/store";
import { useRouter } from "expo-router";
import { spacing } from "@/styles/spacing";
import Typography from "@/styles/typography";
import { useHabitDetailsModalStore } from "@/store/useHabitDetailsModalStore";

interface HabitItemProp {
  habit: Habit;
}

const HabitItem = ({ habit }: HabitItemProp) => {
  const router = useRouter();
  const toggleSelected = useHabitStore((state) => state.toggleSelected);

  const handleToggleSelected = async (id: string) => {
    await toggleSelected(id);
  };

  const setSelectedHabit = useHabitDetailsModalStore((state) => state.setSelectedHabit)

  return (
    <>
    <Pressable 
        style={styles.habitContainer}
        onPress={() => {
          // router.push("/screens/habitDetailsScreen")
          setSelectedHabit( habit )
          
        }}
    >
        <TouchableOpacity 
          onPress={() => handleToggleSelected(habit.id)} style={styles.iconButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}    
        >
          <Ionicons
            name={habit.type === "positive" ? "add" : "remove"}
            size={20}
            color="#ccc"
          />
        </TouchableOpacity>
        <View
          style={styles.habitDetails}
    
        >
          <Text style={[styles.habitText, habit.selected && styles.habitTextSelected]}>
            {habit.name}
          </Text>
        </View>
      </Pressable>
      {/* <View style={styles.separator} /> */}
    </>
  );
};

export default HabitItem;

const styles = StyleSheet.create({
  habitContainer: {
    backgroundColor: "#212121",
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.base,
    borderRadius: spacing.md,
    marginBottom: spacing.sm,
    height: 70
  },
  iconButton: {
    paddingRight: spacing.base,
    justifyContent: "center",
    alignItems: "center",
  },
  habitDetails: {
    flex: 1,
    justifyContent: "center",
  },
  habitText: {
    color: "#f2f2f2",
    fontSize: Typography.fontSizes.sm,
    fontFamily: Typography.fonts.body,
    lineHeight: Typography.lineHeights.normal,
  },
  habitTextSelected: {
    color: "#7289da", // Discord blurple
    fontWeight: Typography.fontWeights.medium,
  },
  separator: {
    height: 1,
    backgroundColor: "#3F3F3F",
    width: "100%",
  },
});
