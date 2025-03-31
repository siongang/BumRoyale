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
import HabitForm from "@/components/habitForm";

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
          <HabitForm 
            habit={detailsHabit}
            onChange={(state) => setDetailsHabit(state)}
          />
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
