import { default as notifee, Notification } from '@notifee/react-native';

import { useTranslate } from '../../i18n/useTranslate';
import { event } from '../events';
import { useDownloadsQueueStore } from '../offline/queue.store';

export type NotificationChannels = 'download' | 'default';

export function useNotificationService() {
  const { translate } = useTranslate();
  const downloadQueue = useDownloadsQueueStore(store => store.queue);

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
      return new Promise(() => {
        console.log('registerForegroundService');
        event.on('update', () => {
          notifee.displayNotification({
            id: notification.id,
            body: notification.body,
            android: {
              ...notification.android,
              progress: {
                max: 10,
                current: (downloadQueue.length - 10) * -1,
              },
            },
          });
          console.log('update notification', downloadQueue);
        });
        event.on('stop', async () => {
          await notifee.stopForegroundService();
        });
      });
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
    registerForegroundService,
    attachNotificationToService,
  };
}
