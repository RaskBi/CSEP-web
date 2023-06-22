import { useEffect, useState } from "react"
import { CSEPDeliveryApi } from "../../../api";

export const useGetComboBox = () => {

    const [remitente, setRemitente] = useState([])
    const [repartidor, setRepartidor] = useState([])
    const [tipopaquete, setTipopaquete] = useState([])
    const getRemitente = async () => {
        try {
            const { data } = await CSEPDeliveryApi.get(`user/cbx/user`);
            setRemitente(data)
          } catch (error) {
            console.log(error)
          }
    }
    const getRepartidor = async () => {
        try {
            const { data } = await CSEPDeliveryApi.get(`user/cbx/repartidor`);
            setRepartidor(data)
          } catch (error) {
            console.log(error)
          }
    }

    const getTipoPaquete = async () => {
        try {
            const { data } = await CSEPDeliveryApi.get(`paquete/get/tipopaquete/cbx`);
            setTipopaquete(data)
          } catch (error) {
            console.log(error)
          }
    }



    useEffect(() => {
        getRemitente();
        getRepartidor();
        getTipoPaquete();
    }, [])


    return {
        remitente,
        repartidor,
        tipopaquete,
    }
}
