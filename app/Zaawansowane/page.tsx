"use client"
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Zaawansowane from '../components/Zaawansowane';


function FormPage() {

  return (
    <div className='h-full w-full flex font-sans' >
      <div className='h-full w-full flex flex-col'>
      <Zaawansowane/>
      <div className = "relative w-full h-10 right-0">
      <Navbar />
      </div>
      
      </div>
    </div>

  )
  
}
export default FormPage;