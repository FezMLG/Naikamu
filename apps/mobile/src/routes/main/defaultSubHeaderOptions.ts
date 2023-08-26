import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const defaultSubHeaderOptions = ({
  title,
}: {
  title?: string;
}): NativeStackNavigationOptions => ({
  title: title,
  animation: 'slide_from_right',
});
