import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoleScreen() {
    // selected should be a string
    const [selected, setSelected] = useState<string | null>(null)

    // when selected
    const handleSelected = (type : 'parent' | 'relative') => {
        setSelected(type)
        // then i can choose what to do with the selected
    }

    const handleStyle = (type: 'parent' | 'relative') => {
        // if the selected is equals any of the type
        return selected === type ? 'border border-globColour rounded-lg' : 'border rounded-lg border-bodColor'
    }

    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 p-4 max-w-full min-h-full ">
                <Pressable onPress={() => router.back()}>
                    <ChevronLeft size={24} className="mt-2 w-7 h-7"/>
                </Pressable>

                <VStack className="mt-6 flex-1 justify-between">
                    <View>
                        <Text className="font-mali_semibold text-2xl">Choose your role</Text>
                        <Pressable onPress={() => handleSelected('parent')} className="mt-8">
                            <Card size="sm" className={handleStyle('parent')}>
                                <Text className="text-lg font-mail">Parent/Guardian</Text>
                            </Card>
                        </Pressable>

                        <Pressable onPress={() => handleSelected('relative')} className="mt-2">
                            <Card size="sm" className={handleStyle('relative')}>
                                <Text className="text-lg font-mail">Relative</Text>
                            </Card>
                        </Pressable>
                    </View>
                    

                    <View className="mb-6">
                        <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour rounded-lg"
                        onPress={
                            () => router.push({
                            pathname:'/(walkthrough)/theName',
                            params: {
                                role: selected
                            }
                        })
                    }
                        isDisabled={!selected}
                        >
                        <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                    </Button>
                    </View>

                </VStack>
            </VStack>

        </SafeAreaView>
    )
}