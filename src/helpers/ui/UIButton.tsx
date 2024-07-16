import React from 'react';

type UTbuttonType = {
    onclick:()=>void,
    type?:'submit' | 'reset',
    className:string,
    id?:string
}

const UIbutton  = ({ onclick, type, className,id }:UTbuttonType) => {
    return (
        <>
            <button
                onClick={onclick}
                type={type}
                className={className ? className :""}
                id = {id && id}>
                Verify
            </button>
        </>
    );
}

export default UIbutton;