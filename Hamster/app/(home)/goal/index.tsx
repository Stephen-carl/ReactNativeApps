import GoalCom from "@/components/goalCom";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGetGoals } from "@/hooks/goalHook";
import { useGetJar } from "@/hooks/jarHook";
import { GoalData } from "@/interface/goal";
import { theJar } from "@/interface/jar";
import { useUserStore } from "@/store/userStore";
import { showErrorAlert } from "@/utils/alert";
import { router } from "expo-router";
import { get, set } from "lodash";
import { Eye, EyeOff } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalLayout() {
    const {user} = useUserStore()
    const jarMutation = useGetJar()
    const goalMutation = useGetGoals()
    const [theData, setTheData ] = useState<theJar | null>(null)
    const [theOn, setOn] = useState(false)
    const [goals, setGoals] = useState<GoalData[]>([]);
    const [goalsStatus, setGoalsStatus] = useState('ongoing');
    const [statusCount, setStatusCount] = useState(0)

    useEffect(() =>{
        jarMutation.mutate(
            user?.id,
            {
                onSuccess: (data) => {
                    console.log(data);
                    setTheData(data);
                    // then get the goals
                    getTheGoals(goalsStatus);
                },
                onError: (error) => {
                    console.log(error);
                }
            }
        )
    },
    [user?.id])

    const getTheGoals = (status:string) => {
        goalMutation.mutate(
            {
                childId: user?.id,
                goalId: 0,
                status: ''
            },
            {
                onSuccess: (data) => {
                    console.log('Fetched goals:', data);
                    if (!data || data.length === 0) {
                        console.log('No goals found for the selected status.');
                        setGoals([]);
                        setStatusCount(0);
                        return;
                    }
                    setGoals(data);
                    // get the status count
                    // setStatusCount(data.length);
                },
                onError: (error) => {
                    console.error('Error fetching goals:', error);
                    showErrorAlert('An error occurred while fetching goals. Please try again later.');
                }
            }
        )
    }

    // filter now then get the length later
    const ongoingGoals = goals.filter((g) => g.status === "ongoing");
    const completedGoals = goals.filter((g) => g.status === "complete");
    const displayedGoals = goalsStatus === "ongoing" ? ongoingGoals : completedGoals;

    // set the background colour and the text colour different when it is either ongoing or completed
    const handleStatusStyle = (status: string) => {
        
    }

    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 m-4 max-w-full min-h-full">
                <Text className="text-2xl font-mali_semibold text-getStarted mt-2 ml-2">My Goals</Text>
                
                    <ImageBackground 
                    source={require('@/assets/images/balanceBG.png')}
                    className="w-full h-40  items-center justify-center"
                    resizeMode="stretch">
                        <VStack space="md" className="items-center ">
                            <Text
                            className="text-lg text-white font-mali_semibold mt-5">
                                HamStash Balance</Text>
                            <HStack className="items-center">
                                {!theOn 
                                ? (<Text className="text-2xl text-white font-mali_bold">
                                    ₦ ****.**
                                </Text>)
                                :(<Text className="text-2xl text-white font-mali_bold">
                                    ₦{theData?.currentAmount?.toFixed(2)}
                                </Text>)}
                                <Pressable onPress={() => setOn(!theOn)} className="ml-3">
                                    {theOn ? (<Icon as={EyeOff} className="stroke-white h-5 w-5"/>) :(<Icon as={Eye} className="stroke-white h-5 w-5"/>)}
                                </Pressable>
                            </HStack>
                        </VStack>
                    </ImageBackground>
                                    
                <VStack className="p-4 items-center">
                    <Button 
                        size="lg" 
                        variant="outline" 
                        className="px-6 border-globColour rounded-lg mt-3"
                        onPress={() => router.push({pathname:'/(home)/goal/goalItem',
                            params: {
                                currentAmount: theData?.currentAmount?.toFixed(2)
                            }
                        })}>
                        <ButtonText className="font-mail text-base text-globColour">Create a Goal</ButtonText> 
                    </Button>
                </VStack>

                {/* <HStack className="justify-between mt-10 p-2 bg-goalStatusBG rounded-xl">
                    <Pressable onPress={() => {
                        getTheGoals('ongoing')
                        setGoalsStatus('ongoing');
                        }}>
                        <HStack space="xl" className={`${goalsStatus =='ongoing'? 'bg-globColour rounded-xl': ''} justify-between items-center px-4 py-2`}>
                            <Text className={`text-lg font-mali_semibold ${goalsStatus =='ongoing'? 'text-white': 'text-goalStatusText'}`}>Ongoing</Text>
                            <Text className="text-xs font-mali text-white rounded-full bg-goalStatusStatus p-2">{statusCount}</Text>
                        </HStack>
                    </Pressable>

                    <Pressable onPress={() => {
                        getTheGoals('complete')
                        setGoalsStatus('complete');
                        }}>
                        <HStack space="xl" className={`${goalsStatus =='ongoing'? '': 'bg-globColour rounded-xl'}  items-center px-4 py-2`}>
                            <Text className={`text-lg font-mali_semibold ${goalsStatus =='ongoing'? 'text-goalStatusText': 'text-white'}`}>Completed</Text>
                            <Text className="text-sm font-mali text-white rounded-full bg-goalStatusStatus p-2">{statusCount}</Text>
                        </HStack>
                    </Pressable>
                    
                </HStack> */}

                <HStack className="justify-between mt-10 p-2 bg-goalStatusBG rounded-xl">
                    <Pressable
                        onPress={() => setGoalsStatus("ongoing")}
                        className={`${
                        goalsStatus === "ongoing" ? "bg-globColour rounded-xl" : ""
                        } flex-1 mx-1`}
                        >
                        <HStack className="justify-center items-center py-2">
                            <Text
                                className={`text-lg font-mali_semibold ${
                                goalsStatus === "ongoing"
                                ? "text-white"
                                : "text-goalStatusText"
                                }`}
                            >
                            Ongoing
                            </Text>
                            <Text className="ml-2 text-xs font-mali text-white rounded-full bg-goalStatusStatus px-2 py-1">
                            {ongoingGoals.length}
                            </Text>
                        </HStack>
                    </Pressable>


                    <Pressable
                        onPress={() => setGoalsStatus("complete")}
                        className={`${
                        goalsStatus === "complete" ? "bg-globColour rounded-xl" : ""
                        } flex-1 mx-1`}
                        >
                        <HStack className="justify-center items-center py-2">
                            <Text
                            className={`text-lg font-mali_semibold ${
                            goalsStatus === "complete"
                            ? "text-white"
                            : "text-goalStatusText"
                            }`}
                            >
                            Completed
                            </Text>
                            <Text className="ml-2 text-xs font-mali text-white rounded-full bg-goalStatusStatus px-2 py-1">
                            {completedGoals.length}
                            </Text>
                        </HStack>
                    </Pressable>
                </HStack>

                <FlatList
                data={displayedGoals}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <GoalCom goals={item}/>}
                className="mt-6"
                ListEmptyComponent={<Text className="text-center mt-1">No transactions</Text>}
                />
                
            </VStack>
        </SafeAreaView>
    )
}