import React from 'react'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Login from '../pages/login/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import Register from '../pages/register/Register'

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" element={<Login/>}/> 
                <Route path="/dashboard" element={<Dashboard/>}/> 
                <Route path="/register" element={<Register/>}/> 

            </Routes>
        </div>
    </BrowserRouter>
  )
}
