import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import SubmitBtn from "./SubmitBtn";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { SUBJECT_STATUS, SUBJECT_TYPE, SUBJECT_SORT_BY } from "../../../utils/constants";
import { useAllSubjectsContext } from "../pages/AllSubjects";

const SearchContainer = () => {

    const debounce = (onChange) => {
        let timeout;
        return (event) => {
          const form = event.currentTarget.form;
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            onChange(form);        
          }, 2000)
        };
    };

    const {searchValues} = useAllSubjectsContext();
    const {search, subjectStatus, subjectType, sort} = searchValues;
    const submit = useSubmit();

  return (
    <Wrapper>
        <Form method="post" className="form">
            <h5 className="form-title">search form</h5>
            <div className="form-center">
                <FormRow type="search" name="search" defaultValue={search} onChange={debounce((form) => {
                    submit(form);
                })}/>
                <FormRowSelect labelText="subject status" name="subjectStatus" list={["all", ...Object.values(SUBJECT_STATUS)]} defaultValue={subjectStatus} onChange={(event) => {
                    submit(event.currentTarget.form);
                }}
                />
                <FormRowSelect labelText="subject type" name="subjectType" list={["all", ...Object.values(SUBJECT_TYPE)]} defaultValue={subjectType} onChange={(event) => {
                    submit(event.currentTarget.form);
                }}
                />
                <FormRowSelect name="sort" defaultValue={sort} list={[...Object.values(SUBJECT_SORT_BY)]} onChange={(event) => {
                    submit(event.currentTarget.form);
                }}/>
                <Link to="/dashboard/all-subjects" className="btn form-btn delete-btn">
                    Reset Search Values
                </Link>
                <SubmitBtn formBtn/>
            </div>
        </Form>
    </Wrapper>
  );
};

export default SearchContainer