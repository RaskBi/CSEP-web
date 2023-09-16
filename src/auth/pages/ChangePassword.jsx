import { Link } from "react-router-dom"
import { useForm } from "../../hooks"
import { AuthLayout } from "../layout"
import "./PasswordRecovery.css"
import { useChangePasswordStore } from "../../store/modules/hooks/useChangePasswordStore"
import { useEffect } from "react"
import { LoadingSpinner } from "../../components"
import Swal from "sweetalert2"

const initialValues = {
  new_password:"",
  confirm_password:""
}

export const ChangePassword = () => {
    const { new_password,confirm_password, onInputChange, formState } = useForm(initialValues)
    const url = new URL(document.location)   
    const key = url.searchParams.get('token')
    const {
        /* ATRIBUTOS */
        isLoading,
        changePaswords,
        confirm,
        active,
        errorMessage,
        serverMessage,
    
        /* METODOS */
        onSubmitChangePassword,
        onInfojwt,
        navigate,
        onStop,
      } = useChangePasswordStore()
      
      const downloadInfo= async() =>{
        const data = await onInfojwt(key)
        if (data?.err){
          Swal.fire(
            "Error",
            data.data.messages[0]?.message,
            "error"
          )
          navigate("/auth/login")
        }
      }

      useEffect(() => {
        downloadInfo()
      }, [])
      
      

      if (isLoading === true) {
        return <LoadingSpinner />
      }
      

  const onSubmit = async (event)=>{
    event.preventDefault()
    const data = await onSubmitChangePassword(key,JSON.stringify(formState))
    console.log(data) 
    if (data?.err){
      Swal.fire(
        "Error",
        data.data?.confirm_password[0],
        "error"
      )
      onStop();
    }
    else{
      Swal.fire(
        data?.msg,
        "",
        "success"
      )
       navigate("/auth/login")
    }
  }
      

  return (
    <AuthLayout>
      <div>
        <div className="container-passwordRecovery">
          <h2>Cambiar contraseña</h2>
          <span>
            {changePaswords[0]?.username}
            Por favor ingrese su nueva contraseña
          </span>
          <form onSubmit={onSubmit} >
            <input
              type="password"
              placeholder="Ingrese su nueva contraseña"
              name="new_password"
              onChange={onInputChange}
            />
            <input
              type="password"
              placeholder="Confirme su nueva contraseña"
              name="confirm_password"
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
