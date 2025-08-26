import FluffyTutor from "@/components/fluffyTutor";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useUserStore } from "@/store/userStore";
import { router } from "expo-router";
import { PercentDiamond } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LearnHomeLayout() {
    const {user} = useUserStore()
    return (
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full justify-between">
                <VStack className="m-4">

                    <Text className="text-2xl font-mali_semibold text-getStarted mt-2 ">Learn</Text>

                    <HStack className="items-center justify-center mt-10">
                        <Pressable 
                        onPress={() => router.push('/(home)/learn/lesson')}
                        className="pt-14">
                            <VStack space="sm" className="items-center justify-center">
                                <Image
                                source={require('@/assets/images/learn/readbook.png')}
                                className="h-28 w-28"
                                alt="lesson"
                                resizeMode="cover"
                                />
                                <Text className="text-base font-mali_semibold text-getStarted">Lesson</Text>
                            </VStack>
                            
                        </Pressable>
                        
                    </HStack>

                    <HStack className="items-center justify-between mt-6 px-6">
                        <Pressable>
                            <VStack space="sm" className="items-center justify-center">
                                <Image
                                source={require('@/assets/images/learn/quizbulb.png')}
                                className="h-28 w-28"
                                alt="lesson"
                                resizeMode="cover"
                                />
                                <Text className="text-base font-mali_semibold text-getStarted">Quiz</Text>
                            </VStack>
                            
                        </Pressable>

                        <Pressable>
                            <VStack space="sm" className="items-center justify-center">
                                <Image
                                source={require('@/assets/images/learn/videoicon.png')}
                                className="h-36 w-28"
                                alt="lesson"
                                resizeMode="cover"
                                />
                                <Text className="text-base font-mali_semibold text-getStarted">Video</Text>
                            </VStack>
                            
                        </Pressable>
                    </HStack>

                </VStack>

                 <FluffyTutor message={`${user?.name}, welcome to Learning section. Would you like to learn of take a quiz?.`} />

            </VStack>
        </SafeAreaView>
    )
}