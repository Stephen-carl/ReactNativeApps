import FluffyTutor from "@/components/fluffyTutor";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useUserStore } from "@/store/userStore";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalItem() {
    const {user} = useUserStore()
    const {currentAmount} = useLocalSearchParams()
    const [text, setText] = useState<string>('')
    const [selected, setSelected] = useState<string | null>(null)

    // when selected
     const handleSelected = (item: string) => {
        setSelected(item);
        setText(item);
    }

    const handleStyle = (item: string) => {
        // i did this incase the selected item is equals to the item else unselecte
        return selected === item ? 'px-4  rounded-lg bg-goalButton m-3' : 'px-4 border-goalButton  border bg-white rounded-lg m-3';
    }

    const handleSubmit = () => {
        router.push({
            pathname: "/(home)/goal/goalAmount",
            params: { goalName: text.toUpperCase(), currentAmount }
        });
    }

    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full justify-between">
                <VStack className=" m-4">
                    <HStack space="lg" className="mt-2 items-center">
                        <Pressable>
                            <ChevronLeft size={24} className=" w-6 h-6" onPress={() => router.back()}/>
                        </Pressable>
                        <Text className="text-2xl font-mali_semibold text-getStarted">Create your Goal</Text>
                    </HStack>

                    <Text
                    className="font-mail text-base  mt-12">
                        What are you saving for?
                    </Text>

                    <Input
                    variant="outline"
                    size="lg"                       
                    className={`rounded-2xl mt-3`}>
                        <InputField 
                        className={`text-base font-mail border-2 rounded-xl ${!text ? 'border-gray-300' : 'border-globColour'}`} 
                        placeholder="Eg, New Toy, Holiday..."
                        value={text}
                        onChangeText={(text)=>{
                            setText(text.trim())
                        }}
                        />
                    </Input>

                    <View className="flex-row flex-wrap mt-6">
                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('toy')}
                        onPress={() => handleSelected('toy')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">Toy</ButtonText>
                        </Button>

                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('bicycle')}
                        onPress={() => handleSelected('bicycle')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">Bicycle</ButtonText>
                        </Button>

                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('shoe')}
                        onPress={() => handleSelected('shoe')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">Shoe</ButtonText>
                        </Button>

                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('storybook')}
                        onPress={() => handleSelected('storybook')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">Story Book</ButtonText>
                        </Button>

                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('orphanage')}
                        onPress={() => handleSelected('orphanage')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">Orphanages</ButtonText>
                        </Button>
                    </View>
                </VStack>

                <VStack className="">
                    <FluffyTutor message={`${user?.name}, what do you want to save for?`} />
                    
                    <View className="mx-4 mt-4">
                        <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour rounded-lg"
                        onPress={handleSubmit}
                        isDisabled={!text}
                        >
                        <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                        </Button>
                    </View>
                </VStack>

            </VStack>
        </SafeAreaView>
    )
}