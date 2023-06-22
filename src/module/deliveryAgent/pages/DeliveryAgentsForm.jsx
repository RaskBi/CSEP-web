import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { ModulesLayout } from "../../ui/ModulesLayout";
import { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import { useDeliveryAgentsStore } from "../../../store/modules/hooks/useDeliveryAgentsStore";
import "./DeliveryAgentsForm.css";
import { useMemo } from "react";
import { LoadingSpinner } from "../../../components";

export const DeliveryAgentsForm = () => {

    const [initialValues, setInitialValues] = useState({
        id: 0,
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
    })
  
    const navigate = useNavigate();
    
    const { active, isLoading, startSavingDeliveryAgents } = useDeliveryAgentsStore();
  
    const {
      formState,
      onInputChange,
      onInputSelect,
      first_name,
      last_name,
      username,
      email,
      password,
    } = useForm(initialValues);
  
    const onSubmitDeliveryAgents = (event) => {
      event.preventDefault();
      startSavingDeliveryAgents(formState)
    }
  
  
    const titleForm = useMemo(() =>{
      if (active.id != 0) return `Editar repartidor ${active.first_name} ${active.last_name}`;
      return 'Crear Repartidor';
    }, [])
  
  
  
    useEffect(() => {
      if (active !== null) {
        setInitialValues({
          ...active
        })
      }
      document.title = titleForm
    }, [])
  
    if (isLoading === true) {
      return <LoadingSpinner/>
    }
  
    return (
      <ModulesLayout>
        <div className="deliveryAgents-container">
          <h2>{titleForm}</h2>
          <form onSubmit={onSubmitDeliveryAgents}>
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
                  value={username}
                  onChange={onInputChange}
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
              <button type="button" onClick={()=>{navigate('/deliveryAgents')}}>Cancelar</button>
              <button type="submit" >Guardar</button>
            </div>
          </form>
        </div>
      </ModulesLayout>
    )
  }