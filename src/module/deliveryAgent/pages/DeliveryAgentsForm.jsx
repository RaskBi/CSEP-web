import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { ModulesLayout } from "../../ui/ModulesLayout"
import { useEffect } from "react"
import { useForm } from "../../../hooks/useForm"
import { useDeliveryAgentsStore } from "../../../store/modules/hooks/useDeliveryAgentsStore"
import "./DeliveryAgentsForm.css"
import { useMemo } from "react"
import { LoadingSpinner } from "../../../components"

export const DeliveryAgentsForm = () => {
  const [initialValues, setInitialValues] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    cedula_ruc: "",
    password: "",
    imagen_upload: { change: false, b64: "", ext: "" },
    imagen: "",
  })

  const navigate = useNavigate()

  const { active, deliveryAgents, isLoading, startSavingDeliveryAgents } =
    useDeliveryAgentsStore()
  const [userNameData, setUserNameData] = useState("")

  const {
    formState,
    onInputChange,
    onInputChangeImage,
    selectedImage,
    first_name,
    last_name,
    email,
    password,
    cedula_ruc,
    imagen,
    imagen_upload,
  } = useForm(initialValues)

  

  const onSubmitDeliveryAgents = (event) => {
    event.preventDefault()
    console.log(formState)
    startSavingDeliveryAgents({ ...formState, username: userNameData})
  }
  
  const titleForm = useMemo(() => {
    if (active.id != 0)
      return `Editar repartidor ${active.first_name} ${active.last_name}`
    return "Crear Repartidor"
  }, [])
  
  useEffect(() => {
    if (formState.first_name == "") return
    setUserNameData(
      `${formState.first_name}${formState.last_name}0${
        deliveryAgents.length + 1
      }`
    )
  }, [first_name, last_name])
  
  useEffect(() => {
    if (active !== null) {
      setInitialValues({
        ...active,
      })
    }
    document.title = titleForm
  }, [])
  
  if (isLoading === true) {
    return <LoadingSpinner />
  }
  
  console.log(formState)

  return (
    <ModulesLayout>
      <div className="deliveryAgents-container">
        <h2>{titleForm}</h2>
        <form onSubmit={onSubmitDeliveryAgents}>
          {selectedImage ? ( // Si hay una imagen seleccionada, muestra la imagen seleccionada
            <div className="selected-image">
              <img
                className="img-image"
                src={`data:image;base64,${selectedImage}`}
                alt="Selected"
              />
            </div>
          ) : (
            // Si no hay imagen seleccionada, muestra la imagen predeterminada
            <div className="selected-image">
              <img
                className="img-image"
                src="/img/profile.png"
                alt="Default Profile"
              />
            </div>
          )}
          <label><strong>
            Cargar imagen:
          </strong>
          </label>
          <br />
          <input
            id="imagen_upload"
            type="file"
            accept="image/*"
            name="imagen_upload"
            onChange={onInputChangeImage}
          ></input>
          <div className="deliveryAgents-form">
            <div className="deliveryAgents-form-left">
              <input
                type="text"
                placeholder="Nombre"
                name="first_name"
                value={first_name}
                onChange={onInputChange}
              />
              <input
                type="text"
                placeholder="Apellido"
                name="last_name"
                value={last_name}
                onChange={onInputChange}
              />
              <input
                type="text"
                placeholder="Nombre de usuario"
                name="username"
                disabled
                defaultValue={userNameData}
              />
            </div>
            <div className="deliveryAgents-form-rigth">
              <input
                type="email"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={onInputChange}
              />
              <input
                type="text"
                placeholder="Cédula"
                name="cedula_ruc"
                value={cedula_ruc}
                onChange={onInputChange}
              />
              {active.id == 0 && (
                <input
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
              )}
            </div>
          </div>
          <div className="deliveryAgents-form-button">
            <button
              type="button"
              onClick={() => {
                navigate("/deliveryAgents")
              }}
            >
              Cancelar
            </button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </ModulesLayout>
  )
}
