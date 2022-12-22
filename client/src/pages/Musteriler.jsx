import { useEffect, useRef } from "react";
import { ListGroup, Row, Col, Container, Form, FloatingLabel, Button } from "react-bootstrap"
import { AppContext } from "../context"

function Musteriler() {
    const { validated, setValidated, customers, setCustomers } = AppContext();
    const ref = useRef();

    useEffect(() => {
        async function getCustomers() {
            const request = await fetch('http://localhost:3020/api/customers', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await request.json();
            console.log(data);
            setCustomers(data);
        }
        getCustomers()
    }, [])

    function handleClick(customer) {

    }

    return (
        <Container>
            <Row className="mt-5 pt-5">
                <Col xs="4">
                    <ListGroup >
                        {customers.map(customer => (
                            <ListGroup.Item action href="#" key={customer._id} onClick={() => handleClick(customer)}>
                                {customer.name + ' ' + customer.surname}
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item action href="#" onClick={() => console.log('wef')}>
                            Link 2
                        </ListGroup.Item>
                        <ListGroup.Item action href="#">
                            This one is a button
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs="8">
                    <Form className='' ref={ref} noValidate validated={validated}>
                        <Row>
                            <Col>
                                <FloatingLabel label="Ad" className='mb-3'>
                                    <Form.Control name="name" type="text" placeholder="Ad" required onChange={e => setFormdata({ ...formdata, name: e.target.value })} />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen geçerli bir ad girin
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel label="Soyad" className='mb-3'>
                                    <Form.Control name="surname" type="text" placeholder="Soyad" required onChange={e => setFormdata({ ...formdata, surname: e.target.value })} />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen geçerli bir soyad girin
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel label="E mail" className='mb-3'>
                                    <Form.Control name="email" type="email" placeholder="E mail" required onChange={e => setFormdata({ ...formdata, email: e.target.value })} />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen geçerli bir email girin
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel label="Telefon" className='mb-3'>
                                    <Form.Control name="phone" type="text" placeholder="Telefon" required onChange={e => setFormdata({ ...formdata, phone: e.target.value })} />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen geçerli bir telefon numarası girin
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6">
                                <FloatingLabel label="Doğum Tarihi" className='mb-3'>
                                    <Form.Control name="birthday" type="date" placeholder="Doğum Tarihi" onChange={e => setFormdata({ ...formdata, birthday: e.target.value })} />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen en az 8 haneli bir parola girin
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Button className='mb-4' variant="outline-primary" type="submit">
                            Güncelle
                        </Button>
                        <Button className='mb-4 ms-4' variant="outline-danger" type="submit">
                            Sil
                        </Button><br />
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Musteriler