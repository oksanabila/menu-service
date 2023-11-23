import React from 'react';
import {Header} from "../../components/Header/Header";

const NotFoundPage = () => {
    return (
        <div className={'notFound'}>
            <Header/>
            <h1>Oops.. this page was not found</h1>
        </div>
    );
};

export {NotFoundPage};