import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Footer from "../components/Footer/Footer";
import ProfileInformation from "../pages/ProfileInformation";
import Profile from "../pages/Profile";
import Homepage from "../pages/Homepage";
import LandingPage from "../pages/LandingPage";
import ResetPassword from "../pages/ResetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  console.log(loggedIn, "login");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={loggedIn ? <Homepage /> : <Login />}
        ></Route>
        {/* <Route path="/" element={loggedIn ? <Homepage /> : <Login />}></Route> */}
        <Route path="/" element={<LandingPage />}></Route>
        <Route
          path="/register"
          element={loggedIn ? <Homepage /> : <Register />}
        ></Route>
        <Route path="/forgot_password" element={<ForgotPassword />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/homepage" element={<Homepage />}></Route>
        <Route path="/reset_password" element={<ResetPassword />}></Route>
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
