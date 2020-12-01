import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    getResultsSelector,
    getResultsError,
    getResultsLoading,
} from "../../redux/selectors/gameSelectors";
import { resultsRequest } from "../../redux/actions/settingsActions";

import "./index.css";

const LeaderBoard = () => {

    const dispatch = useDispatch();

    const isReadyResults = useSelector(state => getResultsSelector(state));
    const isErrorResults = useSelector(state => getResultsError(state));
    const isLoadingResults = useSelector(state => getResultsLoading(state));

    const getLeadersList = useCallback(() => {
        dispatch(resultsRequest());
    }, [dispatch]);

    useEffect(() => {
        getLeadersList();
    }, [getLeadersList]);

    if (isLoadingResults) return <h3>Loading ... </h3>
    if (isErrorResults) return <h3>Error</h3>
    if (!isReadyResults) return null;

    return (
        <div className="leader-board">
            <h3>Leader Board</h3>
            <ul>{isReadyResults.map((item, i) => <li key={item.id.toString()}>
                <span>{item.winner}</span>
                <span>{item.date}</span>
            </li>)}
            </ul>

        </div>
    )
}

export default LeaderBoard
