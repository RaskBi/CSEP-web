import { Link } from "react-router-dom"
import { useForm } from "../../hooks"
import { AuthLayout } from "../layout"

import "./PasswordRecovery.css"

const initialValues = {
  email: "",
}

export const PasswordRecovery = () => {
  const { email, onInputChange, formState } = useForm(initialValues)

  const onPasswordRecovery = () => {
    console.log(formState)
  }

  return (
    <AuthLayout>
      <div>
        <div className="container-passwordRecovery">
          <h2>Recuperar contraseña</h2>
          <span>
            Por favor ingrese su correo electronico para recuperar su contraseña
          </span>
          <form onSubmit={onPasswordRecovery}>
            <input
              type="email"
              placeholder="Ingrese su correo electrónico"
              name="email"
              value={email}
              onChange={onInputChange}
            />
            <button type="submit">Enviar</button>
            <div className="container-passwordRecovery-links">
              <Link to="/auth/login"> Ingresar</Link>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}
