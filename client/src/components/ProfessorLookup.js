import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import AppointmentModal from './AppointmentModal';
import axios from "axios";

// const PROFESSOR_API_URL = 'http://localhost:5000/api/professors';
const PROFESSOR_API_URL = '/api/professors';


const ProfessorLookup = (props) => {

    //Leaving setProfessorArray for now despite unused notice, state/hooks are usually
    //defined this way and we may need to update it later
    const [professorArray, setProfessorArray] = useState(props.location.state.detail);
    const [displayModal, setDisplayModal] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [currentProfessor, setCurrentProfessor] = useState({});

    const { SearchBar } = Search;

    //splits a string and capitalizes the first letter of every word
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    for (let i = 0; i < professorArray.length; i++) {
        professorArray[i].fullName = titleCase(professorArray[i].fullName);

        if (professorArray[i].university.length > 4) {
            professorArray[i].university = titleCase(professorArray[i].university)
        }
        else {
            professorArray[i].university = professorArray[i].university.toUpperCase()
        }

        if (professorArray[i].department.length > 4) professorArray[i].department = titleCase(professorArray[i].department);

        for (let j = 0; j < professorArray[i].subjects.length; i++) {
            professorArray[i].subjects[j] = titleCase(professorArray[i].subjects[j]);
        }
    }

    const updateAndShow = (professor) => {

        setCurrentProfessor(professor);

        setDisplayModal(true);
    }


    const updateProfessorDB = (value) => {

        const newMeeting = {
            "id": currentProfessor._id,
            "firstName": props.currentUser.firstName,
            "lastName": props.currentUser.lastName,
            "iat": props.currentUser.iat
        };

        // console.log(newMeeting);

        let response = axios.post(PROFESSOR_API_URL + '/addRequest', newMeeting);

        // console.log(response);

        setDisplaySuccess(true);
    }

    const closeModal = () => {

        setDisplaySuccess(false);

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
        style: {
            textAlign: 'center',
            verticalAlign: 'middle'
        }
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

    const defaultSearch = props.recommendedProfessors[0] ? props.recommendedProfessors[0].fullName : "";

    return (
        
        <>
            <Container>
                <ToolkitProvider
                    keyField='firstName'
                    data={professorArray}
                    columns={columns}
                    search={{ searchFormatted: true }, {defaultSearch} }
                >
                    {
                        props => (
                            <div>
                                <br />
                                <h5>Professor Lookup</h5>
                                <p>One of your recommended professors is shown below. Please enter a new name, university, department, or subject to search for other professors.</p>
                                <SearchBar {...props.searchProps}/>
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
                    onSubmit={updateProfessorDB}
                    onClose={closeModal}
                    profs={currentProfessor}
                    showSuccess={displaySuccess}
                />
            </Container>
        </>
    );
};

export default ProfessorLookup;