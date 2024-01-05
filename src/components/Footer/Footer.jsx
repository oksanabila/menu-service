import React from 'react';

import css from "../Footer/Footer.module.css";
import {Link} from "react-router-dom";


const Footer = () => {
    return (
        <footer className={css.footer}>
            {/*<Link to={`/privacy-policy`} className={css.footerLink}>Privacy policy</Link>*/}
            {/*<Link to={`/terms-of-use`} className={css.footerLink}>Terms of use</Link>*/}
        </footer>
    );
};

export {Footer};