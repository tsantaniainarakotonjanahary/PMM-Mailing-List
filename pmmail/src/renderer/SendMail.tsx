import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from './Sidebar';

import 'react-toastify/dist/ReactToastify.css';

function SendMail() {
  const [groupId, setGroupId] = useState('');
  const [groups, setGroups] = useState([]);
  const [sujet, setSujet] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);

  const notifyError = (arg) =>
    toast.error(arg, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifySuccess = (arg) =>
    toast.success(arg, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-all-groups', {});
    window.electron.ipcRenderer.once('get-all-groups', (arg) => {
      setGroups(arg);
    });
  }, []);

  return (
    <div>
      <Row className="mb-5">
        <Col md={12}>
          <ToastContainer />
          <Sidebar />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={3} />
        <Col md={6}>
          <h4 className="text-warning">Envoyer Mail : </h4>
        </Col>
        <Col md={3} />
      </Row>

      <Row className="mb-5">
        <Col md={2} />
        <Col md={8} className="pb-5 ">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-warning">Choix de groupe</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={groupId}
                onChange={(event) => {
                  setGroupId(event.target.value);
                }}
              >
                <option>Choisir Groupe</option>
                {groups.map((group, index) => {
                  return (
                    <option value={group.id} key={index}>
                      {group.nom}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-warning">Sujet</Form.Label>
              <Form.Control
                type="text"
                placeholder="sujet de votre message"
                value={sujet}
                onChange={(event) => {
                  setSujet(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="text-warning">Message</Form.Label>
              <Form.Control
                style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
                as="textarea"
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="text-warning">Attachement</Form.Label>
              <Form.Control
                multiple
                type="file"
                onChange={(e) => {
                  let arr = [];
                  for (var i = 0; i < e.target.files.length; i++) {
                    arr.push({
                      filename: e.target.files[i].name,
                      path: e.target.files[i].path,
                    });
                  }
                  setFiles(arr);
                }}
              />
            </Form.Group>

            <Button
              variant="outline-warning"
              type="button"
              onClick={() => {
                window.electron.ipcRenderer.sendMessage('send-mail', {
                  groupId,
                  sujet,
                  message,
                  arr: files,
                });
                window.electron.ipcRenderer.once('send-mail', (arg) => {
                  if (arg.includes('ENOTFOUND')) {
                    notifyError('Pas de connection !!');
                  } else if (arg.includes('Email Envoyé')) {
                    notifySuccess('Email Envoyé');
                  } else {
                    notifyError(arg);
                  }
                });
              }}
            >
              Envoyer Mail
            </Button>
          </Form>
        </Col>
        <Col md={2} />
      </Row>
    </div>
  );
}

export default SendMail;
