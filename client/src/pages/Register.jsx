import { Logo, FormRow, SubmitBtn } from "../components";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({request}) => {
  
    const formData = await request.formData()
    const data = Object.fromEntries(formData);

    const errors = {msg: ""};
    if (data.password.length < 3) {
        errors.msg = "password too short";
        return errors
    };
  
    try {
        
      await customFetch.post("/auth/register", data);
  
      toast.success("Registration successfull.");
      
      return redirect("/login");
  
    } catch (error) {
  
      toast.error(error?.response?.data.msg);
      
      return error;
  
    };
  };

const Register = () => {

    const errors = useActionData();

    return(
        <Wrapper>
            <Form method="post" className="form">
                <Logo/>
                <h4>Register</h4>
                <FormRow type="text" name="name" />
                <FormRow type="text" name="lastName" labelText="last name" />
                <FormRow type="text" name="location" />
                <FormRow type="email" name="email" />
                <FormRow type="password" name="password"/>
                {errors?.msg && <p style={{color: "red"}}>{errors.msg}</p>}
                <SubmitBtn/>
                <p>
                    Already a member?
                    <Link to="/login" className="member-btn">
                        Login
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};

export default Register;