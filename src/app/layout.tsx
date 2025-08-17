import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Image Description Analyzer',
  description: 'Aplikace pro analýzu a popis obrázků pomocí různých AI modelů',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-name="root-html" lang="cs">
      <body data-name="root-body">{children}</body>
    </html>
  )
}
