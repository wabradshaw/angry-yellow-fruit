import './Game.css';
import Board from './Board';
import opinions from './cards/baseOpinions.json';
import descriptions from './cards/baseDescriptions.json';
import themes from './cards/baseThemes.json';

function Game() {
  return (
    <div className="Game">
      <Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>      
    </div>
  );
}

export default Game;
