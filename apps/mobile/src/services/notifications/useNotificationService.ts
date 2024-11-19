import {
  AndroidVisibility,
  default as notifee,
  Notification,
} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { Linking, Platform } from 'react-native';
import Config from 'react-native-config';

import { useMutationSaveNotificationToken } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { logger } from '../../utils';
import { event } from '../events';
import { useDownloadsStore } from '../offline/downloads.store';
import { useDownloadsQueueStore } from '../offline/queue.store';

export type NotificationChannels =
  | 'download'
  | 'general'
  | 'updates'
  | 'important';

export enum NotificationForegroundServiceEvents {
  'START' = 'START',
  'STOP' = 'STOP',
  'UPDATE' = 'UPDATE',
}

export function useNotificationService() {
  const { translate } = useTranslate();
  const { mutation } = useMutationSaveNotificationToken();
  const downloadQueue = useDownloadsQueueStore(store => store.actions);
  const activeDownloads = useDownloadsStore(store => store.actions);

  const createChannel = async (channelKey: NotificationChannels) => {
    await notifee.createChannel({
      id: channelKey,
      name: translate(`notifications.${channelKey}.channelName`),
    });
  };

  const onMessageReceived = async (
    message: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    await displayRemoteNotification('general', message);
    logger('NOTIFICATION RECEIVED').info(message);
  };

  const initialize = async () => {
    logger('INITIALIZE NOTIFICATIONS').info('initializing');
    const settings = await notifee.requestPermission();

    logger('NOTIFICATION SETTINGS').info(settings);

    await Promise.all([
      createChannel('download'),
      createChannel('general'),
      createChannel('updates'),
      createChannel('important'),
    ]);

    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);

    if (Platform.OS === 'android') {
      await messaging().registerDeviceForRemoteMessages();

      const token = await messaging().getToken();

      logger('NOTIFICATION TOKEN').info(token);
      mutation.mutate(token);
    }
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

  const displayRemoteNotification = async (
    channelId: NotificationChannels,
    notification: FirebaseMessagingTypes.RemoteMessage,
    // eslint-disable-next-line unicorn/consistent-function-scoping
  ) => {
    await notifee.displayNotification({
      title: notification.notification?.title,
      body: notification.notification?.body,
      android: {
        ...notification.notification?.android,
        visibility: notification.notification?.android
          ?.visibility as unknown as AndroidVisibility,
        channelId,
        pressAction: {
          id: 'default',
        },
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

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const openDeviceNotificationSettings = async () => {
    const packageName = Config.APPLICATION_ID ?? '';

    if (Platform.OS === 'ios') {
      await Linking.openURL(`App-Prefs:NOTIFICATIONS_ID&path=${packageName}`);
    } else if (Platform.OS === 'android') {
      await Linking.sendIntent('android.settings.APP_NOTIFICATION_SETTINGS', [
        {
          key: 'android.provider.extra.APP_PACKAGE',
          value: packageName,
        },
      ]);
    }
  };

  return {
    initialize,
    displayNotification,
    registerForegroundService,
    attachNotificationToService,
    openDeviceNotificationSettings,
  };
}
