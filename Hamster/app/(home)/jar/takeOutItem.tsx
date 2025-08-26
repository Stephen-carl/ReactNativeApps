import FluffyTutor from "@/components/fluffyTutor";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useInsertItem } from "@/hooks/jarHook";
import { useUserStore } from "@/store/userStore";
import { showErrorAlert, showSuccessAlert } from "@/utils/alert";
import { router, useLocalSearchParams } from "expo-router";
import { set } from "lodash";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TakeOutItemScreen() {
    const { user} = useUserStore()
    const [theValue, setTheValue] = useState("")
    const insertMutation = useInsertItem()
    const {name, amount, initialAmount} = useLocalSearchParams()
    const [selected, setSelected] = useState<string | null>(null)
    
    // when selected
    const handleSelected = (type : 'snack' | 'cloth' | 'book' | 'gift' | 'musical' | 'game') => {
        setSelected(type)
        // then i can choose what to do with the selected
    }

    const handleStyle = (type: 'snack' | 'cloth' | 'book' | 'gift' | 'musical' | 'game' ) => {
        // if the selected is equals any of the type
        return selected === type ? 'h-16 w-16 border rounded-full border-catergoryBorder p-2' : 'h-16 w-16 border rounded-full border-imageBorder p-2'
    }

    const handleSubmit = () => {
        // be sure nothing is empty
        if (!selected || !amount || !initialAmount) {
            showErrorAlert(`All fields are required`)
        }

        const theResult =(parseFloat(initialAmount as string) - parseFloat(amount as string))
        console.log(theResult);
        // insert into the jar item
        const itemName = theValue.trim()
        const categoryName = selected
        const childId = user?.id
        const childName = user?.name
        const date = new Date().toISOString()
        const currentAmount = theResult.toString()

        insertMutation.mutate(
            {itemName, categoryName, childId, childName, amount, date, initialAmount, currentAmount},
            {
                onSuccess: (data) => {
                    console.log(data);
                    showSuccessAlert('success', 'Money taken successfully')
                    router.push({
                        pathname: '/(home)/jar',
                        params: {
                            text: `${user?.name}, you have taken money to buy ${theValue}, your sum is (₦${amount}).

                                Therefore, you have (₦${initialAmount} - ₦${amount} = ₦${currentAmount}) in your jar...`,
                        },
                    
                    })
                },
                onError: (error) => {
                    console.log(error);
                }
            }
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full">

                <HStack className="mx-4 items-center mt-7">
                    <Pressable onPress={() => router.back()}>
                        <ChevronLeft size={24} className="mt-2 w-7 h-7"/>
                    </Pressable>
                    <Text className="text-2xl font-mali_semibold text-getStarted ml-8">Take Money</Text>

                </HStack>

                <Text
                className="font-mail text-base px-4 mt-16">
                    What is the money for?
                </Text>

                <Input
                variant="outline"
                size="lg"                       
                className={`rounded-2xl mx-4 mt-3`}>
                    <InputField 
                    className={`text-base font-mail border-2 rounded-xl ${!theValue ? 'border-gray-300' : 'border-globColour'}`} 
                    placeholder="Sweet....."
                    value={theValue}
                    onChangeText={(text)=>{
                        setTheValue(text)
                    }}
                    />
                </Input>

                <Text className="text-base font-mali_semibold text-getStarted mx-4 my-6">Category</Text>

                <HStack className="mx-4">
                    <VStack className="items-center">
                        <Pressable onPress={() => handleSelected('snack')}>
                            <Image
                            source={require('@/assets/images/category/candy.png')}
                            className={handleStyle('snack')}
                            alt="snack"
                            resizeMode="cover"
                            />
                        </Pressable>
                        <Text 
                        className="mt-2 text-xs text-getStarted font-mail">
                            Snacks
                        </Text>
                    </VStack>

                    <VStack className="items-center mx-11">
                        <Pressable onPress={() => handleSelected('cloth')}>
                            <Image
                            source={require('@/assets/images/category/clothes.png')}
                            className={handleStyle('cloth')}
                            alt="cloth"
                            resizeMode="cover"
                            />
                        </Pressable>
                        <Text 
                        className="mt-2 text-xs text-getStarted font-mail">
                            Cloths
                        </Text>
                    </VStack>

                    <VStack className="items-center">
                        <Pressable onPress={() => handleSelected('book')}>
                            <Image
                            source={require('@/assets/images/category/children.png')}
                            className={handleStyle('book')}
                            alt="book"
                            resizeMode="cover"
                            />
                        </Pressable>
                        <Text 
                        className="mt-2 text-xs text-getStarted font-mail">
                            Books
                        </Text>
                    </VStack>
                </HStack>

                <HStack className="mt-6 mx-4">
                    <VStack className="items-center">
                        <Pressable onPress={() => handleSelected('gift')}>
                            <Image
                            source={require('@/assets/images/category/gift_box.png')}
                            className={handleStyle('gift')}
                            alt="gift"
                            resizeMode="cover"
                            />
                        </Pressable>
                        <Text 
                        className="mt-2 text-xs text-getStarted font-mail">
                            Gifts
                        </Text>
                    </VStack>

                    <VStack className="items-center mx-11">
                        <Pressable onPress={() => handleSelected('musical')}>
                            <Image
                            source={require('@/assets/images/category/xylophone.png')}
                            className={handleStyle('musical')}
                            alt="muscial"
                            resizeMode="cover"
                            />
                        </Pressable>
                        <Text 
                        className="mt-2 text-xs text-getStarted font-mail">
                            Musical
                        </Text>
                    </VStack>

                    <VStack className="items-center">
                        <Pressable onPress={() => handleSelected('game')} className="">
                            <Image
                            source={require('@/assets/images/category/puzzle.png')}
                            className={handleStyle('game')}
                            alt="game"
                            resizeMode="cover"
                            />
                        </Pressable>
                        <Text 
                        className="mt-2 text-xs text-getStarted font-mail">
                            Games
                        </Text>
                    </VStack>
                </HStack>
                
                <VStack className="mt-4 flex-1 justify-between">

                    <FluffyTutor message={`${user?.name}, how much do you want to take out from your jar?`} />

                    <View className="mx-4">
                        <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour rounded-lg"
                        onPress={handleSubmit}
                        isDisabled={!theValue || !selected}
                        >
                        <ButtonText className="text-white font-mail text-lg">Take Money</ButtonText>
                        </Button>
                    </View>
                </VStack>
                
            </VStack>
        </SafeAreaView>
    )
}