import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { getDate, useInsertChild } from "@/hooks/userHook";
import { useUserStore } from "@/store/userStore";
import { showErrorAlert } from "@/utils/alert";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CharacterScreen() {
    const { age, name, guardianId} = useLocalSearchParams()
    const insertUserMut = useInsertChild()
    const { setUser, setIsLoggedIn } = useUserStore()
    const [selected, setSelected] = useState<string | null>(null)

    // when selected
    const handleSelected = (type : 'profile1' | 'profile2' | 'profile3' | 'profile4' | 'profile5' | 'profile6' | 'profile7') => {
        setSelected(type)
        // then i can choose what to do with the selected
    }

    const handleStyle = (type: 'profile1' | 'profile2' | 'profile3' | 'profile4' | 'profile5' | 'profile6' | 'profile7' ) => {
        // if the selected is equals any of the type
        return selected === type ? 'h-20 w-20 border rounded-full border-globColour' : 'h-20 w-20 border rounded-full border-imageBorder'
    }

    const handleSubmit = () => {
        // be sure nothing is empty
        if (!selected || !age || !name || !guardianId) {
            showErrorAlert(`All fields are required`)
        }
        // const theDate = getDate()
        console.log(selected, age, name, guardianId);
        insertUserMut.mutate({
            name : name.toString().trim(), 
            age:age.toString().trim(), 
            profileCharacter:selected, 
            dateCreated: getDate(),
            guardianId:guardianId
            },
            {
                onSuccess: (data) => {
                    console.log(data);
                    // here, i have to set the isLoggedIn
                    setIsLoggedIn(true)
                    setUser({id: data, name: name.toString().trim(), age: age.toString().trim(), profile: selected, guardianId:guardianId})
                    
                    // here, i have to set the isLoggedIn
                    router.push('/(home)/home')
                },
                onError: (err) => {
                    console.log(err);
                }
            }
        )
    }
    return (
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 p-4 max-w-full min-h-full">
                <HStack className=" items-center mt-2">
                    <Pressable onPress={() => router.back()}>
                        <ChevronLeft size={24} className=" w-7 h-7"/>
                    </Pressable>
                    <HStack className="items-center justify-center flex-1 px-5">
                        <Image
                        source={require('@/assets/images/progressBar3.png')}
                        className="h-3 w-full "
                        alt="fluffy"
                        resizeMode="cover"
                        />
                    </HStack>
                </HStack>

                <VStack className="mt-8 flex-1 justify-between">
                    <View>
                        <VStack space="2xl">
                            <Text className="font-mali_semibold text-2xl">Choose a Character for {name}</Text>

                            <HStack className="justify-between mt-12">
                                <Pressable onPress={() => handleSelected('profile1')}>
                                    <Image
                                    source={require('@/assets/images/profile1.png')}
                                    className={handleStyle('profile1')}
                                    alt="profile1"
                                    resizeMode="cover"
                                    />
                                </Pressable>

                                <Pressable onPress={() => handleSelected('profile2')}>
                                    <Image
                                    source={require('@/assets/images/profile2.png')}
                                    className={handleStyle('profile2')}
                                    alt="profile3"
                                    resizeMode="cover"
                                    />
                                </Pressable>

                                <Pressable onPress={() => handleSelected('profile3')}>
                                    <Image
                                    source={require('@/assets/images/profile3.png')}
                                    className={handleStyle('profile3')}
                                    alt="profile3"
                                    resizeMode="cover"
                                    />
                                </Pressable>
                                
                            </HStack>

                            <HStack className="justify-between mt-7">
                                <Pressable onPress={() => handleSelected('profile4')}>
                                    <Image
                                    source={require('@/assets/images/profile4.png')}
                                    className={handleStyle('profile4')}
                                    alt="profile4"
                                    resizeMode="cover"
                                    />
                                </Pressable>

                                <Pressable onPress={() => handleSelected('profile5')}>
                                    <Image
                                    source={require('@/assets/images/profile5.png')}
                                    className={handleStyle('profile5')}
                                    alt="profile5"
                                    resizeMode="cover"
                                    />
                                </Pressable>

                                <Pressable onPress={() => handleSelected('profile6')}>
                                    <Image
                                    source={require('@/assets/images/profile6.png')}
                                    className={handleStyle('profile6')}
                                    alt="profile6"
                                    resizeMode="cover"
                                    />
                                </Pressable>
                                
                            </HStack>

                            <HStack className="justify-between mt-7">
                                <Pressable onPress={() => handleSelected('profile7')}>
                                    <Image
                                    source={require('@/assets/images/profile7.png')}
                                    className={handleStyle('profile7')}
                                    alt="profile7"
                                    resizeMode="cover"
                                    />
                                </Pressable>                            
                            </HStack>
                        </VStack>
                                        
                    </View>

                    <View className="mb-6">
                        <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour rounded-lg"
                        onPress={handleSubmit}
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