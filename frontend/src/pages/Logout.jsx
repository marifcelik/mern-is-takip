import { useEffect } from "react";
import { Navigate } from "react-router-dom"
import { AppContext } from "../context";

function Logout() {
    const { setUser } = AppContext();

    useEffect(() => {
        async function logout() {
            const request = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await request.json();
            if (data.error)
                console.error(data.error)
            setUser(null);
        }
        logout()
    }, [])

    return (
        <Navigate to={"/"} />
    )
}

export default Logout