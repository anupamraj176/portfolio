import React from "react";
import {Navbar} from './components/Navbar';
import {Header} from './components/HeroSection'

import {Tech} from './components/Tech'
import {Contact} from './components/Contact'
import { Divider } from "./components/Divider";
import {ProjectSlider} from './components/ProjectSlider'

function App(){

  return(<>
          <Navbar/>
          {/* <Divider/> */}
          <Header/>
          <Divider/>
          <Tech/>
          <Divider/>
          <ProjectSlider/>
          <Divider/>
          <Contact/>  
    </>
  )
}

export default App;