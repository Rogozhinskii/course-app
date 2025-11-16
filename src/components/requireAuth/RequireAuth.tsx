import {useAuth} from "../../context/useAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";


export interface IRequireAuthProps {
    allowedRoles: string[];
}

export const RequireAuth = (props: IRequireAuthProps) => {
    const {auth, loadingAuth} = useAuth();
    const location = useLocation();

    if (loadingAuth) {
        return null
    }

    if (!auth) {
        return (
            <Navigate
                to="/login"
                state={{from: location}}
                replace
            />
        );
    }

    const hasRole = auth.roles.some(role => props.allowedRoles.includes(role));
    if (!hasRole) {
        return (
            <Navigate
                to="/unauthorized"
                state={{from: location}}
                replace
            />
        );
    }
    return <Outlet/>;
}