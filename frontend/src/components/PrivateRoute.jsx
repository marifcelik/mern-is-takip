import { AppContext } from "../context"
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const { user} = AppContext();

    if (!user)
        return <Navigate to='/auth' />

    return (children)
}

export default PrivateRoute