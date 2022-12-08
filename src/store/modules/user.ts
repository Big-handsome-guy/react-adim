import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { userLogin, UserParpams } from "@/api/user";
import { NavigateFunction } from "react-router-dom";

export interface UserInfoType {
  objectId: string;
  roleid: string;
  rolename: string;
  sessionToken: string;
  username: string;
  avatar: string;
}

export interface UserStateType {
  isLogin: boolean;
  isLoading: boolean;
  userInfo: UserInfoType | null;
}

let initialState: UserStateType = {
  isLogin: false,
  isLoading: false,
  userInfo: null,
};

//提取本地存储数据
let userinfo =
  localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
if (userinfo) {
  initialState.isLogin = true;
  initialState.userInfo = JSON.parse(userinfo);
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart(state) {
      //开始登陆
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      //登陆成功
      state.isLoading = false;
      state.isLogin = true;
      console.log("登录成功", action);
      let { info, remember } = action.payload;
      state.userInfo = info;
      localStorage.setItem("remember", remember); //记录用户本地存储状态
      if (remember) {
        localStorage.setItem("userInfo", JSON.stringify(info)); //本地存储
      } else {
        sessionStorage.setItem("userInfo", JSON.stringify(info)); //会话存储
      }
    },
    loginFail(state) {
      //登陆失败、退出登录
      state.isLoading = false;
      state.isLogin = false;
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      sessionStorage.removeItem("userInfo");
    },
  },
});

export const { loginStart, loginSuccess, loginFail } = userSlice.actions;

//异步请求
export const userLoginAsync = (
  dispatch: Dispatch,
  params: UserParpams,
  navigate: NavigateFunction
) => {
  dispatch(loginStart()); //开始登陆
  console.log("开始登录");
  userLogin(params)
    .then((res) => {
      console.log("登录成功", res);
      dispatch(loginSuccess({ info: res.data, remember: params.remember })); //登录成功
      navigate("/");
    })
    .catch((error) => {
      console.log("登录失败", error);
      dispatch(loginFail()); //登陆失败
    });
};

export default userSlice.reducer;
