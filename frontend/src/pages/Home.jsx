import { Container, Row, Col } from "react-bootstrap"

function Home() {
    return (
        <Container>
            <Row className="pt-5 mt-5">
                <Col xs="8">
                    <h2>Hoş geldiniz</h2>
                    <p>Bu proje İskendern Teknik Üniversitesi Bilgisayar Mühendisliği Görsel Programlara dersi için yapılmıştır.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Home