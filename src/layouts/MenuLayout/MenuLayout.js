import React from 'react';

import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import {MenuPage} from "../../pages/MenuPage/MenuPage";

const MenuLayout = () => {
    return (
        <>
            <Header/>
            <MenuPage/>
            <Footer/>
        </>
    );
};

export {MenuLayout};