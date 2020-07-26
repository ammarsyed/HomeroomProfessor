import React, {useState, useEffect} from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const HomeNavbar = (props) =>
{

    const [useLogout, setUseLogout] = useState(false);

    useEffect(() =>
    {
        setUseLogout(props.loginState);
    }, [props.loginState]);

    const handleLogout = () =>
    {
        setUseLogout(false);
        props.logOut();
    };

    const studentButtonToggle = useLogout
        ? null
        : <><Link to="/" className="text-white nounderline navhover nav-link">About</Link>
            <Link to="/register" className="text-white nounderline navhover nav-link">Register</Link></>;

    // const showButton = useLogout
    //     ? <Link to="/"><Button variant="outline-light" onClick={handleLogout}>Logout</Button></Link>
    //     : <Link to="/"><Button variant="outline-light">Sign In</Button></Link>;

    let showButton;
    if(props.currentUser && useLogout)
    {
        showButton = <Link to="/"><Button variant="outline-light" onClick={handleLogout}>Logout</Button></Link>;
    }
    else
    {
        showButton = <Link to="/"><Button variant="outline-light">Sign In</Button></Link>;
    }

    return (
        <Navbar bg="primary" className="navbar-expand" variant="dark">
            <Navbar.Brand><Link to="/" className="text-white nounderline">HOMEROOM PROFESSOR</Link></Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {studentButtonToggle}
                </Nav>
                {showButton}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HomeNavbar;