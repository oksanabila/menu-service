import React, { createContext, useContext, useState } from 'react';

const UpdateContext = createContext();

export const useUpdate = () => useContext(UpdateContext);

export const UpdateProvider = ({ children }) => {
    const [update, setUpdate] = useState(false);

    const triggerUpdate = () => {
        setUpdate(prev => !prev);
    };

    return (
        <UpdateContext.Provider value={{ triggerUpdate }}>
            {children}
        </UpdateContext.Provider>
    );
};
