import { useState } from "react";
import { CSEPDeliveryApi } from "../../../api";

export const useGetReportData = () => {


    const [packageData, setPackageData] = useState([]);

    const [typeData, setTypeData] = useState([]);
    const [valorData, setValorData] = useState([]);

    const startGetPackages = async ( filterData) => {
        try {
            const { data } = await CSEPDeliveryApi.post(`report/chartEntregadosNoEntregados`, filterData);
            setPackageData( data);
        } catch (error) {
            console.log(error)
        }
    }

    const startGetChartTipo = async (filterData) => {
      try {
          const { data } = await CSEPDeliveryApi.post(`report/charttipopaquete`, filterData);
          setTypeData( data[0]);
          setValorData( data[1]);
        } catch (error) {
          console.log(error)
      }
  }



  return {
    /* Atributos */
    packageData,
    typeData,
    valorData,


    /* Metodos */
    startGetPackages,
    startGetChartTipo

  }
}
