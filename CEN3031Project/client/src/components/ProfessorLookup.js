import React from 'react';
import axios from "axios";
import { Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col, Card, Form, FormControl, Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';

const MySearch = (props) => {

    let input;
    const handleClick = () => {

        console.log(props);
        //props.onSearch(input.value);
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

let realData;

const products = [
    //     {
    //         firstName: 'Mark',
    //         lastName: 'Smith',
    //         department: 'english',
    //         university: 'UF',
    //         subject: 'Creative Writing',
    //         request: <Button>Request</Button>
    //     }, {
    //         firstName: 'Daniel',
    //         lastName: 'Labes',
    //         department: 'math',
    //         university: 'UF',
    //         subject: 'Calculus'
    //     }
]

const profData = () => {
    axios.get(PROFESSOR_API_URL).then(
        res => {
            realData = res;
            console.log(realData);
            for (let i in realData.data) {
                let packet = {
                    fullName: realData.data[i].fullName,
                    department: realData.data[i].department,
                    university: realData.data[i].university,
                    subjects: realData.data[i].subjects,
                }
                console.log(packet);
                products.push(packet);
            }
            return products;
        });
}

const ProfessorLookup = (props) => {

    console.log(props.data);

    const columns = [{
        dataField: 'fullName',
        text: 'Professor'
        // }, {
        //     dataField: 'firstName',
        //     text: 'University'
        // }, {
        //     dataField: 'firstName',
        //     text: 'Department'
        // }, {
        //     dataField: 'firstName',
        //     text: 'Tutoring Subjects'
        // 
    }];

    return (
        <>
            <Container>
                <ToolkitProvider
                    keyField='fullName'
                    data={props.data}
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