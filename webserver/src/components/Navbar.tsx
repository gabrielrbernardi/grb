import React, { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Image } from 'primereact/image';
import { Message } from 'primereact/message';
import { MdCompareArrows } from 'react-icons/md';
import { AiOutlineColumnWidth } from 'react-icons/ai';
import { GiTransform } from 'react-icons/gi';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

const logo = require("../assets/logo.png");

const rootPath = "/grb"

const Navbar = () => {
    const navigate = useNavigate();
    const [getItemsBreadCrumb, setItemsBreadCrumb] = useState<any>([]);
    const [getHideBanner, setHideBanner] = useState<boolean>(false);
    const [getValidSource, setValidSource] = useState<boolean>(true);
    const [ queryParams ] = useSearchParams();
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
                if(pathname.split("/")[x] === "grb"){
                    continue;
                }
                path += "/" + pathname.split("/")[x];
                let tempPath = path;
                let obj = {"label": (pathname.split("/")[x].charAt(0).toUpperCase() + pathname.split("/")[x].slice(1)), command: () => {navigate(rootPath + `${tempPath}`)}};
                tempList.push(obj);
            }
            setItemsBreadCrumb(tempList)
        }
        // document.cookie = "isAuth=true; ";
        splitStringPathname();
        
        if(!document.cookie){
            const d = new Date();
            d.setTime(d.getTime() + (30*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = "banner=true; " + expires;
        }
        if(queryParams.get("source") === "uberhub"){
            navigate(rootPath + '/uberhub')
        }else if(queryParams.get("source") === "compare"){
            navigate(rootPath + '/functionalities/compare')
        }else if(queryParams.get("source") === "length"){
            navigate(rootPath + '/functionalities/length')
        }else if(queryParams.get("source") === "transform"){
            navigate(rootPath + '/functionalities/transform')
        }else if(queryParams.get("options") == "restricted"){
            navigate(rootPath + '/uberhub?options=restricted')
        }
        else if(!queryParams.get("source")){
            setValidSource(true)
        }
        else{
            setValidSource(false)
            setTimeout(() => {
                setValidSource(true)
            }, 8000)
        }
    },[pathname, navigate, document.cookie])

    const restrictedMenuItem = () => {
        if(!checkCookie()){
            return {
                label: 'Área restrita',
                icon: 'pi pi-fw pi-lock',
                command: () => {
                    navigate(rootPath + '/internal')
                },
            }
        }else{
            return {
                label: '',
                icon: '',
                className: "hidden"
            }
            // return {}
        }        
    }

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => {
                navigate(rootPath + '/')
            },
        },
        {
            label: 'Consultar',
            icon: 'pi pi-fw pi-github',
            command: () => {
                navigate(rootPath + '/about')
            }
        },
        {
            label: 'UberHub',
            icon: 'pi pi-fw pi-desktop',
            command: () => {
                navigate(rootPath + '/uberhub')
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
                        navigate(rootPath + "/functionalities/compare")
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
                        navigate(rootPath + "/functionalities/length")
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
                        navigate(rootPath + "/functionalities/transform")
                    }
                },
            ]
        },
        restrictedMenuItem()

    ];

    function clearCookie(){
        const d = new Date();
        d.setTime(d.getTime() + (180*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = "banner=false; " + expires;
        setHideBanner(true);
    }

    function getCookie(name:any) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';')?.shift();
      }

    function handleLogout(){
        document.cookie = "isAuth=false; path=/; Secure"
        document.cookie = "name=; path=/; Secure"
        document.cookie = "id=; path=/; Secure"
        const d = new Date();
        // document.cookie = "name=false; path=/grb/internal"
        // document.cookie = "username=false; path=/grb/internal"
        // document.cookie = "active=false; path=/grb/internal"
        navigate("grb/login")
    }

    function checkCookie(){
        return document.cookie.indexOf("isAuth=true") === -1;
    }

    const bannerUHCC = (
        <>
            <a>Acessar repositório de códigos do UberHub?</a>
            <Button className="ml-2 p-button-secondary p-button-raised" label="Acessar" onClick={() => {navigate(rootPath + '/uberhub'); clearCookie()}} />
            <Button className="ml-2 p-button-danger p-button-raised" label="Cancelar" onClick={() => {clearCookie()}} />
        </>
    )
    
    const bannerSource = (
        <>
            <a>Parâmetro de origem inválido</a>
            {/* <Button className="ml-2 p-button-secondary p-button-raised" label="Acessar" onClick={() => {navigate(rootPath + '/uberhub'); clearCookie()}} />
            <Button className="ml-2 p-button-danger p-button-raised" label="Cancelar" onClick={() => {clearCookie()}} /> */}
        </>
    )
    
    const home = { icon: 'pi pi-home', command: () => {navigate(rootPath + "/")} }
    const end = ( 
        <div className="inline-flex">
            {/* <Button icon="pi pi-times" className="p-button-rounded p-button-outlined mr-2 p-button-danger" aria-label="Submit" onClick={() => navigate("internal/uhcc")} /> */}
            {checkCookie() 
                ?
                    <>
                        <Button icon="pi pi-sign-in" className="p-button-rounded p-button-outlined mr-2" tooltip="Login" tooltipOptions={{position: 'left'}} aria-label="Submit" onClick={() => navigate("grb/login")} />
                    </>
                :
                    <>
                        {/* <a className="my-auto mr-2">Olá {getCookie("name")}!</a> */}
                        {/* <Avatar label={getCookie("name")} className="mr-2" size="normal" shape="circle" /> */}
                        <Button icon="pi pi-sign-out" className="p-button-rounded p-button-outlined mr-2 p-button-danger" tooltip="Sair" tooltipOptions={{position: 'left'}} aria-label="Submit" onClick={handleLogout} />
                    </>
            }
            <div className="logo m-0 p-0 flex-1" onClick={() => navigate(rootPath + '/')}>
                <Image src={logo} width="48vh" alt="Logo"/>
            </div>
        </div>
    )

    return (
        <div className="card mb-2 md:sticky md:top-0 z-4">
            {getValidSource
                ? <></>
                : 
                    <>
                        <Message severity="error" className="col-12" content={bannerSource}/>
                    </>
            }

            {/* {document.cookie !== "banner=true" || pathname === "/grb/uberhub" || getHideBanner
                ?
                    <></>
                :
                    <Message severity="info" className="col-12 fadeinup animation-duration-1000 animation-ease-in-out" content={bannerUHCC}/>
            } */}
            {/* <Menubar model={items} end={final}/> */}
            {/* <input onChange={(e) => { setValue((e.target as HTMLInputElement).value);}}/> */}
            <Menubar model={items} end={end} className="border-none"/>
            <BreadCrumb model={getItemsBreadCrumb} home={home} />
        </div>
    );
}

export default Navbar;