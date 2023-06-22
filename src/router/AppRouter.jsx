import { useEffect } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "../components";
import { useAuthStore } from "../store";
import { AuthRoutes } from "../auth/";
import { ModulesRoutes } from "../module/routes/ModulesRoutes";

export const AppRouter = () => {

  const { status, startCheckingAuthToken} = useAuthStore();

  useEffect(() => {
    startCheckingAuthToken();
  }, [])

  if (status === "checking") {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      {
        (status === "authenticated")
          ? <Route path="/*" element={< ModulesRoutes />} /> /* RUTAS PRIVADAS */
          : <Route path="/auth/*" element={<AuthRoutes />} /> /* RUTAS PUBLICAS */
      }
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
