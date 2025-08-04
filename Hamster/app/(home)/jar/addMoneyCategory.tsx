import FluffyTutor from "@/components/fluffyTutor"
import { Button, ButtonText } from "@/components/ui/button"
import { HStack } from "@/components/ui/hstack"
import { Image } from "@/components/ui/image"
import { Input, InputField } from "@/components/ui/input"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { useAddToJar } from "@/hooks/jarHook"
import { useUserStore } from "@/store/userStore"
import { showErrorAlert, showSuccessAlert } from "@/utils/alert"
import { router, useLocalSearchParams } from "expo-router"
import { ChevronLeft } from "lucide-react-native"
import { useState } from "react"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function AddMoneyCategory() {
    const { user} = useUserStore()
    const [theValue, setTheValue] = useState("")
    const insertMutation = useAddToJar()
    const { amount, initialAmount} = useLocalSearchParams()
    const [selected, setSelected] = useState<string | null>(null)
    
    // when selected
    const handleSelected = (type :  'cloth' | 'gift' | 'pocket') => {
        setSelected(type)
        // then i can choose what to do with the selected
    }

    const handleStyle = (type: 'cloth' | 'gift' | 'pocket' ) => {
        // if the selected is equals any of the type
        return selected === type ? 'h-16 w-16 border rounded-full border-catergoryBorder p-2' : 'h-16 w-16 border rounded-full border-imageBorder p-2'
    }

    const handleSubmit = () => {
        // be sure nothing is empty
        if (!selected || !amount || !initialAmount) {
            showErrorAlert(`All fields are required`)
        }

        // childId, amount, reason, takeOutId, date, itemProfile
        insertMutation.mutate(
            {childId: user?.id, amount:amount, reason : 'add', takeOutId: null, date : new Date().toISOString(), itemProfile :selected},
            {
                onSuccess: (data) => {
                    console.log(data);
                    showSuccessAlert('success', 'Item inserted successfully')
                    router.push('/(home)/jar')
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
                    <Text className="text-2xl font-mali_semibold text-getStarted ml-8">Add Money</Text>

                </HStack>

                <Text
                className="font-mail text-base px-4 mt-16">
                    Where is the money from?
                </Text>

                <Input
                variant="outline"
                size="lg"                       
                className={`rounded-2xl mx-4 mt-3`}>
                    <InputField 
                    className={`text-base font-mail border-2 rounded-xl ${!theValue ? 'border-gray-300' : 'border-globColour'}`} 
                    placeholder="Gift....."
                    value={theValue.trim()}
                    onChangeText={(text)=>{
                        setTheValue(text.trim())
                    }}
                    />
                </Input>

                <Text className="text-base font-mali_semibold text-getStarted mx-4 my-6">Category</Text>

                <HStack className="mx-4">
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
                        className="mt-2 text-sm text-getStarted font-mail">
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
                        className="mt-2 text-sm text-getStarted font-mail">
                            Cloths
                        </Text>
                    </VStack>

                    <VStack className="items-center">
                        <Pressable onPress={() => handleSelected('pocket')}>
                            <Image
                            source={require('@/assets/images/category/allowance.png')}
                            className={handleStyle('pocket')}
                            alt="pocket"
                            resizeMode="cover"
                            />
                        </Pressable>
                        <Text 
                        className="mt-2 text-sm text-getStarted font-mail">
                            Pocket {'\n'}Money
                        </Text>
                    </VStack>
                </HStack>

                <VStack className="mt-8 flex-1 justify-between">

                    <FluffyTutor message={`${user?.name}, how much do you want to take out from your jar?`} />

                    <View className="mx-4">
                        <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour rounded-lg"
                        onPress={handleSubmit}
                        isDisabled={!theValue || !selected}
                        >
                        <ButtonText className="text-white font-mail text-lg">Add Money</ButtonText>
                        </Button>
                    </View>
                </VStack>
            </VStack>
        </SafeAreaView>
    )
}