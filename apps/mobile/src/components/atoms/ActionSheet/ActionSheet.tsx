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
}: {
  children: React.ReactNode;
  showActionSheet: boolean;
  setShowActionSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClose = () => setShowActionSheet(!showActionSheet);

  return (
    <Actionsheet
      isOpen={showActionSheet}
      onClose={handleClose}
      snapPoints={[25]}
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
