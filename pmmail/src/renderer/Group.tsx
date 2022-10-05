import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { MdAddCircle } from 'react-icons/md';
import { BsFillEyeFill } from 'react-icons/bs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Sidebar from './Sidebar';

function Group() {
  const navigate = useNavigate();
  const [group, setGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [changegroups, setChangegroups] = useState(false);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-all-groups', {});
    window.electron.ipcRenderer.once('get-all-groups', (arg) => {
      setGroups(arg);
    });
  }, [changegroups]);

  return (
    <div>
      <Row>
        <Col md={12}>
          <Sidebar />
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={3} />
        <Col md={6}>
          <h4 className="text-warning">Listes des groupes </h4>
        </Col>
        <Col md={3} />
      </Row>

      <Row className="mb-5">
        <Col md={3} />
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-warning">Nom du groupe</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer nouveau groupe"
                value={group}
                onChange={(event) => {
                  setGroup(event.target.value);
                }}
              />
            </Form.Group>
            <Button
              type="button"
              variant="outline-warning"
              onClick={() => {
                setChangegroups(!changegroups);
                window.electron.ipcRenderer.sendMessage('create-group', {
                  nom: group,
                });
                window.electron.ipcRenderer.once('create-group', (arg) => {
                  console.log(arg);
                });
              }}
            >
              <MdAddCircle size={25} /> &nbsp; Ajouter nouveau groupe
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
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{group.nom}</td>
                    <td>
                      <Button
                        type="button"
                        variant="outline-warning"
                        onClick={() => {
                          setChangegroups(!changegroups);
                          window.electron.ipcRenderer.sendMessage(
                            'delete-group',
                            {
                              id: group.id,
                            }
                          );
                          window.electron.ipcRenderer.once(
                            'delete-group',
                            (arg) => {
                              console.log(arg);
                            }
                          );
                        }}
                      >
                        <MdDelete size={25} /> &nbsp; Supprimer
                      </Button>
                    </td>
                    <td>
                      <Button
                        type="button"
                        variant="outline-warning"
                        onClick={() => {
                          navigate('/mail', { state: { id: group.id } });
                        }}
                      >
                        <BsFillEyeFill size={25} /> &nbsp; Voir liste des mails
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

export default Group;
