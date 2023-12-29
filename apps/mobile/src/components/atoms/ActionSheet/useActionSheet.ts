import React from 'react';

export const useActionSheet = () => {
  const [showActionSheet, setShowActionSheet] = React.useState(false);

  return {
    showActionSheet,
    setShowActionSheet,
  };
};
