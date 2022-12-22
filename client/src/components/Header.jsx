import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context';

function Header() {
    const { user } = AppContext();

    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Ana Sayfa</Nav.Link>
                        </Nav>

                        {!user ?
                            <Button variant='outline-dark' className='me-3 mt-1'>
                                <NavLink to="/auth" className="text-decoration-none nav-link">Giriş Yap</NavLink>
                            </Button>
                            :
                            (<>
                                <Button variant='outline-dark' className='me-3 mt-1'>
                                    <NavLink to="/logout" className="text-decoration-none nav-link">Çıkış</NavLink>
                                </Button>
                                <NavDropdown title="Seçenekler">
                                    <NavDropdown.Item as={NavLink} to="/musteriler">Müşteriler</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/musteri_kaydet">Müşteri kaydet</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/isler">Mevcut İşler</NavDropdown.Item>
                                </NavDropdown>
                            </>)
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header