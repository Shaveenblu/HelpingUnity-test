import React, { createContext, useState, useContext } from 'react';

// Create a context for the user
const UserContext = createContext();

// Custom hook to use user context
export const useUser = () => {
    return useContext(UserContext);
};

// UserProvider component to wrap the app and provide context values
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};
