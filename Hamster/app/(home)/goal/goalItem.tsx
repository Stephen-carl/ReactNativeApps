import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useUserStore } from "@/store/userStore";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalItem() {
    const {user} = useUserStore()
    const {currentAmount} = useLocalSearchParams()
    const [text, setText] = useState<string>('')

    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full">
                <HStack space="lg" className="mt-2 p-4 items-center">
                    <Pressable>
                        <ChevronLeft size={24} className=" w-7 h-7" onPress={() => router.back()}/>
                    </Pressable>
                    <Text className="text-2xl font-mali_semibold text-getStarted">Create a Goal</Text>
                </HStack>

                 <Text
                className="font-mail text-base px-4 mt-16">
                    What are you saving for?
                </Text>

                <Input
                variant="outline"
                size="lg"                       
                className={`rounded-2xl mx-4 mt-3`}>
                    <InputField 
                    className={`text-base font-mail border-2 rounded-xl ${!text ? 'border-gray-300' : 'border-globColour'}`} 
                    placeholder="Eg, New Toy, Holiday..."
                    value={text}
                    onChangeText={(text)=>{
                        setText(text.trim())
                    }}
                    />
                </Input>

                

            </VStack>
        </SafeAreaView>
    )
}