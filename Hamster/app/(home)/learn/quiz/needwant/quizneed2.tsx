import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { showSuccessAlert } from "@/utils/alert";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuizNeed2() {
    const [selected, setSelected] = useState<string|null>(null)
    const [text, setText] = useState<string>('')

    const correctAnswer = 'Candy for fun';

    // when selected
     const handleSelected = (item: string) => {
        setSelected(item);
        setText(item);
    }

    const handleSubmit = () => {
        if (text !== correctAnswer){
            showSuccessAlert(
                'Incorrect Answer 😞',
                `The right answer is ${correctAnswer}. You would want candy for fun.`
            )
        } else {
            showSuccessAlert(
                "That's right!! 🥳🎉",`You would want candy for fun and share with friends.`
            )
            router.push('/(home)/learn/quiz/needwant/quizneed3')
        }
    }

    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full m-4 justify-between">
                <VStack>
                <HStack className=" items-center mt-2">
                    <Pressable onPress={() => router.back()}>
                        <ChevronLeft size={24} className=" w-7 h-7"/>
                    </Pressable>
                    <HStack className="items-center justify-center flex-1 px-5">
                        <Image
                        source={require('@/assets/images/progressBar2.png')}
                        className="h-3 w-full "
                        alt="fluffy"
                        resizeMode="cover"
                        />
                    </HStack>
                </HStack>


                <Text className="text-2xl text-getStarted font-mali_semibold my-11">
                    Which is a want?
                </Text>

                <Pressable 
                    onPress={() => handleSelected('Water to drink')}
                    className={`border rounded-lg items-start ${text == 'Water to drink' ? 'border-globColour' : null}`}>
                    <Text className="text-xl font-mali_semibold text-getStarted ml-6 my-4">A warm jacket when it's cold</Text>
                </Pressable>

                <Pressable 
                    onPress={() => handleSelected('Candy for fun')}
                    className={`border rounded-lg mt-6 py-4 ${text == 'Candy for fun' ? 'border-globColour' : null}`}>
                    <Text className="text-xl font-mali_semibold text-getStarted ml-6">Candy for fun</Text>
                </Pressable>

                <Pressable 
                    onPress={() => handleSelected('money')}
                    className={`border rounded-lg mt-6 py-4 ${text == 'money' ? 'border-globColour' : null}`}>
                    <Text className="text-xl font-mali_semibold text-getStarted ml-6">A safe place to sleep</Text>
                </Pressable>

                </VStack>
                
                <Button 
                    style={{ width: '100%'}} 
                    size='xl' 
                    className="bg-globColour rounded-lg"
                    isDisabled={!text}
                    onPress={() => handleSubmit()}
                    >
                    <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                </Button>
            </VStack>
        </SafeAreaView>
    )
}