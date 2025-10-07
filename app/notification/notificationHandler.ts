// notificationHandler.ts
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { NavigationContainerRef } from '@react-navigation/native';

// Export this to call in App.tsx
export function setupNotificationHandlers(navigationRef: NavigationContainerRef<any>) {
  // Foreground notification handler
  messaging().onMessage(async remoteMessage => {
    console.log('📲 Foreground notification:', remoteMessage);

    const title = remoteMessage.notification?.title || 'Notification';
    const body = remoteMessage.notification?.body || '';
    const data = remoteMessage.data || {};

    Alert.alert(title, body, [
      {
        text: 'Open',
        onPress: () => handleNotificationNavigation(data, navigationRef),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  });

  // Background (app in memory) - notification tap
  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage) {
      console.log('📲 Notification tapped (background):', remoteMessage);
      handleNotificationNavigation(remoteMessage.data, navigationRef);
    }
  });

  // App opened from quit state (cold start)
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('🚀 Notification tapped (quit):', remoteMessage);
        handleNotificationNavigation(remoteMessage.data, navigationRef);
      }
    });
}

// Handle where to navigate based on notification data
function handleNotificationNavigation(data: any, navigationRef: NavigationContainerRef<any>) {
  if (!data) return;

  const { type, chatId, userId } = data;

  switch (type) {
    case 'chat':
      navigationRef.navigate('ChatScreen', { chatId, userId });
      break;

    case 'order':
      navigationRef.navigate('OrderDetailScreen', { orderId: data.orderId });
      break;

    case 'profile':
      navigationRef.navigate('UserProfile', { userId });
      break;

    default:
      console.log('📦 Unknown notification type:', type);
      break;
  }
}




// App.tsx or AppNavigator.tsx
// import React, { useRef, useEffect } from 'react';
// import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
// import { setupNotificationHandlers } from './notificationHandler'; // adjust path
// import RootNavigator from './navigators/RootNavigator'; // your stack or tab navigator

// export default function App() {
//   const navigationRef = useRef<NavigationContainerRef<any>>(null);

//   useEffect(() => {
//     if (navigationRef.current) {
//       setupNotificationHandlers(navigationRef.current);
//     }
//   }, []);

//   return (
//     <NavigationContainer ref={navigationRef}>
//       <RootNavigator />
//     </NavigationContainer>
//   );
// }
