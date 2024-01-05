import React from 'react';

import css from './Header.module.css';
import {SelectInput} from "../SelectInput/SelectInput";
import logoImg from "../../assets/img/rest-icon.svg";
import PropTypes from "prop-types";
import {Container} from "@mui/material";

const Header = ({children}) => {
    return (
        <header className={`${css.header}`}>
            <div className={'flexWrap container'}>
                <SelectInput/>
                <img src={logoImg} alt={'companyLogo'} className={css.headerLogo}/>
                {children}
            </div>
        </header>
    );
};

Header.propTypes = {
    children: PropTypes.node,
};

export {Header};


