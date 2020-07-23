import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { Button, Container, Card } from 'react-bootstrap';

const StudentDashboard = (props) => {

    // Can use profsUpdate to update professor props in App.js if needed.
    
    //const [professorProps, setProfessorProps] = useState("");

    //const profsUpdate = (value) => {
    //    props.sendProfs(value);
    //};

    const history = useHistory();

    const handleClick = () => {

        //profsUpdate(professorProps);

        history.push({
            pathname: "/student/professor-lookup",
            state: { detail: props.profs }
        })
    }

    return (
        <>  
            <Container>
                <Card className="mt-3" border="primary" bg="white" text="primary">
                        <Card.Body>
                            <Card.Title>
                            <Link to="/student">Student Dashboard</Link>
                            <Button className="float-right" onClick={handleClick}>Professor Lookup</Button>
                            </Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.Body>
                </Card>
            </Container>
        </>


    );
};

export default StudentDashboard;