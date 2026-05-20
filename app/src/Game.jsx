import './Game.css';
import Board from './Board';
import opinions from './cards/baseOpinions.json';
import descriptions from './cards/baseDescriptions.json';
import themes from './cards/baseThemes.json';

function Game({ aiMode = false }) {
  return (
    <div className="Game">
      <Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes} aiMode={aiMode}/>      
    </div>
  );
}

export default Game;
