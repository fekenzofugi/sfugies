import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { SUBJECT_STATUS, SUBJECT_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import {toast} from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({params}) => {

    try {
        const {data} = await customFetch.get(`/subjects/${params.id}`);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return redirect("/dashboard/all-subjects");
    };
};

export const action = async ({request, params}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.patch(`/subjects/${params.id}`, data);
        toast.success("subject updated successfully");
        return redirect("/dashboard/all-subjects");
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    };
};



const EditSubject = () => {

    const {subject} = useLoaderData();
    console.log(subject)

    return(
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">edit subject</h4>
                <div className="form-center">
                    <FormRow type="text" name="subjectName" defaultValue={subject.subjectName}/>
                    <FormRow type="text" name="topic" defaultValue={subject.topic}/>
                    <FormRow type="text" name="subjectBibliography" defaultValue={subject.subjectBibliography}/>
                    <FormRowSelect name="subjectStatus" labelText="subject status" defaultValue={subject.subjectStatus} list={Object.values(SUBJECT_STATUS)}/>
                    <FormRowSelect name="subjectType" labelText="subject type" defaultValue={subject.subjectType} list={Object.values(SUBJECT_TYPE)}/>
                    <SubmitBtn/>
                </div>
            </Form>
        </Wrapper>
    );
};

export default EditSubject;