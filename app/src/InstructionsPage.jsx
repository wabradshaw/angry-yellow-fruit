import './InstructionsPage.css';

function InstructionsPage() {

  return (
    <div className="instructions">
        <div className="text-box">
            <h1>WHAT YOU NEED</h1>
            <h2>3+ players</h2>
            <p>Designed for 3-6, but works well with big groups!</p>
            <h2>A way of guessing 1-9 per player</h2>
            <p>A set of cards 1-9 is ideal. Whiteboards, notepads or holding up fingers works too.</p>
        </div>
        <div className="spacer">
            <div className="left-column">
                <div className="text-box">
                    <h1>SETUP</h1>           
                    <p>The Angry Yellow Fruit board looks like this. Around the grid of 9 numbers, you have a theme card at the top, and three description cards on each side. One side has more factual descriptions, and the other side is more subjective.</p>
                </div>
                <div className="text-box large-only"> 
                    <p>Each cell in the grid corresponds to two description cards. So <b>cell 8</b> on the grid corresponds to a <b>good, wide animal</b>.</p>
                </div>
            </div>
            <img id="sample-board" src="/angry-yellow-fruit/sample-board.png" alt="Sample game board"/>            
            <div className="text-box small-only" > 
                <p>Each cell in the grid corresponds to two description cards. So <b>cell 8</b> on the grid corresponds to a <b>good, wide animal</b>.</p>
            </div>
        </div>
        <div className="text-box">
            <h1>GIVING A CLUE</h1>
            <p>Pick a player to give the first clue. They get a random number 1-9. If you're playing using cards, shuffle and select one at random. On the site, ask everyone to close their eyes and hover over "view number".</p>
            <p>That player now thinks of a clue that fits the theme and the two descriptions. Don't worry about giving a perfect clue, they don't usually exist. <b>This is meant to be hard!</b></p>
            <p>What counts as a clue? That's up to the group. It's usually one person or thing. A potato. Isaac Newton. Goat's cheese pizza. Just make sure you don't use a word from the board.</p>
        </div>
        <div className="text-box">
            <h1>GUESSING</h1>
            <p>Every other player now needs to work out what on earth they might mean. If you're using cards or notepads, put them face down when you've worked it out (or guessed). If you're using fingers, put your hands in the middle of the table.</p>
            <p>When everyone's ready, reveal your guesses. The cluegiver reveals their number and you see who was right (if anyone). Could you follow their logic?</p>
        </div>
        <div className="text-box">
            <h1>SCORING</h1>
            <p>In Angry Yellow Fruit, each player that guessed correctly gets a point. The player that gave the clue gets a point for every player that got it right!</p>
        </div>
        <div className="text-box">
            <h1>RESET THE BOARD</h1>
            <p>Once you've revealed the answer, swap the clue's two description cards for new cards. If you're playing on the app <b>click on the clue number to refresh the descriptions and generate a new random number</b>.</p>
            <p>After all players have had a go using the theme (or you fancy a change), swap out the theme using the change theme button and start a new round.</p>
        </div>
    </div>    
  );
}

export default InstructionsPage;