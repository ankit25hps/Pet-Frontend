import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
function NavBar() {
    return (
        <Navbar expand='lg' style={{ backgroundColor: '#7ec6e8' }}>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>
                    <img
                        id='logo'
                        style={{ paddingLeft: '20px', marginRight: '150px' }}
                        src={
                            process.env.PUBLIC_URL +
                            '/images/logo/pawworldLogo.png'
                        }
                        height={100}
                        width={150}
                        alt='Logo'
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav
                        className='me-auto my-2 my-lg-0'
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <Nav.Link
                            as={Link}
                            to='/viewPets'
                            style={{ color: '#08297c', fontWeight: '500' }}>
                            View Pet
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to='/registerPet'
                            style={{ color: '#08297c', fontWeight: '500' }}>
                            Register Pet
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to='/viewAppointments'
                            style={{ color: '#08297c', fontWeight: '500' }}>
                            View Appointment
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to='/bookAppointment'
                            style={{ color: '#08297c', fontWeight: '500' }}>
                            Book Appointment
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to='/profile'
                            style={{ paddingLeft: '515px' }}>
                            <img
                                id='profile-picture'
                                src={
                                    process.env.PUBLIC_URL +
                                    '/images/user-profile.png'
                                }
                                height={40}
                                width={50}
                                alt='User'
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavBar;
