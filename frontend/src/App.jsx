import { Routes, Route } from "react-router-dom";
import { Home, About, Contact, Customers, CustomerAdd, Logout } from './pages';
import { HomeL, AuthL } from "./layouts";
import { RegisterForm, LoginForm, PrivateRoute, Notification } from "./components";
import { AppContext } from "./context";

function App() {
  const { notProps } = AppContext();

  return (
    <>
      <Notification title={notProps.title} body={notProps.body} variant={notProps.variant} />
      <Routes>
        <Route path="/" element={<HomeL />}>
          <Route index={true} element={<Home />} />
          <Route path="auth" element={<AuthL />}>
            <Route index={true} element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
          <Route path="musteriler" element={<PrivateRoute><Customers /></PrivateRoute>} />
          <Route path="musteri-ekle" element={<PrivateRoute><CustomerAdd /></PrivateRoute>} />
          <Route path="isler" element={<PrivateRoute></PrivateRoute>} />
          <Route path="is-ekle" element={<PrivateRoute></PrivateRoute>} />
          <Route path="calisanlar" element={<PrivateRoute></PrivateRoute>} />
          <Route path="calisan-ekle" element={<PrivateRoute></PrivateRoute>} />
          <Route path="logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
        </Route>
        <Route path="*" ></Route>
      </Routes>
    </>
  )
}

export default App