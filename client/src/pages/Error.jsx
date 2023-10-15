import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import errorImg from "../assets/images/error-page.png";

const Error = () => {
    const error = useRouteError();
    console.log(error);

    if (error) {
        return (
            <Wrapper>
                <div>
                    <img src={errorImg} alt="not-found" className="img"/>
                    <h3>Ohh! page not found</h3>
                    <p>we can't find the page you're looking for</p>
                    <Link to="/dashboard">back home</Link>                    
                </div>
            </Wrapper>
        );
    };

    return (
        <Wrapper>
            <h3>Something went wrong</h3>
        </Wrapper>
    );
};

export default Error;