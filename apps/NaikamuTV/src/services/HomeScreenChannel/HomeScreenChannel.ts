import { IWatchListSeries } from '@naikamu/shared';
import { NativeModules } from 'react-native';

const { HomeScreenChannel } = NativeModules;

interface IHomeScreenChannel {
  createDefaultChannel(): void;

  populateDefaultChannel(series: IWatchListSeries[]): void;
}

export default HomeScreenChannel as IHomeScreenChannel;
