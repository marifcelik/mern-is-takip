import { useState } from 'react';
import { Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context';

function RegisterForm() {
    const [formdata, setFormdata] = useState({});
    const { validated, setValidated } = AppContext();

    async function handleSubmit(e) {
        e.preventDefault();
        setValidated(true);

        if (e.currentTarget.checkValidity()) {
            const request = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formdata)
            })
            const data = await request.json();
            console.log(data);
        }
    }

    return (
        <Col xs="7" md="6" className='pt-5 ps-5 ms-2 mt-5'>
            <h1 className='mb-5'>Kayıt ol</h1>
            <Form className='' noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <FloatingLabel label="Ad" className='mb-3'>
                            <Form.Control type="text" placeholder="Ad" required onChange={e => setFormdata({ ...formdata, name: e.target.value })} />
                            <Form.Control.Feedback type="invalid">
                                Lütfen geçerli bir ad girin
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Soyad" className='mb-3'>
                            <Form.Control type="text" placeholder="Soyad" required onChange={e => setFormdata({ ...formdata, surname: e.target.value })} />
                            <Form.Control.Feedback type="invalid">
                                Lütfen geçerli bir soyad girin
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel label="E mail" className='mb-3'>
                            <Form.Control type="email" placeholder="E mail" required onChange={e => setFormdata({ ...formdata, email: e.target.value })} />
                            <Form.Control.Feedback type="invalid">
                                Lütfen geçerli bir email girin
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Parola" className='mb-3'>
                            <Form.Control type="password" placeholder="Parola" required onChange={e => setFormdata({ ...formdata, password: e.target.value })} />
                            <Form.Control.Feedback type="invalid">
                                Lütfen en az 8 haneli bir parola girin
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel label="Telefon" className='mb-3'>
                            <Form.Control type="text" placeholder="Telefon" required onChange={e => setFormdata({ ...formdata, phone: e.target.value })} />
                            <Form.Control.Feedback type="invalid">
                                Lütfen geçerli bir telefon numarası girin
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Doğum Tarihi" className='mb-3'>
                            <Form.Control type="date" placeholder="Doğum Tarihi" onChange={e => setFormdata({ ...formdata, birthday: e.target.value })} />
                            <Form.Control.Feedback type="invalid">
                                Lütfen en az 8 haneli bir parola girin
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>
                <div className="d-grid gap-2">
                    <Button className='mb-4' variant="outline-secondary" type="submit">
                        Kayıt ol
                    </Button><br />
                </div>
                <Form.Text className="text-center">Hesabınız var mı ? <NavLink to='/auth'> Giriş yapın </NavLink></Form.Text>
            </Form>
        </Col>
    )
}
export default RegisterForm
