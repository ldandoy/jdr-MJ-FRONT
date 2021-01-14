import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";

class NavbarSite extends React.Component {
    render() {
        return <Navbar bg="light" fixed="top" expand="lg">
            <Navbar.Brand as={Link} to="/">Maite du Jeu virtuel</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                    <Nav.Link as={Link} to="/senarios">Sénarios</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }
}

export default NavbarSite;