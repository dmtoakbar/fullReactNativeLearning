// registerNotification.ts or same file above the component
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const postData = async (token: string) => {
  try {
    const response = await fetch('http://localhost:3000/register-for-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();
    console.log('result', result);
  } catch (error) {
    console.error('Error:', error);
  }
};

export async function registerForNotification() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('Permission status:', enabled);

    if (!enabled) {
      Alert.alert('Permission denied');
      return;
    }

    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    await postData(token);
    Alert.alert('Registered for notifications!');
  } catch (error) {
    console.error('Notification registration error:', error);
  }

  // Foreground handler
  messaging().onMessage(async remoteMessage => {
    Alert.alert('New Notification!', JSON.stringify(remoteMessage.notification));
  });
}
