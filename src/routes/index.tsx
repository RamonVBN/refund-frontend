import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";

import { Loading } from "../components/Loading";







export function Routes(){
    const {session, isLoading} = useAuth()
    
    
    function Route(){
        switch (session?.userWithoutPassword.role) {
            case "employee":
                
                return <EmployeeRoutes/>;
            
            case 'manager':
                return <ManagerRoutes/>;
        
            default:
                return <AuthRoutes/>;;
        }
    }

    if (isLoading) {
        
        return <Loading/>
    }

    return (
    <BrowserRouter>
        <Route/>
    </BrowserRouter> 
    )
}