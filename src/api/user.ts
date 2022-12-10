import { IMenuProps } from "@/router/interface";
import request from "../utils/request";

export interface UserParpams {
  username: string;
  password: string;
  remember: boolean;
}

export interface UserInfoUpdateType {
  username: string;
  avatar: string;
  nickname: string;
  email: string;
}

//登录
export const userLogin = (params: UserParpams) => {
  return request.post("/login", params);
};

//用户信息更新
export const userUpdate = (objectId: string, params: UserInfoUpdateType) => {
  return request.put(`/users/${objectId}`, params);
};

// 新增角色
export interface IRoleParams {
  key: number;
  objectId: string;
  roleName: string;
  roleLevel: number;
  tree: IMenuProps[];
  checkedKeys: Array<string>;
}
export const rolePost = (params: IRoleParams) => {
  return request.post("/classes/ReactRole", params);
};

//角色列表
export const roleGet = (roleid: string = "") => {
  let id = roleid ? `/${roleid}` : "";
  return request.get(`/classes/ReactRole${id}`);
};

//更新角色
export const rolePut = (objectId: string, params: IRoleParams) => {
  return request.put(`/classes/ReactRole/${objectId}`, params);
};

//角色删除
export const roleDel = (objectId: string) => {
  return request.delete(`/classes/ReactRole/${objectId}`);
};

//批量删除角色
export const roleBatchDel = (params: IRoleParams[]) => {
  let requests = params.map((item) => {
    return {
      method: "DELETE",
      path: `/1.1/classes/ReactRole/${item.objectId}`,
    };
  });
  return request.post("/batch", { requests });
};

export interface UserRegParams extends UserParpams {
  roleid: string;
  rolename: string;
  roleidx: number;
}

//账号分配
export const userReg = (params: UserRegParams) => {
  return request.post("/users", params);
};

//用户列表
export const userGet = () => {
  return request.get("/users");
};
