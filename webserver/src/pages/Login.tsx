import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { useState } from 'react';
import { render as w } from '@testing-library/react';
import apiGrb from '../services/apiGrb';
import ToastComponent from '../components/Toast';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [getUser, setUser] = useState<string>();
    const [getPass, setPass] = useState<string>();

    const [getMessageError, setMessageError] = useState<string>();

    const [getLoading, setLoading] = useState<boolean>(false);

    function handleSubmit(event:any){
        event?.preventDefault();
        setLoading(true)
        apiGrb.post("login", {Username: getUser, Password: getPass}).then(response => {
            document.cookie = "isAuth=true;path=/"
            setTimeout(() => {
                if(response?.data?.data?.Admin){
                    document.cookie = `isAdmin=true; path=/`;
                }else{
                    document.cookie = `isAdmin=false; path=/`;
                }
                if(response?.data?.data?.id){
                    document.cookie = `id=${response?.data?.data?.id}; path=/`
                    apiGrb.defaults.headers.common['id_usuario'] = response?.data?.data?.id;
                }
                // console.log(response?.data?.data?.Username)
                // console.log(response?.data?.data?.Name)
                // console.log(response?.data?.data?.Active)
                document.cookie = `name=${response?.data?.data?.Name}; path=/`
                // document.cookie = `active=${response?.data?.data?.Active}; path=/grb/internal`
                setLoading(false);
                navigate("/grb/internal")
            }, 2000);
            // return
        }).catch((err) =>{
            setLoading(false)
            setMessageError(err?.response?.data?.error || "Erro no Login!")
        })
    }

    return (
        <div className="flex grid align-content-center login logo-background">
            <form className="bg-black-alpha-30 text-white text-center p-4 border-round mx-auto my-auto md:col-4 col-12" onSubmit={handleSubmit}>
                <h2 className="text-left mb-5">Login</h2>
                {getMessageError
                    ? 
                        <div className="col-12 mb-4">
                            <Message className="col-12" severity="error" text={getMessageError} />
                        </div>
                    : <></>
                }
                <span className="p-float-label mb-4">
                    <InputText id="user" className="w-12" value={getUser} onChange={(e) => {setUser(e.target.value)}} autoFocus disabled={getLoading}/>
                    <label htmlFor="user">Usuário</label>
                </span>

                <span className="p-float-label">
                    <InputText id="user" className="w-12" type={'password'} value={getPass} onChange={(e) => {setPass(e.target.value)}} disabled={getLoading}/>
                    <label htmlFor="pass">Senha</label>
                </span>
                <br/>
                <Button loading={getLoading} type="submit">{!getLoading && "Login"}</Button>
            </form>
        </div>
    )
}

export default Login;