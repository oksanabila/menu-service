// import React, { useState } from 'react';
//
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import PropTypes from 'prop-types';
// import {CompanyData} from "../CompanyData/CompanyData";
// import SectionsStructure from "../SectionsStructure/SectionsStructure";
// import css from './AdminTabs.module.css'
// import DishForm from "../DishForm/DishForm";
//
//
// function CustomTabPanel(props) {
//     const { children, value, index, ...other } = props;
//
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <div>{children}</div>
//                 </Box>
//             )}
//         </div>
//     );
// }
//
// CustomTabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };
//
// const AdminTabs = () => {
//     const [value, setValue] = useState(0);
//
//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };
//
//     return (
//         <section className={css.tabsPageContainer}>
//             <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={css.tabsWrap}>
//                 <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" orientation="vertical">
//                     <Tab label="Company Data" id="tab-0" aria-labelledby="tab-0" />
//                     <Tab label="Menu" id="tab-1" aria-labelledby="tab-1" />
//                     <Tab label="Dish" id="tab-2" aria-labelledby="tab-2" />
//                 </Tabs>
//             </Box>
//             <CustomTabPanel value={value} index={0}>
//                 <CompanyData/>
//             </CustomTabPanel>
//             <CustomTabPanel value={value} index={1}>
//                 <SectionsStructure/>
//             </CustomTabPanel>
//             <CustomTabPanel value={value} index={2}>
//                 <DishForm/>
//             </CustomTabPanel>
//         </section>
//     );
// };
//
// export { AdminTabs };



// import React, { useState } from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import { useNavigate, Outlet } from 'react-router-dom'; // Import the necessary functions from react-router-dom
// import css from './AdminTabs.module.css';
// import DishForm from '../DishForm/DishForm';
// import CompanyData from '../CompanyData/CompanyData';
// import SectionsStructure from '../SectionsStructure/SectionsStructure';
//
// function AdminTabs() {
//     const [value, setValue] = useState(0);
//     const navigate = useNavigate(); // Hook from react-router-dom
//
//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//         // Update the URL when the tab changes
//         navigate(newValue === 0 ? 'company-data' : newValue === 1 ? 'menu' : 'dish');
//     };
//
//     return (
//         <section className={css.tabsPageContainer}>
//             <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={css.tabsWrap}>
//                 <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" orientation="vertical">
//                     <Tab label="Company Data" id="tab-0" aria-labelledby="tab-0" />
//                     <Tab label="Menu" id="tab-1" aria-labelledby="tab-1" />
//                     <Tab label="Dish" id="tab-2" aria-labelledby="tab-2" />
//                 </Tabs>
//             </Box>
//             <Outlet /> {/* Use Outlet to render child routes */}
//         </section>
//     );
// }
//
// export { AdminTabs };


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import css from './AdminTabs.module.css';
import DishForm from '../DishForm/DishForm';
import {CompanyData} from '../CompanyData/CompanyData';
import SectionsStructure from '../SectionsStructure/SectionsStructure';
import { createTheme } from '@mui/material/styles';
import {Button, ThemeProvider} from "@mui/material";
import * as PropTypes from "prop-types";
import {useCookies} from "react-cookie";
import {Header} from "../../Header/Header";

const tabs = [
    { label: 'Company Data', path: 'company-data' },
    { label: 'Menu', path: 'menu' },
    { label: 'Dish', path: 'dish' },
];

const theme = createTheme({
    palette: {
        secondary: {
            main: '#2e7d32',
        },
        // exit: {
        //     main: '#eb7777',
        // },
        //
        // light: {
        //     main: '#ffffff',
        // },
    },
});

function CustomTabPanel(props) {
    return null;
}

CustomTabPanel.propTypes = {children: PropTypes.node};

function AdminTabs() {
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    useEffect(() => {
        // Определение индекса таба с учетом текущего пути
        const currentTabIndex = tabs.findIndex((tab) => location.pathname.includes(tab.path));

        // Если в пути нет совпадения с каким-либо табом, используем 0 (первый таб) по умолчанию
        setValue(currentTabIndex === -1 ? 0 : currentTabIndex);
    }, [location.pathname]);

    const handleChange = (_, newValue) => {
        const newPath = tabs[newValue].path;
        navigate(`../${newPath}`);
    };
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
    const handleClickAuth = () => {
        removeCookie('authToken', { path: '/admin', expires: new Date(0) });
        console.log('click');
    };

    return (
        <>
            <Header>
                <ThemeProvider theme={theme}>
                    <Button variant="contained"
                            color="error"
                            onClick={handleClickAuth}
                    >Exit</Button>
                </ThemeProvider>
            </Header>
            <section className={css.tabsPageContainer}>
                <ThemeProvider theme={theme}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={css.tabsWrap}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" orientation="vertical" textColor="secondary"
                              indicatorColor="secondary">
                            {tabs.map((tab, index) => (
                                <Tab key={index} label={tab.label} id={`tab-${index}`} aria-labelledby={`tab-${index}`}  className={css.tab}/>
                            ))}
                        </Tabs>
                    </Box>
                </ThemeProvider>
                <div className={css.tabsPanelWrap}>
                    {value === 0 && <CompanyData />}
                    {value === 1 && <SectionsStructure />}
                    {value === 2 && <DishForm />}
                </div>



            </section>
        </>
    );
}

export { AdminTabs };
