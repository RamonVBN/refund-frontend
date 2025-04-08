import { Routes, Route } from "react-router";

import { AppLayout } from "../components/AppLayout";

import { Refund } from "../pages/Refund";
import { Confirm } from "../pages/Confirm";

import { NotFound } from "../pages/NotFound";



export function EmployeeRoutes(){

   return (<Routes>


        <Route path="https://ramonvbn.github.io/refund-frontend/" element={<AppLayout/>}>
        <Route path="https://ramonvbn.github.io/refund-frontend/" element={<Refund/>}/>
        <Route path="https://ramonvbn.github.io/refund-frontend/confirm" element={<Confirm/>}/>
        </Route>

        <Route path="*" element={<NotFound/>}/>
    </Routes>)
}