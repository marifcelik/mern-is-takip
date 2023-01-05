import { useEffect } from "react";
import { Row, Col, Container, Button, Table } from "react-bootstrap";
import { CustomerModal, RemoveModal } from "../components";
import { AppContext } from "../context";

function Customers() {
    const { customers, setCustomers, setCustomerData, setShowCustomerModal, setRmModal, rerender } = AppContext();

    useEffect(() => { getCustomers() }, [rerender])
    
    async function getCustomers() {
        const request = await fetch(`${import.meta.env.VITE_API_URL}/customers`, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await request.json();
        const filteredData = data.map(obj => objectFilter(obj, 'jobs', '__v'));
        setCustomers(filteredData);
    }
    
    function objectFilter(obj, ...args) {
    const keys = Object.keys(obj).filter(value => !args.includes(value))
        return keys.reduce((ax, key) => {
            ax[key] = obj[key];
            return ax
        }, {})
    }

    function handleUpdateClick(id) {
        const customer = customers.find(customer => customer._id == id);
        customer.birthday ??= '';
        setCustomerData(objectFilter(customer, 'createdAt', 'updatedAt'));
        setShowCustomerModal(true);
    }

    function handleRmClick(id) {
        setRmModal({ show: true, title: 'müşteri silme', body: 'bu müşteriyi silmek istediğinizden emin misiniz ?', id });
    }

    return (
        <Container>
            <RemoveModal />
            <CustomerModal />
            <Row className="mt-5 pt-5">
                <Col>
                    <Table className="table-responsive">
                        <thead>
                            <tr>
                                <th>Ad</th>
                                <th>Soyad</th>
                                <th>Numara</th>
                                <th>E-mail</th>
                                <th>Doğum Tarihi</th>
                                <th>Oluşturulma Tarihi</th>
                                <th>Güncellenme Tarihi</th>
                                <th width="100px">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {customers.map(customer => (
                                <tr className="align-middle" key={customer._id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.surname}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.birthday && new Date(customer.birthday).toLocaleDateString()}</td>
                                    <td>{new Date(customer.createdAt).toLocaleString()}</td>
                                    <td>{new Date(customer.updatedAt).toLocaleString()}</td>
                                    <td><Button variant="primary" onClick={() => handleUpdateClick(customer._id)}>Düzenle</Button></td>
                                    <td><Button variant="danger" onClick={() => handleRmClick(customer._id)}>Sil</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Customers