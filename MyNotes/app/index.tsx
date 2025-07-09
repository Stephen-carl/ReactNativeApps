import NoteList from "@/components/noteList";
import { Fab, FabIcon } from "@/components/ui/fab";
import { HStack } from "@/components/ui/hstack";
import { AddIcon, SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { NoteStore } from "@/store/noteStore";
import { clearNoteStorage } from "@/utils/clearStorage";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
    const [ query, setQuery ] = useState('')
    // get the notes from the saved notes 
    // display just the title and date
    // then move to the next page
    // display a search bar too
    const { notes, searchNote } = NoteStore()
    //clearNoteStorage()
    const filteredNotes = useMemo(() => {
    if (!query.trim()) return notes;
    return searchNote(query);
  }, [query, notes]);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 w-full max-h-full">
                <VStack className="m-4 flex-1">
                    <Input variant="rounded" size="md" className="bg-input2Colour mt-6">
                        <InputSlot className="pl-3">
                        <InputIcon as={SearchIcon} />
                        </InputSlot>
                        <InputField
                        placeholder="Search title"
                        value={query}
                        onChangeText={(text:string) => {
                            setQuery(text); 
                        }}
                        />
                    </Input>

                     <FlatList
                        data={filteredNotes.filter((note) => note && note.title)} // Filter out undefined or malformed notes
                        keyExtractor={(item, index) => `${item.dateID}-${index}`}
                        renderItem={({ item }) => <NoteList notes={item} />}
                        style={{ flexGrow: 1, marginTop: 12 }}
                        className="h-full"
                    />

                    <Fab
                    size="lg"
                    placement="bottom right"
                    onPress={()=> router.push('/(note)/note')}
                    className="bg-globColour">
                        <FabIcon as={AddIcon} color="white" size="md"/>
                    </Fab>
                </VStack>
            </View>
        </SafeAreaView>
    )
}