import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable, ScrollView, Modal, KeyboardAvoidingView, Platform} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Habit } from "@/store";
import { HEADER_HEIGHT, spacing } from "@/styles";





interface HabitItemProp {
    habit: Habit,
    visible: boolean,
    onClose: () => void
}


export default function HabitDetailsScreen({ habit , visible, onClose }: HabitItemProp) {
   
     return (
       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
         <Modal>
            

         </Modal>
       </KeyboardAvoidingView>
    );
}

