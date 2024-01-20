import { AndroidChannel, default as notifee } from '@notifee/react-native';

import { useTranslate } from '../../i18n/useTranslate';

export function useNotificationService() {
  const { translate } = useTranslate();

  const initialize = async (channelKey?: 'downloads') => {
    let channelId = 'default';

    // eslint-disable-next-line sonarjs/no-small-switch
    switch (channelKey) {
      case 'downloads': {
        channelId = 'download';
      }
    }

    await notifee.requestPermission();

    return notifee.createChannel({
      id: channelId,
      name: translate(`notifications.${channelId}.channelName`),
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
