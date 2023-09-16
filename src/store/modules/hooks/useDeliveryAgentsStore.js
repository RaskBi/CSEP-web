import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { onAddNewDeliveryAgent, onIsLoading, onLoadDeliveryAgents, onSendErrorMessage, onSendServerErrorMessage, onSetActiveDeliveryAgent, onUpdateDeliveryAgent } from "../slices/deliveryAgentsSlice";
import { CSEPDeliveryApi } from "../../../api";

export const useDeliveryAgentsStore = () => {
  const { isLoading, deliveryAgents, confirm, active, errorMessage, serverMessage } = useSelector(state => state.deliveryAgents);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startLoadDeliveryAgents = async (is_active) => {
    dispatch(onIsLoading())
    try {
      const { data } = await CSEPDeliveryApi.get(`user/listarepartidor/${is_active}`);
      dispatch(onLoadDeliveryAgents(data))
    } catch (error) {
      console.log(error)
    }
  }

  const startSetAcitveDeliveryAgent = async (data) => {
    dispatch(onSetActiveDeliveryAgent(data));
  }

  const startSavingDeliveryAgents = async (values) => {
    dispatch(onIsLoading())
    try {
      if (values.id) {
        await CSEPDeliveryApi.put(`/user/update/repartidor/${values.id}`, values);
        dispatch(onUpdateDeliveryAgent(values));
        navigate('/deliveryAgents');
        return;
      }
      // Creando
      await CSEPDeliveryApi.post('/user/post/repartidor', values);
      dispatch(onAddNewDeliveryAgent(values));
      navigate('/deliveryAgents');
    } catch (error) {
      if (error.response.status == 400) {
        var claves = Object.keys(error.response.data);
        var firstValue = error.response.data[claves[0]];
        dispatch(onSendErrorMessage(firstValue[0]))
      } else {
        dispatch(onSendServerErrorMessage(error.response.data.error))
      }
    }
  }
  const startDeleteDeliveryAgent = async (dataPack) => {
    startSetAcitveDeliveryAgent(dataPack);
    dispatch(onIsLoading())
    try {
      //TODO colocar bien en endpoint
      const {data} = await CSEPDeliveryApi.delete(`/user/update/repartidor/${dataPack.id}`)
      return data
    } catch (error) {
      if (error.response.status == 400) {
        var claves = Object.keys(error.response.data)
        var firstValue = error.response.data[claves[0]]
        dispatch(onSendErrorMessage(firstValue[0]))
      } else {
        dispatch(onSendServerErrorMessage(error.response.data.error))
      }
    }
  }

  return {
    /* ATRIBUTOS */
    isLoading,
    deliveryAgents,
    confirm,
    active,
    errorMessage,
    serverMessage,

    /* METODOS */
    startLoadDeliveryAgents,
    startSetAcitveDeliveryAgent,
    startSavingDeliveryAgents,
    startDeleteDeliveryAgent,
  }
}
