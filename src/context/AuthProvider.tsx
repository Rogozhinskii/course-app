import React, {createContext, useState} from "react";
import {IAuthUser} from "../interfaces/IAuthUser";


const AuthContext = createContext<IAuthContextType | undefined>(undefined);

interface IAuthProviderProps {
    children: React.ReactNode;
}



interface IAuthContextType {
    auth: IAuthUser | null;
    setAuth: React.Dispatch<React.SetStateAction<IAuthUser | null>>;
}

export const AuthProvider = ({children}: IAuthProviderProps) => {
    const [auth, setAuth] = useState<IAuthUser | null>(null)

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;