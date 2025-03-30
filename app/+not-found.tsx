import { View, Text, StyleSheet} from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";


export default function NotFoundScreen() {
    return(
        <>
            <Stack.Screen options={{ title: "Oops! Not Found"}}></Stack.Screen>
            <View style={styles.container}>
                <Text style={styles.text}>404</Text>
                <Link href="/" style={styles.button}>
                    Go back to home.
                </Link>
            </View>
        </>
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
    },
    button: {
        fontSize:20,
        textDecorationLine: "underline",
        color: "#fff",
    }
    

});