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
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// import getLinkData from '../assets/links.json'; //dev
const linkConfig = "https://raw.githubusercontent.com/gabrielrbernardi/grb/main/webserver/src/assets/links.json";
const errorDataAxiosJson = ["error", "Erro!", "Erro ao buscar arquivo de configurações."]

const UHCC = () => {
    const [getLinkData, setLinkData] = useState({actualCycle: "", actualClass: "", rootRepo: "", aula:[], inic1:[], inic2:[], inter1:[]});
    const [getLoading, setLoading] = useState(true);   
    const [getUserOptions, setUserOptions] = useState<any>();
    const [getUserName, setUserName] = useState<any>('');
    const [getSelectedLink, setSelectedLink] = useState<any>('');
    
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
        await apiGrb.get(`links/filtered/${getUserName}`)
        .then((response) => {setLinkData(response.data.links); setLoading(false)})
        .catch((err) => {
            setLoading(false);
            setLinkData(err?.response?.data?.links || null);
            // <Toast type={errorDataAxiosJson[0]} title={errorDataAxiosJson[1]} message={errorDataAxiosJson[2]}/>
            //@ts-ignore
            ReactDOM.hydrateRoot(document.getElementById("root") as HTMLElement, <Toast type={errorDataAxiosJson[0]} title={errorDataAxiosJson[1]} message={err?.response?.data?.error || errorDataAxiosJson[2]}/>);
        });
    }

    const onRowSelect = async (event:any) => {
        window.open(`${event.data.Link}`, "_blank");
        setTimeout(()=>{setSelectedLink('')}, 500)
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
                <DataTable className='outline-none' value={arrayComponent} responsiveLayout="scroll" selectionMode="single" 
                    onRowSelect={onRowSelect} size="small" removableSort sortField="NameLink" sortOrder={1}
                    selection={getSelectedLink} onSelectionChange={e => setSelectedLink(e.value)}
                >
                    <Column field="NameLink" header="Nome" style={{width:'15%'}}></Column>
                    <Column field="Description" header="Descrição" className="text-overflow-ellipsis" style={{width:'30%'}}></Column>
                    <Column field="BadgeType" header="Status" body={statusBadgeTypeTemplate} style={{width:'20%'}}></Column>
                    {!getUserName && 
                        <Column field="UsernameCreation" header="Instrutor" body={UserLinkTemplate} style={{width:'35%'}}></Column>
                    }
                </DataTable>
            )
        }
    }

    const statusBadgeTypeTemplate = (rowData: any) => {
        if(rowData.Badge){
            return <Tag value={rowData.BadgeLabel} severity={rowData.BadgeType} className="ml-2"/>;
        }else{
            return <></>
        }
    }

    const UserLinkTemplate = (rowData: any) => {
        if(rowData.UsernameCreation === "admin") {
            rowData.UsernameCreation = "";
            return "Todos"
        }
        if(rowData.UsernameCreation){
            if(getUserOptions){
                return <>{getUserOptions?.find((x:any) => x.value == rowData.UsernameCreation).label}</>;
            }else{
                return <></>
            }
        }else{
            return <></>
        }
    }

    const rightContents = (
        <React.Fragment>
            <Button icon="pi pi-refresh" loading={getLoading} onClick={fetchData} className="mr-2 p-button-sm" />
        </React.Fragment>
    );

    const onUserChange = (e: { label?: any, value: any }) => {
        setUserName(e.value);
    }
    
    const leftContents = (
        <React.Fragment>
            <>
            <Dropdown className="col-12 w-full my-0 py-0" value={getUserName} options={getUserOptions} onHide={fetchData} onChange={e => {onUserChange(e)}} placeholder="Selecione o Instrutor" disabled={getLoading}/>
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
                <Toolbar className="sticky h-auto py-2 toolbar-uhcc z-3" left={leftContents} right={rightContents} />

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