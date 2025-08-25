import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGetGoals } from "@/hooks/goalHook";
import { useUserStore } from "@/store/userStore";
import { showErrorAlert } from "@/utils/alert";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalAdd() {
    const { user } = useUserStore();
    const { goalId }  = useLocalSearchParams();
    const getMutation  = useGetGoals();

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
                    <Text className="text-2xl font-mali_semibold text-getStarted">Create your Goal</Text>
                    <Text className="font-mail text-base mt-16">
                        What are you saving for?
                    </Text>
                    {/* Add your goal creation form or components here */}
                </VStack>
            </VStack>
        </SafeAreaView>
    )
}