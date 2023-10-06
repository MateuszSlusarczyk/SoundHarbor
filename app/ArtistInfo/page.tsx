"use client"
import Navbar from '../components/Navbar'
import ArtistInfo from '../components/ArtistInfo'
import Footer from '../components/Footer';



function FormPage() {

  return (
    <div className='h-full w-full ' >
    <div className='h-full w-full flex font-sans' >
      <div className='h-full w-full flex flex-col  '>
      <Navbar/>
      <ArtistInfo/>
      </div>
    </div>
    <Footer />
    </div>
  )
  
}
export default FormPage;