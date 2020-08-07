import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, ButtonToolbar, ButtonGroup, Row, Button, Col } from 'react-bootstrap';
import studenthttpUser from '../../studenthttpUser';
const API_URL = 'api/professors';

const ProfessorRegister = (props) => {
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
    const [summary, setSummary] = useState("");
    const [zoom, setZoom] = useState("");
    const [picture, setPicture] = useState("");

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

    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);

    const browse_history = useHistory();

    const textArea = document.querySelector('textarea')
    const textRowCount = textArea ? textArea.value.split("\n").length : 0
    const rows = textRowCount + 3

    //splits a string and capitalizes the first letter of every word
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }


    const handleSubmit = async (event) => {
        console.log("in submit");

        event.preventDefault();

        let subjArr = [];
        var checkboxes = document.querySelectorAll('input[name="subject"]:checked');
        for (var checkbox of checkboxes) {
            let temp = checkbox.value;
            temp = temp.replace('{', '');
            temp = temp.replace('}', '');
            if (temp.includes('science')) temp = temp.replace("science", " Science");
            temp = titleCase(temp);

            subjArr.push(temp);
        }
        let subjectString = subjArr.join(', ');

        let availArr = [];
        var checkboxes = document.querySelectorAll('input[name="availability"]:checked');
        for (var checkbox of checkboxes) {
            let temp = checkbox.value;
            temp = temp.replace('{', '');
            temp = temp.replace('}', '');
            availArr.push(temp);
        }
        let availString = availArr.join(', ');

        const newprofessor =
        {
            "firstName": firstName,
            "lastName": lastName,
            "username": username,
            "password": hash,
            "salt": salt,
            "userType": "professor",
            "email": email,
            "phoneNumber": phoneNumber,
            "university": university,
            "department": department,
            "city": city,
            "state": state,
            "summary": summary,
            "zoom": zoom,
            "picture": picture,
            "availability": availString,
            "subjectString": subjectString,
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


        const professorUser = await studenthttpUser.signUp(newprofessor);

        if (professorUser) {
            // Maybe pop up saying successful registration here?
        }

        browse_history.push("/")
    };

    //Function to change the input type for password entries to allow for show/hide checkbox
    function showPassword() {
        let x = document.getElementById("inputPassword");

        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    //Functions and constants to handle page turning during registration.
    const [displayRegistration, setDisplayRegistration] = useState(true);
    const [displayQuestionaire, setDisplayQuestionaire] = useState(false);
    const [displaySubmit, setSubmit] = useState(false);

    const registrationHidden = displayRegistration ? '' : 'hidden';
    const questionaireHidden = displayQuestionaire ? '' : 'hidden';

    const handleNext = (event) => {
        event.preventDefault();
        setDisplayRegistration(false);
        setDisplayQuestionaire(true);
        document.getElementById("prevBttn").innerHTML = "Previous";
        document.getElementById("nextBttn").innerHTML = "Submit";
        setSubmit(true);
    }

    const handlePrevious = (event) => {
        event.preventDefault();

        if (displayRegistration && !displayQuestionaire) {
            browse_history.push("/")
        } else {
            setDisplayQuestionaire(false);
            setDisplayRegistration(true);
            document.getElementById("prevBttn").innerHTML = "Back";
            document.getElementById("nextBttn").innerHTML = "Next";
            setSubmit(false);
        }
    }

    const nextOrSubmitButton = displaySubmit ? handleSubmit : handleNext;

    return (
        <>
            <Container>
                <div className="row">
                    <h2>Professor Registration</h2>
                </div>
                <div className="row">
                    <b>
                        Please enter your information to register as a professor.
                </b>
                </div>
                <form id="addForm" onSubmit={handleSubmit} className="card p-3">

                    <div className={registrationHidden}>
                        <div className="form-row">
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="inputFName" className="ml-2 mb-0">First Name</label>
                                <input
                                    id="inputFName"
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={event => setFirstName(event.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="inputLName" className="ml-2 mb-0">Last Name</label>
                                <input
                                    id="inputLName"
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={event => setLastName(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="inputCity" className="ml-2 mb-0">City</label>
                                <input
                                    id="inputCity"
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={event => setCity(event.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-2 mb-0">
                                <label htmlFor="inputState" className="ml-2 mb-0">State</label>
                                <input
                                    id="inputState"
                                    type="text"
                                    placeholder="State"
                                    value={state}
                                    onChange={event => setState(event.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-4 mb-0">
                                <label htmlFor="inputPhone" className="ml-2 mb-0">Phone Number</label>
                                <input
                                    id="inputPhone"
                                    type="text"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={event => setPhoneNumber(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12 mb-0">
                                <label htmlFor="inputEmail" className="ml-2 mb-0">Email</label>
                                <input
                                    className="inputEmail"
                                    type="text"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="inputUniversity" className="ml-2 mb-0">University</label>
                                <input
                                    id="inputUniversity"
                                    type="text"
                                    placeholder="University"
                                    value={university}
                                    onChange={event => setUniversity(event.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="inputDepartment" className="ml-2 mb-0">Department</label>
                                <input
                                    id="inputDepartment"
                                    type="text"
                                    placeholder="Department"
                                    value={department}
                                    onChange={event => setDepartment(event.target.value)}
                                />
                            </div>
                        </div>

                        <br />
                        <div className="form-group ml-3">
                            <div className="form-row">
                                <strong>Select Subjects You Wish To Tutor In:</strong>
                            </div>
                            <div className="form-row">
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{computerscience}" onChange={() => setComputerScience(!computerscience)} />Computer Science</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{english}" onChange={event => setEnglish(!english)} />English</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{spanish}" onChange={event => setSpanish(!spanish)} />Spanish</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{french}" onChange={event => setFrench(!french)} />French</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{latin}" onChange={event => setLatin(!latin)} />Latin</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{algebra}" onChange={event => setAlgebra(!algebra)} />Algebra</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{geometry}" onChange={event => setGeometry(!geometry)} />Geometry</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{precalculus}" onChange={event => setPrecalculus(!precalculus)} />Precalculus</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{statistics}" onChange={event => setStatistics(!statistics)} />Statistics</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{calculus}" onChange={event => setCalculus(!calculus)} />Calculus</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{biology}" onChange={event => setBiology(!biology)} />Biology</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{chemistry}" onChange={event => setChemistry(!chemistry)} />Chemistry</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{physics}" onChange={event => setPhysics(!physics)} />Physics</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{healthscience}" onChange={event => setHealthScience(!healthscience)} />Health Science</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{environmentalscience}" onChange={event => setEnvironmentalScience(!environmentalscience)} />Environmental Science</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{earthscience}" onChange={event => setEarthScience(!earthscience)} />Earth Science</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{history}" onChange={event => setHistory(!history)} />History</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{economics}" onChange={event => setEconomics(!economics)} />Economics</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{psychology}" onChange={event => setPsychology(!psychology)} />Psychology</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{government}" onChange={event => setGovernment(!government)} />Government</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label><input type="checkbox" name="subject" className="form-check-input"
                                        value="{geography}" onChange={event => setGeography(!geography)} />Geography</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="inputUsername" className="ml-2 mb-0">Username</label>
                                <input
                                    id="inputUsername"
                                    type="text"
                                    placeholder="Desired Username"
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="inputPassword" className="ml-2 mb-0">Password</label>
                                <input
                                    id="inputPassword"
                                    type="password"
                                    placeholder="Password"
                                    value={hash}
                                    onChange={event => setHash(event.target.value)}
                                />
                                <br />
                                <label>
                                    <input type="checkbox" className="ml-2"
                                        onChange={event => showPassword(event.target.value)}
                                    /> Show Password
                                </label>
                                <br />
                            </div>
                        </div>
                        {/* <br />
                    <div className="form-row">
                        <div className="form-group col-md-6 ml-3">
                            <button className="button" onClick={backButton}>Back</button>
                            <input className="button" type="submit" value="Submit" />
                        </div>
                    </div> */}
                    </div>

                    <div className={questionaireHidden}>
                        <div className="form-row">
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="inputPicture" className="ml-2 mb-0">Profile Picture</label>
                                <input
                                    id="inputPicture"
                                    type="text"
                                    placeholder="My_Profile_Picture.png"
                                    value={picture}
                                    onChange={event => setPicture(event.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="inputZoom" className="ml-2 mb-0">Enter your personal Zoom Session link.</label>
                                <input
                                    id="inputZoom"
                                    type="text"
                                    placeholder="Zoom Link"
                                    value={zoom}
                                    onChange={event => setZoom(event.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="inputSummary" className="ml-2 mb-0">Profile Summary</label>
                                <br />
                                <textarea
                                    className="mt-2 ml-2"
                                    id="inputSummary"
                                    placeholder="Create a short summary about yourself for students to view when searching for tutors. You can include things like hobbies, favorite food, favorite sports teams, etc."
                                    rows={rows}
                                    value={summary}
                                    onChange={event => setSummary(event.target.value)}
                                />
                            </div>

                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="inputAvailability" className="ml-2 mb-0">What days are you available?</label>
                                <div className="form-row ml-2 mt-2">
                                    <div className="form-check form-check-inline">
                                        <label><input type="checkbox" name="availability" className="form-check-input"
                                            value="Monday" onChange={event => setMonday(!monday)}/>Monday</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label><input type="checkbox" name="availability" className="form-check-input"
                                            value="Tuesday" onChange={event => setTuesday(!tuesday)}/>Tuesday</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label><input type="checkbox" name="availability" className="form-check-input"
                                            value="Wednesday" onChange={event => setWednesday(!wednesday)}/>Wednesday</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label><input type="checkbox" name="availability" className="form-check-input"
                                            value="Thursday" onChange={event => setThursday(!thursday)}/>Thursday</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label><input type="checkbox" name="availability" className="form-check-input"
                                            value="Friday" onChange={event => setFriday(!friday)}/>Friday</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Button className="cobalt-button" id="prevBttn" onClick={handlePrevious}>Back</Button>
                        </Col>
                        <Col md="auto">
                            <Button className="cobalt-button" id="nextBttn" onClick={nextOrSubmitButton}>Next</Button>
                        </Col>
                    </Row>

                </form>
            </Container>
        </>
    );


};

export default ProfessorRegister;