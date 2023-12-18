import { WatchStatus } from '@naikamu/shared';

export const userVisibleWatchStatuses: {
  key: WatchStatus;
  isDefaultActive: boolean;
}[] = [
  { key: WatchStatus.Planning, isDefaultActive: true },
  { key: WatchStatus.Watching, isDefaultActive: true },
  { key: WatchStatus.Completed, isDefaultActive: false },
  { key: WatchStatus.OnHold, isDefaultActive: false },
  { key: WatchStatus.Dropped, isDefaultActive: false },
];
