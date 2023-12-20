// import React from "react";
//
// import {createBrowserRouter} from "react-router-dom";
// import {MainLayout} from "../layouts/MainLayout/MainLayout";
// import {NotFoundPage} from "../pages/NotFoundPage/NotFoundPage";
// import {PrivacyPolicyPage} from "../pages/PrivacyPolicyPage/PrivacyPolicyPage";
// import {TermsOfUsePage} from "../pages/TermsOfUsePage/TermsOfUsePage";
// import {MenuLayout} from "../layouts/MenuLayout/MenuLayout";
// import AdminPage from "../pages/AdminPage/AdminPage";
// import DishForm from "../components/admin/DishForm/DishForm";
//
// const router = createBrowserRouter([
//     {
//         path: '',
//         element: <MainLayout/>,
//     },
//     {
//         path: '/menu',
//         element: <MenuLayout/>,
//     },
//     {
//         path: '*',
//         element:  <NotFoundPage/>
//     },
//     {
//         path: '/admin',
//         element:  <AdminPage/>,
//         children: [
//             {
//                 path: 'dish-form/edit/:subsectionId',
//                 element: <DishForm editMode />,
//             },
//             {
//                 path: 'dish-form/create',
//                 element: <DishForm />,
//             },
//         ]
//     },
//     {
//         path: '/privacy-policy',
//         element:  <PrivacyPolicyPage/>
//     },
//     {
//         path: '/terms-of-use',
//         element:  <TermsOfUsePage/>
//     }
//
// ]);
//
// export {router};


import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage/PrivacyPolicyPage';
import { TermsOfUsePage } from '../pages/TermsOfUsePage/TermsOfUsePage';
import { MenuLayout } from '../layouts/MenuLayout/MenuLayout';
import AdminPage from '../pages/AdminPage/AdminPage';
import DishForm from '../components/admin/DishForm/DishForm';

const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout />,
    },
    {
        path: '/menu',
        element: <MenuLayout />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
    {
        path: '/admin/*',
        element: <AdminPage />,
    },
    {
        path: '/privacy-policy',
        element: <PrivacyPolicyPage />,
    },
    {
        path: '/terms-of-use',
        element: <TermsOfUsePage />,
    },
]);

export { router };
