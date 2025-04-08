import { Routes, Route } from "react-router";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

import { AuthLayout } from "../components/AuthLayout";
import { NotFound } from "../pages/NotFound";


export function AuthRoutes(){

    return (
        <Routes>

            <Route path="https://ramonvbn.github.io/refund-frontend/" element={<AuthLayout/>}>

            <Route path="https://ramonvbn.github.io/refund-frontend/" element= {<SignIn/>}/>
            <Route path="https://ramonvbn.github.io/refund-frontend/signup" element= {<SignUp/>}/>
            </Route>

            <Route path="*" element={<NotFound/>}/>

        </Routes>
    )
}