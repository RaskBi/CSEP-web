import { useState } from "react"
import { CSEPDeliveryApi } from "../../../api"

export const useGetReportData = () => {
  const [packageData, setPackageData] = useState([])
  const [cost, setCost] = useState([])
  const [costLabel, setCostLabel] = useState([])
  
  const [typeData, setTypeData] = useState([])
  const [valorData, setValorData] = useState([])
  const [remitente, setRemitente] = useState([])

  const startGetPackages = async (filterData) => {
    try {
      const { data } = await CSEPDeliveryApi.post(
        `report/chartEntregadosNoEntregados`,
        filterData
      )
      setPackageData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const startGetChartTipo = async (filterData) => {
    try {
      const { data } = await CSEPDeliveryApi.post(
        `report/charttipopaquete`,
        filterData
      )
      setTypeData(data[0])
      setValorData(data[1])
    } catch (error) {
      console.log(error)
    }
  }
  const startGetCost = async (filterData) => {
    try {
      const { data } = await CSEPDeliveryApi.post(
        `report/chartprecio`,
        filterData
      )
      setCostLabel(data.labels)
      setCost(data.datasets)
    } catch (error) {
      console.log(error)
    }
  }

  const getRemitente = async () => {
    try {
      const { data } = await CSEPDeliveryApi.get(`user/cbx/user`)
      setRemitente(data)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    /* Atributos */
    packageData,
    typeData,
    cost,
    costLabel,
    valorData,
    remitente,

    /* Metodos */
    startGetPackages,
    startGetChartTipo,
    startGetCost,
    getRemitente,
  }
}
