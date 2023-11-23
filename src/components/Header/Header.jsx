import React from 'react';

import css from './Header.module.css';
import {SelectInput} from "../SelectInput/SelectInput";
import logoImg from "../../assets/img/rest-icon.svg";
import {SideMenu} from "../SideMenu/SideMenu";

const Header = () => {

    return (
        <header className={`${css.header} container`}>
            <img src={logoImg} alt={'companyLogo'} className={css.headerLogo}/>
            <SelectInput  />
            {/*<SideMenu/>*/}
        </header>
    );
};

export {Header};


