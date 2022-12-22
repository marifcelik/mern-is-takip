import { Toast, ToastContainer } from 'react-bootstrap';
import { AppContext } from '../context';

function Notification({ title, body, variant = '', show = true }) {
    const { shownot, setShownot } = AppContext();

    return (
        <>
            <ToastContainer className='p-3 m-3' position='top-end'>
                <Toast onClose={() => setShownot(!shownot)} show={shownot} bg={variant} delay={3000} autohide={true}>
                    <Toast.Header>
                        <strong className="me-auto">{title}</strong>
                        <small>şimdi</small>
                    </Toast.Header>
                    <Toast.Body>{body}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}

export default Notification