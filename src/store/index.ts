import { configureStore } from "@reduxjs/toolkit";
import user from "./modules/user";

const store = configureStore({
  reducer: {
    user,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>; //获取状态机数据类型
export type AppDispatch = typeof store.dispatch;
