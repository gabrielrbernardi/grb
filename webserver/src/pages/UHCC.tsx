import React, { useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Tag } from 'primereact/tag';
import DataTableRepositories from '../components/DataTableRepositories';
import axios from 'axios';
// import getLinkData from '../assets/links.json';
import { Skeleton } from 'primereact/skeleton';
import { MdBadge } from 'react-icons/md';

const UHCC = () => {
    const [getLinkData, setLinkData] = useState({aula:[], inic1:[], inic2:[], inter1:[]});
    const [getLoading, setLoading] = useState(true);
    useEffect( () => {
        const fetchData = async () => {
            await axios.get("https://raw.githubusercontent.com/gabrielrbernardi/grb/main/webserver/src/assets/links.json").then((response) => {setLinkData(response.data); setLoading(false)})
        }
        fetchData()
    }, [])
    
    return (
        <>
            <Accordion multiple activeIndex={[0,1,2]}>
                <AccordionTab header="Links usados nas aulas">
                    {getLoading 
                        ? 
                            <>
                                <Skeleton className="mb-2" />
                                <Skeleton className="mb-2"/>
                                <Skeleton className="mb-2"/>
                                <Skeleton />
                            </>
                        : 
                            getLinkData.aula.map( (value:any, id: any) => {
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
                    }
                </AccordionTab>
                
                <AccordionTab header="Slides">
                    <Accordion multiple>
                        <AccordionTab header="Iniciante 1">
                            {getLoading 
                                ? 
                                    <>
                                    <Skeleton className="mb-2" />
                                    <Skeleton className="mb-2"/>
                                    <Skeleton className="mb-2"/>
                                    <Skeleton />
                                </>
                                : 
                                    getLinkData.inic1.map( (value:any, id: any) => {
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
                            }
                        </AccordionTab>
                        <AccordionTab header="Iniciante 2">
                            {getLoading 
                                ? 
                                    <>
                                    <Skeleton className="mb-2" />
                                    <Skeleton className="mb-2"/>
                                    <Skeleton className="mb-2"/>
                                    <Skeleton />
                                </>
                                : 
                                    getLinkData.inic2.map( (value:any, id: any) => {
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
                            }
                        </AccordionTab>
                        <AccordionTab header="Intermediário 1">
                            {getLoading 
                                ? 
                                    <>
                                    <Skeleton className="mb-2" />
                                    <Skeleton className="mb-2"/>
                                    <Skeleton className="mb-2"/>
                                    <Skeleton />
                                </>
                                : 
                                    getLinkData.inter1.map( (value:any, id: any) => {
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
                            }
                        </AccordionTab>
                    </Accordion>
                </AccordionTab>

                <AccordionTab header="Códigos">
                    <div>
                        <a>Repositório disponível em: </a>
                        <a className="text-link-special-class" onClick={() => {window.open(`https://github.com/gabrielrbernardi/UberHub-Code-Club`, "_blank")}}>{"Github UberHub Code Club GRB"}</a>

                    </div>
                    <DataTableRepositories uhcc/>
                </AccordionTab>
            </Accordion>
        </>
    )
}

export default UHCC;