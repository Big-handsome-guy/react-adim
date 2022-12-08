import request from "../utils/request";
import { ClassifyType, ArticleType } from "../types/course";

//新增分类
export const classifyAdd = (classObj: ClassifyType) => {
  return request.post("/classes/ReactClassify", classObj);
};

//分类列表
export const classifyGet = () => {
  return request.get("/classes/ReactClassify");
};

//修改上架状态
export const classifyUpdate = (objectId: string, state: boolean) => {
  return request.put(`/classes/ReactClassify/${objectId}`, { state });
};

//新增图文课程
export const articlePost = (artObj: ArticleType) => {
  return request.post("/classes/ReactArticle", artObj);
};

export interface IArticleParams {
  pageSize?: number | undefined;
  current?: number | undefined;
  keyword?: string | undefined;
  name: string;
  isvip: string;
}
export interface CourseConditionType {
  name?: Object;
  isvip?: boolean;
}
//课程列表查询
export const articleGet = (params: IArticleParams) => {
  let { name, isvip } = params;
  let condition: CourseConditionType = {
    name: { $regex: `${name ? name : ""}`, $options: "i" },
  };
  if (isvip) {
    condition.isvip = isvip === "true" ? true : false;
  }
  let cond = JSON.stringify(condition);
  return request.get(`/classes/ReactArticle?where=${cond}`);
};
//课程更新
export const articlePut = (objectId: string, artObj: ArticleType) => {
  return request.put(`/classes/ReactArticle/${objectId}`, artObj);
};
