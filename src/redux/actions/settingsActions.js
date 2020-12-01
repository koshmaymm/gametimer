import {
    GET_SETTINGS_REQUEST,
    SET_SETTINGS_LOADING,
    SET_SETTINGS_FAILED,
    SET_SETTINGS_VARIANTS,
    GET_RESULTS_REQUEST,
    SET_RESULTS_LOADING,
    SET_RESULTS_SUCCESS,
    SET_RESULTS_FAILED,
    UPDATE_RESULTS_REQUEST,
  } from "../constants/gameSettingsConstants";
  

  export const updateRequest = (payload) => ({
    type: UPDATE_RESULTS_REQUEST,
    payload,
  });
  export const resultsRequest = () => ({
    type: GET_RESULTS_REQUEST,
  });
  export const resultsLoading = (payload) => ({
    type: SET_RESULTS_LOADING,
    payload,
  });
  export const resultsFailed = (payload) => ({
    type: SET_RESULTS_FAILED,
    payload,
  });
  export const resultsSuccess = (payload) => ({
    type: SET_RESULTS_SUCCESS,
    payload,
  });


  export const settingsGameRequest = () => ({
    type: GET_SETTINGS_REQUEST,
  });
  export const settingsGameLoading = (payload) => ({
    type: SET_SETTINGS_LOADING,
    payload,
  });
  export const settingsGameFailed = (payload) => ({
    type: SET_SETTINGS_FAILED,
    payload,
  });
  export const settingsModesVariants = (payload) => ({
    type: SET_SETTINGS_VARIANTS,
    payload,
  });

  