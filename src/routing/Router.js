import React from 'react';
import {Routes, Route} from 'react-router-dom';

import {AppRoutes} from './AppRoutes'
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { MenuLayout } from '../layouts/MenuLayout/MenuLayout';
import { AdminPage } from '../pages/AdminPage/AdminPage';

const Router = () => {

    return (
          <Routes>
              <Route path={AppRoutes.MAIN} element={<MainLayout />} />
              <Route path={AppRoutes.MENU} element={<MenuLayout />} />
              <Route path={AppRoutes.NOT_FOUND_PAGE} element={<NotFoundPage />} />
              <Route path={AppRoutes.ADMIN} element={<AdminPage />}/>
          </Routes>
    );
};

export {Router};
