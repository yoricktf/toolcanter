import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/providers';
import SigninButton from '../components/SigninButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tool Centre',
  description: 'All the tools, for all your Web Dev needs',
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
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
