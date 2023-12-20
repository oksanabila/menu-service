import React, { useEffect, useState } from 'react';
import css from './CompanyTitleInfo.module.css';
import logoImg from "../../assets/img/rest-bg.jpg";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import {companyService} from "../../services";

const CompanyTitleInfo = () => {
    const [companyData, setCompanyData] = useState(null);

    // useEffect(() => {
    //     companyService.getAll()
    //         .then(response => setCompanyData(response.data.companyInfo))
    //         .catch(error => console.error('Error fetching company data:', error));
    // }, []);

    useEffect(() => {
        companyService.getAll()
            .then(response => {
                console.log('Company Data:', response.data.companyInfo);

                // Зберегти отримані дані у стані компоненту
                setCompanyData(response.data.companyInfo);
            })
            .catch(error => console.error('Error fetching company data:', error));
    }, []);
    console.log(companyData);
    if (!companyData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <img src={logoImg} alt={'companyLogo'} className={css.companyLogo} />
            <section className={'container'}>
                <h1 className={css.title}>{companyData.name}</h1>
                <div className={css.descrShort}>{companyData.title}</div>
                <div className={css.descrLong}>{companyData.description}</div>
                <div className={'container'}>
                    <Link to={`/menu`} className={'btn-wrap'}>
                        <Button className={'btn'} size="large" variant="contained" color="success">Open menu</Button>
                    </Link>
                </div>
            </section>
            <section className={css.contacts}>
                <div className={'container'}>
                </div>
            </section>
            <section className={css.social}>
                <div className={'container'}>
                    <h3>Social media:</h3>
                </div>
            </section>
        </>
    );
};

export { CompanyTitleInfo };


