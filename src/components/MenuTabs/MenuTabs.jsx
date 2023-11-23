import React from 'react';


import {Tab, TabPanel, Tabs, TabsList} from "@mui/base";
import css from './MenuTabs.module.css'
import {SubMenuTabs} from "../SubMenuTabs/SubMenuTabs";


const MenuTabs = () => {


    return (
        <div className={`${css.tabsWrap} container`}>
            <Tabs defaultValue={`menu`}>
                <TabsList className={css.tabsList}>
                    <Tab value={`menu`} className={css.menuTab}>Food</Tab>
                    <Tab value={`bar`} className={css.menuTab}>Drinks</Tab>
                </TabsList>
                <TabPanel value={`menu`}>
                    <SubMenuTabs/>
                </TabPanel>
                <TabPanel value={`bar`}>
                    <SubMenuTabs/>
                </TabPanel>
            </Tabs>
        </div>
    );
};


export {MenuTabs};
