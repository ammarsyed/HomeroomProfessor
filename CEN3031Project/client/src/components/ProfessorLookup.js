import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const ProfessorLookup = (props) => {

    //Leaving setProfessorArray for now despite unused notice, state/hooks are usually
    //defined this way and we may need to update it later
    const [professorArray, setProfessorArray] = useState(props.location.state.detail);

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

    function subjectFormatter(cell, row, rowIndex) {
        var arr = [];

        var keys = Object.keys(professorArray[rowIndex].subjects)

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

            arr.push(<td className="lookup" key={key}>{temp}</td>)
        }

        return (
            <table className="lookup">
                <tbody>
                    <tr className="lookup">
                        {arr}
                    </tr>
                </tbody>
            </table>
        )
    }

    function newFilter(cell, row, rowIndex) {
        var arr = [];
        const keys = Object.keys(professorArray[row].subjects);
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

            arr.push(<td className="lookup" key={key}>{temp}</td>)
        }
        return arr;
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
        style: { textAlign: 'center' }
    }, {
        dataField: 'request',
        text: 'Request Professor',
        headerAlign: 'center',
        style: { textAlign: 'center' },
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
                    search={ { searchFormatted: true } }
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