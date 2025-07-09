import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearNoteStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("Note storage cleared.");
  } catch (e) {
    console.error("Failed to clear storage:", e);
  }
};
