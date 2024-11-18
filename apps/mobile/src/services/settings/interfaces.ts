export enum Resolution {
  '1080p' = '1080p',
  '720p' = '720p',
  '480p' = '480p',
}

export interface INotificationSettings {
  enabled: boolean;
  general: boolean;
  important: boolean;
  updates: boolean;
  download: boolean;
}

export interface UserSettings {
  preferredResolution: Resolution;
  preferredDownloadQuality: Resolution;
  notifications: INotificationSettings;
}
