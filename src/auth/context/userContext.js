import React, {useState} from 'react';

export const UserContext = React.createContext();


export const UserProvider = ({children}) => {
    const [userID, setUserID] = useState('');

    const setUser = (userID) => {
        setUserID(userID);
    }

    return (
        <UserContext.Provider value= {{userID, setUserID, setUser}}>
            {children}
        </UserContext.Provider>

    )
}
