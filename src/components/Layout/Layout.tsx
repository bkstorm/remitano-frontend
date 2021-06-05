import { ReactNode } from 'react';
import { Header } from '../Header/Header';

export interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
