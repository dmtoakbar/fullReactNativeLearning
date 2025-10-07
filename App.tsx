import React, { useEffect } from 'react';
import { Alert, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationRoute from './app/navigation/navigation';
import messaging from '@react-native-firebase/messaging';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      console.log('📲 Foreground notification:', remoteMessage);
  
      const title = remoteMessage.notification?.title || 'Notification';
      const body = remoteMessage.notification?.body || '';
      const data = remoteMessage.data || {};
  
      Alert.alert(title, body, [
        {
          text: 'Open',
          onPress: () => {},
        },
        { text: 'Cancel', style: 'cancel' },
      ]);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
     <NavigationRoute />
    </SafeAreaProvider>
  );
}

export default App;
