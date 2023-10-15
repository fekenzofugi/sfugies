import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, redirect } from "react-router-dom";
import { SUBJECT_STATUS, SUBJECT_TYPE } from "../../../utils/constants";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";


export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post("/subjects", data);
        toast.success("Subject added successfully");
        return redirect("all-subjects");
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    };
};


const AddSubject = () => {

    return(

        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">add subject</h4>
                <div className="form-center">
                    <FormRow type="text" name="subjectName" labelText="subject name"/>
                    <FormRow type="text" name="topic"/>
                    <FormRow type="text" name="subjectBibliography" labelText="subject bibliography" defaultValue="course bibliography"/>
                    <FormRowSelect
                        labelText="subject status"
                        name="subjectStatus"
                        defaultValue={SUBJECT_STATUS.PENDING}
                        list={Object.values(SUBJECT_STATUS)}
                    />
                    <FormRowSelect
                        labelText="subject type"
                        name="subjectType"
                        defaultValue={SUBJECT_TYPE.HARD}
                        list={Object.values(SUBJECT_TYPE)}
                    />
                    <SubmitBtn formBtn/>
                </div>
            </Form>            
        </Wrapper>
    );
};

export default AddSubject;