import {
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import Config from 'react-native-config';
import { ProgressBar } from 'react-native-paper';
import { IEpisodeDownloadJob } from '../services/offline/downloads.store';
import { fontStyles, colors, globalStyle } from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ActiveDownload = ({
  download,
  stopAction,
}: {
  download: Omit<IEpisodeDownloadJob, 'jobId'>;
  stopAction: (event: GestureResponderEvent) => void;
}) => {
  return (
    <View>
      {Config.ENV === 'development' ? (
        <Text style={[fontStyles.label, colors.textLight]}>
          {download.series.seriesId}
        </Text>
      ) : null}
      <Text
        style={[
          fontStyles.headerSmall,
          colors.textLight,
          globalStyle.marginBottomSmall,
        ]}>
        {download.series.title}
      </Text>
      <View style={styles.titleContainer}>
        <View>
          <Text
            style={[
              fontStyles.header,
              colors.textLight,
              globalStyle.marginBottomSmall,
            ]}>
            {download.episode.number}. {download.episode.title}
          </Text>
          <Text
            style={[
              fontStyles.text,
              colors.textLight,
              globalStyle.marginBottomSmall,
            ]}>
            {download.episode.length} | {download.episode.translator}
          </Text>
        </View>
        <Pressable onPress={stopAction}>
          <Icon name={'stop'} size={36} color={'white'} />
        </Pressable>
      </View>
      <ProgressBar
        animatedValue={download.progress}
        theme={{
          colors: {
            primary: colors.accent.color,
          },
        }}
      />
      <Text>{download.progress}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
