import { Stack } from "expo-router";

export default function NeedRootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    )
}