import { Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context';
import { Notification } from '../components/'

function LoginForm() {
  const { shownot, setShownot, validated, setValidated, setFormdata, formdata, user, setUser, error, setError } = AppContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setValidated(true);

    if (e.currentTarget.checkValidity()) {
      const request = await fetch('http://localhost:3020/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
      })
      const data = await request.json();

      if (data.message === 'success') {
        setUser({ name: data.name, id: data.id });
        navigate('/');
      } else {
        setError(data)
        setShownot(!shownot)
      }
    }
  }

  return (
    <>
      {error && <Notification title='hata' body={error.fail} variant='danger' />}
      <Col xs="7" md="4" className='pt-5 ps-5'>
        <h1 className='mt-5 mb-5 pt-5'>Giriş yap</h1>
        <Form className='mt-5' noValidate validated={validated} onSubmit={handleSubmit}>
          <FloatingLabel label="E mail" className='mb-3'>
            <Form.Control type="email" placeholder="Enter email" required onChange={e => setFormdata({ ...formdata, email: e.target.value })} />
            <Form.Control.Feedback type="invalid">
              Lütfen geçerli bir e mail adresi girin
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel label="Password" className='mb-3'>
            <Form.Control type="password" placeholder="Password" required onChange={e => setFormdata({ ...formdata, password: e.target.value })} />
            <Form.Control.Feedback type="invalid">
              Lütfen en az 8 haneli bir parola girin
            </Form.Control.Feedback>
          </FloatingLabel>
          <div className="d-grid gap-2">
            <Button className='mb-4' variant="outline-secondary" type="submit">
              Giriş
            </Button><br />
          </div>
          <Form.Text className="text-center">Hesabın yok mu ? <NavLink to='register'> Kayıt ol </NavLink></Form.Text>
        </Form>
      </Col>
    </>
  )
}
export default LoginForm
