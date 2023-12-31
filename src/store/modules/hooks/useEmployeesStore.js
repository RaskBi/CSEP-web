import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { onAddNewEmployee, onIsLoading, onLoadEmployees, onSendErrorMessage, onSendServerErrorMessage, onSetActiveEmployee, onUpdateEmployee } from "../slices/employeesSlice";
import { CSEPDeliveryApi } from "../../../api";

export const useEmployeesStore = () => {
  const { isLoading, employees, confirm, active, errorMessage, serverMessage } = useSelector(state => state.employees);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startLoadEmployees = async (is_active) => {
    dispatch(onIsLoading())
    try {
      const { data } = await CSEPDeliveryApi.get(`user/listaadmin/${is_active}`);
      dispatch(onLoadEmployees(data))
    } catch (error) {
      console.log(error)
    }
  }

  const startSetAcitveEmployee = async (data) => {
    dispatch(onSetActiveEmployee(data));
  }

  const startSavingEmployees = async (values) => {
    dispatch(onIsLoading())
    try {
      if (values.id) {
        await CSEPDeliveryApi.put(`user/update/admin/${values.id}`, values);
        dispatch(onUpdateEmployee(values));
        navigate('/employees');
        return;
      }
      // Creando
      await CSEPDeliveryApi.post('user/post/admin', values);
      dispatch(onAddNewEmployee(values));
      navigate('/employees');
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
  const startDeleteEmployees = async (dataPack) => {
    startSetAcitveEmployee(dataPack);
    dispatch(onIsLoading())
    try {
      //TODO colocar bien en endpoint
      const {data} = await CSEPDeliveryApi.delete(`/user/update/admin/${dataPack.id}`)
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
    employees,
    confirm,
    active,
    errorMessage,
    serverMessage,

    /* METODOS */
    startLoadEmployees,
    startSetAcitveEmployee,
    startSavingEmployees,
    startDeleteEmployees,
  }
}