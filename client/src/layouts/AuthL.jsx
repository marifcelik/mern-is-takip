import { Outlet } from 'react-router-dom';
import { Col, Container, Image, Row } from 'react-bootstrap'

function Login() {
    return (
        <Container>
            <Row className='rounded-4 bg-dark bg-opacity-10 mt-2'>
                <Col xs="5" className='m-0 p-0'>
                    <Image fluid src='https://picsum.photos/1200/1800' className='m-0 p-0' style={{ borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }} />
                </Col>
                <Outlet />
            </Row>
        </Container>
    )
}

export default Login