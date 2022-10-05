import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
      Login
      <button
        type="button"
        onClick={() => {
          navigate('/', { replace: true });
        }}
      >
        accueil
      </button>
    </div>
  );
}

export default Login;
