import FluffyTutor from "@/components/fluffyTutor"
import { Button, ButtonText } from "@/components/ui/button"
import { HStack } from "@/components/ui/hstack"
import { Input, InputField } from "@/components/ui/input"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { useUserStore } from "@/store/userStore"
import { router, useLocalSearchParams } from "expo-router"
import { ChevronLeft } from "lucide-react-native"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

export default function AddMoney() {
    // const [takeOut, setTakeOut] = useState(0)
    const {user} = useUserStore()
    // const jarMutation = useGetChildData()
    const [theValue, setTheValue] = useState("")
    const [ clientError, setClientError ] = useState("")
    // const [theData, setTheData ] = useState(null)
    const { initialAmount } = useLocalSearchParams()
    
    const isAmountValid = (amount:string) => {
        return /^\d+(\.\d+)?$/.test(amount)
    }

    const handleInputChange = (value:any) => {
        setTheValue(value)
        if (!isAmountValid(value)) {
            setClientError("Please enter a valid amount")
        } else{
            setClientError("")
        }
    }
    const isDisabled = !isAmountValid(theValue)

    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full">
                
                <HStack className="mx-4 items-center mt-4">
                    <Pressable onPress={() => router.back()}>
                        <ChevronLeft size={24} className="mt-2 w-7 h-7"/>
                    </Pressable>
                    <Text className="text-2xl font-mali_semibold text-getStarted ml-8">Add Money</Text>
                </HStack>

                <Text
                className="font-mail text-base px-4 mt-16">
                    How much are you putting in?
                </Text>

                <Input
                variant="outline"
                size="lg"                       
                className={`rounded-2xl mx-4 mt-3`}>
                    <InputField 
                    className={`text-base font-mail border-2 rounded-xl ${!theValue ? 'border-gray-300' : 'border-globColour'}`} 
                    placeholder="5"
                    value={theValue.trim()}
                    keyboardType="decimal-pad"
                    onChangeText={(text)=>{
                        handleInputChange(text.trim())
                    }}
                    />
                </Input>
                {!!clientError && (
                    <Text className="text-red-500 mt-2 ml-1 text-sm">{clientError}</Text>
                )}

                <VStack className="mt-20 flex-1 justify-between">

                    <FluffyTutor message={`${user?.name}, how much do you want to put into your jar?`} />

                    <VStack className=" mx-4">
                        <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour rounded-lg"
                        onPress={() => {
                            console.log(initialAmount);
                            router.push({
                            pathname: '/(home)/jar/addMoneyCategory',
                            params: {
                                amount: theValue,
                                initialAmount: initialAmount
                            },
                            
                            })}
                        }
                        isDisabled={isDisabled}
                        >
                        <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                        </Button>
                    </VStack>
                </VStack>
            </VStack>            
        </SafeAreaView>
    )
}