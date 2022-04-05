import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
    <div className="m-3">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>}>
            <Route path="about" element={<About/>}></Route>
          </Route>
          <Route path="/functionalities" element={<Navigate to="/" replace />}></Route>
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
