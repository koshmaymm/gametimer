import {
  SET_SETTINGS_LOADING,
  SET_SETTINGS_FAILED,
  SET_SETTINGS_VARIANTS,
  SET_RESULTS_LOADING,
  SET_RESULTS_SUCCESS,
  SET_RESULTS_FAILED
} from "../constants/gameSettingsConstants";

const initialState = {
  settingsLoading: false,
  settingsError: false,
  settindsVariants: null,

  resultsLoading: false,
  resultsSuccess: false,
  resultsError: false,
};

export function gameReduser(state = initialState, action) {
  switch (action.type) {
    case SET_RESULTS_LOADING:
      return { ...state, resultsLoading: action.payload };
    case SET_RESULTS_SUCCESS:
      return { ...state, resultsSuccess: action.payload };
    case SET_RESULTS_FAILED:
      return { ...state, resultsError: action.payload };

    case SET_SETTINGS_LOADING:
      return { ...state, settingsLoading: action.payload };
    case SET_SETTINGS_FAILED:
      return { ...state, settingsError: action.payload };
    case SET_SETTINGS_VARIANTS:
      return { ...state, settindsVariants: action.payload };

    default:
      return state;
  }
}

export default gameReduser;
