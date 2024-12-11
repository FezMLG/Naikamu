import { useLayoutMessageStore } from './useLayoutMessageStore';

export const useLayoutMessageService = () => {
  const infoStoreActions = useLayoutMessageStore(state => state.actions);

  const setMessage = (message: string) => {
    infoStoreActions.setMessage(message);
  };

  const getMessage = () => infoStoreActions.getMessage();

  const showMessage = () => {
    infoStoreActions.setIsVisible(true);
  };

  const setAndShowMessage = (message: string) => {
    setMessage(message);
    showMessage();
  };

  const clearMessage = () => {
    infoStoreActions.setMessage(null);
  };

  const hideMessage = () => {
    infoStoreActions.setIsVisible(false);
    clearMessage();
  };

  const setIsMessageVisible = (isVisible: boolean) =>
    infoStoreActions.setIsVisible(isVisible);

  return {
    setMessage,
    showMessage,
    setAndShowMessage,
    hideMessage,
    setIsMessageVisible,
  };
};
