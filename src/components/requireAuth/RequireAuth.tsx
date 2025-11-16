import {useAuth} from "../../context/useAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";


export const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth?.accessToken
        ?<Outlet />
            : <Navigate to="/login" state={ {from: location} } replace/>
    )
}