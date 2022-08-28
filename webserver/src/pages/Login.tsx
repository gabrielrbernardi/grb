import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';

const Login = () => {
    const [getValue, setValue] = useState<any>();

    function handleSubmit(event:any){
        event?.preventDefault();
        document.cookie = "isAuth=true;path=/"
    }

    return (
        <div className="flex grid align-content-center login">
            <form className="bg-indigo-500 text-white text-center p-4 border-round mx-auto my-auto col-2" onSubmit={handleSubmit}>
                <InputText value={getValue} onChange={(e) => {setValue(e.target.value)}}/>
                <Button type="submit">dasdsa</Button>
            </form>
        </div>
    )
}

export default Login;