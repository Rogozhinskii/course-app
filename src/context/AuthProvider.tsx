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
    loadingAuth: boolean;
}

export const AuthProvider = ({children}: IAuthProviderProps) => {
    const [auth, setAuth] = useState<IAuthUser | null>(null)
    const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMe = async () => {
            dispatch(setLoadingAC(true))
            setLoadingAuth(true)
            try {
                const user = await coursesAPI.me();
                setAuth({
                    userId: user.id,
                    email: user.email,
                    roles: user.roles.map((r: any) => r.name),
                });

            } catch {
                setAuth(null);
            } finally {
                dispatch(setLoadingAC(false));
                setLoadingAuth(false);
            }
        }
        fetchMe();
    }, [dispatch])


    return (
        <AuthContext.Provider value={{auth, setAuth, loadingAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;