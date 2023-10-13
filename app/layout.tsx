"use client"
import { Session } from 'inspector'
import './globals.css'

import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </SessionProvider>
  )
}
