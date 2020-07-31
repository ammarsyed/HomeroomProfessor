import React, {useState, useEffect} from 'react';
import {Button, Container} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import AppointmentModal from './AppointmentModal';
import axios from "axios";

// const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';
const PROFESSOR_API_URL = '/api/professors';


const ProfessorLookup = (props) =>
{

    //Leaving setProfessorArray for now despite unused notice, state/hooks are usually
    //defined this way and we may need to update it later
    const [professorArray, setProfessorArray] = useState(props.location.state.detail);
    const [displayModal, setDisplayModal] = useState(false);
    const [currentProfessor, setCurrentProfessor] = useState({});

    const {SearchBar} = Search;

    //splits a string and capitalizes the first letter of every word
    function titleCase(str)
    {
        var splitStr = str.toLowerCase().split(' ');
        for(var i = 0; i < splitStr.length; i++)
        {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    for(let i = 0; i < professorArray.length; i++)
    {
        professorArray[i].fullName = titleCase(professorArray[i].fullName);

        if(professorArray[i].university.length > 4)
        {
            professorArray[i].university = titleCase(professorArray[i].university)
        }
        else
        {
            professorArray[i].university = professorArray[i].university.toUpperCase()
        }

        if(professorArray[i].department.length > 4) professorArray[i].department = titleCase(professorArray[i].department);

        for(let j = 0; j < professorArray[i].subjects.length; i++)
        {
            professorArray[i].subjects[j] = titleCase(professorArray[i].subjects[j]);
        }
    }

    const updateAndShow = (id) =>
    {

        setCurrentProfessor({id});

        setDisplayModal(true);
    }

    const updateAndHide = (value) =>
    {
        console.log(currentProfessor);
        console.log(props.currentUser);

        console.log(value);

        if(value === 1)
        {
            let response = axios.post(PROFESSOR_API_URL + '/addRequest', props.currentUser, currentProfessor);

            if(response)
            {
                // Maybe say submitted successfully, or just redirect to dashboard?
                console.log(response);
            }
            else
            {
                // Unable to make appointment at this time?
            }
        }

        setDisplayModal(false);
    }

    const columns = [{
        dataField: 'fullName',
        text: 'Professor',
        headerAlign: 'center',
        style: {
            textAlign: 'center',
            verticalAlign: 'middle'
        }
    }, {
        dataField: 'university',
        text: 'University',
        headerAlign: 'center',
        style: {
            textAlign: 'center',
            verticalAlign: 'middle'
        }
    }, {
        dataField: 'department',
        text: 'Department',
        headerAlign: 'center',
        style: {
            textAlign: 'center',
            verticalAlign: 'middle'
        }
    }, {
        dataField: "subjectString",
        text: 'Tutoring Subjects',
        headerAlign: 'center',
        style: {textAlign: 'center'}
    }, {
        dataField: 'request',
        text: 'Request Professor',
        headerAlign: 'center',
        style: {
            textAlign: 'center',
            verticalAlign: 'middle'
        },
        isDummyField: true,
        formatter: (cellContent, row) => (
            //<Button onClick={() => buttonTest(row)}>Make Appointment</Button>
            <Button className="cobalt-button" onClick={() => updateAndShow(row)}>Make Appointment</Button>
        )
    }];

    return (
        <>
            <Container>
                <ToolkitProvider
                    keyField='firstName'
                    data={professorArray}
                    columns={columns}
                    search={{searchFormatted: true}}
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
                <AppointmentModal
                    show={displayModal}
                    onHide={updateAndHide}
                />
            </Container>
        </>
    );
};

export default ProfessorLookup;