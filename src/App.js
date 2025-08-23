import React from "react";
import {Navbar} from './components/Navbar';
import {Header} from './components/HeroSection'
import {About} from './components/About';
// import {Tech} from './components/Tech'
import {Contact} from './components/Contact'


function App(){

  return(<>
          <Navbar/>
          <Header/>
          <About/>
          {/* <Tech/> */}
          <Contact/>
    </>
  )
}

export default App;