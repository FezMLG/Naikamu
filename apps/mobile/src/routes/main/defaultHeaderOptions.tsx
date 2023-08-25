import { colors } from '../../styles';

export const defaultHeaderOptions = ({ title }: { title?: string }) => {
  return {
    title: title,
    headerTitleStyle: {
      fontFamily: 'Catamaran-Black',
      fontSize: 36,
      lineHeight: 48,
      paddingTop: 8,
    },
    headerStyle: {
      backgroundColor: colors.background.color,
    },
    headerLeft: () => <></>,
  };
};
