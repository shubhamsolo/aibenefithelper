import { configureStore } from '@reduxjs/toolkit';
// 1. Import the reducer from your benefits slice
import benefitsReducer from '../feature/benefits/benefitsSlice.ts';

export const store = configureStore({
  // 2. Add the reducer to the store.
  // The key 'benefits' determines that this state will be accessible
  // in your components as `state.benefits`
  reducer: {
    benefits: benefitsReducer,
  },
});

// 3. Infer the `RootState` and `AppDispatch` types from the store itself.
// This is a crucial step for using Redux with TypeScript correctly.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;