import { IWatchListSeries } from '@naikamu/shared';
import { requireOptionalNativeModule } from 'expo';

interface IHomeScreenChannel {
  createDefaultChannel(): void;

  populateDefaultChannel(series: IWatchListSeries[]): void;
}

// Local Expo module from modules/home-screen-channel, available on Android TV only.
const HomeScreenChannelModule =
  requireOptionalNativeModule<IHomeScreenChannel>('HomeScreenChannel');

const HomeScreenChannel: IHomeScreenChannel = {
  createDefaultChannel: () => HomeScreenChannelModule?.createDefaultChannel(),
  populateDefaultChannel: series =>
    HomeScreenChannelModule?.populateDefaultChannel(series),
};

export default HomeScreenChannel;
