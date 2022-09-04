import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import apiGrb from '../../services/apiGrb';
import Toast from '../../components/Toast';
import UpdateLink from './Links/UpdateLink';
import UpdateLinkStatus from './Links/UpdateLinkStatus';
import CreateNewLink from './Links/CreateNewLink';
import DeleteLink from './Links/DeleteLink';
import UpdateLinkBadge from './Links/UpdateLinkBadge';
import UpdateLinkOwner from './Links/UpdateLinkOwner';

const DataTableLinks = (props: any) => {
    const [getIsAdmin, setIsAdmin] = useState<any>();
    
    const [getCycles, setCycles] = useState();
    const [getLoading, setLoading] = useState(true);
    const [getSelectedLink, setSelectedLinnk] = useState({});
    const [getShowDialogUpdate, setShowDialogUpdate] = useState(false);
    const [getShowDialogCreate, setShowDialogCreate] = useState(false);
    const [getEditableStatus, setEditableStatus] = useState('');

    const [getId, setId] = useState<any>();
    const [getNameLink, setNameLink] = useState<any>();
    const [getDescription, setDescription] = useState<any>();
    const [getLevel, setLevel] = useState<any>();
    const [getLinkUrl, setLinkUrl] = useState<any>();
    const [getActive, setActive] = useState<any>();
    const [getBadge, setBadge] = useState<any>();
    const [getBadgeLabel, setBadgeLabel] = useState<any>();
    const [getBadgeType, setBadgeType] = useState<any>();
    const [getOwner, setOwner] = useState<any>();

    const [getFilterValue, setFilterValue] = useState('');
    const [getFilter, setFilter] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'representative': { value: null, matchMode: FilterMatchMode.IN },
        'status': { value: null, matchMode: FilterMatchMode.EQUALS },
        'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const statusPossibilitiesUpdate = [
        {label: 'Atualizar Link', value: "updateLevel"},
        {label: 'Atualizar Status', value: "updateLevelStatus"},
        {label: 'Atualizar Badge', value: "updateLevelBadge"},
        {label: 'Atualizar Propriedade', value: "updateLevelOwner"},
        {label: 'Excluir Link', value: "deleteLevel"},
    ];

    useEffect(() => {
        setIsAdmin(props?.isAdmin || false)
        fetchData();
    }, []);

    async function fetchData(){
        setLoading(true);
        if(props?.isAdmin === true){
            await apiGrb.get(`links`)
            .then(response => {
                setCycles(response.data.links);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                //@ts-ignore
                ReactDOM.hydrateRoot(document.getElementById("root") as HTMLElement, <Toast type={"error"} title={"Erro!"} message={"Erro ao buscar os valores."}/>);
            })
        }else{
            await apiGrb.get(`links/instructor`)
            .then(response => {
                setCycles(response.data.links);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                //@ts-ignore
                ReactDOM.hydrateRoot(document.getElementById("root") as HTMLElement, <Toast type={"error"} title={"Erro!"} message={"Erro ao buscar os valores."}/>);
            })

        }
    }

    const statusActiveTemplate = (rowData: any) => {
        if(rowData.Active === true){
            return <Tag value={"Sim"} icon="pi pi-check" severity={"success"} className="ml-2"/>
        }else{
            return <Tag value={"Não"} icon="pi pi-times" severity={"danger"} className="ml-2"/>            
        }
    }

    const statusBadgeTemplate = (rowData: any) => {
        if(rowData.Badge === true){
            return <Tag value={"Sim"} icon="pi pi-check" severity={"success"} className="ml-2"/>
        }else{
            return <Tag value={"Não"} icon="pi pi-times" severity={"danger"} className="ml-2"/>            
        }
    }

    const statusBadgeTypeTemplate = (rowData: any) => {
        if(rowData.Badge){
            return <Tag value={rowData.BadgeLabel} severity={rowData.BadgeType} className="ml-2"/>;
        }else{
            return <></>
        }
    }

    const handleFilterChange = (e:any) => {
        const value = e.target.value;
        let _filters2 = { ...getFilter };
        _filters2['global'].value = value;

        setFilter(_filters2);
        setFilterValue(value);
    }

    const renderHeader2 = () => {
        return (
            <div className="flex justify-content-between">
                <a>Links</a>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={getFilterValue} onChange={handleFilterChange} placeholder="Busca" />
                    <Button className="ml-4" icon="pi pi-plus" tooltip="Criar Link" onClick={() => setShowDialogCreate(true)}/>
                    <Button className="ml-4 p-button-success" icon="pi pi-refresh" tooltip="Atualizar lista" onClick={() => fetchData()} loading={getLoading}/>
                </span>
            </div>
        )
    }
    const header2 = renderHeader2();

    const onRowSelect = (event:any) => {
        setId(event.data.id);
        setNameLink(event.data.NameLink);
        setDescription(event.data.Description);
        setLevel(event.data.Level);
        setLinkUrl(event.data.Link);
        setActive(event.data.Active);
        setBadge(event.data.Badge);
        setBadgeLabel(event.data.BadgeLabel);
        setBadgeType(event.data.BadgeType);
        setOwner(event.data.UsernameCreation);
        setShowDialogUpdate(true);
    }

    const handleHide = () => {
        setShowDialogCreate(false); 
        setShowDialogUpdate(false); 
        setSelectedLinnk({}); 
        fetchData();
        setEditableStatus('');
    }
    
    return (
        <>
            <DataTable value={getCycles} responsiveLayout="stack" paginator rows={10} rowsPerPageOptions={[5,10,25,50]} emptyMessage="Link não encontrado." 
                            header={header2} filters={getFilter} loading={getLoading} resizableColumns columnResizeMode="expand" removableSort selectionMode="single" 
                            selection={getSelectedLink} onSelectionChange={e => setSelectedLinnk(e.value)} dataKey="id" onRowSelect={onRowSelect} metaKeySelection={false}>
                <Column field="NameLink" header="Nome" sortable></Column>
                <Column field="Description" header="Descrição" sortable></Column>
                <Column field="Level" header="Nível" sortable></Column>
                <Column field="Link" header="Link" sortable></Column>
                <Column field="Active" header="Ativo?" body={statusActiveTemplate} sortable></Column>
                <Column field="Badge" header="Badge" body={statusBadgeTemplate} sortable></Column>
                <Column field="BadgeType" header="Tipo Badge" body={statusBadgeTypeTemplate} sortable></Column>
                <Column field="UsernameCreation" header="Criado por" sortable></Column>
            </DataTable>

            <Dialog className="z-1" header="Criar Link" visible={getShowDialogCreate} onHide={() => {handleHide()}} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} draggable={false} maximizable dismissableMask>
                <CreateNewLink/>
            </Dialog>

            <Dialog className="z-1" header={`Gerenciar Link ${getNameLink}`} visible={getShowDialogUpdate} onHide={() => {handleHide()}} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} draggable={false} maximizable dismissableMask>
                <div className="mb-5">
                    <p className="my-2">Tipo:</p>
                    <Dropdown className="col-12" value={getEditableStatus} options={statusPossibilitiesUpdate} onChange={(e) => setEditableStatus(e.value)} optionLabel="label" placeholder="Selecione um tipo de gerenciamento" />
                </div>
                {getEditableStatus === "updateLevel" && <UpdateLink id={getId} nameLink={getNameLink} descriptionLink={getDescription} levelLink={getLevel} urlLink={getLinkUrl}/>}
                {getEditableStatus === "updateLevelStatus" && <UpdateLinkStatus id={getId} linkActive={getActive}/>}
                {getEditableStatus === "updateLevelBadge" && <UpdateLinkBadge id={getId} linkBadge={getBadge} linkBadgeLabel={getBadgeLabel} linkBadgeType={getBadgeType}/>}
                {getEditableStatus === "updateLevelOwner" && <UpdateLinkOwner id={getId} linkOwner={getOwner}/>}
                {getEditableStatus === "deleteLevel" && <DeleteLink id={getId}/>}
            </Dialog>
        </>
    )
}

export default DataTableLinks;