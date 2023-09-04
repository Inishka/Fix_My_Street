import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import RightNavbar from "./components/RightNavbar/RightNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
// import Analytics from "./components/Analytics/Analytics";
import Add from "./components/Add/Expence";
import Team from "./components/Team/Team";
import NavContext from "./Context/NavContext";
import ShowRecord from "./components/ShowRecord/ShowRecord";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Logout from "./components/Logout/Logout";
import { getCurrentAuthUser, isLoginStatus } from "./Service/AuthUserDetail";
import Profile from "./components/MyProfile/EditProfile";
import Admin from "./components/Admin/Admin";
import EditUserDetails from "./components/Admin/EditUserDetails";

const App = () => {
  const [nav, setNav] = useState(false);
  const value = { nav, setNav };
  const [user, setUser] = useState({});
  const [navbar, setNavBar] = useState("");
  const [stickyNavBar, setStickyNavBar] = useState("");
  const [isLogin, SetIsLogin] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      getCurrentAuthUser(setUser);
      isLoginStatus(SetIsLogin);
    } else {
      setStickyNavBar(
        <RightNavbar name={user.email} role="Administor" />
      );
      setNavBar(<Navbar />);
    }
  }, [isLogin]);

  return (
    <div className="App">
      
      <NavContext.Provider value={value}>
        {navbar}

        <Container
          isLogin={isLogin}
          stickyNav={stickyNavBar}
          content={
            <Routes>
              <React.Fragment>
                {!isLogin && (
                  <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </>
                )}
              </React.Fragment>

              <React.Fragment>
                {isLogin ? (
                  <>
                    <Route
                      path="/"
                      element={
                        <Dashboard name={user.fname + " " + user.lname} />
                      }
                    />
                    <Route
                      path="/dashboard"
                      element={
                        <Dashboard name={user.fname + " " + user.lname} />
                      }
                    />
                    <Route path="/profile" element={<Profile user={user} />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/show" element={<ShowRecord />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/edit" element={<EditUserDetails />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </>
                ) : (
                  <Route path="*" element={<Navigate to="/login" replace />} />
                )}
              </React.Fragment>
            </Routes>
          }
        />
      </NavContext.Provider>
    </div>
  );
};

export default App;
