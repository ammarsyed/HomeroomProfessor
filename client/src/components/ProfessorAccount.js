import React from 'react';
import { Col, Image, Container, Card, ListGroup, Figure } from 'react-bootstrap';

const ProfessorAccount = (props) => {

    function titleCase(str) {
        console.log(str)
        if (str == null) return '';

        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    return (
        <>
            <Container>
                <Card className="mt-3 cobalt-card">
                    <Card.Header className="text-center" text="primary">
                        <Card.Title>
                            <h3>Account Information</h3>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup className="flex-row align-items-center justify-content-between" variant="flush">
                            <Figure>
                                <Figure.Image
                                    width={171}
                                    height={180}
                                    alt="171x180"
                                    src={props.currentUser.picture} rounded
                                />
                            </Figure>
                            <ListGroup className="align-items-left justify-content-between" variant="flush">
                                <ListGroup.Item >Name: {titleCase(props.currentUser.fullName)}</ListGroup.Item>
                                <ListGroup.Item className="dashlist">Personal Summary: {props.currentUser.summary}</ListGroup.Item>
                            </ListGroup>
                        </ListGroup>
                        <ListGroup className="flex-xl-row border-bottom align-items-center justify-content-between" variant="flush">
                            <ListGroup.Item className="dashlist">University: {titleCase(props.currentUser.university)}</ListGroup.Item>
                            <ListGroup.Item className="dashlist">Department: {props.currentUser.department}</ListGroup.Item>
                            <ListGroup.Item className="dashlist">Email: {props.currentUser.email}</ListGroup.Item>
                            <ListGroup.Item className="dashlist">Phone Number: {props.currentUser.phoneNumber}</ListGroup.Item>
                        </ListGroup>
                        <ListGroup className="border-bottom align-items-left justify-content-between" variant="flush">
                            <ListGroup.Item className="dashlist">Tutoring Availability: {props.currentUser.availability}</ListGroup.Item>
                        </ListGroup>
                        <ListGroup className="border-bottom align-items-left justify-content-between" variant="flush">
                            <ListGroup.Item className="dashlist">Tutoring Subjects: {props.currentUser.subjectString}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default ProfessorAccount;