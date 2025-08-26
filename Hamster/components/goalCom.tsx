import { router } from "expo-router";
import { Card } from "./ui/card";
import { HStack } from "./ui/hstack";
import { Pressable } from "./ui/pressable";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

export default function GoalCom({goals} : {goals : any}) {
    // i need to calculate the percentage of the goal
    const percentage = (goals.savedAmount / goals.amount) * 100;
    const progressBarWidth = `${percentage.toFixed(2)}%`;

    // i need to get the number of days left to achieve the goal
    const today = new Date();
    const targetDate = new Date(goals.duration);
    const timeDiff = targetDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // if the days left is less than 0, then it means the goal is overdue
    let daysLeftText = '';
    if (daysLeft < 0) {
// If the target date has passed
daysLeftText = "Overdue";
} else if (goals.amount === goals.savedAmount) {
// If the goal is already completed
daysLeftText = "Completed";
} else {
// Otherwise, show how many days are left
daysLeftText = `${daysLeft} days left`;
}
    
    // go to the goal add passinf the goal id
    const handlePress = () => {
        if (goals.status == 'ongoing') {
            // only allow if the goal is ongoing
            router.push({
                pathname: "/(home)/goal/goalAdd",
                params: { goalId: goals.id }
            })
        } else{
            // do nothing
            return;
        }
        
    }

    return (
        <Pressable onPress={handlePress} className="mt-2">
            <Card className="rounded-xl px-12 py-7 border">
                <VStack className="">
                    <HStack className="items-center justify-between">
                        <Text className="text-lg font-mali text-getStarted">{goals.item} Savings</Text>
                        <Text className="text-xs font-mali text-jarWrite p-2 bg-white rounded-lg border">{daysLeftText}</Text>
                    </HStack>
                    <HStack className="items-center justify-between mt-3">
                        <Text className="text-lg font-mali_semibold text-getStarted">₦{goals.savedAmount}/₦{goals.amount}</Text>
                        <Text className="text-lg font-mali_semibold text-getStarted ml-2">{progressBarWidth}</Text>
                    </HStack>
                </VStack>
            </Card>
        </Pressable>
    )
}