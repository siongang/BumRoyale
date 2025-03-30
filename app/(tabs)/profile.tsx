import { View, Text, StyleSheet} from "react-native";
import React from "react";


export default function Habit() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Your Profile</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2D3641"
    },

    text: {
        color: "white"
    }

});