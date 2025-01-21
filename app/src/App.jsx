import './App.css';
import Board from './Board';
import opinions from './cards/baseOpinions.json';
import descriptions from './cards/baseDescriptions.json';
import themes from './cards/baseThemes.json';

function App() {
  return (
    <div className="App">
      <div className="name">
        <img className="name-large" src="/angry-yellow-fruit/name.png"/>
        <img className="name-small" src="/angry-yellow-fruit/name-long.png"/>
      </div>
      <Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>      
    </div>
  );
}

export default App;
