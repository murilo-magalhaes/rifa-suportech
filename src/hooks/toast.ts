'use client';

import { useContext } from 'react';

import { ToastContext } from '../context/AppToastContext';

const useToastContext = () => {
  return useContext(ToastContext);
};

export default useToastContext;
