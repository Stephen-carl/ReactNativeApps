import FluffyTutor from "@/components/fluffyTutor";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useUserStore } from "@/store/userStore";
import { router, useLocalSearchParams } from "expo-router";
import { Calendar, ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSaveGoal } from "@/hooks/goalHook";
import { showErrorAlert } from "@/utils/alert";

export default function GoalDuration() {
    const {user} = useUserStore()
    const saveMutation = useSaveGoal();
    const { goalName, currentAmount, goalTarget, amount } = useLocalSearchParams()
    const [duration, setDuration] = useState<string>('');
    const [theDate, setTheDate] = useState<string>('');
    const [pickerType, setPickerType] = useState(null); // 'start' or 'end'
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date: Date) => {
        setDuration(date.toISOString().split('T')[0]); // Format to YYYY-MM-DD
        // turn off the button
        setTheDate('')

        // then hide the calendar
        hideDatePicker()
    };

    // for the duration
    const handleStyle = (item: string) => {
        // i did this incase the selected item is equals to the item else unselecte
        return theDate === item ? 'px-4  rounded-lg bg-goalButton m-2.5' : 'px-4 border-goalButton border bg-white rounded-lg m-2.5';
    }

    const handleSelected = (item: string) => {
        // to set the date for the styling
        setTheDate(item.trim());
        // to get the date from the present date according to the duration picked
        const today = new Date();
        let targetDate: Date | null = new Date(today);
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        switch (item) {
            case '1mon':
            targetDate.setMonth(currentMonth + 1);
            break;
            case '3mon':
            targetDate.setMonth(currentMonth + 3);
            break;
            case '6mon':
            targetDate.setMonth(currentMonth + 6);
            break;
            case '1yr':
            targetDate.setFullYear(currentYear + 1);
            break;
            default:
            targetDate = null; // better to indicate no selection
        }

        if (targetDate) {
            // set the duration to the formatted date
            setDuration(targetDate.toLocaleDateString('en-CA')); // YYYY-MM-DD
        } else {
            setDuration('');
        }
    }

    const handleSubmit = () => {
        // save to db
        if (!duration) return;
        console.log(`Saving goal with details: ${goalName}, Amount: ${amount}, Target: ${goalTarget}, Duration: ${duration}`);
        
        saveMutation.mutate(
            { childId: user?.id, item: goalName.toString(), 
            amount: Number(amount), target: goalTarget.toString(), 
            duration, savedAmount: 0.0, status: 'ongoing'},
            {
                onSuccess: (data) => {
                    console.log(data);
                    router.replace({
                        pathname: '/(home)/goal/goalAdd',
                        params: {goalId : data.id}
                    })
                },
                onError: (error) => {
                    console.error('Error saving goal:', error);
                    showErrorAlert('An error occurred while saving your goal. Please try again later.');
                }
            }
        )
    }

    return(
        <SafeAreaView className="flex-1 bg-white">
            <VStack className="flex-1 max-w-full min-h-full justify-between">
                <VStack className="m-4">
                    <HStack space="lg" className="mt-2 items-center">
                        <Pressable>
                            <ChevronLeft size={24} className=" w-6 h-6" onPress={() => router.back()}/>
                        </Pressable>
                        <Text className="text-2xl font-mali_semibold text-getStarted">Set Goal Duration</Text>
                    </HStack>

                    <Text
                    className="font-mail text-base mt-16">
                       How long do you want to save?
                    </Text>
                    
                    <Pressable onPress={showDatePicker} className="border rounded-xl px-3 py-2 flex-row items-center mb-6 border-imageBorder mt-2">
                        <Text className="flex-1 font-bricolage p-2">{(duration) || 'Select a date'}</Text>
                        <Calendar size={24} className="text-gray-400" />
                    </Pressable>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                    <View className="flex-row flex-wrap mt-6">
                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('1mon')}
                        onPress={() => handleSelected('1mon')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">1 month</ButtonText>
                        </Button>

                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('3mon')}
                        onPress={() => handleSelected('3mon')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">3 months</ButtonText>
                        </Button>

                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('6mon')}
                        onPress={() => handleSelected('6mon')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">6 months</ButtonText>
                        </Button>

                        <Button 
                        size="md" 
                        variant="solid" 
                        className={handleStyle('1yr')}
                        onPress={() => handleSelected('1yr')}>
                            <ButtonText className="font-mail text-base text-goalButtonText">1 year</ButtonText>
                        </Button>
                    </View>

                </VStack>
                <VStack className="">
                    <FluffyTutor message={`${user?.name}, how much do you want to save for ${goalName}?`} />
                    
                    <View className="mx-4 mt-4">
                        <Button 
                        style={{ width: '100%'}} 
                        size='xl' 
                        className="bg-globColour rounded-lg"
                        onPress={handleSubmit}
                        isDisabled={!duration}
                        >
                        <ButtonText className="text-white font-mail text-lg">Next</ButtonText>
                        </Button>
                    </View>
                </VStack>
            </VStack>
        </SafeAreaView>
    )
}