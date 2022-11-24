import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListView from './views/ListView';
import SurgeryList from './components/SurgeryList';
import BlockList from './components/BlockList';
import SurgeonList from './components/SurgeonList';
import Anatomy from './views/Anatomy';
import Surgery from './views/Surgery';
import Block from './views/Block';
import NotFound from './views/NotFound';
import Search from './components/SearchList';
import Surgeon from './views/Surgeon';
import Feedback from './views/Feedback';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ListView navIcon={"surgeries"}>
            <SurgeryList />
          </ListView>
        } />
        <Route path="/search/:bodyPart" element={
          <ListView navIcon={"anatomy"}>
            <Search />
          </ListView>
        } />
        <Route path="/blocks" element={
          <ListView navIcon={"blocks"}>
            <BlockList />
          </ListView>
        } />
        <Route path="/surgeons" element={
          <ListView navIcon={"surgeons"}>
            <SurgeonList />
          </ListView>
        } />
        <Route path="/anatomy" element={<Anatomy />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/surgery/:surgeryId" element={<Surgery />} />
        <Route path="/block/:blockId" element={<Block />} />
        <Route path="/surgeon/:surgeonId" element={<Surgeon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
