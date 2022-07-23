import React, { useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import DataTableRepositories from '../components/DataTableRepositories';
import linkData from '../assets/links.json';

const UHCC = () => {
    // useEffect(() => {
    //     console.log(linkData.data[0].name);
    // }, [])
    
    return (
        <>
            <Accordion multiple activeIndex={[0,1]}>
                <AccordionTab header="Links usados nas aulas">
                    {linkData.aula.map( (value:any, id: any) => <><a key={id} className="text-link-special-class" onClick={() => {window.open(`${value.url}`, "_blank")}}>{value.name + " - " + value.subject}</a><br/></> )}            
                </AccordionTab>
                
                <AccordionTab header="Slides">
                    <Accordion multiple>
                        <AccordionTab header="Iniciante 1">
                            {linkData.inic1.map( (value:any, id: any) => <><a key={id} className="text-link-special-class" onClick={() => {window.open(`${value.url}`, "_blank")}}>{value.name + " - " + value.subject}</a><br/></> )}
                        </AccordionTab>
                        <AccordionTab header="Iniciante 2">
                            {linkData.inic2.map( (value:any, id: any) => <><a key={id} className="text-link-special-class" onClick={() => {window.open(`${value.url}`, "_blank")}}>{value.name + " - " + value.subject}</a><br/></> )}
                        </AccordionTab>
                        <AccordionTab header="Intermediário 1">
                            {linkData.inter1.map( (value:any, id:any) => <><a key={id} className="text-link-special-class" onClick={() => {window.open(`${value.url}`, "_blank")}}>{value.name + " - " + value.subject}</a><br/></> )}
                        </AccordionTab>
                    </Accordion>
                </AccordionTab>

                <AccordionTab header="Códigos">
                    <DataTableRepositories uhcc/>
                </AccordionTab>
            </Accordion>
        </>
    )
}

export default UHCC;