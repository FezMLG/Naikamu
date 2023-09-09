import React, { ReactElement, ReactNode } from 'react';

import { Platform, PlatformOSType } from 'react-native';

export const PlatformExplicit = ({
  availablePlatforms,
  children,
}: {
  availablePlatforms: PlatformOSType[];
  children: ReactNode;
}): ReactElement => (
  <>{availablePlatforms.includes(Platform.OS) ? children : null}</>
);
