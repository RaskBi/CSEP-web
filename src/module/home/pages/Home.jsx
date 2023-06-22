import { useNavigate } from "react-router-dom"
import { ModulesLayout } from "../../ui/ModulesLayout"
import "./Home.css"
import React, { useState, useEffect } from "react"
import { useAuthStore } from "../../../store/auth/useAuthStore"
import { DeliveryReport } from "../components/DeliveryReport"

export const Home = () => {
  const navigate = useNavigate()
  const [hoveredItem, setHoveredItem] = useState(null)
  const { user } = useAuthStore()

  const handleMouseEnter = (index) => {
    setHoveredItem(index)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
  }
  useEffect(() => {
    document.title = "Inicio"
  }, [])

  return (
    <ModulesLayout>
      <div className="home">
        <div className="home-welcome">
          <h1>
            ¡Bienvenido {user.first_name} {user.last_name}!
          </h1>

          <div className="home-welcome-modules">
            <div
              className={`home-welcome-modules-item ${
                hoveredItem === 0 ? "animate__animated animate__pulse" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                navigate("package")
              }}
            >
              <h4>Paquetes</h4>
              <img src="/img/paquete.png" alt="" />
            </div>
            <div
              className={`home-welcome-modules-item ${
                hoveredItem === 1 ? "animate__animated animate__pulse" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                navigate("DeliveryAgents")
              }}
            >
              <h4>Repartidores</h4>
              <img src="/img/camion.png" alt="" />
            </div>
            <div
              className={`home-welcome-modules-item ${
                hoveredItem === 2 ? "animate__animated animate__pulse" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                navigate("employees")
              }}
            >
              <h4>Empleados</h4>
              <img src="/img/empleados.png" alt="" />
            </div>
            <div
              className={`home-welcome-modules-item ${
                hoveredItem === 3 ? "animate__animated animate__pulse" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            >
              <h4>Cuenta</h4>
              <img src="/img/userSettings.png" alt="" />
            </div>
          </div>
      <DeliveryReport />

        </div>
        <div className="container">
          <div className="home-information">
            <img src="/img/logo.png" alt="paquete" />
            <h3>Administra tus paquetes</h3>
            <span>
              Aquí puedes controlar y gestionar repartidores, paquetes, usuarios
              y detalles de tu cuenta.
            </span>
          </div>
        </div>
      </div>

    </ModulesLayout>
  )
}
