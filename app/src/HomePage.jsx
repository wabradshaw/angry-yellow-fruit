import './HomePage.css';

import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
    <div className="home-navigation">
        <button id="how-to-play-button" className="secondary-button"onClick={() => navigate("/instructions")}>
            How to Play
        </button>
        <button id="play-button" className="key-button" onClick={() => navigate("/play")}>
            Play
        </button>
        <button id="sell-button" className="secondary-button" onClick={() => window.open("/angry-yellow-fruit/ayf-sell-sheet.pdf", "_blank")}>
            Sell Sheet
        </button>
    </div>
        <div className="blurbs">
            <div className="text-box">
                <p>
                    Can you name an angry yellow fruit? What about a short weird actor? More importantly, will your friends know what you're talking about?
                </p>
            </div>
            <div className="text-box">
                <p>
                    Angry Yellow Fruit is a party game about creative clues to chaotic descriptions. One player thinks of a clue for two random adjectives, then everyone else guesses what on earth they might be pointing to.
                </p>
            </div>
        </div>
    </div>    
  );
}

export default HomePage;