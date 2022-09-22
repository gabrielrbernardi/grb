import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import ReactDOM from 'react-dom/client';
import InstructorsListLinks from '../../components/InstructorsListLinks';
import apiGrb from '../../services/apiGrb';
import Toast from '../../components/Toast';
import DataTableUsers from './DataTableUsers';
import { Accordion, AccordionTab } from 'primereact/accordion';
import DataTableLevels from './DataTableLevels';
import DataTableCycles from './DataTableLinks';
import DataTableLinks from './DataTableLinks';
import DataTableInstructors from './DataTableInstructors';
import DataTableConfigs from './DataTableConfigs';

const HomeInternal = (props:any) => {
    const [getAdminStatus, setAdminStatus] = useState<boolean>();
    const [getInstructorStatus, setInstructorStatus] = useState<boolean>();
    const [getOtherStatus, setOtherStatus] = useState<boolean>();

    useEffect(() => {
        checkAuth()
        // setInterval(() => {
        //     checkAuth()
        // }, 2000)

    }, [document.cookie])
        
    async function checkAuth(){
        let id_usuario = getCookie("id")
        await apiGrb.get(`/user/checkAdmin/${id_usuario}`)
        .then(async (response) => {
            if(response){
                setAdminStatus(response.data.isAdmin)
                if(response.data.isAdmin === false){
                    await apiGrb.get(`/user/checkInstructor/${id_usuario}`)
                    .then((res) => {
                        if(res){
                            setInstructorStatus(res.data.isInstructor)
                            if(res.data.isInstructor === false){
                                setOtherStatus(res.data.isInstructor)
                            }
                        }
                    }).catch(err => {
                        //@ts-ignore
                        ReactDOM.hydrateRoot(document.getElementById("root") as HTMLElement, <Toast type={"error"} title={"Erro!"} message={"Erro ao buscar os valores"}/>);
                    })
                }
            }
        }).catch(err => {
            //@ts-ignore
            ReactDOM.hydrateRoot(document.getElementById("root") as HTMLElement, <Toast type={"error"} title={"Erro!"} message={"Erro ao buscar os valores"}/>);
        });
        return true
    }

    function getCookie(name:any) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';')?.shift();
    }

    return (
        <>
            <div className="grid md:col-11 block mx-auto mt-2">
                {!getAdminStatus && !getInstructorStatus && getOtherStatus && <InstructorsListLinks/>}
                {/* {getInstructorStatus || getAdminStatus ?
                    <>
                        <div className="block text-center text-3xl mx-auto mb-2">Painel de controle</div>
                    </>
                    :<></>
                } */}
                {getInstructorStatus &&
                    <Accordion multiple activeIndex={[]}>
                        <AccordionTab header="Links">
                        <>
                            <DataTableLinks isAdmin={getAdminStatus}/>
                        </>
                        </AccordionTab>
                        <AccordionTab header="Configurações">
                            <>
                                <DataTableConfigs isAdmin={getAdminStatus}/>
                            </>
                        </AccordionTab>
                    </Accordion>
                }
                {getAdminStatus && 
                    <Accordion multiple activeIndex={[]}>
                            <AccordionTab header="Usuários">
                                <>
                                    <DataTableUsers/>
                                </>
                            </AccordionTab>
                            <AccordionTab header="Links">
                                <>
                                    <DataTableLinks isAdmin={getAdminStatus}/>
                                </>
                            </AccordionTab>
                            <AccordionTab header="Níveis">
                                <>
                                    <DataTableLevels/>
                                </>
                            </AccordionTab>
                            <AccordionTab header="Instrutores">
                                <>
                                    <DataTableInstructors/>
                                </>
                            </AccordionTab>
                            <AccordionTab header="Configurações">
                                <>
                                    <DataTableConfigs isAdmin={getAdminStatus}/>
                                </>
                            </AccordionTab>
                    </Accordion>
                }
                
            </div>
        </>
    );
}

export default HomeInternal;