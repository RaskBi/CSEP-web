import { NavLink } from "react-router-dom"
import './NavBar.css'
import { useAuthStore } from "../../store/auth/useAuthStore"
export const NavBar = () => {

  const {startLogout,user } = useAuthStore();

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <ul>
          <img src="/img/logohome.png" alt="logo" />
          <li><NavLink className={({ isActive }) => ` ${isActive ? 'active' : ''}`} to="/"> Inicio</NavLink></li>
          <li><NavLink className={({ isActive }) => ` ${isActive ? 'active' : ''}`} to="package">Paquetes</NavLink></li>
          <li><NavLink className={({ isActive }) => ` ${isActive ? 'active' : ''}`} to="deliveryAgents">Repartidores</NavLink></li>
          <li><NavLink className={({ isActive }) => ` ${isActive ? 'active' : ''}`} to="employees">Administradores</NavLink></li>
          <li><NavLink className={({ isActive }) => ` ${isActive ? 'active' : ''}`} to="charts">Gráficas</NavLink></li>
        </ul>
      </div>
      <div className="nav-right">
        <span>{user.first_name} {user.last_name}</span>
        <img src={user.imagen} alt="" />
        <span className="material-symbols-outlined iconLogout" onClick={startLogout}>
          logout
        </span>
      </div>
    </nav>
  )
}
