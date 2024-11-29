import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './globals.css';
import ToastContextProvider from '@/context/AppToastContext';

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
      <body>
        <ToastContextProvider>{children}</ToastContextProvider>
      </body>
    </html>
  );
}
