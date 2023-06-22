import { ClipLoader } from "react-spinners"
import { AuthLayout } from "../auth"
import "./LoadingSpinner.css"
export const LoadingSpinner = () => {
    return (
        <AuthLayout>
            <div className="SpinnerContainer">
                <ClipLoader
                    color="#36d7b7"
                    size={56}
                    speedMultiplier={1}
                />
                <span>Cargando ...</span>
            </div>
        </AuthLayout>
    )
}
