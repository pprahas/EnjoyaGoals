import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Footer from "../components/Footer/Footer";
import ProfileInformation from "../pages/ProfileInformation";
import Profile from "../pages/Profile";
import Homepage from "../pages/Homepage";
import LandingPage from "../pages/LandingPage";
import About from "../components/Footer/About";
import Contact from "../components/Footer/Contact/Contact";
import ResetPassword from "../pages/ResetPassword";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notif from "../components/Notifications/Notif";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  // const [notifs, setNotifs] = useState([{type: "info", title: "Information", desc: "Doing this to test the createNotif function"}]);
  const [notifs, setNotifs] = useState([]);
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  console.log(loggedIn, "login");

  function createNotif(type, title, desc) {
		setNotifs([
			...notifs,
			{
				id: Math.floor(Math.random() * 100 + 1),
				title,
				desc,
				type,
			},
		]);
	};

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={loggedIn ? <Homepage createNotif={createNotif}/> : <Login createNotif={createNotif}/>}
        ></Route>
        {/* <Route path="/" element={loggedIn ? <Homepage /> : <Login />}></Route> */}
        <Route path="/" element={<LandingPage createNotif={createNotif}/>}></Route>
        <Route
          path="/register"
          element={loggedIn ? <Homepage createNotif={createNotif}/> : <Register createNotif={createNotif}/>}
        ></Route>
        <Route path="/forgot_password" element={<ForgotPassword createNotif={createNotif}/>}></Route>
        <Route path="/profile" element={<Profile createNotif={createNotif}/>}></Route>
        <Route path="/homepage" element={<Homepage createNotif={createNotif}/>}></Route>
        <Route path="/reset_password" element={<ResetPassword createNotif={createNotif}/>}></Route>
        <Route path="/about" element={<About createNotif={createNotif}/>}></Route>
        <Route path="/contact" element={<Contact createNotif={createNotif}/>}></Route>
        <Route
          path="/profile_information"
          element={<ProfileInformation createNotif={createNotif}/>}
        ></Route>
      </Routes>
      <Notif notifList={notifs}/>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
