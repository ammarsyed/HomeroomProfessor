import React, {useState, useEffect} from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const HomeNavbar = (props) =>
{
    const [useLogout, setUseLogout] = useState(false);
    const [userType, setUserType] = useState("");

    useEffect(() => {
        setUseLogout(props.loginState);
    }, [props.loginState]);

    const handleLogout = () => {
        setUseLogout(false);
        props.sendLogin(false);
        props.logOut();
    };

    const studentButtonToggle = useLogout
        ? <Link to="/student" className="text-white nounderline navhover nav-link">Dashboard</Link>
        : <><Link to="/" className="text-white nounderline navhover nav-link">About</Link>
            <Link to="/register" className="text-white nounderline navhover nav-link">Register</Link></>;

    let buttonToggle;

    if (useLogout) {
        if (props.currentUser.userType === "student") {
            buttonToggle = <Link to="/student" className="text-white nounderline navhover nav-link">Dashboard</Link>;
        }
        else if (props.currentUser.userType === "professor") {
            buttonToggle = <><Link to="/professor" className="text-white nounderline navhover nav-link">Dashboard</Link>
                <Link to="/professor/account" className="text-white nounderline navhover nav-link">Account Info</Link></>;
        }
    }
    else {
        buttonToggle = <><Link to="/" className="text-white nounderline navhover nav-link">About</Link>
            <Link to="/register" className="text-white nounderline navhover nav-link">Register</Link></>;
    }


    const showLoginState = (props.currentUser && useLogout)
         ? <Link to="/"><Button variant="outline-light" onClick={handleLogout}>Logout</Button></Link>
         : <Link to="/"><Button variant="outline-light">Sign In</Button></Link>;

    return (
        <Navbar className="navbar-expand color-cobalt" variant="dark" >
            <Navbar.Brand>
                <img
                    alt=""
                    src="logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-bot"
                />{' '}
                <Link to="/" className="text-white nounderline">
                    <b>Homeroom Professor</b>
                </Link>

            </Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {buttonToggle}
                </Nav>
                {showLoginState}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HomeNavbar;