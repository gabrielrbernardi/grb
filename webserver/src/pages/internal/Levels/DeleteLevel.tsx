import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { render } from '@testing-library/react';
import { Dropdown } from 'primereact/dropdown';

import Toast from '../../../components/Toast';
import apiGrb from '../../../services/apiGrb';

const DeleteLevel = (props:any) => {
    const [getId, setId] = useState<any>();
    const [getOption, setOption] = useState<any>(null);
    const [getLoading, setLoading] = useState(false);
    
    const statusPossibilities = [
        {label: 'Sim', value: true},
        {label: 'Não', value: false},
    ];

    useEffect(() => {
        setId(props?.id || undefined);
    },[])

    function handleSubmit(event:any){
        event?.preventDefault();
        if(getOption === true){
            confirm2();
        }else{
            render(<><Toast type={"error"} title={"Erro!"} message={"Operação cancelada!"}/></>)
        }
    }
    
    async function handleDelete(){
        setLoading(true);
        await apiGrb.delete(`/level/${getId}`)
            .then((response:any) => {
                setLoading(false);
                render(<><Toast type={"success"} title={"Excluído!"} message={response?.data?.data || "Excluído com sucesso!"}/></>)
            }).catch(err => {
                setLoading(false);
                render(<><Toast type={"error"} title={"Erro!"} message={err?.response?.data?.error || "Erro na exclusão!"}/></>)
            })    
    }

    const confirm2 = () => {
        confirmDialog({
            message: 'Deseja exluir esse nível?',
            header: 'Confirmação de exclusão',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => {handleDelete()},
            reject: () => {<><Toast type={"error"} title={"Erro!"} message={"Operação cancelada!"}/></>}
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p className="my-2">Excluir?</p>
                <Dropdown disabled={getLoading} className="col-12 mb-3" value={getOption} options={statusPossibilities} onChange={(e) => setOption(e.value)} placeholder="Selecione a opção"/>
                <Button type="submit" className="p-button-danger" label="Confirmar" loading={getLoading}/>
            </form>
        </>
    )
}

export default DeleteLevel;