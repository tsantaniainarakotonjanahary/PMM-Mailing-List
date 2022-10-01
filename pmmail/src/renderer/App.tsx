import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
//import icon from '../../assets/icon.svg';
import './App.css';
import { useState } from 'react';

const Hello = () => {
  const [textArea, setTextArea] = useState('');
  /*
  //User Creation
  window.electron.ipcRenderer.sendMessage('create-user', {
    servername: 'smtp.gmail.com',
    email: 'tsantaniainarakotonjanahary@gmail.com',
    password: 'ETU001146',
  });


  window.electron.ipcRenderer.once('create-user', (arg) => {
    console.log(arg);
  });

  window.electron.ipcRenderer.sendMessage('get-all-users', {
    servername: 'smtp.gmail.com',
    email: 'tsantaniainarakotonjanahary@gmail.com',
    password: 'ETU001146',
  });


  window.electron.ipcRenderer.once('get-all-users', (arg) => {
    console.log(arg);
  });

   */

  //Create Group

  /*
  window.electron.ipcRenderer.sendMessage('create-group', {
    nom: 'USAID',
  });

  window.electron.ipcRenderer.once('create-group', (arg) => {
    console.log(arg);
  });

  //Create Mail By idGroup
  window.electron.ipcRenderer.sendMessage('create-mail-by-idgroup', {
    mail: 'tsantaniainarakotonjanahary@gmail.com',
    idgroup: 8,
  });

  window.electron.ipcRenderer.once('create-mail-by-idgroup', (arg) => {
    console.log(arg);
  });

  window.electron.ipcRenderer.sendMessage('get-mails-by-idgroup', {
    idgroup: 1,
  });

  window.electron.ipcRenderer.once('get-mails-by-idgroup', (arg) => {
    console.log(arg);
  });

  window.electron.ipcRenderer.sendMessage('delete-group', {
    id: 2,
  });

  window.electron.ipcRenderer.once('delete-group', (arg) => {
    console.log(arg);
  });

  window.electron.ipcRenderer.sendMessage('get-all-groups', {
    servername: 'smtp.gmail.com',
    email: 'tsantaniainarakotonjanahary@gmail.com',
    password: 'ETU001146',
  });

  window.electron.ipcRenderer.once('get-all-groups', (arg) => {
    console.log(arg);
  });


  */

  window.electron.ipcRenderer.sendMessage('sendmail', {
    mail: textArea,
  });

  return (
    <div>
      <h1>Hello world</h1>
      <textarea
        value={textArea}
        onChange={(event) => setTextArea(event.target.value)}
      />

      <p>{textArea}</p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
