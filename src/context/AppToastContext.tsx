'use client';

import { Toast } from 'primereact/toast';
import React, { createContext, useCallback, useRef, useState } from 'react';

/** components */

export const ToastContext = createContext<any>(null);

type Props = { children: React.ReactNode };

const ToastContextProvider: React.FC<Props> = ({ children }) => {
  const toast = useRef<any>(null);

  const [showToast, setShowToast] = useState({
    severity: '',
    summary: '',
    detail: '',
    life: 5000,
  });

  const addToast = useCallback(
    (severity: string, summary: string, detail: string, life: number) => {
      setShowToast({
        ...showToast,
        severity,
        summary,
        detail,
        life,
      });
      toast.current?.show({ severity, summary, detail, life });
    },
    [setShowToast],
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div>
        <Toast ref={toast} />
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
