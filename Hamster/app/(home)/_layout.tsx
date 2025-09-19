import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Tabs } from "expo-router"
import { Image } from "react-native"

const queryClient = new QueryClient
export default function HomeRootLayout() {
    return(
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider>
                <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarActiveTintColor: "#F69439",
                    tabBarInactiveTintColor: "#ADAC9F",
                    tabBarLabelStyle:{fontSize:12},
                    tabBarStyle:{elevation:20, padding:15, backgroundColor:"#fff" },
                    tabBarItemStyle:{
                        backgroundColor: "#ffffff00"
                    }
                }}
                >
                    <Tabs.Screen
                        name="home"
                        options={{
                            title: "Home",
                            tabBarIcon: ({focused}) => <Image
                            source={require("@/assets/images/homeIcon.png")}
                            style={{tintColor: focused ? "#F69439" : "#ADAC9F"}}
                            />
                        }}
                    />
                    <Tabs.Screen
                        name="jar"
                        options={{
                            title: "Jar",
                            tabBarIcon: ({focused}) => <Image
                            source={require("@/assets/images/jarIcon.png")}
                            style={{tintColor: focused ? "#F69439" : "#ADAC9F"}}
                            />
                        }}
                    />
                    <Tabs.Screen
                        name="goal"
                        options={{
                            title: "Goal",
                            tabBarIcon: ({focused}) => <Image
                            source={require("@/assets/images/goalIcon.png")}
                            style={{tintColor: focused ? "#F69439" : "#ADAC9F"}}
                            />
                        }}
                    />
                    <Tabs.Screen
                        name="learn"
                        options={{
                            title: "Learn",
                            tabBarIcon: ({focused}) => <Image
                            source={require("@/assets/images/learnIcon.png")}
                            style={{tintColor: focused ? "#F69439" : "#ADAC9F"}}
                            />
                        }}
                    />
                    {/* <Tabs.Screen
                        name="profile"
                        options={{
                            title: "Profile",
                            tabBarIcon: ({focused}) => <Image
                            source={require("@/assets/images/profileIcon.png")}
                            style={{tintColor: focused ? "#F69439" : "#ADAC9F"}}
                            />
                        }}
                    /> */}
                </Tabs>
            </GluestackUIProvider>
        </QueryClientProvider>
    )
}