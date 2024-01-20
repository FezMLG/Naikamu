import {
  AndroidChannel,
  default as notifee,
  Notification,
} from '@notifee/react-native';

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
    notification: Notification = {},
  ) => {
    await notifee.displayNotification({
      ...notification,
      title: translate(
        `notification.${channelId}.${translationActionKey}.title`,
      ),
      body: translate(`notification.${channelId}.${translationActionKey}.body`),
      android: {
        ...notification.android,
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const registerForegroundService = () => {
    notifee.registerForegroundService(notification => {
      return new Promise(() => {});
    });
  };

  const attachNotificationToService = async (
    channelId: NotificationChannels,
    translationActionKey: string,
  ) => {
    await displayNotification(channelId, translationActionKey, {
      android: {
        asForegroundService: true,
      },
    });
  };

  return {
    initialize,
    displayNotification,
  };
}
