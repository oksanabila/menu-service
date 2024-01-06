import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { AdminTabs } from '../../components/admin/AdminTabs/AdminTabs';
import { AuthForm } from '../../components/admin/AuthForm/AuthForm';
import { CompanyData } from '../../components/admin/CompanyData/CompanyData';
import { DishForm } from '../../components/admin/DishForm/DishForm';
import { UpdateProvider } from '../../contexts/AdminUpdateProvider';
import { SectionsStructure } from "../../components/admin/SectionsStructure/SectionsStructure";


const AdminPage = () => {
    const [cookies] = useCookies(['authToken']);
    const isToken = cookies.authToken;

    return (
        <UpdateProvider>
            <Routes>
                <Route path="/*" element={isToken ? (<AdminTabs/>) : (<AuthForm/>)}>
                    <Route path="company-data-tab" element={<CompanyData/>}/>
                    <Route path="menu-tab" element={<SectionsStructure/>}/>
                    <Route path="menu-tab/dish/new?parentId=:parentId" element={<DishForm/>}/>
                    <Route path="menu-tab/dish/:dishId" element={<DishForm/>}/>
                </Route>
            </Routes>
        </UpdateProvider>
    );
};

export {AdminPage};
