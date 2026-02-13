import React from 'react';

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@gluestack-ui/themed';

export const ActionSheet = ({
  children,
  showActionSheet,
  setShowActionSheet,
  snapPoints,
}: {
  children: React.ReactNode;
  showActionSheet: boolean;
  setShowActionSheet: React.Dispatch<React.SetStateAction<boolean>>;
  snapPoints?: number[];
}) => {
  const handleClose = () => setShowActionSheet(!showActionSheet);

  return (
    <Actionsheet
      isOpen={showActionSheet}
      onClose={handleClose}
      snapPoints={snapPoints}
      zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {children}
      </ActionsheetContent>
    </Actionsheet>
  );
};
