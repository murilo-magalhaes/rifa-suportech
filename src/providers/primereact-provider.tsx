'use client';

import { PrimeReactProvider as PrimeReactP } from 'primereact/api';
import React from 'react';
import AppConfig from '@/layout/AppConfig';
import { LayoutProvider } from '@/layout/context/layoutcontext';

export default function PrimeReactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrimeReactP>
      <LayoutProvider>
        <React.Fragment>
          {children}
          <AppConfig minimal />
        </React.Fragment>
      </LayoutProvider>
    </PrimeReactP>
  );
}
