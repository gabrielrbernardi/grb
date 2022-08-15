import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Image } from 'primereact/image';
import { Message } from 'primereact/message';
import { MdCompareArrows } from 'react-icons/md';
import { AiOutlineColumnWidth } from 'react-icons/ai';
import { GiTransform } from 'react-icons/gi';
import { Button } from 'primereact/button';

const logo = require("../assets/logo.png");

const rootPath = "/grb"

const Footer = () => {
    const navigate = useNavigate();
    // const [value, setValue] = useState('');
    
    const bannerSource = (
        <>
            <a>Parâmetro de origem inválido</a>
            {/* <Button className="ml-2 p-button-secondary p-button-raised" label="Acessar" onClick={() => {navigate(rootPath + '/uberhub'); clearCookie()}} />
            <Button className="ml-2 p-button-danger p-button-raised" label="Cancelar" onClick={() => {clearCookie()}} /> */}
        </>
    )
    
    const home = { icon: 'pi pi-home', command: () => {navigate(rootPath + "/")} }
    const end = <p className="logo m-0 p-0" onClick={() => navigate(rootPath + '/')}><Image src={logo} width="48vh" alt="Logo"/></p>

    return (
        <div className="fadeindown animation-duration-1000 animation-ease-in-out fixed mx-auto text-center mb-3 w-full bottom-0 left-0 bg-red-500">
            <div style={{"backgroundColor": "#FF0000"}}>
                TESTE DE MENSAGEM
            </div>
        </div>
    );
}

export default Footer;