import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Compare from './components/functionalities/Compare';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';

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
              <Route path="" element={<a>dasdasdlasjdkasjdask</a>}/>
              <Route path="compare" element={<Compare/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
