import { Form, Button, FloatingLabel, Row, Col, Container } from 'react-bootstrap'
import { Notification } from '../components/'
import { AppContext } from '../context';

function Kaydet() {
    const { validated, setValidated, formdata, setFormdata, setShownot, shownot, error, setError , user, setUser} = AppContext();

    async function handleSubmit() {
        e.preventDefault();
        setValidated(true);

        if (e.currentTarget.checkValidity()) {
            const request = await fetch('http://localhost:3020/api/customers/add', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formdata)
            })
            const data = await request.json();

            if (data.message === 'successful') {
                setUser({ name: data.name, id: data.id });
                navigate('/');
            } else {
                setError(data)
                setShownot(!shownot)
            }
        }
    }

    return (
        <Container>
            {user && <Notification title='başarılı' body={'kullanıcı eklendi'} variant='success' />}
            {error && <Notification title='hata' body={error.fail} variant='danger' />}
            <Row className='justify-content-center'>
                <Col xs="8">
                    <h1 className='mt-5 mb-5 pt-5'>Müşteri Kaydet</h1>
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
                        </Row>
                        <Col>
                            <FloatingLabel label="Telefon" className='mb-3'>
                                <Form.Control type="text" placeholder="Telefon" required onChange={e => setFormdata({ ...formdata, phone: e.target.value })} />
                                <Form.Control.Feedback type="invalid">
                                    Lütfen geçerli bir telefon numarası girin
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
                        <Row>
                            <Col xs="6">
                                <FloatingLabel label="Doğum Tarihi" className='mb-3'>
                                    <Form.Control type="date" placeholder="Doğum Tarihi" onChange={e => setFormdata({ ...formdata, birthday: e.target.value })} />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen en az 8 haneli bir parola girin
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <div className="d-grid gap-2">
                            <Button className='mb-4' variant="outline-primary" type="submit">
                                Kaydet
                            </Button><br />
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Kaydet