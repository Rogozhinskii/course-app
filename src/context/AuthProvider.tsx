import React, {createContext, useEffect, useState} from "react";
import {IAuthUser} from "../interfaces/IAuthUser";
import {coursesAPI} from "../state/api";
import {useDispatch} from "react-redux";
import {setLoadingAC} from "../state/app-reducer";


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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoadingAC(true))
        coursesAPI.me()
            .then(user => {
                setAuth({
                    email: user.email,
                    roles: user.roles.map((r:any) => r.name)
                })
                console.log(user);
            })
            .catch(() => setAuth(null))
            .finally(() => dispatch(setLoadingAC(false)))
    }, [])


    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;