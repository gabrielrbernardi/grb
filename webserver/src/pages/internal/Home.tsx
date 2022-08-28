import React from 'react';
import { Button } from 'primereact/button';
import RestrictedContents from '../../components/RestrictedContents';

const HomeInternal = (props:any) => {
    return (
        <>
            <div className="grid md:col-6 block mx-auto mt-2">
                <RestrictedContents/>
            </div>
        </>
    );
}

export default HomeInternal;