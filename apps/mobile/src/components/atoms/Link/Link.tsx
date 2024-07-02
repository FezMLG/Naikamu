import React from 'react';

import { Linking, Pressable, Text } from 'react-native';

import { colors } from '../../../styles';

interface LinkProps extends React.ComponentProps<typeof Pressable> {
  URL: string;
  label: string;
}

export const Link = (props: LinkProps) => {
  const { URL, label, ...rest } = props;

  return (
    <Pressable
      onPress={async () => {
        await Linking.openURL(URL);
      }}
      {...rest}>
      <Text
        style={[
          {
            textDecorationLine: 'underline',
          },
          colors.accent,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
};
