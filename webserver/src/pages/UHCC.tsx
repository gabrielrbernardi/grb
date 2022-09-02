import React, { useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Tag } from 'primereact/tag';
import { render } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import Toast from '../components/Toast';
import ExercisesUHCC from '../components/ExercisesUHCC';
import DataTableRepositories from '../components/DataTableRepositories';
import apiGrb from '../services/apiGrb';

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
        
        fetchData()
    }, [])
    
    const fetchData = async () => {
        setLoading(true)
        await apiGrb.get("links/filtered").then((response) => {setLinkData(response.data.links); setLoading(false)}).catch((err) => render(<><Toast type={errorDataAxiosJson[0]} title={errorDataAxiosJson[1]} message={errorDataAxiosJson[2]}/></>));

        // await axios.get(linkConfig).then((response) => {console.log(response); setLinkData(response.data); setLoading(false);}).catch(err => render(<><Toast type={errorDataAxiosJson[0]} title={errorDataAxiosJson[1]} message={errorDataAxiosJson[2]}/></>))
    }

    function renderComponent(arrayComponent: any){
        if(!arrayComponent || arrayComponent.length == 0){
            return(
                <>
                    <td className="text-link-special-class">Não há links cadastrados</td>
               </>
            );
        }
        if(getLoading){
            return (<div>
                <Skeleton className="mb-2" width='50%' />
                <Skeleton className="mb-2" width='50%' />
                <Skeleton className="mb-2" width='50%' />
                <Skeleton width='50%' />
                {/* <Button /> */}
            </div>)
            // return <Skeleton width="50%" />
        }else{
            return (
                arrayComponent.map( (value:any, id: any) => {
                    if(value.badge == true){
                        return (
                            <tr className="mt-1">
                            <td key={id} className="text-link-special-class" onClick={() => {window.open(`${value.Link}`, "_blank")}}>{value.NameLink + " - " + value.Description}</td>
                            {/* <Tag value={value.badgeLabel} severity={value.badgeType} className="ml-2"/> */}
                            </tr>
                            )
                        }else{
                            return <tr className="mt-1"><a key={id} className="text-link-special-class" onClick={() => {window.open(`${value.Link}`, "_blank")}}>{value.NameLink + " - " + value.Description}</a></tr>
                        }
                })
            )
        }
    }

    const rightContents = (
        <React.Fragment>
            <Button icon="pi pi-refresh" loading={getLoading} onClick={fetchData} className="mr-2 p-button-sm" />
            {/* <Button icon="pi pi-calendar" className="p-button-success mr-2 p-button-sm" />
            <Button icon="pi pi-times" className="p-button-danger p-button-sm" /> */}
        </React.Fragment>
    );
    
    const leftContents = (
        <React.Fragment>
            <>Links</>
        </React.Fragment>
    );

    return (
        <>
            <Accordion className="scalein animation-ease-out animation-duration-500">
                <AccordionTab header="Gerador de links Neps/Beecrowd">
                    <ExercisesUHCC/>
                </AccordionTab>
            </Accordion>

            <div className="my-4">
                <Toolbar className="h-auto py-2" left={leftContents} right={rightContents} />
                <Accordion multiple activeIndex={[0,1]}>
                    <AccordionTab header="Aula">
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
                </Accordion>
            </div>

            <Accordion>
                <AccordionTab header="Códigos">
                    {!getLoading
                        ?
                            <div>
                                <a>Repositório disponível em: </a>
                                <a className="text-link-special-class" onClick={() => {window.open("https://github.com/gabrielrbernardi/UberHub-Code-Club", "_blank")}}>{"GitHub UberHub Code Club GRB"}</a>
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