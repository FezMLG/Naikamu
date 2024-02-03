import { default as notifee, Notification } from '@notifee/react-native';

import { useTranslate } from '../../i18n/useTranslate';
import { event } from '../events';
import { useDownloadsStore } from '../offline/downloads.store';
import { useDownloadsQueueStore } from '../offline/queue.store';
import { logger } from '../../utils/logger';
import { colors } from '../../styles';

export type NotificationChannels = 'download';

export enum NotificationForegroundServiceEvents {
  'START' = 'START',
  'STOP' = 'STOP',
  'UPDATE' = 'UPDATE',
}

export function useNotificationService() {
  const { translate } = useTranslate();
  const downloadQueue = useDownloadsQueueStore(store => store.actions);
  const activeDownloads = useDownloadsStore(store => store.actions);

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
        // smallIcon: 'ic_small_icon',
      },
    });
  };

  const registerForegroundService = () => {
    logger('registerForegroundService').info('registered');
    notifee.registerForegroundService(
      notification =>
        new Promise(() => {
          event.on(NotificationForegroundServiceEvents.UPDATE, async () => {
            await notifee.displayNotification({
              id: notification.id,
              body: translate('notifications.download.progress.body', {
                progress:
                  downloadQueue.getQueueLength() +
                  activeDownloads.getActiveDownloads().length,
              }),
              android: {
                ...notification.android,
              },
            });
          });
          event.on(NotificationForegroundServiceEvents.STOP, async () => {
            logger('STOP').info('stop event');
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
