import React, { useEffect } from 'react';

import { default as notifee, EventType } from '@notifee/react-native';
import { getAnalytics } from '@react-native-firebase/analytics';

import { logger } from '../../utils';

export const NotificationWrap = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    notifee.onForegroundEvent(async ({ type, detail }) => {
      logger('NOTIFICATION EVENT').info(
        'Received foreground event',
        EventType[type],
        detail,
      );
      await getAnalytics().logEvent('notification_foreground_event', {
        type: EventType[type],
        title: detail.notification?.title,
        body: detail.notification?.body,
      });
    });
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      logger('NOTIFICATION EVENT').info(
        'Received background event',
        EventType[type],
        detail,
      );
      await getAnalytics().logEvent('notification_foreground_event', {
        type: EventType[type],
        title: detail.notification?.title,
        body: detail.notification?.body,
      });
    });
  }, []);

  return children;
};
