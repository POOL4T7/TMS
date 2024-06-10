import { createSlice } from '@reduxjs/toolkit';
import i18n from '../../i18n';
import { getLocalStorage } from '../../utils/storage';

const languageSlice = createSlice({
  name: 'language',
  initialState: getLocalStorage('lang') || 'en',
  reducers: {
    changeLanguage: (_state, action) => {
      const newLanguage = action.payload;
      i18n.changeLanguage(newLanguage);
      return newLanguage;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
