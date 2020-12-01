import React from 'react';

import Game from "../Game";
import LeaderBoard from "../LeaderBoard";
import "./index.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Game />
            <LeaderBoard />
        </div>
    )
}

export default Dashboard
