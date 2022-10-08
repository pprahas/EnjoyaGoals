import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Footer from "../components/Footer";
import ProfileInformation from "../pages/ProfileInformation";
import Profile from "../pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot_password" element={<ForgotPassword />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route
          path="/profile_information"
          element={<ProfileInformation />}
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
