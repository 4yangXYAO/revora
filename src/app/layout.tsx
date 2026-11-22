import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prometheus Digital Studio — We bring the fire',
  description: 'An independent digital studio turning brave ideas into meaningful digital experiences.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
