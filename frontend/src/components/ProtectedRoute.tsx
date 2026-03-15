import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type React from "react";

interface Props{
    children :React.ReactNode;
}

function ProtectedRoute({children}:Props){
    const {isAuthenticated,isLoading} = useAuth();

    if(isLoading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

    return <>{children}</>
}

export default ProtectedRoute
