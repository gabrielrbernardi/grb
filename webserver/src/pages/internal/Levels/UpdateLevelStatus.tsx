import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { render } from '@testing-library/react';
import { Dropdown } from 'primereact/dropdown';

import apiGrb from '../../../services/apiGrb';
import Toast from '../../../components/Toast';

const UpdateLevelStatus = (props:any) => {
    const [getId, setId] = useState<any>();
    const [getActive, setActive] = useState<any>('');
    const [getLoading, setLoading] = useState(false);
    
    useEffect(() => {
        setActive((props?.levelActive == true || props?.levelActive == false) ? Boolean(props?.levelActive) : undefined);
        setId(props?.id || undefined);
    }, [])

    const statusPossibilities = [
        {label: 'Sim', value: true},
        {label: 'Não', value: false},
    ];

    async function handleSubmit(event:any){
        event?.preventDefault();
        setLoading(true);
        await apiGrb.put("/level/status", {id: getId, Active: getActive}).then((response:any) => {
            setLoading(false);
            render(<><Toast type={"success"} title={"Atualizado!"} message={response?.data?.data || "Atualizado com sucesso!"}/></>);
        }).catch(err => {
            setLoading(false);
            render(<><Toast type={"error"} title={"Erro!"} message={err?.response?.data?.error || "Erro na atualização!"}/></>)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p className="mb-2">Ativo?</p>
                <Dropdown className="col-12 mb-3" value={getActive} options={statusPossibilities} onChange={(e) => setActive(e.value)} placeholder="Selecione o status" disabled={getLoading}/>
                <Button type="submit" label="Atualizar" loading={getLoading}/>
            </form>
        </>
    )
}

export default UpdateLevelStatus;