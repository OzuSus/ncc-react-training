import React, { type ReactNode } from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IToastProps {
  children: ReactNode;
  options?: ToastContainerProps;
}
const defaultOption: ToastContainerProps = {
  position: 'bottom-right',
  autoClose: 1000,
  hideProgressBar: true,
  theme: 'colored',
};

export default function CustomToast({ children, options }: IToastProps) {
  return (
    <>
      {children}
      <ToastContainer {...defaultOption} {...options} />
    </>
  );
}
