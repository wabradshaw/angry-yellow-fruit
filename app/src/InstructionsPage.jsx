import './InstructionsPage.css';

function InstructionsPage() {

  return (
    <div className="instructions">
        <div className="text-box image-final">
            <h1>WHAT YOU NEED</h1>
            <h2>3+ players</h2>
            <p>Designed for 3-6, but works well with bigger groups too!</p>
            <h2>A way of guessing 1-9 per player</h2>
            <div className="mode-spacer">
                <div className="cards">
                    <img src="/angry-yellow-fruit/cards.png" alt="cards"></img>
                    <div>A set of playing cards 1-9 each is ideal.</div>
                </div>
                <div className="hands">
                    <img src="/angry-yellow-fruit/hands.png" alt="cards"></img>
                    <div>If you don't have cards, hold up a number of fingers.</div>
                </div>
            </div>  
        </div>
        <div className="spacer">
            <div className="left-column">
                <div className="text-box">
                    <h1>SETUP</h1>           
                    <p>The Angry Yellow Fruit board looks like this. Around the grid of 9 numbers, you have a theme card at the top, and three description cards on each side. One side has physical descriptions, and the other side is more opinionated.</p>
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
            <p>Pick a player to be the Clue Giver. They get a random number 1-9 and keep it secret.</p>
            <div className="mode-spacer">
                <div className="cards">
                    <img src="/angry-yellow-fruit/cards.png" alt="cards"></img>
                    <div>If you're playing using cards, the Clue Giver shuffles theirs and select one at random.</div>
                </div>
                <div className="hands">
                    <img src="/angry-yellow-fruit/hands.png" alt="cards"></img>
                    <div>To get a number on the site, the Clue Giver can hover over the "view number" button.</div>
                </div>
            </div>            
            <p>The Clue Giver now thinks of a clue that fits the theme and the two descriptions. Don't worry about giving a perfect clue, they don't usually exist. <b>This is meant to be hard!</b></p>
            <p>What counts as a clue? That's up to the group. It's usually one person or thing. A potato. Isaac Newton. Goat's cheese pizza. Just make sure you don't use a word from the board.</p>
        </div>
        <div className="text-box">
            <h1>GUESSING</h1>
            <p>Every other player now needs to work out what on earth they might mean. When you've worked it out (or guessed) let people know. When everyone's ready, reveal your guesses.</p>
            <div className="mode-spacer">
                <div className="cards">
                    <img src="/angry-yellow-fruit/cards.png" alt="cards"></img>
                    <div>Put your guess card face down on the table to show you're ready. <br/><br/>Everyone flips the card as a reveal.</div>
                </div>
                <div className="hands">
                    <img src="/angry-yellow-fruit/hands.png" alt="cards"></img>
                    <div>Place both your fists in the middle of the table to show you're ready.<br/><br/>Count to three and hold up a number of fingers to reveal.</div>
                </div>
            </div>                
            <p> The Clue Giver reveals their number and you see who was right (if anyone). Could you follow their logic?</p>
        </div>
        <div className="text-box">
            <h1>SCORING</h1>
            <p>In Angry Yellow Fruit, each player that guessed correctly gets a point. The Clue Giver gets a point for every player that got it right!</p>
        </div>
        <div className="text-box">
            <h1>RESET THE BOARD</h1>
            <p>Once you've revealed the answer, the clue's two descriptions change. <b>Click on the clue number to refresh the corresponding descriptions and generate a new random number</b>.</p>
            <p>After all players have given a clue for the theme (or you fancy a change), swap out the theme using the change theme button and start a new round.</p>
        </div>
    </div>    
  );
}

export default InstructionsPage;