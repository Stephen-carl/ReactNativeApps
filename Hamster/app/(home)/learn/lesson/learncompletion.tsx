import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LearnCompletionLayour() {
    const [visible, setVisible] = useState(true);
    // i want this screen to display for just 3 seconds then go to learn/index.tsx
    useEffect(() => {
            const timer = setTimeout(() => {
            setVisible(false);
            router.replace('/(home)/learn')
            }, 3000); // 5 seconds
    
            return () => {
                
                clearTimeout(timer);
            };
        }, []);
    return(
        <SafeAreaView style={{ height: visible ? undefined : 100 }} className="flex-1 bg-white">
            <VStack space="4xl" className="flex-1 max-w-full min-h-full m-4 items-center justify-center">
                
                <Image
                source={require('@/assets/images/learn/lesson/lescom.png')}
                className="h-36 w-36 "
                alt="lesson"
                resizeMode="cover"
                />

                <Text className="text-lg font-mali_semibold text-getStarted mt-14">
                    Lesson Complete
                </Text>

                <Text className="text-lg font-mail text-getStarted mt-14">
                    Good job. Hammy is proud of you!!
                </Text>

            </VStack>
        </SafeAreaView>
    )
}