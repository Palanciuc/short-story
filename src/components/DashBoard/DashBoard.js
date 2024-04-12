import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Dashboard() {
    const handleLogout = () => {
        console.log("Logging out...");
        // Implement logout logic here
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>SSG</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/profile">
                                <Nav.Link>View/Edit Your Profile</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/stories">
                                <Nav.Link>Your Stories</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/create-story">
                                <Nav.Link>Create a New Story</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-3">
                <h1>Dashboard</h1>
                {/* Dashboard content */}
            </Container>
        </>
    );
}

export default Dashboard;
