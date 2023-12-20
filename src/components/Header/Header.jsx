import React from 'react';

import css from './Header.module.css';
import {SelectInput} from "../SelectInput/SelectInput";
import logoImg from "../../assets/img/rest-icon.svg";
import {SideMenu} from "../SideMenu/SideMenu";
import PropTypes from "prop-types";

const Header = ({ children }) => {

    return (
        <header className={`${css.header} container`}>
            {children}

            <img src={logoImg} alt={'companyLogo'} className={css.headerLogo}/>
           {/*<div className={'flexWrap'}>*/}

            <SelectInput  />
           {/*</div>*/}

            {/*<SideMenu/>*/}
        </header>
    );
};

Header.propTypes = {
    children: PropTypes.node,
};

export {Header};


