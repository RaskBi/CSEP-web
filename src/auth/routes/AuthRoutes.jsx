import React from 'react'
import { Login } from '../pages/Login'
import { PasswordRecovery } from '../pages/PasswordRecovery'
import { Navigate, Route, Routes } from 'react-router-dom'

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="password-recovery" element={<PasswordRecovery />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
