import ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';

function Places() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Places />
  </Router>
);
