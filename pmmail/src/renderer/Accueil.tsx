import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import Button from 'react-bootstrap/Button';
import Sidebar from './Sidebar';

function Accueil() {
  const navigate = useNavigate();

  window.electron.ipcRenderer.sendMessage('get-user', {
    servername: 'smtp.gmail.com',
    email: 'tsantaniainarakotonjanahary@gmail.com',
    password: 'ETU001146',
  });

  window.electron.ipcRenderer.once('get-user', (arg) => {
    console.log(arg);
  });

  /* window.electron.ipcRenderer.sendMessage('sendmail', {
    mail: textArea,
  });*/

  var styles = {
    height: '50px',
    borderRadius: '0px 50px 50px 50px',
    textAlign: 'center',
    alignItems: 'center',
    border: 'gold solid ',
  };

  return (
    <div className="bg-dark">
      <Row>
        <Col md={12}>
          <Sidebar />
        </Col>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Stack gap={3} className="col-md-12 mx-auto my-5 ">
            <div className="bg-dark py-2 text-light" style={styles}>
              Bienvenue sur PMM Mailing List !
            </div>
            <div className="bg-dark py-2 text-light" style={styles}>
              Creez des groupes !
            </div>

            <div className="bg-dark  py-2 text-light" style={styles}>
              Ajoutez des mails pours chaque groupe !
            </div>

            <div className="bg-dark py-2 text-light" style={styles}>
              Envoyer vos emails en un seul click !
            </div>
            <div className="bg-dark py-2 text-light" style={styles}>
              Clic le bouton ci-dessous pour Commencer!
            </div>
            <Button variant="outline-warning">Commencer</Button>
          </Stack>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}

export default Accueil;
