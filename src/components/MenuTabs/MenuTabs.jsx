import React, {useEffect, useState} from 'react';

import {Tab, TabPanel, Tabs, TabsList} from "@mui/base";
import css from './MenuTabs.module.css'
import {SubMenuTabs} from "../SubMenuTabs/SubMenuTabs";
import {companyService} from "../../services";
import {useParams} from "react-router-dom";
import {baseURL} from "../../constants";

const MenuTabs = () => {
    const [menuData, setMenuData] = useState(null);
    const { companyLink } = useParams();

    useEffect(() => {
        companyService.getAll()
        companyService.getAll(`${baseURL}/${companyLink}`)
            .then(response => {
                console.log(response.data.menu);

                setMenuData(response.data.menu);
            })
            .catch(error => console.error('Error fetching company data:', error));
    }, [companyLink]);
    console.log(menuData);
    return (
        <div className={`${css.tabsWrap} container`}>
            <Tabs defaultValue={`menu`}>
                <TabsList className={css.tabsList}>
                    {menuData && menuData.filter(category => category.active).map(category => (
                        <Tab key={category.id} value={category.name} className={css.menuTab}>
                            {category.name}
                        </Tab>
                    ))}
                </TabsList>
                {menuData && menuData.filter(category => category.active).map(category => (
                    <TabPanel key={category.id} value={category.name}>

                        <SubMenuTabs subsections={category.subsections} menuData={menuData} />
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export { MenuTabs };
