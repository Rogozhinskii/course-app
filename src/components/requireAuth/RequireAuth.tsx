import {useAuth} from "../../context/useAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";


export interface IRequireAuthProps {
    allowedRoles: string[];
}

export const RequireAuth = (props: IRequireAuthProps) => {
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => props.allowedRoles.includes(role))
            ? <Outlet/>
            : auth?.email
                ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                : <Navigate to="/login" state={{from: location}} replace/>
    )
}