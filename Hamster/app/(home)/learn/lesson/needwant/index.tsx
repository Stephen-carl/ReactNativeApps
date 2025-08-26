import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NeedWantLayout() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full m-4">
                <Text>Need and Want</Text>
            </VStack>
        </SafeAreaView>
    )
}