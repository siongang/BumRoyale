import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable, ScrollView} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Habit } from "@/store";
import { HEADER_HEIGHT, spacing } from "@/styles";
import { HabitsSection } from "@/components";





interface HabitItemProp {
    habit: Habit
}


export default function HabitComponent({ habit }: { habit: Habit }) {
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
                        flexGrow: 1
                    }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} // optional if horizontal
                >

                     <View>
                        H
                     </View>
                </ScrollView>
            </View>

  
            
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
    headerContainer:{
        flexDirection: "row",
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 10,
    },


    text: {
        color: "white",
    },
    button: {
        fontSize:20,
        textDecorationLine: "underline",
        color: "#fff",
    },

      

});