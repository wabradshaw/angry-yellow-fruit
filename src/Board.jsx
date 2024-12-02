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
    <td><button onClick={() => callback(value)}>{value + 1}</button></td>
  );

}

function Board({scale, opinionsList, descriptionsList}) {
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

  const [opinions, setOpinions] = useState(initializeCardList(opinionsList, scale));
  const [descriptions, setDescriptions] = useState(initializeCardList(descriptionsList, scale));
  
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
  }

  return (
    <table className="Board">
      <tbody>
        <tr>
          <td className="BlankCell"></td>
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
                    return (<Cell value={key} callback={refreshValue}  key={key}/>)
                  })
                }
              </tr>
            )
          })
        }
      </tbody>            
    </table>
  );
}

export default Board;
