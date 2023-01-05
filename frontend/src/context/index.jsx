import { useContext, createContext, useState } from 'react'

const Context = createContext();

function AppProvider({ children }) {
    const [rerender, setRerender] = useState(false);
    const [user, setUser] = useState(document.cookie.match(/jwt/) || null);
    const [shownot, setShownot] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [validated, setValidated] = useState(false);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [rmModal, setRmModal] = useState({ show: false });
    const [customerData, setCustomerData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        birthday: ''
    });
    const [notProps, setNotProps] = useState({
        title: '',
        variant: '',
        body: ''
    });

    const value = {
        user, setUser,
        shownot, setShownot,
        validated, setValidated,
        customers, setCustomers,
        customerData, setCustomerData,
        rmModal, setRmModal,
        showCustomerModal, setShowCustomerModal,
        notProps, setNotProps,
        rerender, setRerender
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export { AppProvider }
export const AppContext = () => useContext(Context)