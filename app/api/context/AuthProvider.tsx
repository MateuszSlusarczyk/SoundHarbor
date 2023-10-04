import Navbar from '@/app/components/Navbar'
import Menu from '@/app/components/Menu'
import  SessionContext  from './SessionContext'
import Home from '@/app/page'

export default async function AuthProvider({ children }: {
    children: React.ReactNode
}
) {

    return (
        <SessionContext > 
            <Navbar />
            <Menu />
            <Home />
            {children}
        </SessionContext>
    )
}