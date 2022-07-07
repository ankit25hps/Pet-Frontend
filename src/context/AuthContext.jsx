import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')));
    }, []);
    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
