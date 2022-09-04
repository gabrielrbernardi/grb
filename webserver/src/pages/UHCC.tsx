import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Skeleton } from 'primereact/skeleton';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import ExercisesUHCC from '../components/ExercisesUHCC';
import DataTableRepositories from '../components/DataTableRepositories';
import apiGrb from '../services/apiGrb';
import Toast from '../components/Toast';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';

// import getLinkData from '../assets/links.json'; //dev
const linkConfig = "https://raw.githubusercontent.com/gabrielrbernardi/grb/main/webserver/src/assets/links.json";
const errorDataAxiosJson = ["error", "Erro!", "Erro ao buscar arquivo de configurações."]

const UHCC = () => {
    const [getLinkData, setLinkData] = useState({actualCycle: "", actualClass: "", rootRepo: "", aula:[], inic1:[], inic2:[], inter1:[]});
    const [getLoading, setLoading] = useState(true);   
    const [getUserOptions, setUserOptions] = useState<any>();
    const [getUser, setUser] = useState<any>('');
    
    useEffect( () => {
        fetchUsers()
        fetchData()
    }, [])
    
    const fetchUsers = async () => {
        setLoading(true);
        await apiGrb.get("/user/filtered")
        .then(response => {
            let list = [{}];
            list.pop();
            list.push({label: "Todos", value: ""})
            response.data.users.map((valor:any, id:any) => {
                list.push({label: valor.Name, value: valor.Username})
            })
            setUserOptions(list)
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            //@ts-ignore
            ReactDOM.hydrateRoot(document.getElementById("root") as HTMLElement, <Toast type={"error"} title={"Erro!"} message={err?.response?.data?.error || "Erro na listagem de níveis!"}/>)
        });
    }

    const fetchData = async () => {
        setLoading(true)
        await apiGrb.get(`links/filtered/${getUser}`)
        .then((response) => {setLinkData(response.data.links); setLoading(false)})
        .catch((err) => {
            setLoading(false);
            // <Toast type={errorDataAxiosJson[0]} title={errorDataAxiosJson[1]} message={errorDataAxiosJson[2]}/>
            //@ts-ignore
            ReactDOM.hydrateRoot(document.getElementById("root") as HTMLElement, <Toast type={errorDataAxiosJson[0]} title={errorDataAxiosJson[1]} message={errorDataAxiosJson[2]}/>);
        });
    }

    function renderComponent(arrayComponent: any){
        if((!arrayComponent || arrayComponent.length == 0) && !getLoading){
            return(
                <>
                    <td className="text-link-special-class fadein animation-duration-400">Não há links cadastrados</td>
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
                    if(value?.Badge == true){
                        return (
                            <tr className="mt-1 fadein animation-duration-400">
                                <td key={id} className="text-link-special-class" onClick={() => {window.open(`${value.Link}`, "_blank")}}>{value.NameLink + " - " + value.Description}</td>
                                <Tag value={value.BadgeLabel} severity={value.BadgeType} className="ml-2"/>
                            </tr>
                            )
                        }else{
                            return <tr className="mt-1 fadein animation-duration-400"><a key={id} className="text-link-special-class" onClick={() => {window.open(`${value.Link}`, "_blank")}}>{value.NameLink + " - " + value.Description}</a></tr>
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

    const onUserChange = (e: { value: any}) => {
        setUser(e.value);
    }
    
    const leftContents = (
        <React.Fragment>
            {/* <>Links</> */}
            {/* <p className="mb-2">Instrutor</p> */}
            <>
            <Dropdown className="col-12 w-full my-0 py-0" value={getUser} options={getUserOptions} onChange={onUserChange} placeholder="Selecione o Instrutor" disabled={getLoading}/>
            <Button onClick={fetchData} icon="pi pi-search" className="col-1 p-button-sm"/>
            </>
        </React.Fragment>
    );

    return (
        <>
            <Accordion className="scalein animation-ease-out">
                <AccordionTab header="Gerador de links Neps/Beecrowd">
                    <ExercisesUHCC/>
                </AccordionTab>
            </Accordion>

            <div className="my-2">
                <Toolbar className="h-auto py-2" left={leftContents} right={rightContents} />
                <Accordion multiple activeIndex={[0,1]}>
                    <AccordionTab header="Aula">
                        {/* <table> */}
                            {renderComponent(getLinkData.aula)}
                        {/* </table> */}
                    </AccordionTab>
                    <AccordionTab header="Slides">
                        <Accordion multiple activeIndex={[0,1,2]}>
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