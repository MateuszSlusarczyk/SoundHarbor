"use client"
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
export default function Denied() {
    return (
      <div className='h-full w-full flex   font-sans' >
        <div className='h-full w-1/6'>
          <Menu />
        </div>
        <div className='h-full w-full flex flex-col'>
        <div className = "relative w-full h-10">
          <Navbar />
        </div>
          <div className='h-5/6 w-full'>
        <h1>Nie masz dostępu</h1>
        </div>
        </div>
      </div>
  
    )

  
}
