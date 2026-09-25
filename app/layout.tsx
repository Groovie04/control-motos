import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Control de Arrendamiento - Ruedda',
  description: 'Sistema de control de ventas y unidades registradas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
