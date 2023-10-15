import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate, useActionData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import {toast} from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errors = {msg: ""};
    if(data.password.length < 3) {
        errors.msg = "password too short"
        return errors;
    };

    try {
        customFetch.post("/auth/login", data);
        toast.success("Login successfull");
        return redirect("/dashboard");

    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    };
};

const Login = () => {

    const errors = useActionData();

    const navigate = useNavigate();

    const loginDemoUser = async () => {
        const data = {
            email: "test@test.com",
            password: "secret123"
        };
        try {
            customFetch.post("/auth/login", data);
            toast.success("Take a test drive : )");
            return navigate("/dashboard")
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        };
    };

    return(
        <Wrapper>
            <Form method="post" className="form">
                <Logo/>
                <h4>Login</h4>
                <FormRow type="email" name="email"/>
                <FormRow type="password" name="password"/>
                {errors?.msg && <p style={{color: "red"}}>{errors.msg}</p>}
                <SubmitBtn/>
                <button type="button" className="btn btn-block" onClick={loginDemoUser}>
                    explore the app
                </button>
                <p>
                    Not a member yet?
                    <Link to="/register" className="member-btn">
                        Register
                    </Link>
                </p>    
            </Form>
        </Wrapper>
    );
};

export default Login;