import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './context/provider'
import NavBar from './objects/globals/NabBar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EEMQ Procesos System',
  description: 'Aplicación para la gestión de procesos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
      <body className={inter.className}>
        <NavBar/>
        {children}</body>
      </Provider>
    </html>
  )
}
