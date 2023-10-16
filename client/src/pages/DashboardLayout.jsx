import { useState, createContext, useContext } from "react";
import { Outlet, redirect, useNavigate, useLoaderData } from "react-router-dom"
import Wrapper from "../assets/wrappers/DashboardLayout";
import { BigSidebar, SmallSidebar, Navbar } from "../components";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import {toast} from "react-toastify";

const DashboardContext = createContext();

// get current user
// each route can define a "louder" function to provide data to the route element before it renders.
export const loader = async () => {

  try {
    const {data} = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    // when the cookie expires, the user gets redirect to the home page.
    return redirect("/");
  }

};

const DashboardLayout = () => {


    const {user} = useLoaderData();

    const navigate = useNavigate();

    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

    const toggleDarkTheme = () => {
      const newDarkTheme = !isDarkTheme
      setIsDarkTheme(newDarkTheme)
      document.body.classList.toggle("dark-theme", isDarkTheme);
      localStorage.setItem("darkTheme", newDarkTheme);
    };

    const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };

    const logoutUser = async () => {
      navigate("/");
      await custonFetch.get("/auth/logout");
      toast.success("Loggin Out")
    };

  return (

    <DashboardContext.Provider value={{
      user, 
      showSidebar, 
      isDarkTheme, 
      toggleDarkTheme, 
      toggleSidebar, 
      logoutUser
    }}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{user}}/>
            </div>
          </div>
        </main>
      </Wrapper>      
    </DashboardContext.Provider>

  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;