import './App.css';
import Board from './Board';
import opinions from './cards/baseOpinions.json';
import descriptions from './cards/baseDescriptions.json';
import themes from './cards/baseThemes.json';

function App() {
  return (
    <div className="App">
      <h1>Gridpinions</h1>
      <Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>      
    </div>
  );
}

export default App;
