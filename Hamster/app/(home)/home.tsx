import FluffyTutor from "@/components/fluffyTutor";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useUserStore } from "@/store/userStore";
import { router, useLocalSearchParams } from "expo-router";
import { Bell, Icon, View } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
    const {user} = useUserStore()

    // map the profiles to their respective images
    const profileImages : string | any = {
        'profile1': require('@/assets/images/profile1.png'),
        'profile2': require('@/assets/images/profile2.png'),
        'profile3': require('@/assets/images/profile3.png'),
        'profile4': require('@/assets/images/profile4.png'),
        'profile5': require('@/assets/images/profile5.png'),
        'profile6': require('@/assets/images/profile6.png'),
        'profile7': require('@/assets/images/profile7.png')
    }
    // incase there is error in saving selected profile
    const incase = profileImages['profile1']
    const selectedImage = profileImages[user?.profile.toString()] || incase
    
    return(
        <SafeAreaView className="bg-white flex-1">
            <VStack className="flex-1 max-w-full min-h-full">
                <HStack className="m-4 items-center justify-between">
                    <HStack space="sm" className="items-center">
                        <Avatar size="md" className="bg-profileColour p-2 ">
                            <AvatarImage
                            source={selectedImage}
                            />
                        </Avatar>
                        <Text className="text-lg font-mali_semibold ">Welcome</Text>
                        <Text className="text-lg font-mali_semibold text-globColour">{user?.name}</Text>
                        <Text className="text-lg font-mali_semibold">!!!</Text>
                    </HStack>
                    
                    <Pressable>
                        <Bell fill={'#8D4706'} className="h-6 w-6"/>
                    </Pressable>
                    
                </HStack>

                <VStack className="mx-4 p-4 border border-jarHeadBorder rounded-xl items-center ">
                    <HStack className="items-center justify-between w-full px-6">
                        <Text className="text-base font-mail text-jarWrite text-wrap">
                            Want that special toy{'\n'}or game? Set a goal{'\n'}and let’s start saving{'\n'}together
                        </Text>
                        <Image
                            source={require('@/assets/images/jarContainer.png')}
                            className="h-20 w-16 ml-6"
                            alt="profile1"
                            resizeMode="cover"
                            />
                    </HStack>

                    <Button onPress={() => router.push('/(home)/goal')}
                        className="bg-goalButton rounded-lg mt-6">
                        <ButtonText className="text-black text-base font-mali">Set a Goal</ButtonText>
                    </Button>
                </VStack>

                <VStack className="mt-9">
                    <FluffyTutor message={`Welcome ${user?.name}`}/>
                </VStack>
                
                    {/* <Image
                    source={selectedImage}
                    className='h-14 w-14 rounded-full bg-globColour '
                    alt={profile}
                    resizeMode="contain"
                    /> */}
            </VStack>
        </SafeAreaView>
    )
}