import FluffyTutor from "@/components/fluffyTutor";
import TransCom from "@/components/transCom";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGetJar, useGetTrans } from "@/hooks/jarHook";
import { useGetChildData } from "@/hooks/userHook";
import { theJar, theTransaction } from "@/interface/jar";
import { useUserStore } from "@/store/userStore";
import { showSuccessAlert } from "@/utils/alert";
import { router, useLocalSearchParams } from "expo-router";
import { Eye, EyeOff, ListFilter, Minus, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JarScreen() {
    const {user} = useUserStore()
    const jarMutation = useGetJar()
    const transMutation = useGetTrans()
    const [theData, setTheData ] = useState<theJar | null>(null)
    const {text, remainder} = useLocalSearchParams()
    const [theOn, setOn] = useState(false)
    const [trans, setTrans] = useState<theTransaction | null>(null)

    const thetrans = () => {
        transMutation.mutate(
            user?.id,
            {
                onSuccess: (data) => {
                    console.log(data);
                    if (!data) {
                        console.log('no data');
                    }
                    setTrans(data)
                },
                onError: (error) => {
                    console.log(error);
                }
            }
        )
    }

    useEffect(() => {
        console.log(user?.id);
        
            jarMutation.mutate(
                user?.id,
                {
                    onSuccess: (data) => {
                        console.log(data);
                        setTheData(data)
                    },
                    onError: (error) => {
                        console.log(error);
                    }
                }
            )
            // the transaction
            transMutation.mutate(
            user?.id,
            {
                onSuccess: (data) => {
                    console.log(data);
                    if (!data) {
                        console.log('no data');
                    }
                    setTrans(data)
                },
                onError: (error) => {
                    console.log(error);
                }
            }
        )
        },[user?.id]
    )

    return (
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full">
                <Text className="text-2xl font-mali_semibold text-getStarted mt-2 p-4">My Jar</Text>

                <VStack className="p-4">
                    <Card>
                        <VStack className="items-center bg-globColour">
                            <Text
                            className="text-lg text-white font-mail">
                                HamStash Jar</Text>
                            <HStack className="items-center">
                                {!theOn 
                                ? (<Text className="text-2xl text-black font-mail">
                                    ₦ ****.**
                                </Text>)
                                :(<Text className="text-2xl text-black font-mail">
                                    ₦{theData?.currentAmount?.toFixed(2)}
                                </Text>)}
                                <Pressable onPress={() => setOn(!theOn)} className="ml-2">
                                    {theOn ? (<Icon as={EyeOff} className="stroke-black h-5 w-5"/>) :(<Icon as={Eye} className="stroke-black h-5 w-5"/>)}
                                </Pressable>
                            </HStack>
                        </VStack>
                    </Card>

                    <HStack className="justify-evenly mt-6">
                        <Button 
                        size="lg" 
                        variant="outline" 
                        className="p-3.5 border-jarAdd rounded-full "
                        onPress={() => router.push({pathname:'/(home)/jar/addMoney',
                            params: {
                                initialAmount: theData?.currentAmount?.toFixed(2)
                            }
                        })}>
                            <ButtonIcon as={Plus} className="stroke-black"/>
                        </Button>
                        
                        <Button 
                        size="lg" 
                        variant="outline" 
                        className="p-3.5 border-jarMinus rounded-full"
                        onPress={() => router.push({pathname:'/(home)/jar/takeMoney',
                            params: {
                                initialAmount: theData?.currentAmount?.toFixed(2)
                            }
                        })}>
                            <ButtonIcon as={Minus} className="stroke-black"/>
                        </Button>
                    </HStack>
                </VStack>

                <HStack className="justify-between items-center mt-14 p-4">
                    <Text className="text-lg font-mali_semibold text-getStarted">
                        Transactions
                    </Text>
                    <Icon as={ListFilter} stroke="black"/>
                </HStack>
                {/* <Text className="text-red-500">{JSON.stringify(trans)}</Text> */}

                <FlatList
                data={trans || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <TransCom trans={item}/>}
                className="mx-4 mt-4"
                ListEmptyComponent={<Text className="text-center mt-4">No transactions</Text>}
                />

                
                
                {text ? 
                    <VStack className="mx-4 mt-4">
                        <FluffyTutor message={text}/>
                    </VStack> : 
                    null}
            </VStack>
        </SafeAreaView>
    )
}