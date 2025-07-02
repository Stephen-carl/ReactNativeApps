import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
    return (
        <SafeAreaView>
            <Text className="justify-center items-center w-full p-4">Welcome To My Boiler Plate for projects</Text>
        </SafeAreaView>
    )
}