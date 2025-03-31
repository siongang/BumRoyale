import React, { useEffect, useState } from "react";
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
import { useHabitStore, type Habit } from "../../store";
import { useRouter } from "expo-router";
import uuid from "react-native-uuid";
import { Ionicons } from "@expo/vector-icons";
import { spacing } from "@/styles";
import HabitForm from "@/components/habitForm";

type CreateHabitModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function CreateHabitModal({
  visible,
  onClose,
}: CreateHabitModalProps) {
  const router = useRouter();

  const [habitName, setHabitName] = useState<string>("");
  const [frequency, setFrequency] = useState<number[]>([]);
  const [type, setType] = useState<"positive" | "negative">("positive");

  const [newHabit, setNewHabit] = useState<Habit>({
    id: "", // Use empty string or generate an ID if needed
    name: "",
    frequency: [],
    type: "positive",
    createdAt: new Date().toISOString(),
    selected: false,
  });

  const addHabit = useHabitStore((state) => state.addHabit);

  const handleCreateHabit = async () => {
    if (newHabit.name) {
      await addHabit(newHabit);
      closeModal();
    }
  };


  const closeModal = () => {
    onClose();
    setTimeout(() => router.replace("/(tabs)"), 300);
    setNewHabit({
      id: "", // or uuid.v4() if you want auto-ID
      name: "",
      frequency: [],
      type: "positive",
      createdAt: new Date().toISOString(),
      selected: false,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Modal
        isVisible={visible}
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
            <Text style={styles.title}>Create a New Habit</Text>
            <Pressable style={styles.createButton} onPress={handleCreateHabit}>
              <Text style={styles.createButtonText}>Create</Text>
            </Pressable>
          </View>

          <HabitForm
            habit={newHabit}
            onChange={(state) => setNewHabit(state)}
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
