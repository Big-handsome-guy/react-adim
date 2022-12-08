// src/store/hook.ts 自定义useSelector 以及 useDispatch 避免后续组件使用时需要单独引入每一次 js不需要
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./index";

// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch; // () => AppDispatch 代表返回的是一个函数
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // TypedUseSelectorHook<RootState> 类型注解
// 以后组件中不要再单独使用 useSelector, useDispatch，使用useAppSelector 以及useAppDispatch 代替
