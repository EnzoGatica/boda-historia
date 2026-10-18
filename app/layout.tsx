import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { boda, pareja } from '@/lib/content'
import './globals.css'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--fuente-display',
  display: 'swap',
})

const sans = Jost({
  subsets: ['latin'],
  variable: '--fuente-sans',
  display: 'swap',
})

const titulo = `${pareja.nombres[0]} & ${pareja.nombres[1]} · Nuestra historia`

export const metadata: Metadata = {
  title: titulo,
  description: `${pareja.frase} ${boda.fechaTexto}.`,
  openGraph: { title: titulo, description: pareja.frase, type: 'website' },
  // Sitio de invitados: no se indexa
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: '#f6f0e6',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
