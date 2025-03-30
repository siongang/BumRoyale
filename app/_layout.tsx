import { Stack } from "expo-router"
import { LogBox} from "react-native";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
LogBox.ignoreAllLogs(true);

export default function RootLayout() {



    const [fontsLoaded] = useFonts({
        "Inter-Regular": require("@/assets/fonts/Inter/Inter-Regular.ttf"),
        "Inter-SemiBold": require("@/assets/fonts/Inter/Inter-SemiBold.ttf"),
        "Inter-Black": require("@/assets/fonts/Inter/Inter-Black.ttf"),
        "Inter-Medium": require("@/assets/fonts/Inter/Inter-Medium.ttf"),
      });
      
    return (

        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen 
                    name="(tabs)"
                        options={{
                        headerShown: false,
                    }}            
                />

                <Stack.Screen 
                    name="screens/createHabitScreen"    
                    options={{
                        headerShown: false,
                        presentation: "modal"
                        
                    }}
                />

                <Stack.Screen 
                    name="screens/habitDetailsScreen"    
                    options={{
                        headerShown: false,
                        presentation: "modal"

                    }}
                />
    
                <Stack.Screen 
                    name="+not-found"
                    options={{
                        headerShown: false
                    }}
                /> 

            </Stack>
        </GestureHandlerRootView>
    );

}