// components/HabitsSection.tsx
import { View, Button, Text, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import { useHabitStore } from "@/store";
import { HabitItem } from "@/components";

export default function HabitsSection() {
  const router = useRouter();
  const { habits, loadHabits, clearHabits } = useHabitStore();

  useFocusEffect(
    React.useCallback(() => {
      loadHabits();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.text}>
            Get To Work Bum
        </Text>
        <Button title="Clear Data" onPress={clearHabits} color="red" />
      </View>
      <View style={styles.habits}>
        {habits.map((habit, index) => (
          <HabitItem key={index} habit={habit} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",

    // alignItems: "center",
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
  },
  habits: {
    marginTop: 8,
  },
  text: {
    color: "white"
  }
});
