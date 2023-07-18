import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useForm } from "../../hooks"
import { AuthLayout } from "../layout"
import { useAuthStore } from "../../store/auth/useAuthStore"
import "./Login.css"

const initialValues = {
  username: "",
  password: "",
}

export const Login = () => {
  const { username, password, onInputChange, formState } = useForm(initialValues)
  const { startLogin, errorMessage } = useAuthStore()

  const onLogin = (event) => {
    event.preventDefault()
    startLogin(formState)
  }

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <AuthLayout>
      <form onSubmit={onLogin} className="Login-form">
        <img src="/img/logo.png" alt="logo" />
        <input
          type="text"
          placeholder="Ingrese su usuario"
          name="username"
          value={username}
          onChange={onInputChange}
        />
        <input
          type="password"
          placeholder="Ingrese su contraseña"
          name="password"
          value={password}
          onChange={onInputChange}
        />
        <div className="Login-form-links">
          <Link to="/auth/password-recovery"> ¿Olvidaste tu contraseña?</Link>
        </div>

        <div className={errorMessage == null ? "Login-form-errorMessage ErrorMessage-hidden" : "Login-form-errorMessage  animate__animated animate__shakeX"} >
          <span>{errorMessage}</span>
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </AuthLayout>
  )
}
