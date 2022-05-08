import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Image } from 'primereact/image';
import { Message } from 'primereact/message';
// import ToastComponent from './Toast';
import { MdCompareArrows } from 'react-icons/md';
import { AiOutlineColumnWidth } from 'react-icons/ai';
import { GiTransform } from 'react-icons/gi';
import { Button } from 'primereact/button';

const logo = require("../assets/logo.png");

const Navbar = () => {
    const navigate = useNavigate();
    const [getItemsBreadCrumb, setItemsBreadCrumb] = useState<any>([]);
    const [getHideBanner, setHideBanner] = useState<boolean>(false);
    const { pathname } = useLocation();
    // const [value, setValue] = useState('');

    useEffect(() => {
        function splitStringPathname(){
            let tempList:any = []
            let path = "";
            
            for(let x = 0; x < pathname.split("/").length; x++){
                if(pathname.split("/")[x] === ""){
                    continue;
                }
                path += "/" + pathname.split("/")[x];
                let tempPath = path;
                let obj = {"label": (pathname.split("/")[x].charAt(0).toUpperCase() + pathname.split("/")[x].slice(1)), command: () => {navigate(`${tempPath}`)}};
                tempList.push(obj);
            }
            setItemsBreadCrumb(tempList)
        }
        splitStringPathname();

        if(!document.cookie){
            const d = new Date();
            d.setTime(d.getTime() + (30*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = "banner=true; " + expires;
        }
    },[pathname, navigate, document.cookie])

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => {
                navigate('/')
            },
        },
        {
            label: 'Consultar',
            icon: 'pi pi-fw pi-info-circle',
            command: () => {
                navigate('/about')
            }
        },
        {
            label: 'UberHub',
            icon: 'pi pi-fw pi-desktop',
            command: () => {
                navigate('/uberhub')
            }
        },
        {
            label: 'Funcionalidades',
            icon: 'pi pi-fw pi-ellipsis-h',
            template: (item:any, options:any) => {
                return (
                    /* custom element */
                    <Button className={options.className + " my-0 p-button-text"} style={{width: "100%"}} onClick={options.onClick} onMouseOver={() => {}}>
                        <span className="pi pi-fw pi-ellipsis-h mr-2"/>
                        <span className={options.labelClassName}>{item.label}</span>
                        <span className="p-submenu-icon pi pi-angle-down"/>
                    </Button>
                );
            },
            items: [
                {
                    label: 'Comparar',
                    // icon: 'pi pi-fw pi-calendar-plus',
                    template: (item:any, options:any) => {
                        return (
                            /* custom element */
                            <p className={options.className + " my-0 ml-3 lg:ml-0"} onClick={options.onClick}>
                                <MdCompareArrows size={20} className="mr-2"/>
                                <span className={options.labelClassName}>{item.label}</span>
                            </p>
                        );
                    },
                    command: () => {
                        navigate("/functionalities/compare")
                    }
                },
                {
                    label: 'Tamanho',
                    // icon: 'pi pi-fw pi-calendar-plus',
                    template: (item:any, options:any) => {
                        return (
                            /* custom element */
                            <p className={options.className + " my-0 ml-3 lg:ml-0"} onClick={options.onClick}>
                                <AiOutlineColumnWidth size={20} className="mr-2"/>
                                <span className={options.labelClassName}>{item.label}</span>
                            </p>
                        );
                    },
                    command: () => {
                        navigate("/functionalities/length")
                    }
                },
                {
                    label: 'Transformar',
                    // icon: 'pi pi-fw pi-calendar-plus',
                    template: (item:any, options:any) => {
                        return (
                            /* custom element */
                            <p className={options.className + " my-0 ml-3 lg:ml-0"} onClick={options.onClick}>
                                <GiTransform size={20} className="mr-2"/>
                                <span className={options.labelClassName}>{item.label}</span>
                            </p>
                        );
                    },
                    command: () => {
                        navigate("/functionalities/transform")
                    }
                },
            ]
        },
        // {
        //     label: 'Events',
        //     icon: 'pi pi-fw pi-calendar',
        //     items: [
        //         {
        //             label: 'Edit',
        //             icon: 'pi pi-fw pi-pencil',
        //             items: [
        //                 {
        //                     label: 'Save',
        //                     icon: 'pi pi-fw pi-calendar-plus'
        //                 },
        //                 {
        //                     label: 'Delete',
        //                     icon: 'pi pi-fw pi-calendar-minus'
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Archieve',
        //             icon: 'pi pi-fw pi-calendar-times',
                    
        //         }
        //     ]
        // },
        // {
        //     label: 'Quit',
        //     icon: 'pi pi-fw pi-power-off'
        // }
    ];

    function clearCookie(){
        const d = new Date();
        d.setTime(d.getTime() + (180*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = "banner=false; " + expires;
        setHideBanner(true);
    }

    const teste = (
        <>
            <a>Acessar repositório de códigos do UberHub?</a>
            <Button className="ml-2 p-button-secondary p-button-raised" label="Acessar" onClick={() => {navigate('/uberhub'); clearCookie()}} />
            <Button className="ml-2 p-button-danger p-button-raised" label="Cancelar" onClick={() => {clearCookie()}} />
        </>
    )
    
    const home = { icon: 'pi pi-home', command: () => {navigate("/")} }
    const end = <p className="logo m-0 p-0" onClick={() => navigate('/')}><Image src={logo} width="48vh" alt="Logo"/></p>

    return (
        <div className="card mb-2 lg:sticky sm:top-0 z-1">
            {document.cookie !== "banner=true" || pathname === "/uberhub" || getHideBanner
                ?
                    <></>
                :
                    <Message severity="info" className="col-12" text="Message Content" content={teste}/>
            }
            {/* <Menubar model={items} end={final}/> */}
            {/* <input onChange={(e) => { setValue((e.target as HTMLInputElement).value);}}/> */}
            <Menubar model={items} end={end} className="border-none"/>
            <BreadCrumb model={getItemsBreadCrumb} home={home} />
        </div>
    );
}

export default Navbar;