import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flaame - Sports Reels & Casino',
  description: 'Mobile-first sports betting with TikTok-style reels',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Flaame',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" style={{ margin: 0, padding: 0, border: 0, outline: 0 }}>
      <head>
        <meta name="theme-color" content="transparent" />
      </head>
      <body className={inter.className} style={{ margin: 0, padding: 0, border: 0, outline: 0, overflow: 'hidden' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
