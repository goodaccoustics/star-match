import React from 'react';

const PlayAgain = (props) => (

    <div className="game-done">
        <div className="message" style={{ color : props.gameStatus === 'won' ? 'green' : 'red'}}>
            {props.gameStatus === 'won' ? 'Nice' : 'Game Over'}
        </div>
        <button onClick={props.resetGame}>Play Again</button>
    </div>

);

export default PlayAgain;