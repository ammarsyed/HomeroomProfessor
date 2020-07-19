import React from 'react';
import { Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col, Card, Form, FormControl, Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const MySearch = (props) => {
    let input;
    const handleClick = () => {
        console.log(input.value);
        props.onSearch(input.value);
    };
    return (
        <div>
            <Form inline>
                <FormControl type="text" ref={n => input = n} placeholder="Search" />
                <Button variant="outline-primary" onClick={handleClick}>Search</Button>
            </Form>
        </div>
    );
};

const products = [
    {
        firstName: 'Mark',
        lastName: 'Smith',
        department: 'english',
        university: 'UF',
        subject: 'Creative Writing',
        request: <Button>Request</Button>
    }, {
        firstName: 'Daniel',
        lastName: 'Labes',
        department: 'math',
        university: 'UF',
        subject: 'Calculus'
    }];



const ProfessorLookup = (props) => {

    let fullName = props.firstName + " " + props.lastName;

    const columns = [{
        dataField: 'firstName',
        text: 'Professor'
    }, {
        dataField: 'university',
        text: 'University'
    }, {
        dataField: 'department',
        text: 'Department'
    }, {
        dataField: 'subject',
        text: 'Tutoring Subjects'
    }
    , {
        dataField: 'request',
        text: 'Request Professor'
    }];

    return (
        <>
            <Container>
                <ToolkitProvider
                    keyField='firstName'
                    data={products}
                    columns={columns}
                    search
                >
                    {
                        props => (
                            <div>
                                <br />
                                <h5>Professor Lookup</h5>
                                <MySearch {...props.searchProps} />
                                <hr />
                                <BootstrapTable
                                    {...props.baseProps}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </Container>
        </>
    );
};

export default ProfessorLookup;