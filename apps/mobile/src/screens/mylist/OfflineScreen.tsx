import React from 'react';
import { Text } from 'react-native';
import { MyListOfflineScreenProps } from '../../routes/main/mylist/interface';
import { useLayout } from '../../components';

const OfflineScreen = ({}: MyListOfflineScreenProps) => {
  const { PageLayout } = useLayout();

  return (
    <PageLayout>
      <Text>aaaaa</Text>
    </PageLayout>
  );
};

export default OfflineScreen;
