import { downloadNotifications } from './download-notifications';

export const notifications = {
  download: downloadNotifications,
  general: {
    channelName: 'Ogólny',
    channelDescription: 'Powiadomienia ogólne',
  },
  important: {
    channelName: 'Ważne',
    channelDescription:
      'Ważne powiadomienia wysyłane przez aplikację np. o niedziałającej usłudze',
  },
  updates: {
    channelName: 'Aktualizacje',
    channelDescription: 'Powiadomienia o nowych wersjach aplikacji',
  },
};
