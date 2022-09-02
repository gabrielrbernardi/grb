import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { ScrollTop } from 'primereact/scrolltop';
import './App.css';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import Compare from './pages/functionalities/Compare';
import CheckLength from './pages/functionalities/CheckLength';
import Transform from './pages/functionalities/Transform';
import Functionalities from './pages/functionalities/Functionalities';
import DataTableRepositories from './components/DataTableRepositories';
import NotFound from './pages/NotFound';
import UHCC from './pages/UHCC';
import Footer from './components/Footer';
import FooterMessage from './components/FooterMessage';
import { useCookies } from 'react-cookie';
import Login from './pages/Login';
import HomeInternal from './pages/internal/Home';

function App() {
  const [getAuth, setAuth] = useState<boolean>();

  useEffect(() => {
    checkAuth()
    setInterval(() => {
      checkAuth()
    }, 2000)

  }, [document.cookie])
    
  async function checkAuth(){
    // console.log(document.cookie.split("isAuth=")[1] === 'true')
    // console.log((document.cookie.split("isAuth=")[1]) === 'true' ? true : false)
    setAuth(getCookie("isAuth") === 'true' ? true : false)
    return true
  }

  function getCookie(name:any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';')?.shift();
  }

  return (
    <div className="mx-0 mt-0 mb-3">
      <BrowserRouter>
        <Navbar/>
        <ScrollTop threshold={50}/>
        <div className="mx-3 mb-4">
          <Routes>
            <Route path="/grb">
              <Route path="" element={<Home/>} />
              <Route path="about" element={<About/>}/>
              <Route path="index.html" element={<Navigate to="/grb/" replace />}>
                <Route path="?source=uberhub" element={<UHCC/>} />
                <Route path="?source=length" element={<CheckLength/>} />
              </Route>
              <Route path="uberhub" element={<UHCC/>}/>
              <Route path="functionalities">
                <Route path="" element={<Functionalities/>}/>
                <Route path="compare" element={<Compare/>}/>
                <Route path="length" element={<CheckLength/>}/>
                <Route path="transform" element={<Transform/>}/>
              </Route>
              {/* <Route path="/grb" element={<Navigate to="/" replace />}/> */}
              <Route path="404" element={<NotFound/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="internal">
                {getAuth
                  ?
                    <>
                      <Route path="" element={<HomeInternal/>}/>
                      <Route path="uhcc" element={<UHCC/>}/>
                    </>
                  : 
                    <>
                      <Route path="" element={document.cookie.indexOf("isAuth=true") === -1 && <Navigate to="/grb/404" replace />}/>
                      {/* <Route path="*" element={<Navigate to="/grb/404" replace />}/> */}
                    </>
                }
              </Route>
            </Route>
            {/* <Route path="*" element={<Navigate to="/grb/404" replace />} /> */}
            <Route path="/" element={<Navigate to="/grb/" replace />} />
          </Routes>
        </div>
        <Footer/>
        {/* <FooterMessage/> */}
      </BrowserRouter>
    </div>

  );
}

export default App;
