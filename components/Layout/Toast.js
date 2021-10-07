import { toast, ToastContainer } from 'react-toastify';

export const PostDeleteToast = () => {
  return (
    <ToastContainer
      position='bottom-center'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
    >
      {toast.info('Deleted Successfully', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })}
    </ToastContainer>
  );
};

export const ErrorToast = ({ error }) => {
  return (
    <ToastContainer
      position='bottom-center'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
    >
      {toast.error(error, {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      })}
    </ToastContainer>
  );
};

export const MsgSentToast = () => (
  <ToastContainer
    position='bottom-center'
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover={false}
  >
    {toast.success('Sent successfully', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })}
  </ToastContainer>
);
