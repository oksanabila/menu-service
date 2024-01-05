import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AdminTabs } from '../../components/admin/AdminTabs/AdminTabs';
import { AuthForm } from '../../components/admin/AuthForm/AuthForm';
import { CompanyData } from '../../components/admin/CompanyData/CompanyData';
import SectionsStructure from '../../components/admin/SectionsStructure/SectionsStructure';
import {DishForm} from '../../components/admin/DishForm/DishForm';
import { useCookies } from 'react-cookie';

const AdminPage = () => {
    const [cookies] = useCookies(['authToken']);
    const isToken = cookies.authToken;

    return (
        <Routes>
            <Route path="/*" element={isToken ? (<AdminTabs />):(<AuthForm />)}>
                <Route path="company-data-tab" element={<CompanyData />} />
                <Route path="menu-tab" element={<SectionsStructure />} />
                <Route path="menu-tab/dish/new?parentId=:parentId" element={<DishForm />} />
                <Route path="menu-tab/dish/:dishId" element={<DishForm/>} />
            </Route>
        </Routes>
    );
};

export {AdminPage};



{/*<Route*/}
{/*    path="menu-tab/dish/"*/}
{/*    element={<DishForm key="new" />}*/}
{/*/>*/}
{/*<Route*/}
{/*    path="menu-tab/dish/:dishId"*/}
{/*    element={<DishForm key={undefined} />}*/}
{/*/>*/}


{/*<Route*/}
{/*    path="menu-tab/dish/*"*/}
{/*    element={<DishForm />}*/}
{/*/>*/}