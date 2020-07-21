import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom'
import { Button, Container, Row, Col, Card, Form, FormControl, Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';

const ProfessorLookup = (props) => {

    const [professorArray] = useState(props.location.state.detail);
    const { SearchBar } = Search;

    //splits a string and capitalizes the first letter of every word
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    for( let i = 0; i < professorArray.length; i++)
    {
        professorArray[i].fullName = titleCase(professorArray[i].fullName);

        if(professorArray[i].university.length > 4) professorArray[i].university = titleCase(professorArray[i].university);
        else professorArray[i].university = professorArray[i].university.toUpperCase();

        if(professorArray[i].department.length > 4) professorArray[i].department = titleCase(professorArray[i].department);
        else professorArray[i].department = professorArray[i].department;
        
        for(let j = 0; j < professorArray[i].subjects.length; i++)
        {
            professorArray[i].subjects[j] = titleCase(professorArray[i].subjects[j]);
        }
    }

    function subjectFormatter(cell, row, rowIndex) {
        var arr = [];

        var keys = Object.keys(professorArray[rowIndex].subjects)

        console.log(keys)

        var filtered = keys.filter(function (key) {
            return professorArray[rowIndex].subjects[key]
        });

        for (var key in filtered) {
            let temp;

            if (filtered[key].includes('science')) {

                temp = filtered[key].charAt(0).toUpperCase() + filtered[key].slice(1);
                temp = temp.replace("science", " Science");
            }
            else {
                temp = filtered[key].charAt(0).toUpperCase() + filtered[key].slice(1);
            }

            arr.push(<tr key={key}>{temp}</tr>)
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
        dataField: 'phoneNumber',
        text: 'Phone Number'
    }, {
        dataField: 'email',
        text: 'Email'
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
                                <SearchBar {...props.searchProps} />
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