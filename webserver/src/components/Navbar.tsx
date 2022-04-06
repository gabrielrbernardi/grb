import React, { useState } from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Image } from 'primereact/image';
// import ToastComponent from './Toast';
import { MdCompareArrows } from 'react-icons/md';
import { useEffect } from 'react';

const logo = require("../assets/logo.png");

const Navbar = () => {
    const navigate = useNavigate();
    const [getItemsBreadCrumb, setItemsBreadCrumb] = useState<any>([]);
    const { pathname } = useLocation();
    // const [value, setValue] = useState('');

    useEffect(() => {
        function leu(){
            let tempList:any = []
            let path = "";
            
            for(let x = 0; x < pathname.split("/").length; x++){
                if(pathname.split("/")[x] == ""){
                    continue;
                }
                path += "/" + pathname.split("/")[x];
                let tempPath = path
                let obj = {"label": (pathname.split("/")[x].charAt(0).toUpperCase() + pathname.split("/")[x].slice(1)), command: () => {navigate(`${tempPath}`)}};
                tempList.push(obj);
            }
            setItemsBreadCrumb(tempList)
        }
        leu();
    },[pathname])

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => {
                navigate('/')
            },
        },
        {
            label: 'Sobre',
            icon: 'pi pi-fw pi-info-circle',
            command: () => {
                navigate('/about')
            }
        },
        {
            label: 'Funcionalidades',
            icon: 'pi pi-fw pi-ellipsis-h',
            // command: () => {
            //     navigate('/functionalities')
            // }
            items: [
                {
                    label: 'Comparação',
                    // icon: 'pi pi-fw pi-calendar-plus',
                    template: (item:any, options:any) => {
                        return (
                            /* custom element */
                            <a className={options.className} target={item.target} onClick={options.onClick}>
                                <MdCompareArrows size={20} className="mr-2"/>
                                <span className={options.labelClassName}>{item.label}</span>
                            </a>
                        );
                    },
                    command: () => {
                        navigate("/functionalities/compare")
                    }
                },
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archieve',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    // const start = <img alt="logo" src={"./src/assets/logo.png"} height="40" className="mr-2"></img>;
    // const end = <input placeholder="Search" type="text" />;
    const end = <a className="logo" onClick={() => navigate('/')}><Image src={logo} width="100vw" alt="Logo"/></a>
    // const itemsBreadCrumb = [
    //     {label: 'Computer'},
    //     {label: 'Notebook'},
    //     {label: 'Accessories'},
    //     {label: 'Backpacks'},
    //     {label: 'Item'}
    // ];
    const home = { icon: 'pi pi-home', command: () => {navigate("/")} }
    // function final(){
    //     return <ToastComponent title={value}/>
    // }


    return (
        <div className="card mb-2">
            {/* <Menubar model={items} end={final}/> */}
            {/* <input onChange={(e) => { setValue((e.target as HTMLInputElement).value);}}/> */}
            <Menubar model={items} end={end} className="border-none"/>
            <BreadCrumb model={getItemsBreadCrumb} home={home} />
        </div>
    );
}

export default Navbar;