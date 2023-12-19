import { Inter as FontSans} from 'next/font/google'
import './globals.css'
import Provider from './context/provider'
import NavBar from './objects/globals/NabBar'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'EEMQ Procesos System',
  description: 'Aplicación para la gestión de procesos',
}

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <NavBar/>
        {children}</body>
      </Provider>
    </html>
  )
}
