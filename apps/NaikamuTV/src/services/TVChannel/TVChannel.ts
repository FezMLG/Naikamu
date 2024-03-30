import { IWatchListSeries } from '@naikamu/shared';
import { NativeModules } from 'react-native';

const { AndroidTVChannel } = NativeModules;

interface ITVChannel {
  createDefaultChannel(): void;

  populateDefaultChannel(series: IWatchListSeries[]): void;
}

export default AndroidTVChannel as ITVChannel;
