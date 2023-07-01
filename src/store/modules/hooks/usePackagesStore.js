import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  onAddNewPackage,
  onIsLoading,
  onLoadPackages,
  onSendErrorMessage,
  onSendServerErrorMessage,
  onSetActivePackage,
  onUpdatePackage,
} from "../slices/packagesSlice"
import { CSEPDeliveryApi } from "../../../api"

export const usePackagesStore = () => {
  const { isLoading, packages, confirm, active, errorMessage, serverMessage } =
    useSelector((state) => state.packages)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const startLoadPackages = async () => {
    dispatch(onIsLoading())
    try {
      const { data } = await CSEPDeliveryApi.get(`paquete/get/paquete`)
      dispatch(onLoadPackages(data))
    } catch (error) {
      console.log(error)
    }
  }

  const startSetAcitvePackage = async (data) => {
    dispatch(onSetActivePackage(data))
  }

  const startSavingPackages = async (values) => {
    dispatch(onIsLoading())
    try {
      if (values.id) {
        await CSEPDeliveryApi.put(`paquete/put/paquete/${values.id}`, values)
        dispatch(onUpdatePackage(values))
        navigate("/package")
        return
      }
      // Creando
      await CSEPDeliveryApi.post("paquete/post/paquete", values)
      dispatch(onAddNewPackage(values))
      navigate("/package")
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
  //Reporte
  const startReport = async (values) => {
    try {
      // Creando
      const response = await CSEPDeliveryApi.post("report/reporterangofechaconfirmacion", values);
  
      // Obtener la respuesta del backend
      const responseData = response.data;
  
      // Comprobar si el backend devuelve un error
      if (responseData.hasOwnProperty("error")) {
        // Mostrar el mensaje de error en un alert
        alert(responseData.error);
        return;
      }
  
      // Obtener la URL del archivo PDF
      const pdfURL = responseData.urlFile;
  
      // Abrir el PDF en una nueva pestaña del navegador
      window.open(pdfURL);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const claves = Object.keys(error.response.data);
        const firstValue = error.response.data[claves[0]];
        dispatch(onSendErrorMessage(firstValue[0]));
      } else if (error.response && error.response.status === 404) {
        // Mostrar el mensaje de error del backend en un alert
        alert(error.response.data.error);
      } else {
        dispatch(onSendServerErrorMessage(error.response ? error.response.data.error : error.message));
      }
    }
  };

  const startReportR = async (values) => {
    try {
      // Creando
      const response = await CSEPDeliveryApi.post("report/reporterepartidor", values);
  
      // Obtener la respuesta del backend
      const responseData = response.data;
  
      // Comprobar si el backend devuelve un error
      if (responseData.hasOwnProperty("error")) {
        // Mostrar el mensaje de error en un alert
        alert(responseData.error);
        return;
      }
  
      // Obtener la URL del archivo PDF
      const pdfURL = responseData.urlFile;
  
      // Abrir el PDF en una nueva pestaña del navegador
      window.open(pdfURL);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const claves = Object.keys(error.response.data);
        const firstValue = error.response.data[claves[0]];
        dispatch(onSendErrorMessage(firstValue[0]));
      } else if (error.response && error.response.status === 404) {
        // Mostrar el mensaje de error del backend en un alert
        alert(error.response.data.error);
      } else {
        dispatch(onSendServerErrorMessage(error.response ? error.response.data.error : error.message));
      }
    }
  };

  const startReportU = async (values) => {
    try {
      // Creando
      const response = await CSEPDeliveryApi.post("report/reporteusuario", values);
  
      // Obtener la respuesta del backend
      const responseData = response.data;
  
      // Comprobar si el backend devuelve un error
      if (responseData.hasOwnProperty("error")) {
        // Mostrar el mensaje de error en un alert
        alert(responseData.error);
        return;
      }
  
      // Obtener la URL del archivo PDF
      const pdfURL = responseData.urlFile;
  
      // Abrir el PDF en una nueva pestaña del navegador
      window.open(pdfURL);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const claves = Object.keys(error.response.data);
        const firstValue = error.response.data[claves[0]];
        dispatch(onSendErrorMessage(firstValue[0]));
      } else if (error.response && error.response.status === 404) {
        // Mostrar el mensaje de error del backend en un alert
        alert(error.response.data.error);
      } else {
        dispatch(onSendServerErrorMessage(error.response ? error.response.data.error : error.message));
      }
    }
  };

  return {
    /* ATRIBUTOS */
    isLoading,
    packages,
    confirm,
    active,
    errorMessage,
    serverMessage,

    /* METODOS */
    startLoadPackages,
    startSetAcitvePackage,
    startSavingPackages,
    startReport,
    startReportR,
    startReportU,
  }
}
