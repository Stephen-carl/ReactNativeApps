import FluffyTutor from "@/components/fluffyTutor";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGetGoals } from "@/hooks/goalHook";
import { GoalData } from "@/interface/goal";
import { useUserStore } from "@/store/userStore";
import { showErrorAlert } from "@/utils/alert";
import { router, useLocalSearchParams } from "expo-router";
import { set } from "lodash";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalAdd() {
    const { user } = useUserStore();
    const { goalId }  = useLocalSearchParams();
    const getMutation  = useGetGoals();
    const [goals, setGoals] = useState<GoalData | null>(null);
    // get the image to display for the goal level
    const [imageUse, setImageUse] = useState(null);


    // to display the goal level pending on the amount put in the goal
    const itemImages : string | any = {
        'one': require('@/assets/images/category/candy.png'),
        'two': require('@/assets/images/category/clothes.png'),
        'three': require('@/assets/images/category/children.png'),
        'four': require('@/assets/images/category/gift_box.png')
    }

    // Fetch goals when the component mounts
    useEffect(() => {
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
                        setGoals(null);
                        return;
                    }
                    setGoals(data[0]);
                    // to determine the goal level based on the amount saved for the goal vs actual amount
                    // "one" for 0-24%, "two" for 25-49%, "three" for 50-74%, and "four" for 75-100%
                    if (data && data.length > 0) {
                        const goal = data[0]; 
                        const progress = (goal.savedAmount / goal.amount) * 100;
                        let level = 'one';
                        if (progress >= 75) {
                            level = 'four';
                        } else if (progress >= 50) {
                            level = 'three';
                        } else if (progress >= 25) {
                            level = 'two';
                        }
                        console.log('Goal progress level:', level);
                        // You can use this level to display different images or styles
                        const selectedImage = itemImages[level] || itemImages['one'];
                        setImageUse(selectedImage);
                        console.log('Selected image for goal level:', selectedImage);
                    }
                },
                onError: (error) => {
                    console.error('Error fetching goals:', error);
                    showErrorAlert('An error occurred while fetching goals. Please try again later.');
                }
            }
        );
    }, [])
    
    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full justify-between">
                <VStack className="m-4">
                    <HStack className="items-center justify-between">
                        <HStack space="lg" className=" items-center">
                            <Pressable>
                                <ChevronLeft size={24} className=" w-6 h-6" onPress={() => router.back()}/>
                            </Pressable>
                            <Text className="text-xl font-mali_semibold text-getStarted">{goals?.item} Duration</Text>
                        </HStack>

                        <Button variant="outline" 
                            className="w-18 h-10 rounded-lg absolute right-0 top-0 border-globColour" 
                            onPress={() => router.push({
                                pathname:'/(home)/goal/goalAddAmount',
                                params: {goalId : goals?.id}
                                })
                            }
                            >
                            <ButtonText 
                                className="font-mali_semibold text-sm text-getStarted">
                                ADD
                            </ButtonText>
                        </Button>
                    </HStack>

                    <VStack space="sm" className="items-center my-9">
                        <Text className="text-2xl text-getStarted font-mali_bold">
                            ₦ {Number(goals?.amount.toFixed(2)) - Number(goals?.savedAmount.toFixed(2))}
                        </Text>
                        <Text className="text-sm text-getStarted font-mail">
                            Remaining
                        </Text>
                    </VStack>

                    <Image
                    source={imageUse ? imageUse : require('@/assets/images/category/candy.png')}
                    className="w-32 h-32 mt-10 self-center"
                    alt="Goal Image"
                    />
                    
                </VStack>

                <FluffyTutor message={`${user?.name}, you can start saving by adding ₦260 to your savings jar for your ${goals?.item}..`} />
            </VStack>
        </SafeAreaView>
    )
}