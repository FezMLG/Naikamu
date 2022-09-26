import React from 'react';
import { Shadow } from 'react-native-shadow-2';

const CardShadow = (props: { children: React.ReactNode; focus: boolean }) => {
  const defaultShadow = {
    distance: 0,
    startColor: '#7600bc',
    finalColor: '#7600bc',
  };

  const focusShadow = {
    distance: 2,
  };

  return (
    <Shadow
      distance={props.focus ? focusShadow.distance : defaultShadow.distance}
      startColor={defaultShadow.startColor}
      endColor={defaultShadow.finalColor}
      offset={[10, 10]}>
      {props.children}
    </Shadow>
  );
};

export default CardShadow;
