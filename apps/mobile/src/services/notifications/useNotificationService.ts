import { default as notifee, Notification } from '@notifee/react-native';

import { useTranslate } from '../../i18n/useTranslate';
import { event } from '../events';
import { useDownloadsQueueStore } from '../offline/queue.store';

export type NotificationChannels = 'download';

export enum NotificationForegroundServiceEvents {
  'START' = 'START',
  'STOP' = 'STOP',
  'UPDATE' = 'UPDATE',
}

export function useNotificationService() {
  const { translate } = useTranslate();
  const downloadQueue = useDownloadsQueueStore(store => store.actions);

  const createChannel = async (channelKey: NotificationChannels) => {
    await notifee.createChannel({
      id: channelKey,
      name: translate(`notifications.${channelKey}.channelName`),
    });
  };

  const initialize = async () => {
    await notifee.requestPermission();

    await createChannel('download');
  };

  const displayNotification = async (
    channelId: NotificationChannels,
    translation: { key: string; format?: Record<string, unknown> },
    notification: Notification = {},
  ) => {
    await notifee.displayNotification({
      ...notification,
      title: translate(`notifications.${channelId}.${translation.key}.title`),
      body: translate(
        `notifications.${channelId}.${translation.key}.body`,
        translation.format,
      ),
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
    notifee.registerForegroundService(
      notification =>
        new Promise(() => {
          console.log('registerForegroundService');
          event.on(NotificationForegroundServiceEvents.UPDATE, async () => {
            await notifee.displayNotification({
              ...notification,
              id: notification.id,
              body: translate('notifications.download.progress.body', {
                progress: downloadQueue.getQueueLength() + 1,
              }),
            });
            console.log(
              'update notification',
              downloadQueue.getQueueLength() + 1,
            );
          });
          event.on(NotificationForegroundServiceEvents.STOP, async () => {
            await notifee.stopForegroundService();
            await displayNotification('download', { key: 'finish' });
          });
        }),
    );
  };

  const attachNotificationToService = async (
    channelId: NotificationChannels,
    translationActionKey: string,
  ) => {
    await displayNotification(
      channelId,
      { key: translationActionKey },
      {
        android: {
          asForegroundService: true,
          colorized: true,
          ongoing: true,
          progress: {
            indeterminate: true,
          },
        },
      },
    );
  };

  return {
    initialize,
    displayNotification,
    registerForegroundService,
    attachNotificationToService,
  };
}
