import { Stack } from "expo-router";

export default function HistoryRootLayout() {
    return(
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    )
}