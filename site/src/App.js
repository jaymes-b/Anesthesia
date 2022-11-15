import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListView from './views/ListView';
import SurgeryList from './components/SurgeryList';
import BlockList from './components/BlockList';
import SurgeonList from './components/SurgeonList';
import Anatomy from './views/Anatomy';
import Settings from './views/Settings';
import Surgery from './views/Surgery';
import Block from './views/Block';
import NotFound from './views/NotFound';
import Search from './components/SearchList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ListView navIcon={"home"}>
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
        <Route path="/settings" element={<Settings />} />
        <Route path="/surgery/:surgeryId" element={<Surgery />} />
        <Route path="/block/:blockId" element={<Block />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
