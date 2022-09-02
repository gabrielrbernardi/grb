import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { render } from '@testing-library/react';

import apiGrb from '../../../services/apiGrb';
import Toast from '../../../components/Toast';

const UpdateLink = (props:any) => {
    const [getId, setId] = useState<any>();
    const [getNameInstructor, setNameInstructor] = useState<any>();
    const [getDescription, setDescription] = useState<any>();
    const [getLinkUrl, setLinkUrl] = useState<any>();
    const [getLoading, setLoading] = useState(false);


    useEffect(() => {
        setId(props?.id || undefined);
        setNameInstructor(props?.nameInstructor || undefined);
        setDescription(props?.descriptionInstructor || undefined);
        setLinkUrl(props?.urlInstructor || undefined);
    }, []);

    async function handleSubmit(event:any){
        event?.preventDefault();
        setLoading(true);
        await apiGrb.put("/instructor", {id: getId, Name: getNameInstructor, Description: getDescription, Url: getLinkUrl}).then((response:any) => {
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
                <span className="p-float-label mb-4 mt-4">
                    <InputText id="user" className="w-12" value={getNameInstructor} onChange={(e) => {setNameInstructor(e.target.value)}} disabled={getLoading}/>
                    <label htmlFor="user">Nome</label>
                </span>
                <span className="p-float-label mb-2 mt-4">
                    <InputText id="user" className="w-12" value={getDescription} onChange={(e) => {setDescription(e.target.value)}} disabled={getLoading}/>
                    <label htmlFor="user">Descrição</label>
                </span>
                <span className="p-float-label mb-2 mt-4">
                    <InputText id="user" className="w-12" value={getLinkUrl} onChange={(e) => {setLinkUrl(e.target.value)}} disabled={getLoading}/>
                    <label htmlFor="user">URL</label>
                </span>
                <Button type="submit" label="Atualizar" loading={getLoading}/>
            </form>
        </>
    )
}

export default UpdateLink;