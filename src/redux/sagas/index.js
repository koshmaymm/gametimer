import { takeLatest } from "@redux-saga/core/effects";

import {
  GET_SETTINGS_REQUEST,
  GET_RESULTS_REQUEST,
  UPDATE_RESULTS_REQUEST
} from "../constants/gameSettingsConstants";

import { fetchGameSettindsSaga, fetchGameResultsSaga, setGameResultsSaga } from "./gameSagas";


export default function* rootSaga() {
  yield takeLatest(GET_SETTINGS_REQUEST, fetchGameSettindsSaga);
  yield takeLatest(GET_RESULTS_REQUEST, fetchGameResultsSaga);
  yield takeLatest(UPDATE_RESULTS_REQUEST, setGameResultsSaga);
}
