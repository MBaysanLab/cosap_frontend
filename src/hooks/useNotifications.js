import { useState } from 'react';
import { toast } from 'react-toastify';

/**
 * Custom hook for managing notifications
 * @return {object} - Hook state and methods
 */
const useNotifications = () => {
  const [toastOptions] = useState({
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const showNotification = (message, type = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'warning':
        toast.warning(message, toastOptions);
        break;
      case 'info':
      default:
        toast.info(message, toastOptions);
    }
  };

  return {
    showNotification,
    toastOptions
  };
};

export default useNotifications;
