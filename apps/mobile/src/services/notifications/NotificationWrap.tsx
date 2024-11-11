import React, { useEffect } from 'react';

import { default as notifee, EventType } from '@notifee/react-native';
import { logger } from '../../utils';

export const NotificationWrap = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    notifee.onForegroundEvent(({ type, detail }) => {
      logger('NOTIFICATION EVENT').info(
        'Received foreground event',
        EventType[type],
        detail,
      );
    });
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      logger('NOTIFICATION EVENT').info(
        'Received background event',
        EventType[type],
        detail,
      );
    });
  }, []);

  return children;
};
