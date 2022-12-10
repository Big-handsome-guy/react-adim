import { message } from "antd";
import axios from "axios";
import { ID, KEY, BASE } from "../config/index";

const instance = axios.create({
  baseURL: `${BASE}/1.1`,
  headers: {
    "X-LC-Id": ID,
    "X-LC-Key": KEY,
    "Content-Type": "application/json",
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config: any) {
    // 在发送请求之前做些什么
    // console.log("请求拦截器", config);
    let userinfo =
      localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
    if (userinfo) {
      config.headers["X-LC-Session"] = JSON.parse(userinfo).sessionToken;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
interface StatusType {
  msg: string;
  type: "success" | "error" | "warning";
}
const statusList: Record<string, StatusType> = {
  "200": {
    msg: "操作成功",
    type: "success",
  },
  "201": {
    msg: "新增数据成功",
    type: "success",
  },
  "403": {
    msg: "权限不足",
    type: "error",
  },
};
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log("响应拦截器", response);
    let { status } = response; //获取状态码
    // message.success("成功");
    let { msg, type } = statusList[status]; //根据状态码，获取消息提示的风格、文字
    message[type](msg); //根据动态变化的type与msg进行消息提示
    // 也可以用if处理
    // if(status==200){
    //   message.success('成功')
    // }
    // if(status==201){
    //   message.success('成功')
    // }
    // if(status==202){
    //   message.success('成功')
    // }
    // if(status==403){
    //   message.error('没有权限')
    // }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    message.error("操作失败");
    return Promise.reject(error);
  }
);

export default instance;
