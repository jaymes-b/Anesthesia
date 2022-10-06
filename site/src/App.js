import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Anatomy from './views/Anatomy';
import Surgery from './views/Surgery';
import NotFound from './views/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anatomy" element={<Anatomy />} />
        <Route path="/surgery/:surgeryId" element={<Surgery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
