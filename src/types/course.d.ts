//表单内自定义组件的Props
export interface IFormComponentProps {
  id: string;
  onChange: ChangeEventHandler;
  value: string;
}
//课程分类
export interface ClassifyType {
  objectId: string; //类目ID
  cateName: string; //类目名称
  dadId: string; //父级类目ID
  state: boolean; //上架状态
  dadName?: string; //父级类目名称
}
export interface ClassifyTableType extends ClassifyType {
  children: ClassifyType[];
}

//课程内容
export interface ArticleType {
  name: string;
  poster: string;
  isvip: boolean;
  info: string;
  desc: string;
  classv1: string;
  classv2: string;
  classify: Array<string>;
}
