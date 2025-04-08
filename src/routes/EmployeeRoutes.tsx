import { Routes, Route } from "react-router";

import { AppLayout } from "../components/AppLayout";

import { Refund } from "../pages/Refund";
import { Confirm } from "../pages/Confirm";

import { NotFound } from "../pages/NotFound";



export function EmployeeRoutes(){

   return (<Routes>


        <Route path="/refund-frontend" element={<AppLayout/>}>
        <Route path="/refund-frontend" element={<Refund/>}/>
        <Route path="/refund-frontend/confirm" element={<Confirm/>}/>
        </Route>

        <Route path="*" element={<NotFound/>}/>
    </Routes>)
}