import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import {Button, Icon} from 'semantic-ui-react';

const API_URL = 'http://localhost:5000/api/professors';

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

    const handleSubmit = (event) => {
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
            "subjects ": {
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
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

        browse_history.push("/")
    };

    const backButton = (event) => {
        event.preventDefault();
        browse_history.push("/")
    }

    function showPassword(){
        let x = document.getElementById("passwordID");

        if (x.type === "password") {
            x.className = "inputFormHalfPassword"
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return (
        <form id="addForm" onSubmit={handleSubmit}>
            <div >
                <h2>Professor Registration</h2>
                <p>
                    <strong>Please enter your information to register as a professor.</strong>
                </p>
            </div>

            <input
                className="inputHalf"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
            />
            <input
                className="inputHalf"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={event => setLastName(event.target.value)}
            />
            <br/>
            <input
                className="inputHalf"
                type="text"
                placeholder="City"
                value={city}
                onChange={event => setCity(event.target.value)}
            />
            <input
                className="inputThird"
                type="text"
                placeholder="State"
                value={state}
                onChange={event => setState(event.target.value)}
            />
            <input
                className="input38"
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={event => setPhoneNumber(event.target.value)}
            />
            <br />
            <input
                className="inputForm"
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <br />
            <input
                className="inputFormHalf"
                type="text"
                placeholder="University"
                value={university}
                onChange={event => setUniversity(event.target.value)}
            />
            <input
                className="inputFormHalf"
                type="text"
                placeholder="Department"
                value={department}
                onChange={event => setDepartment(event.target.value)}
            />
            <br />
            <p className="inputCheckboxes"><strong>Select Tutor Subjects:</strong>
                <br />
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    checked={computerscience} onChange={() => setComputerScience(!computerscience)} />Computer Science</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{english}" onChange={event => setEnglish(event.target.value)} />English</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{spanish}" onChange={event => setSpanish(event.target.value)} />Spanish</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{french}" onChange={event => setFrench(event.target.value)} />French</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{latin}" onChange={event => setLatin(event.target.value)} />Latin</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{algebra}" onChange={event => setAlgebra(event.target.value)} />Algebra</label>
                <br />
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{geometry}" onChange={event => setGeometry(event.target.value)} />Geometry</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{precalculus}" onChange={event => setPrecalculus(event.target.value)} />Precalculus</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{statistics}" onChange={event => setStatistics(event.target.value)} />Statistics</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{calculus}" onChange={event => setCalculus(event.target.value)} />Calculus</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{biology}" onChange={event => setBiology(event.target.value)} />Biology</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{chemistry}" onChange={event => setChemistry(event.target.value)} />Chemistry</label>
                <br />
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{physics}" onChange={event => setPhysics(event.target.value)} />Physics</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{healthscience}" onChange={event => setHealthScience(event.target.value)} />Health Science</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{environmentalscience}" onChange={event => setEnvironmentalScience(event.target.value)} />Environmental Science</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{earthscience}" onChange={event => setEarthScience(event.target.value)} />Earth Science</label>
                <br />
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{history}" onChange={event => setHistory(event.target.value)} />History</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{economics}" onChange={event => setEconomics(event.target.value)} />Economics</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{psychology}" onChange={event => setPsychology(event.target.value)} />Psychology</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{government}" onChange={event => setGovernment(event.target.value)} />Government</label>
                <label><input className="inputCheckboxes" type="checkbox" name="subject"
                    value="{geography}" onChange={event => setGeography(event.target.value)} />Geography</label>
            </p>
            <input
                type="text"
                className="inputFormHalf"
                placeholder="Desired Username"
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                id="passwordID"
                value={hash}
                onChange={event => setHash(event.target.value)}
            />
            <label className="registrationPasswordCheckbox">
                <input type="checkbox"
                    onChange={event => showPassword(event.target.value)} 
                /> Show Password
            </label>

            <br />

            <div className="break">
                <Button animated className="button_animated" onClick = {backButton}>
                    <Button.Content visible>
                        Back
                    </Button.Content>
                    <Button.Content hidden>
                        <i class="sign-out icon"/>
                    </Button.Content>
                </Button>  

                <Button animated className="button_animated">
                    <Button.Content visible>
                        Submit
                    </Button.Content>
                    <Button.Content hidden>
                        <i class="sign-in icon"/>
                    </Button.Content>
                </Button>  
            </div>

        </form>
    );


};

export default ProfessorRegister;