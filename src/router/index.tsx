import {
  BarChartOutlined,
  PicLeftOutlined,
  SettingOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { IMenuProps } from "./interface";
import Dashboard from "../views/Dashboard/index";
import Classify from "../views/Course/Classify";
import ArticleList from "../views/Course/ArticleList";
import ArticlePublic from "../views/Course/ArticPublic";
import Role from "../views/Manager/Role";
import User from "../views/Manager/User";
import ArticleEdit from "../views/Course/ArticleEdit";
import Setting from "@/views/setting";
import MyMap from "@/views/Amap";
import Export from "@/views/Excel/Export";
import Import from "@/views/Excel/Import";

export const mainroutes: IMenuProps[] = [
  {
    key: "/dashboard",
    label: "数据统计",
    title: "数据统计",
    icon: <BarChartOutlined />,
    element: <Dashboard />,
    nochild: 1,
  },
  {
    key: "/course",
    label: "课程管理",
    title: "课程管理",
    icon: <PicLeftOutlined />,
    children: [
      {
        key: "/course/classify",
        label: "课程分类",
        title: "课程分类",
        element: <Classify />,
      },
      {
        key: "/course/artlist",
        label: "图文课程列表",
        title: "图文课程列表",
        element: <ArticleList />,
      },
      {
        key: "/course/artpublic",
        label: "图文课程发布",
        title: "图文课程发布",
        element: <ArticlePublic />,
        hidden: true,
      },
      {
        key: "/course/edit",
        label: "课程编辑",
        title: "课程编辑",
        element: <ArticleEdit />,
        hidden: true,
      },
    ],
  },
  {
    key: "/manager",
    label: "系统管理",
    title: "系统管理",
    icon: <SettingOutlined />,
    children: [
      {
        key: "/manager/role",
        label: "角色管理",
        title: "角色管理",
        element: <Role />,
      },
      {
        key: "/manager/user",
        label: "账号管理",
        title: "账号管理",
        element: <User />,
      },
    ],
  },
  {
    key: "/setting",
    label: "个人设置",
    title: "个人设置",
    icon: <IdcardOutlined />,
    element: <Setting />,
    nochild: 1,
  },
  {
    key: "/map",
    label: "高德地图",
    title: "高德地图",
    icon: <IdcardOutlined />,
    element: <MyMap />,
    nochild: 1,
  },
  {
    key: "/excel",
    label: "Excel表格",
    title: "Excel表格",
    icon: <SettingOutlined />,
    children: [
      {
        key: "/excel/export",
        label: "表格导出",
        title: "表格导出",
        element: <Export />,
      },
      {
        key: "/excel/import",
        label: "表格导入",
        title: "表格导入",
        element: <Import />,
      },
    ],
  },
];
