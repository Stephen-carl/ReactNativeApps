import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useInsertGuardian } from "@/hooks/guardianHook";
import { showErrorAlert, showSuccessAlert } from "@/utils/alert";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NameScreen() {
    const insetGuardMut = useInsertGuardian()
    const [theValue, setTheValue] = useState('')
    const {role} = useLocalSearchParams()

    // then call hook to save the name and role to db
    const handleSubmit = () => {
        if (!role || !theValue) {
            console.log('Inputs are required');
        }
        console.log(role, theValue);
        insetGuardMut.mutate(
            {name: theValue, role: role},
            {
                onSuccess : (data) =>{
                    // i think it result the insertedId of the parent
                    console.log(data);
                    showSuccessAlert('success', `${data}`)
                    router.push({
                        pathname:'/(walkthrough)/theChildName',
                        params: {guardianId: data}
                    })
                },
                onError : (err) => {
                    console.log(err);
                    showErrorAlert(`Error: ${err}`)
                }
            }
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 p-4 max-w-full min-h-full">
                <Pressable onPress={() => router.back()}>
                    <ChevronLeft size={24} className="mt-2 w-7 h-7"/>
                </Pressable>

                <VStack className="mt-6 flex-1 justify-between">
                    <View>
                        <Text className="font-mali_semibold text-2xl ">Guardian name</Text>
                        <Input
                        variant="outline"
                        size="lg"                        
                        className={`rounded-2xl mt-10`}>
                            <InputField 
                            className={`text-base font-mail border-2 rounded-2xl ${!theValue ? 'border-gray-300' : 'border-globColour'}`} 
                            placeholder="First name"
                            value={theValue.trim()}
                            onChangeText={(text)=>setTheValue(text.trim())}
                            />
                        </Input>

                    </View>
                    

                    <View className="mb-6">
                        <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour rounded-lg"
                        onPress={handleSubmit}
                        isDisabled={!theValue}
                        >
                        <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                        </Button>
                    </View>
                </VStack>
            </VStack>
        </SafeAreaView>
    )
}