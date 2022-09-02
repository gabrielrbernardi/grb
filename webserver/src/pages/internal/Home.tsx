import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { render } from '@testing-library/react';
import InstructorsListLinks from '../../components/InstructorsListLinks';
import apiGrb from '../../services/apiGrb';
import Toast from '../../components/Toast';
import DataTableUsers from './DataTableUsers';
import { Accordion, AccordionTab } from 'primereact/accordion';
import DataTableLevels from './DataTableLevels';
import DataTableCycles from './DataTableLinks';
import DataTableLinks from './DataTableLinks';
import DataTableInstructors from './DataTableInstructors';

const HomeInternal = (props:any) => {
    const [getAdminStatus, setAdminStatus] = useState<boolean>();

    useEffect(() => {
        checkAuth()
        // setInterval(() => {
        //     checkAuth()
        // }, 2000)

    }, [document.cookie])
        
    async function checkAuth(){
        await apiGrb.get(`/user/checkAdmin/${getCookie("id")}`).then(response => {setAdminStatus(response.data.isAdmin)}).catch(err => render(<><Toast type={"error"} title={"Erro!"} message={"Erro ao buscar os valores"}/></>));
        // console.log(document.cookie.split("isAuth=")[1] === 'true')
        // console.log((document.cookie.split("isAuth=")[1]) === 'true' ? true : false)
        // setAdminStatus(getCookie("isAdmin") === 'true' ? true : false)
        return true
    }

    function getCookie(name:any) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';')?.shift();
    }

    return (
        <>
            <div className="grid md:col-9 block mx-auto mt-2">
                {!getAdminStatus && <InstructorsListLinks/>}
                {getAdminStatus && 
                    <Accordion multiple activeIndex={[]}>
                            <AccordionTab header="Usuários">
                                <>
                                    <DataTableUsers/>
                                </>
                            </AccordionTab>
                            <AccordionTab header="Níveis">
                                <>
                                    <DataTableLevels/>
                                </>
                            </AccordionTab>
                            <AccordionTab header="Links">
                                <>
                                    <DataTableLinks/>
                                </>
                            </AccordionTab>
                            <AccordionTab header="Instrutores">
                                <>
                                    <DataTableInstructors/>
                                </>
                            </AccordionTab>
                    </Accordion>
                }
                
            </div>
        </>
    );
}

export default HomeInternal;