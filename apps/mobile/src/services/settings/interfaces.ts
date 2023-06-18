export enum Resolution {
  '1080p' = '1080p',
  '720p' = '720p',
  '480p' = '480p',
}

export interface UserSettings {
  preferredResolution: Resolution;
}
