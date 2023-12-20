import React from 'react';
import { BrowserRouter as CommonRouter, Routes, Route } from 'react-router-dom';
import {HomePage} from "./pages/HomePage/HomePage";
import {MenuPage} from "./pages/MenuPage/MenuPage";


const CommonRouterComponent = () => (
    <CommonRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
        </Routes>
    </CommonRouter>
);

export default CommonRouterComponent;
