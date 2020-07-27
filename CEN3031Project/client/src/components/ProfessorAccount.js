import React from 'react';
import { Col, Row, Container, Card, ListGroup, Button } from 'react-bootstrap';

const ProfessorAccount = (props) => {

    return (
        <>
            <Container>
                <Card className="mt-3" border="primary" bg="white" text="primary">
                    <Card.Header className="text-center" text="primary">
                        <Card.Title>
                            <h3>Account Information</h3>
                         </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup className="flex-xl-row border-bottom align-items-center justify-content-between" variant="flush">
                            <ListGroup.Item className="dashlist">Name: {props.currentUser.fullName}</ListGroup.Item>
                            <ListGroup.Item className="dashlist">University: {props.currentUser.university}</ListGroup.Item>
                            <ListGroup.Item className="dashlist">Department: {props.currentUser.department}</ListGroup.Item>
                            <ListGroup.Item className="dashlist">Email: {props.currentUser.email}</ListGroup.Item>
                            <ListGroup.Item className="dashlist">Phone Number: {props.currentUser.phoneNumber}</ListGroup.Item>
                        </ListGroup>
                        <ListGroup className="flex-xl-row border-bottom align-items-center justify-content-between" variant="flush">
                            <ListGroup.Item className="dashlist">Tutoring Subjects: {props.currentUser.subjectString}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default ProfessorAccount;