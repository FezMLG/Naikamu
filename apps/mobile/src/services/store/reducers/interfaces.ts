export enum Resolution {
  '1080p' = 'Full HD (1080p)',
  '720p' = 'HD (720p)',
  '480p' = 'SD (480p)',
}

export interface UserSettings {
  preferredResolution: Resolution;
}
