import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Accueil from './Accueil';
import Login from './Login';
import Group from './Group';
import Mail from './Mail';
import DocInterne from './DocInterne';
import DocExterne from './DocExterne';
import CreateGroup from './CreateGroup';
import DeleteGroup from './DeleteGroup';
import CreateMail from './CreateMail';
import DeleteMail from './DeleteMail';
import SendMail from './SendMail';

/*
const Hello = () => {
  const navigate = useNavigate();

  const [textArea, setTextArea] = useState('');

  return (
    <div>
      <h1>Hello world</h1>
      <label htmlFor="lab">
        First name:
        <textarea
          value={textArea}
          onChange={(event) => setTextArea(event.target.value)}
        />
      </label>

      <p>{textArea}</p>
      <button
        type="button"
        onClick={() => {
          navigate('/dashboard', { replace: true });
        }}
      >
        click
      </button>
    </div>
  );
};
*/

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
