import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/auth.slice";
import { RTKApi } from "./rtk-query";

export const store = configureStore({
  reducer: {
    [RTKApi.reducerPath]: RTKApi.reducer,
    auth: authSlice.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(RTKApi.middleware),
});

//W---------={ RootState and AppDispatch }=----------</br>
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
