import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Button, Container, Row, Col, Navbar, Nav, NavDropdown, Card, Form, FormControl} from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/professors';

const ProfessorRegister = (props) =>
{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [hash, setHash] = useState("");
    const [salt, setSalt] = useState("TempSalt");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [university, setUniversity] = useState("");
    const [department, setDepartment] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    // Subjects can be done using an array, but i don't know how
    // to do it exactly. Requires more time, so individual
    // states for each subject for now
    // const [subjects, setSubjects] = useState([]);

    const [computerscience, setComputerScience] = useState(false);
    const [english, setEnglish] = useState(false);
    const [spanish, setSpanish] = useState(false);
    const [french, setFrench] = useState(false);
    const [latin, setLatin] = useState(false);
    const [algebra, setAlgebra] = useState(false);
    const [geometry, setGeometry] = useState(false);
    const [precalculus, setPrecalculus] = useState(false);
    const [statistics, setStatistics] = useState(false);
    const [calculus, setCalculus] = useState(false);
    const [biology, setBiology] = useState(false);
    const [chemistry, setChemistry] = useState(false);
    const [physics, setPhysics] = useState(false);
    const [healthscience, setHealthScience] = useState(false);
    const [environmentalscience, setEnvironmentalScience] = useState(false);
    const [earthscience, setEarthScience] = useState(false);
    const [history, setHistory] = useState(false);
    const [economics, setEconomics] = useState(false);
    const [psychology, setPsychology] = useState(false);
    const [government, setGovernment] = useState(false);
    const [geography, setGeography] = useState(false);

    const browse_history = useHistory();

    const handleSubmit = (event) =>
    {
        event.preventDefault();

        const newprofessor =
        {
            "firstName": firstName,
            "lastName": lastName,
            "username": username,
            "hash": hash,
            "salt": salt,
            "email": email,
            "phoneNumber": phoneNumber,
            "university": university,
            "department": department,
            "city": city,
            "state": state,
            "subjects": {
                "computerscience": computerscience,
                "english": english,
                "spanish": spanish,
                "french": french,
                "latin": latin,
                "algebra": algebra,
                "geometry": geometry,
                "precalculus": precalculus,
                "statistics": statistics,
                "calculus": calculus,
                "biology": biology,
                "chemistry": chemistry,
                "physics": physics,
                "healthscience": healthscience,
                "environmentalscience": environmentalscience,
                "earthscience": earthscience,
                "history": history,
                "economics": economics,
                "psychology": psychology,
                "government": government,
                "geography": geography
            }
        };

        axios.post(API_URL, newprofessor)
            .then(res =>
            {
                console.log(res);
                console.log(res.data);
            })

        browse_history.push("/")
    };

    const backButton = (event) =>
    {
        event.preventDefault();
        browse_history.push("/")
    }

    //Function to change the input type for password entries to allow for show/hide checkbox
    function showPassword()
    {
        let x = document.getElementById("inputPassword");

        if(x.type === "password")
        {
            x.type = "text";
        } else
        {
            x.type = "password";
        }
    }

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/">HOMEROOM PROFESSOR</Navbar.Brand>
            </Navbar>
            <div class="container">
                <div class="row">
                    <h2>Professor Registration</h2>
                </div>
                <div class="row">
                    <b>
                        Please enter your information to register as a professor.
                </b>
                </div>
                <form id="addForm" onSubmit={handleSubmit} class="card p-3">
                    <div class="form-row">
                        <div class="form-group col-md-6 mb-0">
                            <label for="inputFName" class="ml-2 mb-0">First Name</label>
                            <input
                                id="inputFName"
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={event => setFirstName(event.target.value)}
                            />
                        </div>
                        <div class="form-group col-md-6 mb-0">
                            <label for="inputLName" class="ml-2 mb-0">Last Name</label>
                            <input
                                id="inputLName"
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={event => setLastName(event.target.value)}
                            />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6 mb-0">
                            <label for="inputCity" class="ml-2 mb-0">City</label>
                            <input
                                id="inputCity"
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={event => setCity(event.target.value)}
                            />
                        </div>
                        <div class="form-group col-md-2 mb-0">
                            <label for="inputState" class="ml-2 mb-0">State</label>
                            <input
                                id="inputState"
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={event => setState(event.target.value)}
                            />
                        </div>
                        <div class="form-group col-md-4 mb-0">
                            <label for="inputPhone" class="ml-2 mb-0">Phone Number</label>
                            <input
                                id="inputPhone"
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={event => setPhoneNumber(event.target.value)}
                            />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12 mb-0">
                            <label for="inputEmail" class="ml-2 mb-0">Email</label>
                            <input
                                className="inputEmail"
                                type="text"
                                placeholder="E-mail"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6 mb-0">
                            <label for="inputUniversity" class="ml-2 mb-0">University</label>
                            <input
                                id="inputUniversity"
                                type="text"
                                placeholder="University"
                                value={university}
                                onChange={event => setUniversity(event.target.value)}
                            />
                        </div>
                        <div class="form-group col-md-6 mb-0">
                            <label for="inputDepartment" class="ml-2 mb-0">Department</label>
                            <input
                                id="inputDepartment"
                                type="text"
                                placeholder="Department"
                                value={department}
                                onChange={event => setDepartment(event.target.value)}
                            />
                        </div>
                    </div>

                    <p className="inputCheckboxes"><strong>Select Subjects You Wish To Tutor In:</strong>
                        <br />
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                checked={computerscience} onChange={() => setComputerScience(!computerscience)} />Computer Science</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{english}" onChange={event => setEnglish(!english)} />English</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{spanish}" onChange={event => setSpanish(!spanish)} />Spanish</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{french}" onChange={event => setFrench(!french)} />French</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{latin}" onChange={event => setLatin(!latin)} />Latin</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{algebra}" onChange={event => setAlgebra(!algebra)} />Algebra</label>
                        </div>
                        <br />
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{geometry}" onChange={event => setGeometry(!geometry)} />Geometry</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{precalculus}" onChange={event => setPrecalculus(!precalculus)} />Precalculus</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{statistics}" onChange={event => setStatistics(!statistics)} />Statistics</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{calculus}" onChange={event => setCalculus(!calculus)} />Calculus</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{biology}" onChange={event => setBiology(!biology)} />Biology</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{chemistry}" onChange={event => setChemistry(!chemistry)} />Chemistry</label>
                        </div>
                        <br />
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{physics}" onChange={event => setPhysics(!physics)} />Physics</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{healthscience}" onChange={event => setHealthScience(!healthscience)} />Health Science</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{environmentalscience}" onChange={event => setEnvironmentalScience(!environmentalscience)} />Environmental Science</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{earthscience}" onChange={event => setEarthScience(!earthscience)} />Earth Science</label>
                        </div>
                        <br />
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{history}" onChange={event => setHistory(!history)} />History</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{economics}" onChange={event => setEconomics(!economics)} />Economics</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{psychology}" onChange={event => setPsychology(!psychology)} />Psychology</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{government}" onChange={event => setGovernment(!government)} />Government</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <label><input type="checkbox" name="subject" class="form-check-input"
                                value="{geography}" onChange={event => setGeography(!geography)} />Geography</label>
                        </div>
                    </p>

                    <div class="form-row">
                        <div class="form-group col-md-6 mb-0">
                            <label for="inputUsername" class="ml-2 mb-0">Username</label>
                            <input
                                id="inputUsername"
                                type="text"
                                placeholder="Desired Username"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                            />
                        </div>
                        <div class="form-group col-md-6 mb-0">
                            <label for="inputPassword" class="ml-2 mb-0">Password</label>
                            <input
                                id="inputPassword"
                                type="password"
                                placeholder="Password"
                                value={hash}
                                onChange={event => setHash(event.target.value)}
                            />
                            <br />
                            <label>
                                <input type="checkbox" class="ml-2"
                                    onChange={event => showPassword(event.target.value)}
                                /> Show Password
                                </label>
                            <br />
                        </div>
                    </div>
                    <br />
                    <div class="form-row">
                        <div class="form-group col-md-6 ml-3">
                            <button id="button" onClick={backButton}>Back</button>
                            <input id="button" type="submit" value="Submit" />
                        </div>
                    </div>

                </form>
            </div>
        </>
    );


};

export default ProfessorRegister;