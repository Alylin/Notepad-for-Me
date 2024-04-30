import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'notepad.exe',
  description: 'It is kinda like notepad.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
