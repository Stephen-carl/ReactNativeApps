import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
                <VStack className=" flex-1 p-4 max-w-full min-h-full">
                    <VStack className=" items-center">
                        <Image
                        source={require('@/assets/images/hamLogo.png')}
                        className="mt-1 h-8 w-26"
                        alt="Hamstash logo"
                        resizeMode="contain"
                        />

                        <Image
                        source={require('@/assets/images/cuteboy.png')}
                        className=" mt-10 h-72 w-72"
                        alt="cuteboy"
                        resizeMode="cover"
                        />
                    </VStack>
                    
                    <VStack className="flex-1 justify-between mt-11">
                        <View className="items-center">
                            <Text className=" font-mali_bold text-2xl text-black">Empower Your Child to Save Smartly!</Text>
                            <Text className="font-mail text-base text-welcomeText">Teach your child to set goals, save money, and build smart habits—all in a fun way!</Text>
                        </View>
                        
                        <View className="mb-6 mt-11">
                                <Button 
                                style={{ width: '100%'}} 
                                size='xl' 
                                className="bg-globColour rounded-lg"
                                onPress={() => router.navigate('/(walkthrough)/getStarted')}
                                >
                                <ButtonText className="text-lg text-white font-mail">Try HamStash now</ButtonText>
                                </Button>

                                <Button 
                                    variant="outline" 
                                    style={{ width: '100%'}} 
                                    size='xl' 
                                    className="border-globColour mt-5 rounded-lg">
                                    <ButtonText className="text-lg text-globColour font-mail">I already have an account</ButtonText>
                                </Button>
                        </View>
                        
                    </VStack>
                </VStack>
        </SafeAreaView>
    )
}