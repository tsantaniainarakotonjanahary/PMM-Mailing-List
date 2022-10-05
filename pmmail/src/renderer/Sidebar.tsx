import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiUserGroup } from 'react-icons/hi';
import { BiMailSend, BiLogOut } from 'react-icons/bi';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

function Sidebar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Row>
        <Col md={12}>
          <Navbar className="px-5" bg="dark" variant="dark">
            <Nav className="me-auto ">
              <Button variant="outline-warning" onClick={handleShow}>
                <AiOutlineMenu size={30} />
              </Button>

              <Offcanvas
                className="bg-dark text-warning"
                show={show}
                onHide={handleClose}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Card className="col-md-12  mb-5">
                    <Card.Body>
                      <Card.Title className="text-dark">
                        RAKOTONJANAHARY Tsantaniaina
                      </Card.Title>
                      <Card.Subtitle className="text-dark">
                        <span style={{ color: 'gold' }}> email : </span>
                        tsantaniainarak@gmail.com
                      </Card.Subtitle>
                      <Card.Text className=" text-dark">
                        <span style={{ color: 'gold' }}> serveur smtp : </span>{' '}
                        smtp.gmail.com
                      </Card.Text>
                    </Card.Body>
                  </Card>

                  <Stack gap={3} className="col-md-12 mx-auto">
                    <Button
                      variant="outline-warning"
                      type="button"
                      className="align-items-center text-center"
                      onClick={() => {
                        navigate('/group', { replace: true });
                      }}
                    >
                      <HiUserGroup size={25} /> &nbsp; Mes Groupes
                    </Button>

                    <Button
                      variant="outline-warning"
                      type="button"
                      onClick={() => {
                        navigate('/sendmail', { replace: true });
                      }}
                    >
                      <BiMailSend size={25} /> &nbsp; Envoyer Mail
                    </Button>
                    <Button
                      variant="outline-warning"
                      type="button"
                      onClick={() => {
                        navigate('/login', { replace: true });
                      }}
                    >
                      <BiLogOut size={25} /> &nbsp; Deconnexion
                    </Button>
                  </Stack>
                </Offcanvas.Body>
              </Offcanvas>
            </Nav>
            <Navbar.Brand href="/">
              <span style={{ color: 'gold' }}>Mailing</span>List
            </Navbar.Brand>
          </Navbar>
        </Col>
      </Row>
    </div>
  );
}

export default Sidebar;
