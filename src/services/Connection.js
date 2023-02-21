import { toast } from 'react-toastify';

export const handleConnectionError = (error) => {
  if (error.message === 'Network Error') {
    toast.error('An error occurred while trying to connect to the server.');
  } else if (error.response.status === 404) {
    toast.error('The requested resource was not found.');
  } else {
    console.log(error);
  }
};
