import React, { useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Tag } from 'primereact/tag';
import { render } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';
import axios from 'axios';
import Toast from '../components/Toast';
import ExercisesUHCC from '../components/ExercisesUHCC';
import DataTableRepositories from '../components/DataTableRepositories';
import RestrictedContents from '../components/RestrictedContents';
import { Button } from 'primereact/button';

// import getLinkData from '../assets/links.json'; //dev

const linkConfig = "https://raw.githubusercontent.com/gabrielrbernardi/grb/main/webserver/src/assets/links.json";
const errorDataAxiosJson = ["error", "Erro!", "Erro ao buscar arquivo de configurações."]

const UHCC = () => {
    const navigate = useNavigate();
    const [getLinkData, setLinkData] = useState({actualCycle: "", actualClass: "", rootRepo: "", aula:[], inic1:[], inic2:[], inter1:[]});
    const [getLoading, setLoading] = useState(true);
    const [getInstructorsData, setInstructorsData] = useState();
    const [ queryParams, setSearchParams ] = useSearchParams();
    
    useEffect( () => {
        const fetchData = async () => {
            await axios.get(linkConfig).then((response) => {setLinkData(response.data); setLoading(false);}).catch(err => render(<><Toast type={errorDataAxiosJson[0]} title={errorDataAxiosJson[1]} message={errorDataAxiosJson[2]}/></>))
        }
        
        setLoading(true)
        fetchData()
    }, [])
    
    function renderRestrictedComponent(){
        if(queryParams.get("options") == "restricted"){
            return(<>
                {getLoading
                    ?
                        <></>
                    :
                        <RestrictedContents data={getInstructorsData}/>
                }
            </>)
        }else{
            <></>
        }
    }

    function renderComponent(arrayComponent: any){
        if(getLoading){
            return (<div>
                <Skeleton width='50%' />
                <Button />
            </div>)
            // return <Skeleton width="50%" />
        }else{
            return (
                arrayComponent.map( (value:any, id: any) => {
                    if(value.badge == true){
                        return (
                            <tr className="mt-1">
                            <td key={id} className="text-link-special-class" onClick={() => {window.open(`${value.url}`, "_blank")}}>{value.name + " - " + value.subject}</td>
                            <Tag value={value.badgeLabel} severity={value.badgeType} className="ml-2"/>
                            </tr>
                            )
                        }else{
                            return <tr className="mt-1"><a key={id} className="text-link-special-class" onClick={() => {window.open(`${value.url}`, "_blank")}}>{value.name + " - " + value.subject}</a></tr>
                        }
                })
            )
        }
    }
    
    return (
        <>
            {renderRestrictedComponent()}
            <Accordion multiple activeIndex={[1,2,3]}>
                <AccordionTab header="Gerador de links Neps/Beecrowd">
                    <ExercisesUHCC/>
                </AccordionTab>
                <AccordionTab header="Links usados nas aulas">
                    {/* <table> */}
                        {renderComponent(getLinkData.aula)}
                    {/* </table> */}
                </AccordionTab>
                
                <AccordionTab header="Slides">
                    <Accordion multiple activeIndex={parseInt(getLinkData.actualClass)}>
                        <AccordionTab header="Iniciante 1">
                            {/* <table> */}
                                {renderComponent(getLinkData.inic1)}
                            {/* </table> */}
                        </AccordionTab>
                        <AccordionTab header="Iniciante 2">
                            {/* <table> */}
                                {renderComponent(getLinkData.inic2)}
                            {/* </table> */}
                        </AccordionTab>
                        <AccordionTab header="Intermediário 1">
                            {/* <table> */}
                                {renderComponent(getLinkData.inter1)}
                            {/* </table> */}
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