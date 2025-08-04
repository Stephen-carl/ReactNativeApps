import '@/global.css'
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


export default function RootLayout() {
    
    const [fontsLoaded] = useFonts({
    MaliRegular: require('../assets/fonts/Mali_Regular.ttf'),
    MaliSemiBold: require('../assets/fonts/Mali_SemiBold.ttf'),
    MaliBold: require('../assets/fonts/Mali_Bold.ttf'),
    });

    if (!fontsLoaded) return null;

    return(
        // wrapping in tanstack and gluestack
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider>
                <Slot/>
            </GluestackUIProvider>
        </QueryClientProvider>
        
    )
}