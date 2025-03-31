import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";

import { Ionicons } from "@expo/vector-icons";
import { Habit, useHabitStore } from "@/store";
import { HEADER_HEIGHT, spacing } from "@/styles";

interface HabitItemProp {
  selectedHabit: Habit | null;
  // visible: boolean,
  onClose: () => void;
}

export default function HabitDetailsScreen({
  selectedHabit,
  onClose,
}: HabitItemProp) {
  const [habitName, setHabitName] = useState<string>("");
  const [frequency, setFrequency] = useState<number[]>([]);
  // const [type, setType] = useState<"positive" | "negative">("positive");
  const days: string[] = ["S", "M", "T", "W", "T", "F", "S"];

  console.log(selectedHabit?.name + "HAHHAAH");

  // Details Habit is sort of a temporary version of an editted habit which when the user saves edits, the original habits gets updated with details habit
  const [detailsHabit, setDetailsHabit] = useState<Habit>({
    id: selectedHabit?.id ?? "", // Use empty string or generate an ID if needed
    name: selectedHabit?.name ?? "",
    frequency: selectedHabit?.frequency ?? [],
    type: selectedHabit?.type ?? "positive",
    createdAt: selectedHabit?.createdAt ?? new Date().toISOString(),
    selected: selectedHabit?.selected ?? false,
  });

  const updateHabit = useHabitStore((state) => state.updateHabit);
  const removeHabit = useHabitStore((state) => state.removeHabit);
  const closeModal = () => {
    updateHabit(detailsHabit)
    onClose();
  };

  const toggleDay = (index: number) => {
    setDetailsHabit((prev) => {
      const newFrequency = prev.frequency.includes(index)
        ? prev.frequency.filter((day) => day !== index)
        : [...prev.frequency, index];
      return {
        ...prev,
        frequency: newFrequency,
      };
    });
  };

  // Update detailsHabit State with new selected habit
  useEffect(() => {
    if (selectedHabit) {
      setDetailsHabit(selectedHabit);
    }
  }, [selectedHabit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Modal
        isVisible={selectedHabit != null}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationInTiming={250}
        animationOutTiming={200}
        backdropTransitionOutTiming={0}
        useNativeDriver={false}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        swipeDirection="down"
        style={styles.modal}
        backdropOpacity={0.5}
      >
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Pressable style={styles.createButton}>
              <Text style={styles.createButtonText}>Save</Text>
            </Pressable>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="Enter Habit Name"
            placeholderTextColor="#888"
            value={detailsHabit?.name ?? ""}
            onChangeText={(text) =>
              setDetailsHabit({ ...detailsHabit, name: text })
            }
          />

          <View style={styles.typeButtonContainer}>
            <Pressable
              onPress={() =>
                setDetailsHabit({ ...detailsHabit, type: "positive" })
              }
              style={[
                styles.iconButton,
                detailsHabit?.type === "positive" && styles.iconButtonSelected,
              ]}
            >
              <Ionicons
                name="add"
                size={20}
                color={detailsHabit?.type === "positive" ? "#181A1B" : "white"}
              />
            </Pressable>

            <Pressable
              onPress={() =>
                setDetailsHabit({ ...detailsHabit, type: "negative" })
              }
              style={[
                styles.iconButton,
                detailsHabit?.type === "negative" && styles.iconButtonSelected,
              ]}
            >
              <Ionicons
                name="remove"
                size={20}
                color={detailsHabit?.type === "negative" ? "#181A1B" : "white"}
              />
            </Pressable>
          </View>

          <View style={styles.daysContainer}>
            {days.map((day, index) => {
              const isSelected = detailsHabit.frequency.includes(index);
              return (
                <Pressable
                  key={index}
                  onPress={() => toggleDay(index)}
                  style={[
                    styles.dayButton,
                    isSelected && styles.dayButtonSelected,
                  ]}
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
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheet: {
    backgroundColor: "#181A1B",
    paddingVertical: 24,
    paddingHorizontal: spacing.xl,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: "center",
    // minHeight: 320,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2A2A2E",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: spacing.md,
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
