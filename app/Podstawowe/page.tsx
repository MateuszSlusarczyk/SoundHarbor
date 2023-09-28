"use client"
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Podstawowe from '../components/Podstawowe';


function FormPage() {

  return (
    <div className='h-full w-full flex font-sans' >
    <div className='h-full w-1/6'>
        <Menu />
      </div>
      <div className='h-full w-full flex flex-col'>
      <Podstawowe/>
      <div className = "relative w-full h-10 right-0">
      <Navbar />
      </div>
      
      </div>
    </div>

  )
  
}
export default FormPage;