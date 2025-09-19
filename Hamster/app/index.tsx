import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useUserStore } from "@/store/userStore";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeLayout from "./(home)/home";
import { useEffect } from "react";
import { initDB } from "@/db/connect";
import { Image } from "@/components/ui/image";

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
        <SafeAreaView className="flex-1 bg-globColour justify-center items-center">
            <Image
            source={require('@/assets/images/splashScreenLogo.png')}
            className="w-full mb-10"
            alt='Hamster Logo'
            resizeMode="contain"
            />
        </SafeAreaView>
    )
}