import { AndroidChannel, default as notifee } from '@notifee/react-native';

import { useTranslate } from '../../i18n/useTranslate';

export type NotificationChannels = 'download' | 'default';

export function useNotificationService() {
  const { translate } = useTranslate();

  const createChannel = async (channelKey: NotificationChannels) => {
    await notifee.createChannel({
      id: channelKey,
      name: translate(`notifications.${channelKey}.channelName`),
    });
  };

  const initialize = async () => {
    await notifee.requestPermission();

    await createChannel('default');
    await createChannel('download');
  };

  const displayNotification = async (
    channelId: NotificationChannels,
    translationActionKey: string,
  ) => {
    await notifee.displayNotification({
      title: translate(
        `notification.${channelId}.${translationActionKey}.title`,
      ),
      body: translate(`notification.${channelId}.${translationActionKey}.body`),
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
