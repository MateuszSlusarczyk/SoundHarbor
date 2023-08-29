import Navbar from '@/app/components/Navbar'
import Menu from '@/app/components/Menu'
import { SessionProvider } from 'next-auth/react'
import Home from '@/app/page'

export default function AuthProvider({ children }: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider> 
            <Navbar />
            <Menu />
            <Home />
            {children}
        </SessionProvider>
    )
}