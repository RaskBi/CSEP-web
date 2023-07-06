import { useState } from "react";
import { CSEPDeliveryApi } from "../../../api";

export const useGetReportData = () => {


    const [packageData, setPackageData] = useState([]);

    const startGetPackages = async () => {
        try {
            const { data } = await CSEPDeliveryApi.post(`report/chartEntregadosNoEntregados`);
            setPackageData( data);
        } catch (error) {
            console.log(error)
        }
    }

  return {
    /* Atributos */
    packageData,

    /* Metodos */
    startGetPackages
  }
}
