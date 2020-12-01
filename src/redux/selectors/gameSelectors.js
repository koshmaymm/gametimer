export const getModesSelector = (state) => state.gameReduser.settindsVariants;
export const getModeSelector = (state) => state.gameReduser.mode;
export const getSettingsError = (state) => state.gameReduser.settingsError;
export const getSettingsLoading = (state) => state.gameReduser.settingsLoading;

export const getResultsSelector = (state) => state.gameReduser.resultsSuccess;
export const getResultsError = (state) => state.gameReduser.resultsError;
export const getResultsLoading = (state) => state.gameReduser.resultsLoading;
