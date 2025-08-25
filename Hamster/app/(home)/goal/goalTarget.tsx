import FluffyTutor from "@/components/fluffyTutor";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useUserStore } from "@/store/userStore";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalTarget() {
    const { user } = useUserStore();
    const { goalName, currentAmount, amount } = useLocalSearchParams();
    const [target, setTarget] = useState<string>('');

    const handleSelected = (item: string) => {
        setTarget(item.trim());
    }

    const handleStyle = (item: string) => {
        // i did this incase the selected item is equals to the item else unselecte
        return target === item ? 'px-5  rounded-lg bg-goalButton m-3' : 'px-4 border-goalButton border bg-white rounded-lg m-3';
    }

    const handleSubmit = () => {
        router.push({
            pathname: "/(home)/goal/goalDuration",
            params: { goalName, currentAmount, goalTarget : target, amount }
        });
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full justify-between">
                <VStack className="m-4">
                    <HStack space="lg" className="mt-2 items-center">
                        <Pressable>
                            <ChevronLeft size={24} className=" w-6 h-6" onPress={() => router.back()}/>
                        </Pressable>
                        <Text className="text-2xl font-mali_semibold text-getStarted">Create your Goal</Text>
                    </HStack>

                    <Text
                    className="font-mail text-base mt-16">
                        How often do you want to save?
                    </Text>

                    <View className="flex-row flex-wrap mt-6">
                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('daily')}
                        onPress={() => handleSelected('daily')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">Daily</ButtonText>
                        </Button>

                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('weekly')}
                        onPress={() => handleSelected('weekly')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">Weekly</ButtonText>
                        </Button>

                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('monthly')}
                        onPress={() => handleSelected('monthly')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">Monthly</ButtonText>
                        </Button>

                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('once')}
                        onPress={() => handleSelected('once')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">Just Once</ButtonText>
                        </Button>
                    </View>
                </VStack>

                <VStack className="">
                    <FluffyTutor message={`${user?.name}, how much do you want to save for ${goalName}?`} />
                    
                    <View className="mx-4 mt-4">
                        <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour rounded-lg"
                        onPress={handleSubmit}
                        isDisabled={!target}
                        >
                        <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                        </Button>
                    </View>
                </VStack>
            </VStack>
        </SafeAreaView>
    )
}