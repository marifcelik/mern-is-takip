import { useContext, createContext, useState } from "react";

const Context = createContext();

function AppProvider({ children }) {
    const [validated, setValidated] = useState(false);
    const [formdata, setFormdata] = useState({});
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [shownot, setShownot] = useState(false);
    const [customers, setCustomers] = useState([]);

    const value = {
        validated, setValidated,
        formdata, setFormdata,
        user, setUser,
        error, setError,
        shownot, setShownot,
        customers, setCustomers
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export { AppProvider }
export const AppContext = () => useContext(Context)