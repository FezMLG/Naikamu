import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { darkColor } from '../styles/darkMode.style';

const CardShadow = (props: {
  children: React.ReactNode;
  focus: boolean;
  shadowColor?: string;
  style?: [StyleProp<ViewStyle>];
}) => {
  const defaultShadow = {
    distance: 2,
    startColor: darkColor.C800,
    finalColor: darkColor.C900,
  };

  const focusShadow = {
    distance: 2,
    startColor: props.shadowColor ?? '#C539F7',
    finalColor: props.shadowColor ?? '#C539F7',
  };

  return (
    <Shadow
      distance={props.focus ? focusShadow.distance : defaultShadow.distance}
      startColor={
        props.focus ? focusShadow.startColor : defaultShadow.startColor
      }
      endColor={props.focus ? focusShadow.finalColor : defaultShadow.finalColor}
      offset={[10, 10]}
      style={props.style}>
      {props.children}
    </Shadow>
  );
};

export default CardShadow;
