import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from './Sidebar';

function Login() {
  const navigate = useNavigate();
  window.electron.ipcRenderer.sendMessage('create-user', {
    servername: 'smtp.gmail.com',
    email: 'tsantaniainarakoto@gmail.com',
    password: 'ETU001149',
  });

  window.electron.ipcRenderer.once('create-user', (arg) => {
    console.log(arg);
  });

  return (
    <div>
      <Row className="mb-5">
        <Col md={12}>
          <Sidebar />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={3}></Col>
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                navigate('/');
              }}
            >
              Submit
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                navigate('/');
              }}
            >
              S'inscrire
            </Button>
          </Form>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}

export default Login;
