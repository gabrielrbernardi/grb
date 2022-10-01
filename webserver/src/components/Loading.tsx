import React from 'react';

import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = () => {

    return (
        <div className="loading">
            <ProgressSpinner style={{ width: '100px', height: '100px' }} strokeWidth="8" animationDuration="1s" />
            <h3>Carregando! Aguarde...</h3>
        </div>
    )
}

export default Loading;