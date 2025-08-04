import { View } from "react-native"
import { HStack } from "./ui/hstack"
import { Image } from "./ui/image"
import { Text } from "./ui/text"
import { useEffect, useState } from "react";

// this serves as the story teller, and it shoud take in the text that should be displayed
export default function FluffyTutor({message}:any) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setVisible(false);
        }, 5000); // 5 seconds

        return () => clearTimeout(timer);
    }, []);

    // if (!visible) return null;

    // if (!message) {message='Hi there'}
    return(
        <View style={{ height: visible ? undefined : 96 }}>
      {visible && (
        <HStack className="items-center">
          <Image
            source={require("@/assets/images/tutor/fluffyInstructor.png")}
            className="h-24 w-24"
            alt="profile1"
            resizeMode="cover"
          />
          <Image
            source={require("@/assets/images/tutor/fluffyPlay.png")}
            className="h-6 w-6 -mr-1 -ml-7"
            alt="profile1"
            resizeMode="cover"
          />
          <Text className="border border-tutorBorder text-sm font-mail p-2 max-w-56 rounded-xl">
            {message || "Hi Stephen"}
          </Text>
        </HStack>
      )}
    </View>
    )
}