import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import {Container} from 'react-bootstrap';

import studenthttpUser from '../../studenthttpUser.js'
const API_URL = 'http://localhost:5000/api/students';

const StudentRegister = (props) =>
{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [hash, setHash] = useState("");
    const [salt, setSalt] = useState("TempSalt");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [grade, setGrade] = useState("");
    const [gradeDisplay, setGradeDisplay] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
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

    //const [checked, setChecked] = useState(false);

    const browse_history = useHistory();

    const handleSubmit = async (event) => //made async
    {
        event.preventDefault();

        const newstudent =
        {
            "firstName": firstName,
            "lastName": lastName,
            "username": username,
            "password": hash, //changed to password
            "salt": salt,
            "email": email,
            "age": age,
            "phoneNumber": phoneNumber,
            "grade": grade,
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

        // axios.post(API_URL, newstudent)
        //     .then(res =>
        //     {
        //         console.log(res);
        //         console.log(res.data);

        //     })
        //added below stuff
        console.log(newstudent.username);
        console.log(newstudent.password);
        const studentUser = await studenthttpUser.signUp(newstudent);
        console.log(studentUser);
        //empty newStudent ??? not sure
        if(studentUser)
        {
            props.onSignUpSuccess(studentUser);
            // update CURRENT STUDENT STATE AND LOGIN STATE IN APPJS???
            // im not sure if push should go inside this function or outside
        }

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
            x.className = "inputFormHalfPassword"
            x.type = "text";
        } else
        {
            x.type = "password";
        }
    }

    //function to handle the drowndown select for grade
    const handleSelect = (event) =>
    {
        console.log(event);
        setGrade(event);

        if(event === "0")
            setGradeDisplay("K");
        else
            setGradeDisplay(event);
    }

    return (
        <>
            <Container>
                <div className="row">
                    <h2>Student Registration</h2>
                </div>
                <div className="row">
                    <b>
                        Please enter your information below to register as a student.
                    </b>
                </div>
                <form onSubmit={handleSubmit} className="card p-3">
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
                        <div className="form-group col-sl-1 mb-0 ml-2">
                            <label htmlFor="inputGrade" className="ml-0 mb-2">Grade</label>
                            <DropdownButton
                                title={gradeDisplay}
                                variant="secondary"
                                onSelect={handleSelect}
                                id="buttonForm"
                            >
                                <Dropdown.Item eventKey='0'>Kindergarten</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="1">First</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Second</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Third</Dropdown.Item>
                                <Dropdown.Item eventKey="4">Fourth</Dropdown.Item>
                                <Dropdown.Item eventKey="5">Fifth</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="6">Sixth</Dropdown.Item>
                                <Dropdown.Item eventKey="7">Seventh</Dropdown.Item>
                                <Dropdown.Item eventKey="8">Eighth</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="9">Ninth (freshman)</Dropdown.Item>
                                <Dropdown.Item eventKey="10">Tenth (sophomore)</Dropdown.Item>
                                <Dropdown.Item eventKey="11">Eleventh (junior)</Dropdown.Item>
                                <Dropdown.Item eventKey="12">Twelfth (senior)</Dropdown.Item>
                            </DropdownButton>
                        </div>

                        <div className="form-group col-sm-2 mb-0">
                            <label htmlFor="inputAge" className="ml-5 mb-0">Age</label>
                            <input
                                className="ml-5 mb-0"
                                id="inputAge"
                                type="text"
                                placeholder="Age"
                                value={age}
                                onChange={event => setAge(event.target.value)}
                            />
                        </div>
                    </div>

                    <br />
                    <div className="form-group ml-3">
                        <div className="form-row">
                            <strong>Select Subjects To Be Tutored In:</strong>
                        </div>
                        <div className="form-row">
                            <div className="form-check form-check-inline">
                                <label><input type="checkbox" name="subject" className="form-check-input"
                                    checked={computerscience} onChange={() => setComputerScience(!computerscience)} />Computer Science</label>
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
                    <br />
                    <div className="form-row">
                        <div className="form-group col-md-6 ml-3">
                            <button className="button" onClick={backButton}>Back</button>
                            <input className="button" type="submit" value="Submit" />
                        </div>
                    </div>

                </form>
            </Container>
        </>
    );

};

export default StudentRegister;