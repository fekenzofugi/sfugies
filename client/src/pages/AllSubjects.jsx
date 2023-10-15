import {toast} from "react-toastify";
import { SubjectsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

const AllSubjectsContext = createContext();

export const loader = async ({request}) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries()
    ]);
    try {
        const {data} = await customFetch.get("/subjects", {params});
        return {data, searchValues:{...params}};
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    };
};

const AllSubjects = () => {

    const {data, searchValues} = useLoaderData();

    return(
        <AllSubjectsContext.Provider value={{data, searchValues}}>
            <SearchContainer/>
            <SubjectsContainer/>
        </AllSubjectsContext.Provider>
    );
};

export default AllSubjects;

export const useAllSubjectsContext = () => useContext(AllSubjectsContext);