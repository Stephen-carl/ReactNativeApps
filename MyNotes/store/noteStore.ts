import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface Note {
    dateID: string,
    title: string,
    text : string
}

// actions
interface NoteStore{
    notes : Note[],
    addNote: (title : string, text : string) => void
    deleteNote: (dateID :string) => void
    updateNote: (dateID: string, title: string, text: string) => void
    // search should return note instead of void, makes more sense
    searchNote: (query:string) => Note[]
}

export const NoteStore = create<NoteStore>()(
    persist((set, get) => ({
        // empty note
        notes: [],

        addNote: (title, text) =>{
            if (!title.trim() || !text.trim) return
            // new note is like an object the Note
            const newNote: Note = {
                dateID: new Date().toISOString(),
                title,
                text
            }
            // so if there is a note, i should append the note to existing notes
            const update = [...get().notes, newNote]
            set({notes: update})
        },

        // important for updating
        updateNote: (dateID, title, text) => {
        const updatedNotes = get().notes.map(note =>
            note.dateID === dateID ? { ...note, title, text } : note
        );
        set({ notes: updatedNotes });
        },

        deleteNote: (dateID) => {
            // from list find the notes that doesn't have the id to be deleted and set to be the notes
            const filtered = get().notes.filter((note) => note.dateID !== dateID)
            set({notes: filtered})
        },

        searchNote: (query) =>{
            const filtered = get().notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase()))
            // as i suggested, it should return the filtered note
            return filtered
        },
    }),
    {
        name: "note-storage",
        storage: createJSONStorage(() => AsyncStorage)
    }
)
)
