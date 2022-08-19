import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const RestrictedContents = (props: any) => {
    const [getInstructor, setInstructor] = useState<any>('');
    const [getInstructorOptions, setInstructorOptions] = useState<any>([])
    const [getFiles, setFiles] = useState<any>({})
    const [getValues, setValues] = useState<any>([])

    useEffect(() => {
        setTimeout(() => {
            setInstructorOptions(props?.data?.instructors)
            setFiles(props?.data?.restrictedFiles)
        }, 1000)
        console.log(props?.data?.instructors)
    }, [])

    function submitForm(event?:any){
        event?.preventDefault();
        setValues(getFiles)
    }

    function renderComponent(arrayComponent: any){
        return (
            arrayComponent.map( (value:any, id: any) => {
                console.log(value.name.toLowerCase())
                if(value.name.toLowerCase().includes(getInstructor?.code)){
                    return (
                        <tr className="mt-1">
                            <td key={id} className="text-link-special-class" onClick={() => {window.open(`${value.url}`, "_blank")}}>{value.name + " - " + value.obs}</td>
                        {/* <Tag value={value.badgeLabel} severity={value.badgeType} className="ml-2"/> */}
                        </tr>
                    )
                }
            })
        )
    }


    return (<>
        <form onSubmit={submitForm} className="mb-3">
            <a>Selecione o instrutor:</a>
            <div className="mt-2 p-inputgroup col-6 pl-0">
                <Button icon="pi pi-file" className="p-button-secondary" type="button"/>
                <Dropdown optionLabel="name" value={getInstructor} options={getInstructorOptions} onChange={(e) => setInstructor(e.value)} placeholder="Selecione o instrutor"/>
                <Button icon="pi pi-search" className="p-button-info" type="submit"/>
            </div>
            {renderComponent(getValues)}
        </form>
    </>)
}

export default RestrictedContents;