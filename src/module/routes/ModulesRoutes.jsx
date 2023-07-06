import { Navigate, Route, Routes } from "react-router-dom"
import { NavBar } from "../ui/NavBar"
import { Home } from "../home"
import { Packages } from "../packages"
import { PackagesForm } from "../packages/pages/PackagesForm"
import { Employees } from "../employees"
import { DeliveryAgents } from "../deliveryAgent/pages/DeliveryAgents"
import { DeliveryAgentsForm } from "../deliveryAgent/pages/DeliveryAgentsForm"
import { EmployeesForm } from "../employees/pages/EmployeesForm"
import { Charts } from "../charts/pages/Charts"

export const ModulesRoutes = () => {
    return (
        <>
        <NavBar/>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="package" element={<Packages/>} />
            <Route path="package/form" element={<PackagesForm/>} />
            <Route path="employees" element={<Employees/>} />
            <Route path="employees/formEmployee" element={<EmployeesForm/>} />
            <Route path="deliveryAgents" element={<DeliveryAgents/>} />
            <Route path="deliveryAgents/formDelivery" element={<DeliveryAgentsForm/>} />
            <Route path="charts" element={<Charts/>} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
        </>
    )
}
