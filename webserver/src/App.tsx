import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import Compare from './pages/functionalities/Compare';
import CheckLength from './pages/functionalities/CheckLength';
import Transform from './pages/functionalities/Transform';
import Functionalities from './pages/functionalities/Functionalities';

function App() {
  return (
    <div className="mx-0 mt-0 mb-3">
      <BrowserRouter>
        <Navbar/>
        <div className="mx-3">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/functionalities">
              <Route path="" element={<Functionalities/>}/>
              <Route path="compare" element={<Compare/>}/>
              <Route path="length" element={<CheckLength/>}/>
              <Route path="transform" element={<Transform/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
