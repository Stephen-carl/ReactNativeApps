import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckIcon, CornerUpLeft, MoveLeft, Trash2 } from "lucide-react-native";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { NoteStore } from "@/store/noteStore";

export default function AddNote() {
    const {title, text, dateID} = useLocalSearchParams()
    const [mtext, setText] = useState(text || '')
    const [mtitle, setTitle] = useState(title || '')  
    const { addNote, deleteNote, notes, updateNote } = NoteStore()
    const [disable, setDisable] = useState(false)
    // console.log(note);

    const handleDelete = () => {
        deleteNote(dateID as string)
        router.back()
    }

    const handleSave = () => {
        if (dateID) {
        updateNote(dateID as string, mtitle as string, mtext as string);
        setDisable(true)
        } else {
        addNote(mtitle as string, mtext as string);
        setDisable(true)
        }
    }
    

    return(
        <SafeAreaView className="flex-1">
            <View className="flex-1 w-full max-h-full bg-white">
                <VStack className="m-4 flex-1">
                    <HStack className="justify-between">
                        
                        <Pressable onPress={()=> {
                            if (dateID) {
                                handleSave();
                            }
                            router.back()
                            }} >
                            <Icon as={CornerUpLeft} size="lg" className="text-black w-7 h-7" />
                            </Pressable>
                        {/* <Pressable onPress={()=> router.back()} >
                            <Icon as={CornerUpLeft} size="lg" className="text-black w-7 h-7" />
                        </Pressable> */}
                        
                        <HStack space="md" className="justify-evenly items-center ">
                            <Pressable onPress={handleDelete} >
                                <Icon as={Trash2} size="lg" className="text-black w-7 h-7" />
                            </Pressable>
                            
                            {!disable && (
                            <Pressable disabled={disable} onPress={handleSave}>
                                <Icon as={CheckIcon} size="lg" className="text-black w-7 h-7" />
                            </Pressable>
                            )}
                        </HStack>
                    </HStack>

                    <VStack className="flex-1">
                        <Input style={{ width: '100%'}} variant="underlined" isRequired={true} size='xl'className="min-w-[250px] max-w-full mt-2">
                            <InputField  className="text-lg font-bricolage_bold text-receiptItemColour" type="text" value={mtitle.toString()} 
                            onChangeText={(text)=>{
                                setTitle(text)
                                setDisable(false);
                            }} 
                            placeholder="Title"/>
                        </Input>

                        <Textarea className="mt-3  w-full flex-1">
                            <TextareaInput placeholder="Once upon a time..." value={mtext.toString()} onChangeText={(text)=>{
                                setText(text);
                                setDisable(false);
                            }} 
                            multiline
                            textAlignVertical="top"
                            className="flex-1 text-sm"/>
                        </Textarea>
                    </VStack>

                </VStack>

            </View>
        </SafeAreaView>
    )
}