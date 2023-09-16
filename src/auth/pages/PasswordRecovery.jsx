import { Link } from "react-router-dom"
import { useForm } from "../../hooks"
import { AuthLayout } from "../layout"
import { useChangePasswordStore } from "../../store/modules/hooks/useChangePasswordStore"
import { LoadingSpinner } from "../../components"
import Swal from "sweetalert2"

import "./PasswordRecovery.css"

const initialValues = {
  correo: "",
}

export const PasswordRecovery = () => {
  const { correo, onInputChange, formState } = useForm(initialValues)

  const {
    /* ATRIBUTOS */
    isLoading,
    /* METODOS */
    navigate,
    onStop,
    onSendEmail,
  } = useChangePasswordStore()
  
  const onPasswordRecovery = async (event) => {
    event.preventDefault()
    const data = await onSendEmail(formState)
    if (data?.status===200){
      Swal.fire(
        data.data,
        "",
        "success"
      )
      navigate("/auth/login")
    }
    else{
      Swal.fire(
        data.data?.correo[0],
        "",
        "error"
      )
      onStop()
    }

  }


  
  if (isLoading === true) {
    return <LoadingSpinner />
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
              name="correo"
              value={correo}
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
