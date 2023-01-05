import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context';

function Header() {
  const { user } = AppContext();

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">LOGO</Navbar.Brand>
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
              <>
                <NavDropdown align="end" className="mx-2" title="Müşteriler">
                  <NavDropdown.Item as={NavLink} to="/musteriler">Müşteriler</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/musteri-ekle">Müşteri ekle</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown align="end" className="mx-2" title="Çalışanlar">
                  <NavDropdown.Item as={NavLink} to="/calisanlar">Çalışanlar</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/calisan-ekle">Çalışan Ekle</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown align="end" className="ms-2 me-3" title="İşler">
                  <NavDropdown.Item as={NavLink} to="/isler">Tüm İşler</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/is-ekle">İş Ekle</NavDropdown.Item>
                </NavDropdown>
                <Button variant='outline-danger' className='me-3 mt-1'>
                  <NavLink to="/logout" className="text-decoration-none nav-link">Çıkış Yap</NavLink>
                </Button>
              </>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header