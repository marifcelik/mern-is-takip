import { useRef } from 'react';
import { Modal, Button, Form, Col, Row, FloatingLabel } from 'react-bootstrap';
import { IMaskInput } from 'react-imask';
import { AppContext } from "../context";

function CustomerModal() {
    const { customerData, setCustomerData, showCustomerModal, setShowCustomerModal, setNotProps, setShownot, rerender, setRerender } = AppContext();
    const ref = useRef();
    const inputRef = useRef();

    async function handleClick() {
        const data = {
            _id: customerData._id,
            name: ref.current.name.value,
            surname: ref.current.surname.value,
            email: ref.current.email.value,
            phone: inputRef.current.maskRef.unmaskedValue,
            birthday: new Date(ref.current.birthday.value)
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/customers/edit`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        const resJson = await response.json();
        if (resJson.errors) {
            setNotProps({ title: 'hata', body: 'güncellerken bir hata oluştu, lütfen tekrar deneyiniz', variant: 'danger' });
        }
        else {
            setNotProps({ title: 'başarılı', body: 'kullanıcı güncellendi', variant: 'success' });
            setShowCustomerModal(false);
            setRerender(!rerender)
        }
        setShownot(true);
    }

    return (
        <Modal show={showCustomerModal} onHide={() => setShowCustomerModal(false)} >
            <Modal.Header closeButton>
                <Modal.Title>Müşteri güncelle</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form ref={ref} noValidate validated={false}>
                    <Row>
                        <Col>
                            <FloatingLabel label="Ad" className='mb-3'>
                                <Form.Control name="name" type="text" placeholder="Ad" required value={customerData.name} onChange={e => setCustomerData({ ...customerData, name: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="Soyad" className='mb-3'>
                                <Form.Control name="surname" type="text" placeholder="Soyad" required value={customerData.surname} onChange={e => setCustomerData({ ...customerData, surname: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel label="E mail" className='mb-3'>
                                <Form.Control name="email" type="email" placeholder="E mail" required value={customerData.email} onChange={e => setCustomerData({ ...customerData, email: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="Telefon" className='mb-3'>
                                <Form.Control as={IMaskInput} ref={inputRef} unmask={true} mask={'+{9\\0} (000) 000 0000'} name="phone" type="text" placeholder="Telefon" required value={customerData.phone} onAccept={value => setCustomerData({ ...customerData, phone: value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <FloatingLabel label="Doğum Tarihi" className='mb-3'>
                                <Form.Control name="birthday" type="date" placeholder="Doğum Tarihi" value={customerData.birthday && new Date(customerData.birthday).toLocaleDateString('en-CA')} onChange={e => setCustomerData({ ...customerData, birthday: new Date(e.target.value) })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>İptal</Button>
                <Button variant="primary" onClick={handleClick}>Güncelle</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomerModal