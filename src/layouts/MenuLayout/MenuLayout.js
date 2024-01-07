import React from 'react';

import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import {MenuPage} from "../../pages/MenuPage/MenuPage";
import {Route, Routes, useParams} from "react-router-dom";

const MenuLayout = () => {
    const { companyLink, tabName } = useParams();

    return (
        <>
            <Header/>
            <MenuPage companyLink={companyLink} activeTab={tabName} />

            {/*<MenuPage/>*/}
            {/*<Footer/>*/}
        </>
    );
};

export {MenuLayout};