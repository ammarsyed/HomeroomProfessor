import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';

const ProfessorAccount = (props) => {

    return (
        <>
            <Container>
                <Row>
                    <Col sm>Name:</Col>
                    <Col sm>University:</Col>
                    <Col sm>Department:</Col>
                </Row>
                <Row>
                    <Col sm>Email:</Col>
                    <Col sm>Phone Number:</Col>
                    <Col sm>Tutoring Subjects:</Col>
                </Row>
            </Container>
        </>
    );
};

export default ProfessorAccount;