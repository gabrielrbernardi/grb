import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { useLocation } from 'react-router-dom';
import { Column } from 'primereact/column';
import api from '../services/apiGithub';
import apiGrb from '../services/apiGrb';

const cicloAtual = "2022-3";

const DataTableRepositories = (props: any) => {
    var repositoryName = "";
    var username = "";
    const [getRepositoryContent, setRepositoryContent] = useState<any>([]);
    const [getActualCycle, setActualCycle] = useState<any>("");
    const [getPath, setPath] = useState(false);
    
    useEffect(() => {
        if(props.username){ username = props.username;}
        else{ username = "gabrielrbernardi"; }

        if(props.repositoryName){ repositoryName = props.repositoryName; }
        else{ repositoryName = "UberHub-Code-Club"; }
        
        if(props.uhcc){ setPath(true); getActualCycleInfo(); }
        getRepositoryInfo()
    },[])

    async function getRepositoryInfo(){ 
        await api.get(`repos/${username}/${repositoryName}/contents`)
        .then(response => {
            if(repositoryName == "UberHub-Code-Club"){
                let lista = response.data
                lista = lista.reverse()
                setRepositoryContent(lista)
            }else{
                setRepositoryContent(response.data)
            }
        })
        .catch(err => {console.log(err) })
    }

    async function getActualCycleInfo(){
        await apiGrb.get("/config/name/actualCycle").then(response => {
            if(response?.data?.config[0]?.ConfigValue){
                setActualCycle(response.data.config[0].ConfigValue);
            }else{
                setActualCycle("")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    
    const nameRepoColumnTemplate = (rowData:any) => {
        if(rowData.type === "dir"){
            if(rowData.name === getActualCycle){
                return (<>
                    <a className="font-bold text-link-special" onClick={() => {window.open(`${rowData.html_url}`, "_blank")}}>{rowData.name}</a>
                    <Tag value={"Ciclo atual"} severity={""} className="ml-2"/>
                </>)
            }else{
                return <a className="font-bold text-link-special" onClick={() => {window.open(`${rowData.html_url}`, "_blank")}}>{rowData.name}</a>
            }
        }else{
            return <a className="text-link-special" onClick={() => {window.open(`${rowData.html_url}`, "_blank")}}>{rowData.name}</a>
        }
    }

    const sizeRepoColumnTemplate = (rowData:any) => {
        if(rowData.size === 0){
            return <a> - </a>
        }else{
            return <a>{rowData.size}</a>
        }
    }

    return (
        <>
            {/* {getPath
                ?
                    <p className="md:ml-4 text-lg">
                        Os códigos desenvolvidos durante as aulas estão disponíveis abaixo:
                    </p>
                : <></>
            } */}
            <DataTable value={getRepositoryContent} className="col-12 md:col-12 md:pl-4 mr-0 pl-0 pr-0 mx-auto" emptyMessage="Repositório vazio.">
                <Column field="name" header="Nome" headerStyle={{ width: '3em' }} body={nameRepoColumnTemplate} />
                <Column field="type" header="Tipo" headerStyle={{ width: '3em' }} />
                <Column field="size" header="Tamanho" headerStyle={{ width: '3em' }} body={sizeRepoColumnTemplate}/>
            </DataTable>
        </>
    )
}

export default DataTableRepositories;