import Wrapper from "../assets/wrappers/SubjectInfo";


const SubjectInfo = ({icon, text}) => {
  return (
    <Wrapper>
        <span className="subject-icon">
            {icon}
        </span>
        <span className="subject-text">
            {text}
        </span>
    </Wrapper>
  )
}

export default SubjectInfo