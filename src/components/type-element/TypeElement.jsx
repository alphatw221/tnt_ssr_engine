import React, { useState, useEffect } from 'react';

// import TypeElementCSR from "./TypeElementCSR"
import TypeElementSSR from "./TypeElementSSR"
const TypeElement = ({ mode, ...props}) => {

    const [TypeElementCSR, setTypeElementCSR] = useState(null);

    useEffect(() => {
        if (mode === 'dev') {
            import('./TypeElementCSR')
                .then((mod) => {
                setTypeElementCSR(() => mod.default);
                })
                .catch((err) => {
                console.error('Failed to load TypeElementCSR:', err);
                });
        }
    }, [mode]);

    if (mode === 'dev') {
        if (!TypeElementCSR) {
            return null;
        }
        return <TypeElementCSR mode={mode} {...props} />;
    }


    if( mode=='dev')return <TypeElementCSR mode={mode} {...props}/>
    return <TypeElementSSR mode={mode} {...props}/>
}

export default TypeElement;