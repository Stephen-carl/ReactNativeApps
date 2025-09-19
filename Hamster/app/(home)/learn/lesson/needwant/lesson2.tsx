import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NeedsLesson2() {
    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full m-4 justify-between">
                <VStack>
                    <HStack space="lg" className=" items-center">
                    <Pressable>
                        <ChevronLeft size={24} className=" w-6 h-6" onPress={() => router.back()}/>
                    </Pressable>
                    <Text className="text-2xl font-mali_semibold text-getStarted">Lessons</Text>
                    </HStack>

                    <Text className="text-xl font-mali_semibold text-getStarted mt-11">Needs and Want</Text>

                    <VStack space="4xl" className="items-center justify-center">
                        <Image
                        source={require('@/assets/images/learn/lesson/needles2.png')}
                        className="h-36 w-50 mt-20"
                        alt="lesson"
                        resizeMode="contain"
                        />
                        <Text className="text-lg font-mali_semibold text-getStarted mt-14 text-center">
                            Food, water, clothes, and a home are needs.
                        </Text>
                    </VStack>
                </VStack>

                <Button 
                    style={{ width: '100%'}} 
                    size='xl' 
                    className="bg-globColour rounded-lg"
                    onPress={() => router.push('/(home)/learn/lesson/needwant/lesson3')}
                    >
                    <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                </Button>
                
            </VStack>
        </SafeAreaView>
    )
}