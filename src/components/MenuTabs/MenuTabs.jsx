import React, {useEffect, useState} from 'react';


import {Tab, TabPanel, Tabs, TabsList} from "@mui/base";
import css from './MenuTabs.module.css'
import {SubMenuTabs} from "../SubMenuTabs/SubMenuTabs";
import {companyService} from "../../services";

const MenuTabs = () => {
    const [menuData, setMenuData] = useState(null);

    useEffect(() => {
        companyService.getAll()
            .then(response => {
                console.log('Company Data:', response.data.menu);

                setMenuData(response.data.menu);
            })
            .catch(error => console.error('Error fetching company data:', error));
    }, []);

    return (
        <div className={`${css.tabsWrap} container`}>
            <Tabs defaultValue={`menu`}>
                <TabsList className={css.tabsList}>
                    {menuData && menuData.map(category => (
                        <Tab key={category.id} value={category.name} className={css.menuTab}>
                            {category.name}
                        </Tab>
                    ))}
                </TabsList>
                {menuData && menuData.map(category => (
                    <TabPanel key={category.id} value={category.name}>
                        <SubMenuTabs subsections={category.subsections} />
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export { MenuTabs };
