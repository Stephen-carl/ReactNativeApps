import FluffyTutor from "@/components/fluffyTutor";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGetGoals, useUpdateGoal } from "@/hooks/goalHook";
import { useAddToJar, useGetJar, useUpdate } from "@/hooks/jarHook";
import { GoalData } from "@/interface/goal";
import { theJar } from "@/interface/jar";
import { useUserStore } from "@/store/userStore";
import { showErrorAlert } from "@/utils/alert";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, MoveRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalAddAmountLayout() {
    const {user} = useUserStore()
    const { goalId} = useLocalSearchParams()
    const [text, setText] = useState<string>('')
    const [inputValue, setInputValue] = useState("");
    // to store the data for the two api calls
    const [jarData, setJarData] = useState<theJar | null>(null);
    const [goalData, setGoalData] = useState<GoalData | null>(null);
    const getMutation  = useGetGoals();
    const jarMutation = useGetJar()
    const updateGoalMutation = useUpdateGoal()
    const updateJarMutation = useAddToJar()

    // Fetch jar data when the component mounts
    useEffect(() =>{
            jarMutation.mutate(
                user?.id,
                {
                    onSuccess: (data) => {
                        console.log(data);
                        setJarData(data);
                        // then get the goals
                        getTheGoal();
                    },
                    onError: (error) => {
                        console.log(error);
                    }
                }
            )
        },
        [user?.id])

    // get goals
    const getTheGoal = () =>{
        getMutation.mutate({
                childId: user?.id,
                // If goalId is provided, use it; otherwise, fetch all goals
                goalId: goalId ? Number(goalId) : 0,
                status: ''
            },
            {
                onSuccess: (data) => {
                    console.log('Fetched goals:', data);
                    if (!data || data.length === 0) {
                        console.log('No goals found.');
                        setGoalData(null);
                        return;
                    }
                    setGoalData(data[0]);
                },
                onError: (error) => {
                    console.error('Error fetching goals:', error);
                    showErrorAlert('An error occurred while fetching goals. Please try again later.');
                }
            }
        );
    }

    const handlePress = (val : any) => {
        if (val === "←") {
            setInputValue((prev) => prev.slice(0, -1));
        } else if (val === "C") {
            setInputValue("");
        } else {
            setInputValue((prev) => prev + val);
        }
    };


    const buttons = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["C", "0", "←"],
    ];

    const handleSubmit = () => {
        // save to db
        if (!inputValue) return;
        if (Number(inputValue) > jarData?.currentAmount!) {
            showErrorAlert(`You cannot add more than ₦${jarData?.currentAmount?.toFixed(2)} to your goal from your jar`);
            return;
        }
        console.log(`Adding amount: ${inputValue} to goalId: ${goalId} from jarId: ${jarData?.id}`);

        // update the goal
        // check if the amount entered + the saved amount is greater than the actual amount for the goal
        if (goalData && (Number(inputValue) + goalData.savedAmount) > goalData.amount) {
            showErrorAlert(`You cannot add more than ₦${(goalData.amount - goalData.savedAmount).toFixed(2)} to your goal`);
            return;
        }
        updateGoalMutation.mutate(
            { childId: user?.id, goalId: Number(goalId), amount: Number(inputValue) },
            {
                onSuccess: (data) => {
                    console.log('Goal updated successfully:', data);
                    // now i need to update from jar
                    updateJar();
                },
                onError: (error) => {
                    console.error('Error updating goal:', error);
                    showErrorAlert('An error occurred while updating your goal. Please try again later.');
                }
            }
        )
        // now i need to remove from jar
        
        
        // router.replace({
        //     pathname:'/(home)/goal/goalAddConfirm',
        //     params: {goalId : goalId, amount: inputValue}
        // })
    }

    const updateJar = () => {
        updateJarMutation.mutate(
            { 
                childId: user?.id, 
                amount: Number(inputValue), 
                reason : 'take', 
                takeOutId: null, 
                date : new Date().toISOString(), 
                itemProfile : "pocket" },
            {
                onSuccess: (data) => {
                    console.log('Jar updated successfully:', data);
                    // after updating the jar, navigate to the confirmation screen
                    router.replace({
                        pathname:'/(home)/goal',
                        // params: {goalId : goalId, amount: inputValue}
                    })
                },
                onError: (error) => {
                    console.error('Error updating jar:', error);
                    showErrorAlert('An error occurred while updating your jar. Please try again later.');
                }
            }
        )
    }

    return (
        <SafeAreaView className="bg-white flex-1">
            <VStack className="flex-1 max-w-full min-h-full justify-between">
                <VStack className="m-4">
                    <HStack space="lg" className="mt-2 items-center">
                        <Pressable>
                            <ChevronLeft size={24} className=" w-6 h-6" onPress={() => router.back()}/>
                        </Pressable>
                        <Text className="text-2xl font-mali_semibold text-getStarted">Add money</Text>
                    </HStack>

                    <HStack className="items-center justify-between mt-6">
                        <VStack space="sm" className="">
                            <Text className="text-base font-mail text-jarWrite">From</Text>
                            <VStack className=" items-center mx-4">
                                <Text className="text-base font-mail text-jarWrite">Jar </Text>
                                <Text className="text-base font-mail text-jarWrite">₦ {jarData?.currentAmount?.toFixed(2)}</Text>
                            </VStack>
                        </VStack>

                        <VStack className="w-12 h-12 rounded-full bg-goalStatusBG items-center justify-center">
                            <MoveRight size={24} className="fill-bellColour"/>
                        </VStack>

                        <VStack space="sm" className="">
                            <Text className="text-base font-mail text-jarWrite">To</Text>
                            <VStack className=" items-center mx-4">
                                <Text className="text-base font-mail text-jarWrite">{goalData?.item}</Text>
                                <Text className="text-base font-mail text-jarWrite ">₦ {goalData?.savedAmount.toFixed(2)}</Text>
                            </VStack>
                            
                        </VStack>
                    </HStack>

                    <VStack space="sm" className="items-center my-9">
                        <Text className="text-xl font-mali_bold">₦ {inputValue || "0"}.00</Text>
                        <Text className="text-xs font-mail">Enter amount with the keypad</Text>
                    </VStack>
                    

                    <View className="gap-2">
                        {buttons.map((row, rowIndex) => (
                        <View key={rowIndex} className="flex-row justify-center gap-12">
                            {row.map((btn) => (
                            <TouchableOpacity
                                key={btn}
                                onPress={() => handlePress(btn)}
                                className="w-16 h-16 rounded-full justify-center items-center"
                            >
                                <Text className="text-xl font-semibold">{btn}</Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                        ))}
                    </View>

                </VStack>
                
                <VStack className="">
                    <FluffyTutor message={`${user?.name}, you can start by adding money into your toy savings from your jar`} />
                    
                    <View className="mx-4 mt-4">
                        <Button 
                            style={{ width: '100%'}} 
                            size='xl' 
                            className="bg-globColour rounded-lg"
                            onPress={handleSubmit}
                            isDisabled={!inputValue}
                        >
                        <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                        </Button>
                    </View>
                </VStack>
            </VStack>
        </SafeAreaView>
    )
}