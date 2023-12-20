import React from 'react';

import { BrowserRouter as AdminRouter, Routes, Route } from 'react-router-dom';
import {AdminTabs} from "./components/AdminTabs/AdminTabs";
import {AuthForm} from "./components/AuthForm/AuthForm";
import {CompanyData} from "./components/CompanyData/CompanyData";
import {DishForm} from "./components/DishForm/DishForm";
import {SectionsStructure} from "./components/SectionsStructure/SectionsStructure";
import {AdminPage} from "./pages/AdminPage/AdminPage";

const AdminRouterComponent = () => (
    <AdminRouter basename="/admin">
        <Routes>
            <Route path="/" element={<AdminPage />}>
                <Route index element={<AdminTabs />} />
                <Route path="auth" element={<AuthForm />} />
                <Route path="company-data" element={<CompanyData />} />
                <Route path="dish" element={<DishForm />} />
                <Route path="sections" element={<SectionsStructure />} />
            </Route>
        </Routes>
    </AdminRouter>
);

export {AdminRouterComponent};
