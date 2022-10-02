import React, { Component } from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHome, faStore, faUser,faHeartCircleBolt } from "@fortawesome/free-solid-svg-icons";

class Header extends Component {

    render(){
        return (
            <Navbar className='navbar' collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home" className="title">
                        <img alt="" src="/assets/images/book.png" width="32" height="32" className="d-inline-block align-top" />{' '}
                        PaperGram
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto navbar-item">
                            <Nav.Link className="nav-item" href="/home"><FontAwesomeIcon icon={faHome}/>{' '}Home</Nav.Link>{' '}
                            <Nav.Link className="nav-item" href="/store">{' '}<FontAwesomeIcon icon={faStore}/>{' '}Store</Nav.Link>
                        </Nav>
                        <Nav className='navbar-item'>
                            <Nav.Link className="nav-item" eventKey={2} href="/profile/favorites">
                            <FontAwesomeIcon icon={faHeartCircleBolt}/>{' '}Favorites</Nav.Link>{' '}
                            <Nav.Link className="nav-item" eventKey={2} href="/profile">
                                <FontAwesomeIcon icon={faUser}/>{' '}Profile</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
export default Header;
