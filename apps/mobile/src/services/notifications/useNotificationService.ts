import { default as notifee } from '@notifee/react-native';

export function useNotificationService() {
  const initialize = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    return notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  };

  const displayNotification = async (title: string, body: string) => {
    const channelId = await initialize();

    // Display a notification
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  return {
    displayNotification,
  };
}
