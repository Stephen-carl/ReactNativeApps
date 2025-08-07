import FluffyTutor from "@/components/fluffyTutor";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useUserStore } from "@/store/userStore";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalAmount() {
    const { user } = useUserStore();
    const { goalName, currentAmount } = useLocalSearchParams();
    const [amount, setAmount] = useState<string>('');
    const [clientError, setClientError] = useState<string>('');
    // const insertGoalMutation = useInsertGoal();
    const isAmountValid = (amount: string) => {
        const regex = /^\d+(\.\d{1,2})?$/; 
        return regex.test(amount);
    }

    const handleInputChange = (value: string) => {
        const trimmed = value.trim();
        setAmount(trimmed);
        if (trimmed === '') {
            setClientError('');
        } else if (!isAmountValid(trimmed)) {
            setClientError('Please enter a valid amount (up to 2 decimal places)');
        } else {
            setClientError('');
        }
    }
    const handleSubmit = () => {
        if (!amount || clientError) return;
        Example: router.push({ pathname: '/(home)/goal/goalTarget', params: { amount, goalName, currentAmount } });
    };

    return(
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
                        How much do you need?
                    </Text>

                    <Input
                    variant="outline"
                    size="lg"                       
                    className={`rounded-2xl  mt-3`}>
                        <InputField 
                        className={`text-base font-mail border-2 rounded-xl ${!amount ? 'border-gray-300' : 'border-globColour'}`} 
                        placeholder="500"
                        value={amount}
                        keyboardType="decimal-pad"
                        onChangeText={(text)=>{
                            handleInputChange(text);
                        }}
                        />
                    </Input>
                    {!!clientError && (
                        <Text className="text-red-500 mt-2 ml-1 text-sm">{clientError}</Text>
                    )}
                </VStack>
                
                <VStack className="">
                    <FluffyTutor message={`${user?.name}, how much do you want to save for ${goalName}?`} />
                    
                    <View className="mx-4 mt-4">
                        <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour rounded-lg"
                        onPress={handleSubmit}
                        isDisabled={!amount}
                        >
                        <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                        </Button>
                    </View>
                </VStack>
            </VStack>
        </SafeAreaView>
    )
    
}