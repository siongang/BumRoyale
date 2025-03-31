import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import HabitsSection from "@/components/habitSection";
import CustomTabBar from "@/components/customTabBar";
import { HEADER_HEIGHT, spacing } from "@/styles";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import CreateHabitModal from "../screens/createHabitScreen"; // update path if needed
import HabitDetailsScreen from "../screens/habitDetailsScreen";
import { useHabitDetailsModalStore } from "@/store/useHabitDetailsModalStore";

export default function Index() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [habitDetailModalVisible, setHabitDetailModalVisible] = useState(false);
  const selectedHabit = useHabitDetailsModalStore(
    (state) => state.selectedHabit
  );
  const setSelectedHabit = useHabitDetailsModalStore(
    (state) => state.setSelectedHabit
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.text}>Hey User!</Text>
        </View>
        <View>
          <Text style={styles.text}>1350 elo</Text>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: HEADER_HEIGHT,
            paddingBottom: 100,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false} // optional if horizontal
        >
          <View style={styles.battleContainer}>
            <Text style={styles.text}>BATTLES</Text>
          </View>

          <HabitsSection />
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={spacing.lg} color="white" />
      </TouchableOpacity>

      {
        <CreateHabitModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      }

      {<HabitDetailsScreen 
        selectedHabit={selectedHabit}
        onClose = {() => setSelectedHabit(null)}
        />
      }

      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    // alignItems: "center",
    backgroundColor: "#1A1A1A",
  },
  contentWrapper: {
    flex: 1,
    flexDirection: "column",

    paddingHorizontal: spacing.xl,
  },
  headerContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
  },

  battleContainer: {},
  text: {
    color: "white",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: spacing.xl + 38,
    right: spacing.xl,
    backgroundColor: "#2E2F37",
    padding: spacing.base,
    borderRadius: spacing.sm,
    zIndex: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
