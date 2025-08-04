import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native"
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { router } from "expo-router";
import { View } from "react-native";
import { useEffect } from "react";
import { initDB } from "@/db/connect";

export default function GetStartedScreen() {
    // useEffect(()=>{
    //     initDB()
    // },[])

    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 p-4 max-w-full min-h-full">
                <Pressable onPress={() => router.back()}>
                    <ChevronLeft size={24} className="mt-2 w-7 h-7"/>
                </Pressable>

                <VStack className="flex-1 justify-between">
                    <View className="items-center">
                        <Image
                        source={require('@/assets/images/fluffyHamster.png')}
                        className="mt-8 h-72 w-72"
                        alt="fluffy"
                        />
                    
                        <Text className="font-mali_semibold text-lg text-getStarted mt-10 justify-center text-center">Hello, there! {'\n'}I am Hammy and I will be walking you through</Text>
                    </View>

                    <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour mb-6 rounded-lg"
                        onPress={() => router.push('/(walkthrough)/role')}
                        >
                        <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                    </Button>
                </VStack>

                
                    
            </VStack>
        </SafeAreaView>
    )
}