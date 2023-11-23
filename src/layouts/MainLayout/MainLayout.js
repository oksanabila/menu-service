import React from 'react';

import {Header} from "../../components/Header/Header";
import {CompanyTitleInfo} from "../../components/CompanyTitleInfo/CompanyTitleInfo";
import {Footer} from "../../components/Footer/Footer";
import cssHeader from "../../components/Header/Header.module.css"

const MainLayout = () => {
    return (
        <>
            <Header className={cssHeader.headerOpacity}/>
            <CompanyTitleInfo/>
            <Footer/>
        </>
    );
};

export {MainLayout};