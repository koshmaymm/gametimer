import React, { Component } from 'react';
import { connect } from "react-redux";
import classnames from "classnames";
import moment from "moment";

import { getModesSelector, getSettingsError, getSettingsLoading } from "../../redux/selectors/gameSelectors";
import { settingsGameRequest, updateRequest } from "../../redux/actions/settingsActions";
import "./index.css";
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameMode: null,
            playerName: "",
            startPlaying: false,
            totalFields: [],
            usageFields: [],
            playerCount: 0,
            computerCount: 0,
            btnTitle: "PLAY",
            messageTitle: ""
        };

        this.handlerChangeType = this.handlerChangeType.bind(this);
        this.setPlayerName = this.setPlayerName.bind(this);
        this.startGame = this.startGame.bind(this);
        this.goGame = this.goGame.bind(this);
        this.computerWon = this.computerWon.bind(this);
        this.itemHandler = this.itemHandler.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.getDateFoo = this.getDateFoo.bind(this);
        this.clearGameResults = this.clearGameResults.bind(this);
        this.timerGame = null;
        this.timerCell = null;
    }

    handlerChangeType(e) {
        this.setState({
            ...this.state,
            gameMode: this.props.modes[e.target.value] || null
        });
    }
    setPlayerName(e) {
        this.setState({
            ...this.state,
            playerName: e.target.value
        });
    }

    randomInt(min, max) { return min + Math.floor((max - min) * Math.random()) };

    getUniqueNumber() {
        const { field } = this.state.gameMode;
        const { usageFields } = this.state;
        const total = field * field;
        const val = this.randomInt(0, total);
        return usageFields.includes(val) ? this.getUniqueNumber() : val;
    }

    computerWon(itemNumber) {
        const { totalFields, computerCount } = this.state;
        if (totalFields[itemNumber].status === "player") {
            return;
        }

        const computerField = { status: "computer" }
        const updateFields = [...this.state.totalFields];
        updateFields[itemNumber] = computerField;

        this.setState({
            ...this.state,
            totalFields: updateFields,
            computerCount: computerCount + 1
        });
    }

    getDateFoo() {
        const d = moment(new Date());
        const date = d.format("D MMMM YYYY");
        const time = d.format("HH:MM");
        return `${time}; ${date}`
    }

    goGame() {
        const { usageFields, totalFields, gameMode, computerCount, playerCount, playerName } = this.state;
        const numbers = gameMode.field * gameMode.field;

        if (computerCount > (numbers / 2)) {
            this.stopGame("Computer won");
            return;
        }
        if (playerCount > (numbers / 2)) {
            this.stopGame(playerName);
            return;
        }

        const itemNumber = this.getUniqueNumber();
        const newArr = [...usageFields, itemNumber].sort((a, b) => a - b);
        const pendingField = { status: "pending" }
        const updateFields = [...this.state.totalFields];
        updateFields[itemNumber] = pendingField;
        this.setState({
            ...this.state,
            usageFields: newArr,
            totalFields: updateFields,
        });
        this.timerCell = setTimeout(() => this.computerWon(itemNumber), gameMode.delay);
        if (usageFields.length === totalFields.length - 1) {
            clearInterval(this.timerGame);
        }
    }

    clearGameResults() {
        clearInterval(this.timerGame);
        clearTimeout(this.timerCell);
    }

    startGame(e) {
        e.preventDefault();
        this.clearGameResults();
        const { gameMode } = this.state;
        const numbers = gameMode.field * gameMode.field;
        const list = [];
        for (let i = 0; i < numbers; i++) {
            list.push({ status: "empty" })
        }
        this.setState({
            ...this.state,
            totalFields: list,
            startPlaying: true
        });
        this.timerGame = setInterval(this.goGame, gameMode.delay);
    }

    itemHandler(item, i) {
        if (item.status !== "pending") return;
        const { playerCount } = this.state;
        const playerField = { status: "player" }
        const updateFields = [...this.state.totalFields];
        updateFields[i] = playerField;
        this.setState({
            ...this.state,
            totalFields: updateFields,
            playerCount: playerCount + 1
        });
    }
    stopGame(winner) {
        clearInterval(this.timerGame);
        clearTimeout(this.timerCell);
        this.setState({
            ...this.state,
            startPlaying: false,
            playerCount: 0,
            computerCount: 0,
            btnTitle: "PLAY AGAIN",
            usageFields: [],
            messageTitle: winner
        });
        this.props.updateWinners({ winner, date: this.getDateFoo() });
    }

    componentDidMount() {
        this.props.getSettings();
    }

    render() {
        const { modes, err, loading } = this.props;
        const { gameMode, playerName, startPlaying, totalFields, btnTitle, messageTitle } = this.state;

        if (loading) return <h3>Loading ... </h3>
        if (err) return <h3>Error</h3>
        if (!modes) return null;

        return (
            <div className="game">
                <form className="game-params">
                    <select
                        className="select"
                        onChange={this.handlerChangeType}
                        disabled={startPlaying}
                    >
                        <option value="">Pick game mode</option>
                        {Object.keys(modes).map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <input
                        type="text"
                        className="input"
                        value={playerName}
                        onChange={this.setPlayerName}
                        placeholder="Enter your name"
                        disabled={startPlaying}
                    />
                    <button
                        className="btn"
                        disabled={(gameMode === null || playerName.trim() === "" || startPlaying)}
                        onClick={this.startGame}
                    >
                        {btnTitle}
                    </button>
                </form>

                <h3 className="message">{messageTitle}</h3>

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
                            onClick={() => this.itemHandler(item, i)}
                        >
                            {i}
                        </div>
                    ))}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modes: getModesSelector(state),
        err: getSettingsError(state),
        loading: getSettingsLoading(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSettings: () => dispatch(settingsGameRequest()),
        updateWinners: (obj) => dispatch(updateRequest(obj)),
    };;
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
