import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LessonLayout() {
    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full m-4">
                <HStack space="lg" className=" items-center">
                    <Pressable>
                        <ChevronLeft size={24} className=" w-6 h-6" onPress={() => router.back()}/>
                    </Pressable>
                    <Text className="text-2xl font-mali_semibold text-getStarted">Lessons</Text>
                </HStack>

                <Pressable 
                onPress={() => router.push('/(home)/learn/lesson/history')}
                className="border rounded-lg mt-11  items-start">
                    <Text className="text-xl font-mali_semibold text-getStarted ml-6 my-4">History of Money</Text>
                </Pressable>
                <Pressable 
                onPress={() => router.push('/(home)/learn/lesson/why')}
                className="border rounded-lg mt-6 py-5 px-8">
                    <Text className="text-xl font-mali_semibold text-getStarted ml-6">Why Save Money?</Text>
                </Pressable>
                <Pressable 
                onPress={() => router.push('/(home)/learn/lesson/needwant')}
                className="border rounded-lg mt-6 py-5 px-8">
                    <Text className="text-xl font-mali_semibold text-getStarted ml-6">Needs & Wants</Text>
                </Pressable>
            </VStack>
        </SafeAreaView>
    )
}