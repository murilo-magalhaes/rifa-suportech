import type { Metadata } from 'next';
import localFont from 'next/font/local';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './globals.css';
import ToastContextProvider from '@/context/AppToastContext';
import PrimeReactProvider from '@/providers/primereact-provider';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Rifa',
  description: 'Rifa Online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PrimeReactProvider>
          <ToastContextProvider>{children}</ToastContextProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
