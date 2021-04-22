import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Particles from 'react-particles-js';
import particlesConfig from './components/Particles/configParticles';
import Sidebar from './components/Sidebar/Sidebar';
import Slider from './components/Slider/Slider';


function App() {
  return (
    <div className="App" >
      <Particles height="100vh" width="100vw" className='particles' params={particlesConfig} /> 
      <Sidebar />
      <Slider />
        
  </div>
  );
}

export default App;
