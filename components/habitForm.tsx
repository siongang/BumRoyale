import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { useHabitStore, type Habit } from "@/store";
import { useRouter } from "expo-router";
import uuid from "react-native-uuid";
import { Ionicons } from "@expo/vector-icons";
import { spacing } from "@/styles";

type HabitFomProps = {
  habit: Habit;
  onChange: (updatedHabit: Habit) => void;
};

export default function HabitForm({
  habit,
  onChange,
}: HabitFomProps) {
  const days: string[] = ["S", "M", "T", "W", "T", "F", "S"];

  const toggleDay = (index: number) => {
    const updatedFrequency = habit.frequency.includes(index)
      ? habit.frequency.filter((day: number) => {
          day !== index;
        })
      : [...habit.frequency, index];

    onChange({
      ...habit,
      frequency: updatedFrequency,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Habit Name"
        placeholderTextColor="#888"
        value={habit.name}
        onChangeText={(text) => onChange({ ...habit, name: text })}
      />

      <View style={styles.typeButtonContainer}>
        <Pressable
          onPress={() => onChange({ ...habit, type: "positive" })}
          style={[
            styles.iconButton,
            habit.type === "positive" && styles.iconButtonSelected,
          ]}
        >
          <Ionicons
            name="add"
            size={20}
            color={habit.type === "positive" ? "#181A1B" : "white"}
          />
        </Pressable>

        <Pressable
          onPress={() => onChange({ ...habit, type: "negative" })}
          style={[
            styles.iconButton,
            habit.type === "negative" && styles.iconButtonSelected,
          ]}
        >
          <Ionicons
            name="remove"
            size={20}
            color={habit.type === "negative" ? "#181A1B" : "white"}
          />
        </Pressable>
      </View>

      <View style={styles.daysContainer}>
        {days.map((day, index) => {
          const isSelected = habit.frequency.includes(index);
          return (
            <Pressable
              key={index}
              onPress={() => toggleDay(index)}
              style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
            >
              <Text
                style={
                  isSelected
                    ? styles.dayButtonTextSelected
                    : styles.dayButtonText
                }
              >
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  textInput: {
    color: "white",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3C",
    paddingVertical: 10,
    marginBottom: 24,
    fontSize: 16,
  },
  typeButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 24,
  },
  iconButton: {
    backgroundColor: "#2A2A2E",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonSelected: {
    backgroundColor: "#FFFFFF",
  },
  daysContainer: {
    // maxWidth: '80%',
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.md,
    // paddingHorizontal: 20,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2A2A2E",
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: spacing.xs,
  },
  dayButtonSelected: {
    backgroundColor: "#FFFFFF",
  },
  dayButtonText: {
    color: "white",
    fontWeight: "500",
  },
  dayButtonTextSelected: {
    color: "#181A1B",
    fontWeight: "700",
  },
  createButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  createButtonText: {
    color: "#181A1B",
    fontWeight: "600",
    fontSize: 16,
  },
});
