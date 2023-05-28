'use client';
import { Provider } from 'react-redux';
import Navbar from './components/Nav/MainNav';
import './globals.css';
import { Inter } from 'next/font/google';
import store from './redux/store';
import Counter from './pages/counter/page';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Online shopping site',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
