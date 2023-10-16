import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { BigSidebar, SmallSidebar, Navbar } from "../components";
import Wrapper from "../assets/wrappers/DashboardLayout";
import { useState , createContext, useContext } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import {toast} from "react-toastify";

const DashboardContext = createContext();

// get current user
export const loader = async () => {
    try {
        const {data} = await customFetch.get("/users/current-user");
        return data;
    } catch (error) {
        toast.error("error get current user")
        return redirect("/");
    };
};

const DashboardLayout = () => {

    const {user} = useLoaderData();

    const navigate = useNavigate();

    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle("dark-theme", isDarkTheme);
        localStorage.setItem("darkTheme", newDarkTheme);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const logoutUser = async () => {       
        navigate("/");
        await customFetch.get("/auth/logout");
        toast.success("Logging out..."); 
    };

    return(
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
                    <SmallSidebar/>
                    <BigSidebar/>
                    <div>
                        <Navbar/>
                        <div className="dashboard-page">
                            <Outlet context={{user}}/>
                        </div>
                    </div>
                </main>
            </Wrapper>            
        </DashboardContext.Provider>

    );
};

export default DashboardLayout;

export const useDashboardContext = () => (useContext(DashboardContext));