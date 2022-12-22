import { Routes, Route } from "react-router-dom";
import { Home, About, Contact, Musteriler, Kaydet } from './pages';
import { HomeL, AuthL } from "./layouts";
import { RegisterForm, LoginForm, PrivateRoute } from "./components";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeL />}>
          <Route index={true} element={<Home />} />
          <Route path="auth" element={<AuthL />}>
            <Route index={true} element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
          <Route path="musteriler" element={<PrivateRoute><Musteriler /></PrivateRoute>} />
          <Route path="musteri_kaydet" element={<PrivateRoute><Kaydet /></PrivateRoute>} />
          <Route path="*" ></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App