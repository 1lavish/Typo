import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Footer, Header, TypingBox } from './components'

function App() {
 
  return (
    <>
    <div className='flex flex-col justify-center items-center'>
       <Header /> 
      
       
      <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-24">
      <TypingBox />     {/* main typing interface */}
      {/* <ResultsModal />  shows stats after completion */}
  </main>

       <Footer />
    </div>
     
    </>
  )
}

export default App
