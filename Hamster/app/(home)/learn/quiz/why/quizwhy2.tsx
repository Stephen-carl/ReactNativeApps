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

export default function QuizWhy2() {
    const [selected, setSelected] = useState<string|null>(null)
    const [text, setText] = useState<string>('')

    const correctAnswer = 'A little often';

    // when selected
     const handleSelected = (item: string) => {
        setSelected(item);
        setText(item);
    }

    const handleSubmit = () => {
        if (text !== correctAnswer){
            showSuccessAlert(
                'Incorrect Answer 😞',
                `The right answer is ${correctAnswer}.`
            )
        } else {
            showSuccessAlert(
                "That's right!! 🥳🎉",`You have to save often when you receive money.`
            )
            router.push('/(home)/learn/quiz/why/quizwhy3')
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
                    How often should you put a little money into savings to make it grow?
                </Text>

                <Pressable 
                    onPress={() => handleSelected('Never')}
                    className={`border rounded-lg items-start ${text == 'Never' ? 'border-globColour' : null}`}>
                    <Text className="text-xl font-mali_semibold text-getStarted ml-6 my-4">Never</Text>
                </Pressable>

                <Pressable 
                    onPress={() => handleSelected('A little often')}
                    className={`border rounded-lg mt-6 py-4 ${text == 'A little often' ? 'border-globColour' : null}`}>
                    <Text className="text-xl font-mali_semibold text-getStarted ml-6">A little often (When you recieve money)</Text>
                </Pressable>

                <Pressable 
                    onPress={() => handleSelected('Only on holidays')}
                    className={`border rounded-lg mt-6 py-4 ${text == 'Only on holidays' ? 'border-globColour' : null}`}>
                    <Text className="text-xl font-mali_semibold text-getStarted ml-6">Only on holidays</Text>
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