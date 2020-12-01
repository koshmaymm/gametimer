import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from "classnames";

import { getModesSelector, getSettingsError, getSettingsLoading } from "../../redux/selectors/gameSelectors";
import { settingsGameRequest } from "../../redux/actions/settingsActions";

import "./index.css";

const Game = () => {

    const dispatch = useDispatch();

    const isErrorSettings = useSelector(state => getSettingsError(state));
    const isLoadingSettings = useSelector(state => getSettingsLoading(state));
    const modes = useSelector(state => getModesSelector(state));

    const [gameMode, setGameMode] = useState(null);
    const [totalFields, setTotalCells] = useState([]);
    const [playerName, setPlayerName] = useState("");
    const [startPlaying, setStartPlaying] = useState(false);

    const [playerCount, setPlayerCount] = useState(0);
    const [computerCount, setComputerCount] = useState(0);

    let intervalGame;

    const getSettings = useCallback(() => {
        dispatch(settingsGameRequest());
    }, [dispatch]);

    useEffect(() => {
        getSettings();
    }, [getSettings]);

    const startGame = (e) => {
        e.preventDefault();
        const numbers = gameMode.field * gameMode.field;
        const list = [];
        for (let i = 0; i < numbers; i++) {
            list.push({ status: "empty" })
        }
        setTotalCells(list);
        setStartPlaying(true);
        goGame();
    }

    const goGame = () => {
        intervalGame = setInterval(() => gameStep(), gameMode.delay);
    }

    const randomInt = (min, max) => min + Math.floor((max - min) * Math.random());
    const gameStep = () => {
        const randomItemNumber = randomInt(0, gameMode.field * gameMode.field);
        updateList(randomItemNumber, "pending");
        // clearInterval(intervalGame);
        // intervalGame = setInterval(() => gameStep(), gameMode.delay);
        //const timeoutGame = setTimeout(() => { console.log("Hello ", totalFields); }, gameMode.delay);
    }

    const updateList = (numb, newStatus) => {
        const nextList = [...totalFields].concat();
        const playingItem = { status: newStatus };
        nextList[numb] = playingItem;
        setTotalCells(nextList);
    }

    const handlerChangeType = (e) => {
        setGameMode(modes[e.target.value] || null)
    }
    const itemHandler = (item, i) => {
        if (item.status !== "pending") return;
        updateList(i, "player");
        clearInterval(intervalGame);
    }

    if (isLoadingSettings) return <h3>Loading ... </h3>
    if (isErrorSettings) return <h3>Error</h3>
    if (!modes) return null;

    if (modes) return (
        <div className="game">
            <form className="game-params">
                <select
                    className="select"
                    disabled={startPlaying}
                    onChange={handlerChangeType}
                >
                    <option value="">Pick game mode</option>
                    {Object.keys(modes).map((item) => <option key={item}>{item}</option>)}
                </select>
                <input
                    type="text"
                    className="input"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name"
                    disabled={startPlaying}
                />
                <button
                    className="btn"
                    disabled={(gameMode === null || playerName.trim() === "" || startPlaying)}
                    onClick={startGame}
                >
                    PLAY
                </button>
            </form>

            <h3 className="message">Message here</h3>

            {startPlaying && <div
                className={classnames("board", {
                    "board--easy": gameMode.field === 5,
                    "board--medium": gameMode.field === 10,
                    "board--hard": gameMode.field === 15,
                })}
            >
                {totalFields.map((item, i) => (
                    <div
                        className={classnames("cell", {
                            "cell--pending": item.status === "pending",
                            "cell--computer": item.status === "computer",
                            "cell--player": item.status === "player",
                        })}
                        key={i}
                        onClick={() => itemHandler(item, i)}
                    >
                        {i}
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Game
