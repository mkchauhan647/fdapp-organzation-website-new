import { combineReducers, Reducer } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { 
  persistReducer, 
  persistStore ,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

import { AuthSlice } from './Auth/AuthSlice';
import { CandidatesSlice } from './candidates/CandidatesSlice';
import { CouponsSlice } from './coupons/CouponsSlice';
import { NotificationsSlice } from './notification/NotificationsSlice';
import { VotingCampaignSlice } from './voting-campaign/VotingCampaignSlice';
import { VotingCampaignStagesSlice } from './voting-campaign-stages.ts/Voting-campaignStagesSlice';
import { ProductsSlice } from './try/TrySlice';
import { FAQSlice } from './faqs/FAQSlice';
import { NewsSlice } from './news/NewsSlice';

// Define RootState inline
export type RootState = {
  Auth: ReturnType<typeof AuthSlice.reducer>;
  Candidates: ReturnType<typeof CandidatesSlice.reducer>;
  Coupons: ReturnType<typeof CouponsSlice.reducer>;
  Notifications: ReturnType<typeof NotificationsSlice.reducer>;
  VotingCampaign: ReturnType<typeof VotingCampaignSlice.reducer>;
  VotingCampaignStages: ReturnType<typeof VotingCampaignStagesSlice.reducer>;
  Products: ReturnType<typeof ProductsSlice.reducer>;
  FAQ : ReturnType<typeof FAQSlice.reducer>
  News : ReturnType<typeof NewsSlice.reducer>
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Auth'],
  version:1,
};

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  Auth: AuthSlice.reducer,
  Candidates: CandidatesSlice.reducer,
  Coupons: CouponsSlice.reducer,
  Notifications: NotificationsSlice.reducer,
  VotingCampaign: VotingCampaignSlice.reducer,
  VotingCampaignStages: VotingCampaignStagesSlice.reducer,
  Products: ProductsSlice.reducer,
  FAQ  : FAQSlice.reducer,
  News : NewsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
