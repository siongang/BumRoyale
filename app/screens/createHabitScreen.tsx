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
import { useHabitStore, type Habit } from "../../store";
import { useRouter } from "expo-router";
import uuid from "react-native-uuid";
import { Ionicons } from "@expo/vector-icons";
import {spacing} from "@/styles"

type CreateHabitModalProps = {
  visible: boolean;
  onClose: () => void;
};


export default function CreateHabitScreen({ visible, onClose }: CreateHabitModalProps) {
  const router = useRouter();

  const [habitName, setHabitName] = useState<string>("");
  const [frequency, setFrequency] = useState<number[]>([]);
  const [type, setType] = useState<"positive" | "negative">("positive");

  const days: string[] = ["S", "M", "T", "W", "T", "F", "S"];
  const addHabit = useHabitStore((state) => state.addHabit);

  const handleCreateHabit = async () => {
    const newHabit: Habit = {
      id: uuid.v4() as string,
      name: habitName.trim(),
      frequency,
      type,
      createdAt: new Date().toISOString(),
      selected: false,
    };

    if (newHabit.name) {
      await addHabit(newHabit);
      closeModal();
    }
  };

  const toggleDay = (index: number) => {
    setFrequency((prev) =>
      prev.includes(index) ? prev.filter((day) => day !== index) : [...prev, index]
    );
  };

  const closeModal = () => {
    onClose();
    setTimeout(() => router.replace("/(tabs)"), 300);
    setHabitName("");
    setFrequency([]);
    setType("positive")
  };

  

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
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

          <TextInput
            style={styles.textInput}
            placeholder="Enter Habit Name"
            placeholderTextColor="#888"
            value={habitName}
            onChangeText={setHabitName}
          />

          <View style={styles.typeButtonContainer}>
            <Pressable
              onPress={() => setType("positive")}
              style={[
                styles.iconButton,
                type === "positive" && styles.iconButtonSelected,
              ]}
            >
              <Ionicons
                name="add"
                size={20}
                color={type === "positive" ? "#181A1B" : "white"}
              />
            </Pressable>

            <Pressable
              onPress={() => setType("negative")}
              style={[
                styles.iconButton,
                type === "negative" && styles.iconButtonSelected,
              ]}
            >
              <Ionicons
                name="remove"
                size={20}
                color={type === "negative" ? "#181A1B" : "white"}
              />
            </Pressable>
          </View>

          <View style={styles.daysContainer}>
            {days.map((day, index) => {
              const isSelected = frequency.includes(index);
              return (
                <Pressable
                  key={index}
                  onPress={() => toggleDay(index)}
                  style={[
                    styles.dayButton,
                    isSelected && styles.dayButtonSelected,
                  ]}
                >
                  <Text style={isSelected ? styles.dayButtonTextSelected : styles.dayButtonText}>
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
    alignItems: "center"
    // minHeight: 320,
  },
  header: {
    flexDirection: "row",
    width:'100%',
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
    width:"100%",
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
