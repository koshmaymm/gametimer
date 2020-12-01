import { put, call } from "@redux-saga/core/effects";
import Axios from "axios";

import {
    settingsGameLoading,
    settingsGameFailed,
    settingsModesVariants,
    resultsLoading,
    resultsFailed,
    resultsSuccess
} from "../actions/settingsActions";

const urlSettings = "https://starnavi-frontend-test-task.herokuapp.com/game-settings";
const urlResults = "https://starnavi-frontend-test-task.herokuapp.com/winners";

export function* fetchGameResultsSaga() {

    yield put(resultsLoading(true));

    try {
        const results = yield call(Axios.get, urlResults);
        if (results.status >= 200 || results.status < 300) {
            yield put(resultsSuccess(results.data));
            // yield put(resultsSuccess(true));
            yield put(resultsLoading(false));
        } else {
            yield put(resultsFailed(results.data));
            yield put(resultsLoading(false));
        }
    } catch (err) {
        yield put(resultsFailed(err.message));
        yield put(resultsLoading(false));
        console.log(err);
    }
}

export function* fetchGameSettindsSaga() {

    yield put(settingsGameLoading(true));

    try {
        const settings = yield call(Axios.get, urlSettings);
        if (settings.status >= 200 || settings.status < 300) {
            yield put(settingsModesVariants(settings.data));
            yield put(settingsGameLoading(false));
        } else {
            yield put(settingsGameFailed(settings.data));
            yield put(settingsGameLoading(false));
        }
    } catch (err) {
        yield put(settingsGameFailed(err.message));
        yield put(settingsGameLoading(false));
        console.log(err);
    }
}

export function* setGameResultsSaga({payload}) {
    try {
        const results = yield call(Axios.post, urlResults, payload);
        if (results.status >= 200 || results.status < 300) {
             yield put(resultsSuccess(results.data));
        } else {
            console.log("error ", results)
        }
    } catch (err) {
        yield put(resultsFailed(err.message));
        console.log(err);
    }
}