import { default as notifee } from '@notifee/react-native';
import { useTranslate } from '../../i18n/useTranslate';

export function useNotificationService() {
  const { translate } = useTranslate();

  const initialize = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    return notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  };

  const displayNotification = async (translationKey: string) => {
    const channelId = await initialize();

    // Display a notification
    await notifee.displayNotification({
      title: translate(`${translationKey}.title`),
      body: translate(`${translationKey}.body`),
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  return {
    initialize,
    displayNotification,
  };
}
