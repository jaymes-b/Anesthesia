import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Anatomy from './views/Anatomy';
import Settings from './views/Settings';
import Surgery from './views/Surgery';
import Block from './views/Block';
import NotFound from './views/NotFound';
import Search from './views/Search';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:bodyPart" element={<Search/>} />
        <Route path="/anatomy" element={<Anatomy />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/surgery/:surgeryId" element={<Surgery />} />
        <Route path="/block/:blockId" element={<Block />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
