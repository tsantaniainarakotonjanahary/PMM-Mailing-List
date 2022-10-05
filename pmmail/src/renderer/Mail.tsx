import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { MdAddCircle } from 'react-icons/md';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './Sidebar';

function Mail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mail, setMail] = useState('');
  const [mails, setMails] = useState([]);
  const [changemails, setChangemails] = useState(false);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-mails-by-idgroup', {
      idgroup: location.state.id,
    });

    window.electron.ipcRenderer.once('get-mails-by-idgroup', (arg) => {
      setMails(arg);
    });
  }, [changemails]);

  return (
    <div>
      <Row className="mb-5">
        <Col md={12}>
          <Sidebar />
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={3} />
        <Col md={6}>
          <h4 className="text-warning">Liste des mails</h4>
        </Col>
        <Col md={3} />
      </Row>

      <Row className="mb-5">
        <Col md={3} />
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-warning">Adresse Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrer un email"
                value={mail}
                onChange={(event) => {
                  setMail(event.target.value);
                }}
              />
            </Form.Group>
            <Button
              type="button"
              variant="outline-warning"
              onClick={() => {
                setChangemails(!changemails);
                window.electron.ipcRenderer.sendMessage(
                  'create-mail-by-idgroup',
                  {
                    mail: mail,
                    idgroup: location.state.id,
                  }
                );
                window.electron.ipcRenderer.once(
                  'create-mail-by-idgroup',
                  (arg) => {
                    console.log(arg);
                  }
                );
              }}
            >
              <MdAddCircle size={25} /> Ajouter l'email
            </Button>
          </Form>
        </Col>
        <Col md={3} />
      </Row>

      <Row>
        <Col md={12}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Nom</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mails.map((mail, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{mail.mailname}</td>
                    <td>
                      <Button
                        type="button"
                        variant="outline-warning"
                        onClick={() => {
                          setChangemails(!changemails);
                          window.electron.ipcRenderer.sendMessage(
                            'delete-mail',
                            {
                              id: mail.idmail,
                            }
                          );

                          window.electron.ipcRenderer.once(
                            'delete-mail',
                            (arg) => {
                              console.log(arg);
                            }
                          );
                        }}
                      >
                        <MdDelete size={25} />
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default Mail;
