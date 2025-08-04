import { Alert } from 'react-native';

export const showSuccessAlert = (title: string, message: string, onOk?: () => void) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: () => {
          if (onOk) onOk();
        },
      },
    ],
    { cancelable: false }
  );
};

export const showErrorAlert = (message: string) => {
  Alert.alert('Error', message, [{ text: 'OK' }], { cancelable: true });
};
