import { useState } from "react";
import { CSEPDeliveryApi } from "../../../api";

export const useGetChartTypeData = () => {


    const [typeData, setTypeData] = useState([]);
    const [valorData, setValorData] = useState([]);

    const startGetChartTipo = async () => {
        try {
            const { data } = await CSEPDeliveryApi.post(`report/charttipopaquete`);
            setTypeData( data[0]);
            setValorData( data[1]);
          } catch (error) {
            console.log(error)
        }
    }

  return {
    /* Atributos */
    typeData,
    valorData,

    /* Metodos */
    startGetChartTipo
  }
}
