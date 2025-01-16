import './Board.css';
import { useState } from 'react';

function BoardHeader({word, direction}) {  
  if (direction === 'left'){
    return (
      <th scope="col" className="left">{word}</th>
    );
  } else if (direction === 'right') {
    return (
      <th scope="row" className="right">{word}</th>
    );
  }  
}

function Cell({value, callback}){
  return (
    <td className="Cell"><button onClick={() => callback(value)}><div>{value + 1}</div></button></td>
  );
}

function Board({scale, opinionsList, descriptionsList, themesList}) {
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
    setOpinions(getRefreshedSpecificValue(Math.trunc(value / scale), opinions)); 
    setDescriptions(getRefreshedSpecificValue(value % scale, descriptions));
    setCurrentNumber(randomNumber()); 
  }

  const refreshTheme = () => {
    setThemes(getRefreshedSpecificValue(0, themes)); 
    setCurrentNumber(randomNumber());
  }

  return (
    <>
      <div className="RefreshTheme">
        <button onClick={() => refreshTheme()}>
          <h2>Change Theme</h2>
        </button>
      </div>
      <table className="Board">
        <tbody>
          <tr>
            <td className="Theme"><h2>{themes.selected}</h2></td>
            {
              descriptions.selected.map((description, index) => {
                return (<BoardHeader word={description} direction="right" key={index}/>)
              })
            }
          </tr>
          {
            opinions.selected.map((opinion, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  <BoardHeader word={opinion} direction="left"/>
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
      <div className="ViewNumber">
        <button>
          <h2 className="unrevealed">View Number</h2>
          <div className="revealed">{currentNumber}</div>
        </button>
      </div>
    </>
  );
}

export default Board;
