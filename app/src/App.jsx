import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import InstructionsPage from './InstructionsPage';
import Game from './Game';
import Layout from './Layout';

function App() {
  return (
    <Router basename='/angry-yellow-fruit'>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>} />  
          <Route path="instructions" element={<InstructionsPage/>} />     
          <Route path="play" element={<Game/>} />
        </Route>
      </Routes>
    </Router>    
  );
}

export default App;
