import { Link } from "expo-router";
import { Card } from "./ui/card";
import { HStack } from "./ui/hstack";
import { Pressable } from "./ui/pressable";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

export default function NoteList({notes}:any) {
    return(
        <Link href={{
            pathname: '/(note)/note', 
            params: {title: notes.title,
                    text: notes.text,
                    dateID: notes.dateID,
                }}} 
            asChild>
            <Pressable className="flex-1">
                <Card variant="elevated" className="p-2 flex-1 bg-white border border-gray-300 rounded-lg mt-3">
                    <VStack className="w-full">
                        <VStack className="items-start">
                            <Text className="text-userCOlour text-base font-bricolage_bold">{notes.title}</Text>
                            <Text className="text-gray-400 text-xs font-bricolage mt-2">{notes.dateID}</Text>
                        </VStack>
                    </VStack>
                </Card>
            </Pressable>
        </Link>
    )
}