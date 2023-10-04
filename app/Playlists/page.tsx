"use client"
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Playlisty from '../components/Playlisty';
import Footer from '../components/Footer';


function FormPage() {

  return (
    <div className='h-full w-full ' >
    <div className='h-full w-full flex font-sans' >
      <div className='h-full w-full flex flex-col  '>
      <Navbar/>
      <Playlisty/>
      </div>
    </div>
    <Footer />
    </div>
  )
  
}
export default FormPage;