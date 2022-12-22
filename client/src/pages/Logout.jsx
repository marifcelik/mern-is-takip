import { useEffect } from "react";
import { Navigate } from "react-router-dom"

function Logout() {
    useEffect(() => {
        async function logout() {
            const request = await fetch('http://localhost:3020/api/logout', {
                method: 'POST',
                credentials: 'include'
            });
            const data = request.json();
        }
        logout()
    }, [])

    return (
        <Navigate to={"/"} />
    )
}

export default Logout