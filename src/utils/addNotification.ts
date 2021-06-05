import { ReactNotificationOptions, store } from 'react-notifications-component';

const defaultOptions: ReactNotificationOptions = {
  insert: 'top',
  container: 'top-center',
  animationIn: ['animate__animated', 'animate__fadeIn'],
  animationOut: ['animate__animated', 'animate__fadeOut'],
  dismiss: {
    duration: 1000,
    onScreen: true
  }
};

const addNotification = (options: Partial<ReactNotificationOptions>) =>
  store.addNotification({
    ...options,
    ...defaultOptions
  });
export default addNotification;
