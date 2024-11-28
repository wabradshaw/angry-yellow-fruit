import './Board.css';

function Board() {
  return (
    <table className="Board">
      <tbody>
        <tr>
          <td className="BlankCell"></td>
          <th scope="col" className="right">Green</th>
          <th scope="col" className="right">Big</th>
          <th scope="col" className="right">Colourful</th>
        </tr>
        <tr>
          <th className="left">Angry</th>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>  
        <tr>
          <th className="left">Helpful</th>
          <td>4</td>
          <td>5</td>
          <td>6</td>
        </tr>  
        <tr>
          <th className="left">Smug</th>
          <td>7</td>
          <td>8</td>
          <td>9</td>
        </tr>  
      </tbody>            
    </table>
  );
}

export default Board;
