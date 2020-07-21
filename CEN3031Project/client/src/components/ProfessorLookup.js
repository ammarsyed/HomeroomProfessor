import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom'
import { Button, Container, Row, Col, Card, Form, FormControl, Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';

const ProfessorLookup = (props) => {
    
    const [professorArray] = useState(props.location.state.detail);
    const { SearchBar } = Search;

    function subjectFormatter(cell, row, rowIndex) {
        var arr = [];

        var keys = Object.keys(professorArray[rowIndex].subjects)

        var filtered = keys.filter(function (key) {
            return professorArray[rowIndex].subjects[key]
        });

        for (var key in filtered) {
            arr.push(<tr key={key}><td>{filtered[key]}</td></tr>)
        }

        return (
            <table>
                <tbody>
                    {arr}
                </tbody>
            </table>
            )
    }

    const columns = [{
        dataField: 'fullName',
        text: 'Professor'
    }, {
        dataField: 'university',
        text: 'University'
    }, {
        dataField: 'department',
        text: 'Department'
    }, {
        dataField: "subjects",
        formatter: subjectFormatter,
        text: 'Tutoring Subjects'
    }, {
        dataField: 'request',
        text: 'Request Professor',
        isDummyField: true,
        formatter: (cellContent, row) => (
            <Button>Make Appointment</Button>
            )
    }];

    return (
        <>
            <Container>
                <ToolkitProvider
                    keyField='firstName'
                    data={professorArray}
                    columns={columns}
                    search
                >
                    {
                        props => (
                            <div>
                                <br />
                                <h5>Professor Lookup</h5>
                                <SearchBar { ...props.searchProps } />
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