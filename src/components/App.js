import React, {useState} from 'react';
import StarMatch from './StarMatch';

export default function App () {
    const [gameId, setGameId] = useState(1)
    return (
        <StarMatch key={gameId} playAgain={ ()=>setGameId(gameId + 1) }/>
    );
}