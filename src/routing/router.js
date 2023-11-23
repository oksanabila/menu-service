import React from "react";

import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout/MainLayout";
import {NotFoundPage} from "../pages/NotFoundPage/NotFoundPage";
import {AdminPage} from "../components/AdminPage/AdminPage";
import {ReviewPage} from "../pages/ReviewPage/ReviewPage";
import {PrivacyPolicyPage} from "../pages/PrivacyPolicyPage/PrivacyPolicyPage";
import {TermsOfUsePage} from "../pages/TermsOfUsePage/TermsOfUsePage";
import {MenuLayout} from "../layouts/MenuLayout/MenuLayout";

const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout/>,
    },
    {
        path: '/menu',
        element: <MenuLayout/>,
    },
    // {
    //     path: '/review',
    //     element: <ReviewPage/>,
    // },
    {
        path: '*',
        element:  <NotFoundPage/>
    },
    {
        path: '/admin',
        element:  <AdminPage/>
    },
    {
        path: '/privacy-policy',
        element:  <PrivacyPolicyPage/>
    },
    {
        path: '/terms-of-use',
        element:  <TermsOfUsePage/>
    }

]);

export {router};
