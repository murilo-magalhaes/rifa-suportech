import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './globals.css';
import ToastContextProvider from '@/context/AppToastContext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

export const metadata: Metadata = {
  title: 'Rifa SuporTech',
  description: 'Rifa Online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <PrimeReactProvider>
          <ToastContextProvider>{children}</ToastContextProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
