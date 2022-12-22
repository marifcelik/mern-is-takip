import { Outlet } from "react-router-dom";
import { Header } from "../components/";

function HomeL() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default HomeL