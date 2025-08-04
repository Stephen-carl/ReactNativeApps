import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router, useLocalSearchParams } from "expo-router";
import { AlertCircle, ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChildAgeScreen () {
    const [theValue, setTheValue] = useState("")
    const [ clientError, setClientError ] = useState("")
    const { name, guardianId } = useLocalSearchParams()

    const isAgeValid = (age:string) => {
        return /^\d+$/.test(age)
    }

    const handleInputChange = (value:any) => {
        setTheValue(value)
        if (!isAgeValid(value)) {
            setClientError("Please enter a valid age")
        } else{
            setClientError("")
        }
    }
    const isDisabled = !isAgeValid(theValue)

    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 p-4 max-w-full min-h-full">
                <HStack className=" items-center mt-2">
                    <Pressable onPress={() => router.back()}>
                        <ChevronLeft size={24} className=" w-7 h-7"/>
                    </Pressable>
                    <HStack className="items-center justify-center flex-1 px-5">
                        <Image
                        source={require('@/assets/images/progressBar2.png')}
                        className="h-3 w-full "
                        alt="fluffy"
                        resizeMode="cover"
                        />
                    </HStack>
                </HStack>
                
                <VStack className="items-center">
                    <Image
                    source={require('@/assets/images/happyHamster.png')}
                    className="mt-9"
                    style={{height:110, width:110}}
                    alt="fluffy"
                    resizeMode="contain"
                    />

                    <Text className="font-mali_semibold text-lg text-center mt-10">How old is {name}?</Text>
                </VStack>

                <VStack className="mt-6 flex-1 justify-between">
                    <View>
                        <Input
                        variant="outline"
                        size="lg"                       
                        className={`rounded-2xl`}>
                            <InputField 
                            className={`text-base font-mail border-2 rounded-2xl ${!theValue ? 'border-gray-300' : clientError ? 'border-red-500' : 'border-globColour'}`} 
                            placeholder="Age"
                            value={theValue}
                            keyboardType="numeric"
                            onChangeText={(text)=>{
                                handleInputChange(text)
                            }}
                            />
                        </Input>                  

                        {!!clientError && (
                            <Text className="text-red-500 mt-2 ml-1 text-sm">{clientError}</Text>
                        )}
                    </View>
                    

                    <View className="mb-6">
                        <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour rounded-lg"
                        onPress={() => router.push({
                            pathname: '/(walkthrough)/character',
                            params: {
                                age: theValue,
                                name: name,
                                guardianId: guardianId
                            }
                        })}
                        isDisabled={isDisabled}
                        >
                        <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                        </Button>
                    </View>
                </VStack>

            </VStack>
        </SafeAreaView>
    )
}