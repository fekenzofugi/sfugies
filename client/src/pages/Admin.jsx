import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import {toast} from "react-toastify";
import StatItem from "../components/StatItem";


export const loader = async () => {
    try {
        const response = await customFetch.get("/users/admin/app-stats");
        console.log(response)
        return response.data;
    } catch (error) {
        toast.error("Your're not allowed to access this page");
        return redirect("/dashboard");
    };
};


const Admin = () => {

    const {users, subjects} =  useLoaderData();

    return(
        <Wrapper>
            <StatItem title="current users" count={users} color="#e9b949" bcg="#fcefc7" icon={<FaSuitcaseRolling/>}/>
            <StatItem title="total subjects" count={subjects} color="#647acb" bcg="#e0e8f9" icon={<FaCalendarCheck/>} />
        </Wrapper>
    );
};

export default Admin;