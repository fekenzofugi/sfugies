import landingImg from "../assets/images/landing-page-img.png";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import {Link} from "react-router-dom";

const LandingPage = () => {
    return(
        <Wrapper>
            <nav>
                <Logo/>
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>Study App</h1>
                    <p>
                    Study organization is key to success. Start by creating a schedule that includes specific study times and breaks. Use tools like calendars or apps to stay on track. Prioritize tasks, break them into smaller manageable chunks, and tackle them one at a time. And remember, a tidy study space leads to a tidy mind! Keep your materials organized and minimize distractions. You got this! 📚💪
                    </p>
                    <Link to="/register" className="btn register-link">
                        Register
                    </Link>
                    <Link to="/login" className="btn">
                        Login / Demo
                    </Link>                    
                </div>
                <img src={landingImg} alt="landing-img" className="img main-img" />
            </div>

            <footer>
                <a href="">Developed by Fernando Fugihara</a>
            </footer>

        </Wrapper>
    );
};

export default LandingPage;