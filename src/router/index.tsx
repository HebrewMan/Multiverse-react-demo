import React, { useEffect } from 'react'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import App from '../App';
import Arena from "../views/arena";
import Vault from "../views/vault";

const baseRouter = ()=>{
    <BrowserRouter>
        <Routes >
            <Route path="/" element={<App/>}>
                <Route  path='/arena' element={<Arena/>}></Route>
                <Route  path='/vault' element={<Vault/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default baseRouter;