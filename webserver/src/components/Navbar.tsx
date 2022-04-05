import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {Menubar} from 'primereact/menubar';
import ToastComponent from './Toast';

const Navbar = () => {
    const navigate = useNavigate();
    // const [value, setValue] = useState('');

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
            command: () => {
                navigate('/functionalities')
            }
            
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
    // const end = <InputText placeholder="Search" type="text" />;
    // function final(){
    //     return <ToastComponent title={value}/>
    // }


    return (
        <div className="card mb-2">
            {/* <Menubar model={items} end={final}/> */}
            {/* <input onChange={(e) => { setValue((e.target as HTMLInputElement).value);}}/> */}
            <Menubar model={items}/>
        </div>
    );
}

export default Navbar;