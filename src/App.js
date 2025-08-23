import React from "react";
import {Navbar} from './components/Navbar';
import {Header} from './components/HeroSection'

import {Tech} from './components/Tech'
import {Contact} from './components/Contact'
import { Divider } from "./components/Divider";

function App(){

  return(<>
          <Navbar/>
          {/* <Divider/> */}
          <Header/>
          <Divider/>
          <Tech/>
          <Divider/>
          <Contact/>
    </>
  )
}

export default App;