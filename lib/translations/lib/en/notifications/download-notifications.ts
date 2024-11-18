export const downloadNotifications = {
  channelName: 'Downloads',
  channelDescription: 'Notifications about downloads',
  finish: {
    title: 'Finished downloading',
    body: 'All elements from your download queue finished downloading',
    ios: {
      title: 'Finished downloading',
      body: '{{episode}} - {{series}}',
    },
  },
  progress: {
    title: 'Downloading',
    body: '{{progress}} left to finish downloading',
  },
};
