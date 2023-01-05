import { Modal, Button } from 'react-bootstrap';
import { AppContext } from '../context';

function RemoveModal() {
    const { rmModal: { show, id, title, body }, setRmModal, setShownot, setNotProps, rerender, setRerender } = AppContext();

    async function rmHandle() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/customers/rm`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id })
        })
        const resJson = await response.json();
        if (resJson.errors)
            setNotProps({ title: 'hata', body: 'silme işleminde bir hata oluştu, lütfen tekrar deneyiniz.', variant: 'danger' });
        else {
            setNotProps({ title: 'başarılı', body: 'müşteri başarıyla silindi', variant: 'success' });
            setRmModal({ show: false });
            setRerender(!rerender)
        }
        setShownot(true);
    }

    return (
        <>
            <Modal show={show} onHide={() => setRmModal({ show: false })}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setRmModal({ show: false })}>İptal</Button>
                    <Button variant="danger" onClick={rmHandle}>Sil</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RemoveModal