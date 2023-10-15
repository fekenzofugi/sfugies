import Subject from "./Subject";
import Wrapper from "../assets/wrappers/SubjectsContainer";
import { useAllSubjectsContext } from "../pages/AllSubjects";
import PageBtnContainer from "./PageBtnContainer";


const SubjectsContainer = () => {

    const {data} = useAllSubjectsContext();
    const {subjects, totalSubjects, numOfPages} = data;

    if (subjects.length === 0) {
        return (
            <Wrapper>
                <h2>No subjects to display...</h2>
            </Wrapper>
        )
    }

    return(
        <Wrapper>
            <h5>{totalSubjects} subject{subjects.length > 1 && "s"} found</h5>
            <div className="subjects">
                {subjects.map((subject) => {
                    return <Subject key={subject._id} {...subject}/>
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer/>}
        </Wrapper>
    );
}

export default SubjectsContainer;