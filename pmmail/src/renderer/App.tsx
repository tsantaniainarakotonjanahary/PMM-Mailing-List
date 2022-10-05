import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Accueil from './Accueil';
import Login from './Login';
import Group from './Group';
import Mail from './Mail';
import DocInterne from './DocInterne';
import DocExterne from './DocExterne';

import SendMail from './SendMail';
export default function App() {
  return (
    <div>
      <Container fluid="xxxl" className="bg-dark">
        <Router>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/group" element={<Group />} />
            <Route path="/mail" element={<Mail />} />
            <Route path="/sendmail" element={<SendMail />} />
            <Route path="/docinterne" element={<DocInterne />} />
            <Route path="/docexterne" element={<DocExterne />} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}
