import React, { useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Tag } from 'primereact/tag';
import DataTableRepositories from '../components/DataTableRepositories';
import axios from 'axios';
// import getLinkData from '../assets/links.json'; //dev
import { Skeleton } from 'primereact/skeleton';
import Toast from '../components/Toast';
import { render } from '@testing-library/react';

const linkConfig = "https://raw.githubusercontent.com/gabrielrbernardi/grb/main/webserver/src/assets/links.json";
const errorDataAxiosJson = ["error", "Erro!", "Erro ao buscar arquivo de configurações."]

const UHCC = () => {
    const [getLinkData, setLinkData] = useState({actualCycle: "", rootRepo: "", aula:[], inic1:[], inic2:[], inter1:[]});
    const [getLoading, setLoading] = useState(true);
    useEffect( () => {
        const fetchData = async () => {
            await axios.get(linkConfig).then((response) => {setLinkData(response.data); setLoading(false)}).catch(err => render(<><Toast type={errorDataAxiosJson[0]} title={errorDataAxiosJson[1]} message={errorDataAxiosJson[2]}/></>))
        }
        fetchData()
    }, [])

    function renderComponent(arrayComponent: any){
        if(getLoading){
            return (<>
                <Skeleton className="mb-2" />
                <Skeleton className="mb-2"/>
                <Skeleton className="mb-2"/>
                <Skeleton />
            </>)
        }else{
            return (
                arrayComponent.map( (value:any, id: any) => {
                    if(value.badge == true){
                        return (
                        <div className="mt-1">
                            <a key={id} className="text-link-special-class" onClick={() => {window.open(`${value.url}`, "_blank")}}>{value.name + " - " + value.subject}</a>
                            <Tag value={value.badgeLabel} severity={value.badgeType} className="ml-2"/>
                            <br/>
                        </div>
                        )
                    }else{
                        return <div className="mt-1"><a key={id} className="text-link-special-class" onClick={() => {window.open(`${value.url}`, "_blank")}}>{value.name + " - " + value.subject}</a><br/></div>
                    }
                })
            )
        }
    }
    
    return (
        <>
            <Accordion multiple activeIndex={[0,1,2]}>
                <AccordionTab header="Links usados nas aulas">
                    {renderComponent(getLinkData.aula)}
                </AccordionTab>
                
                <AccordionTab header="Slides">
                    <Accordion multiple>
                        <AccordionTab header="Iniciante 1">
                            {renderComponent(getLinkData.inic1)}
                        </AccordionTab>
                        <AccordionTab header="Iniciante 2">
                            {renderComponent(getLinkData.inic2)}
                        </AccordionTab>
                        <AccordionTab header="Intermediário 1">
                            {renderComponent(getLinkData.inter1)}
                        </AccordionTab>
                    </Accordion>
                </AccordionTab>

                <AccordionTab header="Códigos">
                    {getLinkData.rootRepo
                        ?
                            <div>
                                <a>Repositório disponível em: </a>
                                <a className="text-link-special-class" onClick={() => {window.open(getLinkData.rootRepo[0], "_blank")}}>{getLinkData.rootRepo[1]}</a>
                            </div>
                        :
                        <Skeleton width="50%" />
                    }
                    <DataTableRepositories uhcc actualCycle={getLinkData.actualCycle}/>
                </AccordionTab>
            </Accordion>
        </>
    )
}

export default UHCC;