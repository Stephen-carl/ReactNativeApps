import FluffyTutor from "@/components/fluffyTutor";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { useUserStore } from "@/store/userStore";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalDuration() {
    const {user} = useUserStore()
    const { goalName, currentAmount, goalTarget, goalAmount } = useLocalSearchParams()
     const [duration, setDuration] = useState<string>('');

    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full justify-between">
                <VStack className="m-4">
                    
                </VStack>
                <VStack className="">
                    <FluffyTutor message={`${user?.name}, how much do you want to save for ${goalName}?`} />
                    
                    <View className="mx-4 mt-4">
                        <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour rounded-lg"
                        // onPress={handleSubmit}
                        isDisabled={!duration}
                        >
                        <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                        </Button>
                    </View>
                </VStack>
            </VStack>
        </SafeAreaView>
    )
}