import './InstructionsPage.css';

import { useNavigate } from "react-router-dom";

function InstructionsPage() {
  const navigate = useNavigate();

  return (
    <div className="instructions">
        <div className="text-box">
            <p>
                Can you name an angry yellow fruit? What about a short weird actor? More importantly, will your friends know what you're talking about?
            </p>
            <p>
                Angry Yellow Fruit is a party game about creative clues to chaotic descriptions. One player thinks of a clue for two random adjectives, then everyone else guesses what on earth they might be pointing to.
            </p>
        </div>
        <div className="text-box">
            <p>
                Can you name an angry yellow fruit? What about a short weird actor? More importantly, will your friends know what you're talking about?
            </p>
            <p>
                Angry Yellow Fruit is a party game about creative clues to chaotic descriptions. One player thinks of a clue for two random adjectives, then everyone else guesses what on earth they might be pointing to.
            </p>
        </div>
    </div>    
  );
}

export default InstructionsPage;