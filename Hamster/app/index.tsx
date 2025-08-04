import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useUserStore } from "@/store/userStore";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeLayout from "./(home)/home";
import { useEffect } from "react";
import { initDB } from "@/db/connect";

export default function WelcomeScreen() {
    const { isLoggedIn } = useUserStore()
    
    useEffect(() => {
        (async () => {
      try {
        await initDB();
        if (isLoggedIn) {
            router.replace('/(home)/home')
        }
      } catch (e) {
        console.error('Failed to initialize DB early:', e);
      }
    })();
        
    },[isLoggedIn])
    
    return (
        <SafeAreaView>
            <Text className="justify-center items-center w-full p-4">Welcome To Hamster</Text>
            <Button onPress={()=> router.navigate('/(walkthrough)/welcome')}
                className="justify-center items-center m-4 bg-gray-600">
                <ButtonText>Get Started</ButtonText>
            </Button>
        </SafeAreaView>
    )
}