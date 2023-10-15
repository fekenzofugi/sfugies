import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa"
import {Link, Form} from "react-router-dom";
import Wrapper from "../assets/wrappers/Subject";
import SubjectInfo from "./SubjectInfo";
import day from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);


const Subject = ({_id, subjectName, topic, subjectBibliography, createdAt, subjectStatus , subjectType}) => {

    const date = day(createdAt).format("MMM DD YYYY");

  return (
    <Wrapper>
        <header>
            <div className="main-icon">
                {subjectName.charAt(0)}
            </div>
            <div className="info">
                <h5>{subjectName}</h5>
                <p>{topic}</p>
            </div>
        </header>
        <div className="content">
            <div className="content-center">
                <SubjectInfo icon={<FaLocationArrow/>} text={subjectBibliography}/>
                <SubjectInfo icon={<FaCalendarAlt/>} text={date} />
                <SubjectInfo icon={<FaBriefcase/>} text={subjectType} />
                <div className={`status ${subjectStatus}`}>
                    {subjectStatus}
                </div>
            </div>

            <footer className="actions">
                <Link to={`../edit-subject/${_id}`} className="btn edit-btn">
                    Edit
                </Link>
                <Form method="post" action={`../delete-subject/${_id}`}>
                    <button type="submit" className="btn delete-btn">
                        Delete
                    </button>
                </Form>
            </footer>
        </div>
    </Wrapper>
  )
}

export default Subject