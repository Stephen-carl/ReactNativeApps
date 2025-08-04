import { Minus, Plus } from "lucide-react-native";
import { Card } from "./ui/card";
import { HStack } from "./ui/hstack";
import { Image } from "./ui/image";
import { Pressable } from "./ui/pressable";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

export default function TransCom({ trans }: { trans: any }) {

     const itemImages : string | any = {
        'snack': require('@/assets/images/category/candy.png'),
        'cloth': require('@/assets/images/category/clothes.png'),
        'book': require('@/assets/images/category/children.png'),
        'gift': require('@/assets/images/category/gift_box.png'),
        'musical': require('@/assets/images/category/xylophone.png'),
        'game': require('@/assets/images/category/puzzle.png'),
        'pocket': require('@/assets/images/category/allowance.png')
    }
    
    return (
        <Pressable className="mt-2">
            <Card className="border rounded-xl">
                <HStack className="justify-between items-center px-2 ">
                    <HStack space="lg" className="items-center">
                        <Image
                        source={itemImages[trans.itemProfile]}
                        className="h-6 w-6"
                        alt={`A ${trans.itemProfile}`}
                        resizeMode="cover"
                        />
                        <Text>{trans.itemProfile}</Text>
                    </HStack>
                    <VStack space="sm" className="items-center">
                        <HStack className="items-center ">
                            {trans.reason === 'add'? 
                            <Plus stroke={'#00C94F'} size={12}/> : 
                            <Minus stroke={'#FF656B'} size={12}/>}
                            <Text className="font-mail text-base text-getStarted">₦{trans.amount}</Text>
                        </HStack>
                        <Text className="font-mail text-sm text-getStarted">{trans.date}</Text>
                    </VStack>
                </HStack>
            </Card>
        </Pressable>
    )
}