// import React from 'react';
//
// import {AdminTabs} from "../../components/admin/AdminTabs/AdminTabs";
// import {AuthForm} from "../../components/admin/AuthForm/AuthForm";
// import {CookiesProvider, useCookies} from 'react-cookie';
// const AdminPage = () => {
//     const [cookies] = useCookies(['authToken']);
//     const isToken = cookies.authToken;
//
//     return (
//         <CookiesProvider>
//             {isToken ? <AdminTabs/> : <AuthForm/>}
//         </CookiesProvider>
//     );
// };
//
// export default AdminPage;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminTabs } from '../../components/admin/AdminTabs/AdminTabs';
import { AuthForm } from '../../components/admin/AuthForm/AuthForm';
import { CompanyData } from '../../components/admin/CompanyData/CompanyData';
import SectionsStructure from '../../components/admin/SectionsStructure/SectionsStructure';
import DishForm from '../../components/admin/DishForm/DishForm';
import { useCookies } from 'react-cookie';
import {Header} from "../../components/Header/Header";
import {HeaderAuth} from "../../components/Header/HeaderAuth/HeaderAuth";

const AdminPage = () => {
    const [cookies] = useCookies(['authToken']);
    const isToken = cookies.authToken;

    return (
        <>
            {/*<HeaderAuth isToken={isToken}/>*/}
            <Routes>
                <Route path="/" element={isToken ? <AdminTabs/> : <AuthForm/>}>
                    <Route path="company-data" element={<CompanyData />} />
                    <Route path="menu" element={<SectionsStructure />} />
                    <Route path="dish/*" element={<DishForm />} />
                </Route>
            </Routes>
        </>
    );
};

export default AdminPage;
