import { useDispatch, useSelector } from "react-redux"
import { checkingCredentials, clearErrorMessage, login, logout } from "./authSlice";
import { CSEPDeliveryApi } from "../../api";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async (values) => {
        dispatch(checkingCredentials());
        try {
            const { data } = await CSEPDeliveryApi.post('user/loginWeb', values);
            localStorage.setItem("Token", `Token ${data.token}`);
            dispatch(login(data))
        } catch (error) {
            console.log(error)
            dispatch(logout("Credenciales incorrectas"))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 5000);
        }
    }

    const startCheckingAuthToken = async () => {
        const token = localStorage.getItem("Token");
        if (!token) return dispatch(logout());
        try {
            const { data } = await CSEPDeliveryApi.get('user/profile');
            //localStorage.setItem("Token", data.token);
            dispatch(login({...data, imagen:"http://186.33.132.4:81/media/user/user_Admin1.jpg"} ));
            //PEDIRLE AL BACKEND QUE Traiga imagen, BORRA  LA IMAGEN
        } catch (error) {
            console.log(error)
            localStorage.clear();
            dispatch(logout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(logout());
    }

    const startClearMessage =() =>{
        dispatch(clearErrorMessage())
    }

    return {
        /* Atributos */
        status,
        user,
        errorMessage,

        /* Metodos */
        startLogin,
        startCheckingAuthToken,
        startLogout,
        startClearMessage
    }
}
