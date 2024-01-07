import React, { createContext, useContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menuData, setMenuData] = useState(null);

    return (
        <MenuContext.Provider value={{ menuData, setMenuData }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuData = () => useContext(MenuContext);
