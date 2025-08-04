import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGetJar } from "@/hooks/jarHook";
import { theJar } from "@/interface/jar";
import { useUserStore } from "@/store/userStore";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalLayout() {
    const {user} = useUserStore()
    const jarMutation = useGetJar()
    const [theData, setTheData ] = useState<theJar | null>(null)
    const [theOn, setOn] = useState(false)

    useEffect(() =>{
        jarMutation.mutate(
            user?.id,
            {
                onSuccess: (data) => {
                    console.log(data);
                    setTheData(data)
                },
                onError: (error) => {
                    console.log(error);
                }
            }
        )
    },
    [user?.id])

    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 p-4 max-w-full min-h-full">
                <Text className="text-2xl font-mali_semibold text-getStarted mt-2 p-4">My Goals</Text>

                <VStack className="p-4 items-center">
                    <Card>
                        <VStack className="items-center bg-globColour">
                            <Text
                            className="text-lg text-white font-mail">
                                HamStash Jar</Text>
                            <HStack className="items-center">
                                {!theOn 
                                ? (<Text className="text-2xl text-black font-mail">
                                    ₦ ****.**
                                </Text>)
                                :(<Text className="text-2xl text-black font-mail">
                                    ₦{theData?.currentAmount?.toFixed(2)}
                                </Text>)}
                                <Pressable onPress={() => setOn(!theOn)} className="ml-2">
                                    {theOn ? (<Icon as={EyeOff} className="stroke-black h-5 w-5"/>) :(<Icon as={Eye} className="stroke-black h-5 w-5"/>)}
                                </Pressable>
                            </HStack>
                        </VStack>
                    </Card>

                    <Button 
                        size="lg" 
                        variant="outline" 
                        className="p-2.5 border-jarAdd rounded-lg mt-6"
                        onPress={() => router.push({pathname:'/(home)/goal/goalItem',
                            params: {
                                currentAmount: theData?.currentAmount?.toFixed(2)
                            }
                        })}>
                        <ButtonText className="font-mail text-base text-globColour">Create a Goal</ButtonText> 
                    </Button>
                </VStack>
                
            </VStack>
        </SafeAreaView>
    )
}