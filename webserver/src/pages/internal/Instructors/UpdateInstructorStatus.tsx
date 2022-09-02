import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { render } from '@testing-library/react';
import { Dropdown } from 'primereact/dropdown';

import apiGrb from '../../../services/apiGrb';
import Toast from '../../../components/Toast';

const UpdateInstructorStatus = (props:any) => {
    const [getId, setId] = useState<any>();
    const [getActive, setActive] = useState<any>('');
    const [getLoading, setLoading] = useState(false);
    
    useEffect(() => {
        setId(props?.id || undefined);
        setActive((props?.instructorActive == true || props?.instructorActive == false) ? Boolean(props?.instructorActive) : undefined);
    }, [])

    const statusPossibilities = [
        {label: 'Sim', value: true},
        {label: 'Não', value: false},
    ];

    async function handleSubmit(event:any){
        event?.preventDefault();
        setLoading(true);
        await apiGrb.put("/instructor/status", {id: getId, Active: getActive}).then((response:any) => {
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
                <Dropdown className="col-12 mb-3" disabled={getLoading} value={getActive} options={statusPossibilities} optionValue="value" onChange={(e) => setActive(e.value)} placeholder="Selecione o status"/>
                <Button type="submit" label="Atualizar" loading={getLoading}/>
            </form>
        </>
    )
}

export default UpdateInstructorStatus;