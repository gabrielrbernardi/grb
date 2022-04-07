import React, { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { SelectButton } from 'primereact/selectbutton';

const Transform = () => {
    const [getInputText, setInputText] = useState<string>('');
    const [getTransformType, setTransformType] = useState<string>('Nenhum');
    const transformOptions = ["Nenhum", "MAIÚSCULO", "minúsculo"];

    return (
        <div className="grid m-0 justify-content-center p-0">
            <div className="md:col-6 col-12 p-0 mb-3">
                <p className="text-center text-xl">Entrada</p>
                <InputTextarea rows={5} className="col-12" value={getInputText} onChange={(e) => {setInputText(e.target.value)}} placeholder="Entrada"/>
                <p className="text-center text-lg">Tipo de transformação</p>
                <SelectButton className="text-center" value={getTransformType} options={transformOptions} onChange={(e) => setTransformType(e.value)} unselectable={false}/>
                {getTransformType !== "Nenhum"
                    ?
                        <div className="mt-3">
                            <p className="text-center text-lg">Saída</p>
                            <InputTextarea rows={5} className="col-12" value={getInputText} onChange={(e) => {setInputText(e.target.value)}} placeholder="Saída"/>
                        </div>
                    : <></>
                }
            </div>
        </div>
    );
}

export default Transform;