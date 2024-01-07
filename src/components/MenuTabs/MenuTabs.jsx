// import React, {useEffect, useState} from 'react';
//
// import {Tab, TabPanel, Tabs, TabsList} from "@mui/base";
// import css from './MenuTabs.module.css'
// import {SubMenuTabs} from "../SubMenuTabs/SubMenuTabs";
// import {companyService} from "../../services";
// import {useParams} from "react-router-dom";
// import {baseURL} from "../../constants";
//
// const MenuTabs = () => {
//     const [menuData, setMenuData] = useState(null);
//     const { companyLink } = useParams();
//     console.log(companyLink);
//     console.log(`${baseURL}/${companyLink}`);
//     useEffect(() => {
//         if (companyLink) {
//             companyService.getAll(`${baseURL}/${companyLink}`)
//                 .then(response => {
//                     console.log(response.data.menu);
//                     setMenuData(response.data.menu);
//                 })
//                 .catch(error => console.error('Error fetching company data:', error));
//         }
//         // companyService.getAll(`${baseURL}/${companyLink}`)
//         //     .then(response => {
//         //         console.log(response.data.menu);
//         //
//         //         setMenuData(response.data.menu);
//         //     })
//         //     .catch(error => console.error('Error fetching company data:', error));
//     }, [companyLink]);
//     console.log(menuData);
//     return (
//         <div className={`${css.tabsWrap} container`}>
//             <Tabs defaultValue={`menu`}>
//                 <TabsList className={css.tabsList}>
//                     {menuData && menuData.filter(category => category.active).map(category => (
//                         <Tab key={category.id} value={category.name} className={css.menuTab}>
//                             {category.name}
//                         </Tab>
//                     ))}
//                 </TabsList>
//                 {menuData && menuData.filter(category => category.active).map(category => (
//                     <TabPanel key={category.id} value={category.name}>
//
//                         <SubMenuTabs subsections={category.subsections} menuData={menuData} />
//                     </TabPanel>
//                 ))}
//             </Tabs>
//         </div>
//     );
// };
//
// export { MenuTabs };



import React, { useEffect, useState } from 'react';
import { Tab, TabPanel, Tabs, TabsList } from "@mui/base";
import css from './MenuTabs.module.css';
import { SubMenuTabs } from "../SubMenuTabs/SubMenuTabs";
import { companyService } from "../../services";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../../constants";
import {useMenuData} from "../../contexts/MenuProvider";
import {Header} from "../Header/Header";
import {Button, ThemeProvider} from "@mui/material";

const MenuTabs = () => {
    const { companyLink } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const currentTabName = new URLSearchParams(location.search).get('tab');
    // const {  menuData, setMenuData } = useMenuData();
    const {  menuData, setMenuData } = useMenuData();

    // const [menuData, setMenuData] = useState(null);

    // useEffect(() => {
    //     if (companyLink) {
    //         companyService.getAll(`${baseURL}/${companyLink}`)
    //             .then(response => {
    //                 const menu = response.data.menu;
    //                 setMenuData(menu);
    //                 if (menu.length > 0 && (!currentTabName || currentTabName === 'menu')) {
    //                     navigate(`/${companyLink}/menu?tab=${menu[0].name}`, { replace: true });
    //                 }
    //             })
    //             .catch(error => console.error('Error fetching company data:', error));
    //     }
    // }, [companyLink, navigate, currentTabName]);


    useEffect(() => {
        if (companyLink) {
            companyService.getAll(`${baseURL}/${companyLink}`)
                .then(response => {
                    setMenuData(response.data.menu);
                    if (!currentTabName && response.data.menu.length > 0) {
                        navigate(`/${companyLink}/menu?tab=${response.data.menu[0].name}`, { replace: true });
                    }
                })
                .catch(error => console.error('Error fetching company data:', error));
        }
    }, [companyLink, navigate, currentTabName, setMenuData]);

console.log(menuData);
    const handleTabChange = (event, newValue) => {
        navigate(`/${companyLink}/menu?tab=${newValue}`);
    };

    return (
       <>
           <div className={`${css.tabsWrap} container`}>
               <Tabs value={currentTabName || (menuData && menuData.length > 0 ? menuData[0].name : '')} onChange={handleTabChange}>
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
       </>
    );
};

export { MenuTabs };
