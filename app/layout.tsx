import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/providers';
import SigninButton from '@/components/signinButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <SigninButton></SigninButton>
          {children}
        </Providers>
      </body>
    </html>
  );
}
