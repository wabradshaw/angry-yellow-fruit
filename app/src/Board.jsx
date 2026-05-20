import './Board.css';
import { useState } from 'react';
import { buildScenario, cellNumberToTarget, requestClue, requestGuess } from './aiApi';

function guessToCellNumber(guessText) {
  const w1Map = { A: 0, B: 1, C: 2 };
  const w2Map = { D: 0, E: 1, F: 2 };
  const guess = guessText.trim().toUpperCase();
  if (guess === 'FALSE') {
    return null;
  }
  if (guess.length !== 2) {
    return null;
  }
  const col = w1Map[guess[0]];
  const row = w2Map[guess[1]];
  if (col === undefined || row === undefined) {
    return null;
  }
  return (row * 3) + col + 1;
}

function formatGuessMessage(guessText) {
  if (guessText.trim().toLowerCase() === 'false') {
    return "That doesn't fit the theme.";
  }
  const cellNumber = guessToCellNumber(guessText);
  if (cellNumber) {
    return `I guess ${cellNumber}.`;
  }
  return `I guess ${guessText.trim().toUpperCase()}.`;
}

function BoardHeader({word, direction, callback}) {  
  if (direction === 'left'){
    return (
      <th scope="col" className="left" onClick={() => callback()}>{word}</th>
    );
  } else if (direction === 'right') {
    return (
      <th scope="row" className="right" onClick={() => callback()}>{word}</th>
    );
  }  
}

function Cell({value, callback}){
  return (
    <td className="Cell"><button onClick={() => callback(value)}><div>{value + 1}</div></button></td>
  );
}

function Board({scale, opinionsList, descriptionsList, themesList, aiMode = false}) {
  const initializeCardList = (initialList, count) => {
    const available = [...initialList];
    available.sort((a,b) => 0.5 - Math.random());
  
    const selected = [];
    for(let i = 0; i < count; i++){
      selected.push(available.pop());
    }

    return {
      discard: [],
      available: available,
      selected: selected
    }
  }
  const randomNumber = () => {
    return Math.ceil(Math.random() * scale * scale);
  }

  const [themes, setThemes] = useState(initializeCardList(themesList, 1));
  const [opinions, setOpinions] = useState(initializeCardList(opinionsList, scale));
  const [descriptions, setDescriptions] = useState(initializeCardList(descriptionsList, scale));
  
  const [currentNumber, setCurrentNumber] = useState(randomNumber());
  const [showAiCluePanel, setShowAiCluePanel] = useState(false);
  const [showAiGuessPanel, setShowAiGuessPanel] = useState(false);
  const [userClue, setUserClue] = useState('');
  const [aiClueText, setAiClueText] = useState('Let me think...');
  const [aiClueLoading, setAiClueLoading] = useState(false);
  const [aiGuessMessage, setAiGuessMessage] = useState('');
  const [aiGuessLoading, setAiGuessLoading] = useState(false);

  const getScenario = () => buildScenario(
    themes.selected[0],
    descriptions.selected,
    opinions.selected,
  );

  const getRefreshedSpecificValue = (id, cardList) => {
    const { discard, available, selected } = cardList;
  
    let newDiscard = [];
    let newAvailable = [];

    if (available.length < 1) {
      newDiscard = [selected[id]];
      newAvailable = [...discard];
      newAvailable.sort((a,b) => 0.5 - Math.random());
    } else {
      newDiscard = [...discard, selected[id]];
      newAvailable = [...available];
    }
  
    const newSelected = [...selected];
    newSelected[id] = newAvailable.pop();

    return {
      discard: newDiscard,
      available: newAvailable,
      selected: newSelected
    }
  }

  const refreshValue = (value) => {
    refreshOpinions(Math.trunc(value / scale)); 
    refreshDescriptions(value % scale);
    setCurrentNumber(randomNumber()); 
  }

  const refreshOpinions = (value) => {
    setOpinions(getRefreshedSpecificValue(value, opinions));  
  }

  const refreshDescriptions = (value) => {
    setDescriptions(getRefreshedSpecificValue(value, descriptions));  
  }

  const refreshTheme = () => {
    setThemes(getRefreshedSpecificValue(0, themes)); 
    setCurrentNumber(randomNumber());
  }

  const handleGuessSubmit = async (e) => {
    e.preventDefault();
    const clueText = userClue.trim();
    if (!clueText || aiGuessLoading) {
      return;
    }

    setAiGuessLoading(true);
    setAiGuessMessage('Let me think...');

    try {
      const { guess } = await requestGuess(getScenario(), clueText);
      setAiGuessMessage(formatGuessMessage(guess));
    } catch {
      setAiGuessMessage('Sorry, something went wrong.');
    } finally {
      setAiGuessLoading(false);
    }
  }

  const openAiCluePanel = async () => {
    setShowAiCluePanel(true);
    setAiClueText('Let me think...');
    setAiClueLoading(true);

    try {
      const result = await requestClue(getScenario(), cellNumberToTarget(currentNumber));
      setAiClueText(result.Clue);
    } catch {
      setAiClueText('Sorry, something went wrong.');
    } finally {
      setAiClueLoading(false);
    }
  };

  const openAiGuessPanel = () => {
    setShowAiGuessPanel(true);
    setUserClue('');
    setAiGuessMessage('');
    setAiGuessLoading(false);
  };

  const closeAiGuessPanel = () => {
    setShowAiGuessPanel(false);
    setUserClue('');
    setAiGuessMessage('');
    setAiGuessLoading(false);
  };

  return (
    <>
      <table className="Board">
        <tbody>
          <tr>
            <td className="Theme"><h2>{themes.selected}</h2></td>
            {
              descriptions.selected.map((description, colIndex) => {
                return (<BoardHeader word={description} direction="right" key={colIndex} callback={() => refreshDescriptions(colIndex)}/>)
              })
            }
          </tr>
          {
            opinions.selected.map((opinion, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  <BoardHeader word={opinion} direction="left" callback={() => refreshOpinions(rowIndex)}/>
                  {
                    descriptions.selected.map((col, colIndex) => {
                      const key = (scale * rowIndex) + colIndex;
                      return (<Cell value={key} callback={refreshValue} key={key}/>)
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>            
      </table>
      <div className={`DiamondButtons${aiMode ? ' ai-mode' : ''}`}>
        <div className="RefreshTheme">
          {aiMode && (
            <div className="AiClue">
              <button type="button" onClick={openAiCluePanel}>
                <h2>AI Clue</h2>
              </button>
            </div>
          )}
          <button onClick={() => refreshTheme()}>
            <h2>Change Theme</h2>
          </button>
        </div>
        <div className="ViewNumber">
          {aiMode && (
            <div className="AiGuess">
              <button type="button" onClick={openAiGuessPanel}>
                <h2>AI Guess</h2>
              </button>
            </div>
          )}
          <button>
            <h2 className="unrevealed">View Number</h2>
            <div className="revealed">{currentNumber}</div>
          </button>
        </div>
      </div>
      {aiMode && showAiCluePanel && (
        <div className="ai-clue-panel">
          <img
            className="ai-clue-panel-stan"
            src="/angry-yellow-fruit/Stan.svg"
            alt="Stan"
          />
          <p className="ai-clue-panel-text">{aiClueText}</p>
          <button
            type="button"
            className="ai-clue-panel-close"
            aria-label="Close"
            onClick={() => setShowAiCluePanel(false)}
            disabled={aiClueLoading}
          >
            ×
          </button>
        </div>
      )}
      {aiMode && showAiGuessPanel && (
        <div className="ai-guess-panel">
          <form className="ai-guess-panel-content" onSubmit={handleGuessSubmit}>
            <label className="ai-guess-panel-text" htmlFor="ai-guess-clue">
              What&apos;s your clue?
            </label>
            <div className="ai-guess-panel-entry">
              <input
                id="ai-guess-clue"
                className="ai-guess-panel-input"
                type="text"
                maxLength={40}
                value={userClue}
                onChange={(e) => setUserClue(e.target.value)}
              />
              <button
                type="submit"
                className="ai-guess-panel-submit"
                disabled={!userClue.trim() || aiGuessLoading}
              >
                Submit
              </button>
            </div>
            {aiGuessMessage && (
              <p className="ai-guess-panel-result">{aiGuessMessage}</p>
            )}
          </form>
          <img
            className="ai-guess-panel-stan"
            src="/angry-yellow-fruit/Stan.svg"
            alt="Stan"
          />
          <button
            type="button"
            className="ai-guess-panel-close"
            aria-label="Close"
            onClick={closeAiGuessPanel}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

export default Board;
