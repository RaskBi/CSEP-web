import { useSelector, useDispatch } from "react-redux"
import { apiURL, CSEPDeliveryApi } from "../../../api";
import { onIsLoading, onLoadChangePaswords, onSendServerErrorMessage, onStopLoading } from "../slices/changePasswordSlice";
import { useNavigate } from 'react-router-dom';


export const useChangePasswordStore = () => {
    const { isLoading, changePaswords, confirm, active, errorMessage, serverMessage } = useSelector(state => state.changePaswords);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onInfojwt = async (jwt) => {
      dispatch(onIsLoading())
        const options = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwt}`
            }
          };
          
          const response = await fetch(`${apiURL}user/jwtInfo`, options)
          const status_code = await response.status
          const data = await response.json()
          if (status_code === 200) {
            dispatch(onLoadChangePaswords(data))
          }
          else {
            return {err:true,data}
          }
          //dispatch(onLoadChangePaswords(response))
    }

    const onSubmitChangePassword = async(jwt,value)=>{
      dispatch(onIsLoading())
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'insomnia/2023.5.8',
          Authorization: `Bearer ${jwt}`
        },
        body: value
      };
      const response = await fetch(`${apiURL}user/changePassword`, options)
      const status_code = await response.status
      const data = await response.json()
      if (status_code === 200) {
        return {err:false,msg:"Cambiado correctamente"}  
      }
      else {
        return {err:true,data}
      }
    }
    const onStop=()=>{
        dispatch(onStopLoading())
    }

    const onSendEmail = async (values)=>{
      dispatch(onIsLoading())
      try {
       const response = await CSEPDeliveryApi.post('/user/sendMail', values);
       return response
      } catch (error) {
        return error.response
      }
  }

  
    return {
        /* ATRIBUTOS */
        isLoading,
        changePaswords,
        confirm,
        active,
        errorMessage,
        serverMessage,
        
        /* METODOS */
        onSubmitChangePassword,
        onInfojwt,
        navigate,
        onStop,
        onSendEmail,
      }
}
