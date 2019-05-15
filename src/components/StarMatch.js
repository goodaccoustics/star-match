import React, {useState, useEffect} from 'react';
import utils from "../misc/utils";
import PlayAgain from "./PlayAgain";
import StarsDisplay from "./StarsDisplay";
import PlayNumber from "./PlayNumber";

//create a custom hook
const useGameState = () => {
    //defining the state
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [timer, setTimer] = useState(10);

    //defining the effects
    useEffect(() => {
        if (timer > 0 && availableNums.length >= 0) {
            const timerId = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    });

    const setGameState = (newCandidateNums) => {
        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNums, 9))
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    }

    //alternative of manually resetGame is to update the key of the component
    //const resetGame = () => {
    //    setStars(utils.random(1, 9));
    //    setAvailableNums(utils.range(1, 9));
    //    setCandidateNums([]);
    //    setTimer(10);
    //}

    return {stars, availableNums, candidateNums, timer, setGameState};
}


const StarMatch = (props) => {

    const {
        stars,
        availableNums,
        candidateNums,
        timer,
        setGameState,
    } = useGameState();


    // methods
    const gameStatus = availableNums.length === 0 ?
        'won' : timer === 0 ?
            'lost' : 'active';

    const candidatesAreWrong = utils.sum(candidateNums) > stars;

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    }

    // manipulating the state
    const onNumberClick = (number, status) => {
        console.log(number, status);

        if (status === 'used' || gameStatus !== 'active') {
            return;
        }

        const newCandidateNums =
            status === 'available' ?
                candidateNums.concat(number) : candidateNums.filter( n => n !== number );

        setGameState(newCandidateNums);

    }


    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of the stars
            </div>
            <div className="body">
                <div className="left">
                    {
                        gameStatus !== 'active' ?
                            <PlayAgain resetGame={props.playAgain} gameStatus={gameStatus}/> : <StarsDisplay count={stars} />
                    }
                </div>
                <div className="right">
                    {
                        utils.range(1, 9).map( number =>
                            <PlayNumber key={number} number={number} status={numberStatus(number)} onNumberClick={onNumberClick}/>
                        )
                    }
                </div>
            </div>
            <div className="timer">Time Remaining: {timer}</div>
        </div>
    );
}

export default StarMatch;