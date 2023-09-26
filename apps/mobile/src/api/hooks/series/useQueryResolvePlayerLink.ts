import { IResolvePlayerDto } from '@aniwatch/shared';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { navigateToPlayer } from '../../../components/episode/navigateToPlayer';
import { APIClient } from '../../APIClient';

const playerHandler = async (body: IResolvePlayerDto, navigation: any) => {
  const apiClient = new APIClient();

  const data = await apiClient.resolvePlayer(body);

  return navigateToPlayer({
    navigation,
    episodeTitle: '',
    dto: body,
    response: data,
  });
};

export const useQueryResolvePlayerLink = (body: IResolvePlayerDto) => {
  const navigation = useNavigation<any>();

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['resolve', body.url],
    queryFn: () => playerHandler(body, navigation),
    enabled: false,
  });

  return {
    isLoading,
    data,
    refetch,
    isError,
  };
};
