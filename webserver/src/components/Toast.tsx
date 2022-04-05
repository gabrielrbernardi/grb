import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useEffect } from 'react';

const ToastComponent = (props: any) => {
    const toast: any = useRef(null);
    
    useEffect(() => {
        showToast();
    })

    function checkSeverity(){
        return (props.type ? props.type : "error");
    }
    
    function checkTitle(){
        return (props.message ? props.title : "Error Title");
    }
    
    function checkMessage(){
        return (props.message ? props.message : "Error Message");
    }
    
    const showToast = () => {
        toast.current.show({severity: checkSeverity(), summary: checkTitle(), detail: checkMessage(), life: 3000, closable: true});
    }

    return (
        <>
            <Toast position="bottom-right" ref={toast} style={{zIndex: 9}} />
        </>
    );
}

export default ToastComponent;