import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import api from '../../services/apiGithub';

const DataTableGithubTextLinks = () => {
    const [getTextLinks, setTextLinks] = useState();
    const [getSelectedLink, setSelectedLink] = useState<any>();

    useEffect(() => {
        getGithubDataTextLinks()
    }, [])
    
    async function getGithubDataTextLinks(){
        api.get(`repos/gabrielrbernardi/grb/contents/webserver/src/assets/textFiles`).then((response: any) =>{
            setTextLinks(response.data)
        })
    }

    const onRowSelect = (event:any) => {
        window.open(`${event.data.download_url}`, "_blank");
        setTimeout(()=>{setSelectedLink("")}, 500)
    }

    const nameTemplate = (rowData: any) => {
        let tempString = rowData.name;
        tempString = tempString.replace(" demais", " geral")
        tempString = tempString.replace(".txt", "")
        return <a className="capitalize">{"Turma(s) " + tempString}</a>
    }

    return (
        <>
            <a>Clique nas turmas abaixo para abrir o arquivo com usuários</a>
            <DataTable value={getTextLinks} selectionMode="single" sortField="name" removableSort sortOrder={1} onRowSelect={onRowSelect} selection={getSelectedLink} onSelectionChange={e => setSelectedLink(e.value)}>
                <Column field="name" header="Nome" body={nameTemplate}></Column>
            </DataTable>
        </>
    )
}

export default DataTableGithubTextLinks;
