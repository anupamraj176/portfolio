import React from "react";
import {Navbar} from './components/Navbar';
import {Header} from './components/HeroSection'
import {About} from './components/About';


function App(){

  return(<>
          <Navbar/>
          <Header/>
          <About/>
    <div className=" bg-[#050414]">

        {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">

        </div> */}

          <div className="h-screen bg-emerald-100">

          </div>

        <div className=""> 
        </div>
    </div>
    </>
  )
}

export default App;