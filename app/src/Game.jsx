import './Game.css';
import Board from './Board';
import opinions from './cards/baseOpinions.json';
import descriptions from './cards/baseDescriptions.json';
import themes from './cards/baseThemes.json';

function Game() {
  return (
    <div className="Game">
      <div className="name">
        <img className="name-large" src="/angry-yellow-fruit/name.png" alt="Angry Yellow Fruit"/>
        <img className="name-small" src="/angry-yellow-fruit/name-long.png" alt="Angry Yellow Fruit"/>
      </div>
      <Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>      
    </div>
  );
}

export default Game;
