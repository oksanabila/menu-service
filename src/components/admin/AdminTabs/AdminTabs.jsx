import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {Button, Container, ThemeProvider} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useCookies} from "react-cookie";
import {Header} from "../../Header/Header";
import {ConfirmationDialog} from "../../Dialog/ConfirmationDialog/ConfirmationDialog";
import {CompanyData} from '../CompanyData/CompanyData';
import {SectionsStructure} from "../SectionsStructure/SectionsStructure";
import css from './AdminTabs.module.css';
import * as PropTypes from "prop-types";


const tabs = [
    { label: 'Company Data', path: 'company-data-tab' },
    { label: 'Menu', path: 'menu-tab' },
];
const theme = createTheme({
    palette: {
        secondary: {
            main: '#2e7d32',
        },
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
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);


    useEffect(() => {
        const currentTabIndex = tabs.findIndex(tab => location.pathname.startsWith(`/admin/${tab.path}`));
        setValue(currentTabIndex === -1 ? 0 : currentTabIndex);
    }, [location.pathname]);

    const handleChange = (_, newValue) => {
        navigate(`/admin/${tabs[newValue].path}`);

    };
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
    const handleClickAuth = () => {
        setConfirmDialogOpen(true);
    };
    const handleConfirmationSubmit = (confirm) => {
        if (confirm) {
            removeCookie('authToken', { path: '/admin', expires: new Date(0) });
        }
        setConfirmDialogOpen(false);
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
            <Container maxWidth="xl">
                <section className={css.tabsPageContainer}>
                    <ThemeProvider theme={theme}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={css.tabsWrap}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  orientation={isMdUp ? "vertical" : "horizontal"} textColor="secondary"
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
                    </div>
                </section>
            </Container>
            <ConfirmationDialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={handleConfirmationSubmit}
                text="Are you sure you want to exit?"
                title="Exit"
            />
        </>
    );
}

export { AdminTabs };
