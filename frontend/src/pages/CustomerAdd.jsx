import { useState, useRef } from 'react'
import { Container, Button, Row, Col, FloatingLabel, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { AppContext } from '../context';

function CustomerAdd() {
    const { validated, setValidated, setShownot, setNotProps } = AppContext();

    const [emailisInvalid, setEmailisInvalid] = useState(false);
    const [phoneisInvalid, setPhoneisInvalid] = useState(false);
    const ref = useRef();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        setValidated(true);
        setEmailisInvalid(false);
        setPhoneisInvalid(false);

        if (e.currentTarget.checkValidity()) {
            const data = {
                name: e.currentTarget.name.value,
                surname: e.currentTarget.surname.value,
                email: e.currentTarget.email.value,
                phone: ref.current.maskRef.unmaskedValue,
                birthday: new Date(e.currentTarget.birthday.value)
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/customers/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            const resJson = await response.json();

            if (resJson?.errors) {
                // direk prop olarak güncellediğimde prop içerisindeki body aktarılmıyordu, o yüzden böyle bir yöntemle yaptım
                let errormsg = '';
                if (resJson.errors?.email?.length) {
                    errormsg += 'Bu email adresi zaten kayıtlı'
                    setEmailisInvalid(true);
                }
                if (resJson.errors?.phone?.length) {
                    errormsg += resJson.errors.phone;
                    setPhoneisInvalid(true);
                }
                setNotProps({ body: errormsg, title: 'hata', variant: 'danger' });
            } else {
                setValidated(false);
                setNotProps({ title: 'başarılı', body: 'kullanıcı kaydedildi', variant: 'success' })
                navigate('/musteriler');
            }
            setShownot(true);
        }
    }

    return (
        <Container>
            <Row className='mt-5 pt-5 d-flex justify-content-center'>
                <Col xs="7">
                    <h1 className='text-center mb-5'>Müşteri Kaydet</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <FloatingLabel label="Ad" className='mb-3'>
                                    <Form.Control name="name" type="text" placeholder="Ad" required />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen geçerli bir ad girin
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel label="Soyad" className='mb-3'>
                                    <Form.Control name="surname" type="text" placeholder="Soyad" required />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen geçerli bir soyad girin
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel label="E mail" className='mb-3'>
                                    <Form.Control name="email" type="email" placeholder="E mail" required isInvalid={emailisInvalid} />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen geçerli bir email girin
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel label="Telefon" className='mb-3'>
                                    <Form.Control as={IMaskInput} ref={ref} unmask={true} mask={'+{9\\0} (000) 000 0000'} name="phone" type="text" placeholder="Telefon" required isInvalid={phoneisInvalid} />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen geçerli bir telefon numarası girin
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6">
                                <FloatingLabel label="Doğum Tarihi" className='mb-3'>
                                    <Form.Control name="birthday" type="date" placeholder="Doğum Tarihi" />
                                    <Form.Control.Feedback type="invalid">
                                        Lütfen en az 8 haneli bir parola girin
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Button type='submit'>Kaydet</Button>
                    </Form>

                </Col>
            </Row>
        </Container>
    )
}

export default CustomerAdd