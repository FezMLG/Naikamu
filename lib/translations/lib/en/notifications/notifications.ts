import { downloadNotifications } from './download-notifications';

export const notifications = {
  download: downloadNotifications,
  general: {
    channelName: 'General',
    channelDescription: 'General notifications',
  },
  important: {
    channelName: 'Important',
    channelDescription:
      'Important notifications sent by the application e.g. about a service not working',
  },
  updates: {
    channelName: 'Updates',
    channelDescription: 'Notifications about new versions of the application',
  },
};
