import { Routes, Route } from "react-router";

import { AppLayout } from "../components/AppLayout";

import { DashBoard } from "../pages/Dashboard";

import { NotFound } from "../pages/NotFound";

import { Refund } from "../pages/Refund";



export function ManagerRoutes(){

    return (
        <Routes>

            <Route path="/refund-frontend/" element={<AppLayout/>}>

                <Route path="/refund-frontend/" element={<DashBoard/>}/>
                <Route path="/refund-frontend/refund/:id" element={<Refund/>}/>
                
            </Route>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

