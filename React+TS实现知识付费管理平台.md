https://www.html.cn/create-react-app/

# 1.创建项目

```sh
# 现在
npx create-react-app admin-react-app --template typescript
```

**熟悉目录结构**

```
- admin-app
	-node_modules
	-public
	-src
		App.css
		App.test.tsx App.tsx的测试文件  npm run test 查看测试结果
		App.tsx
		index.css
		index.tsx react应用程序的入口文件
		logo.svg
		react-app-env.d.ts // 声明文件 // 指令声明对包的依赖关系
		reportWebVitals.ts // 测试性能
		seupTests.ts // 使用jest做为测试工具
	.gitignore
	package-lock.json
	package.json
	README.md
	tsconfig.json
```

> \*.d.ts 代表 ts 的声明文件

# 2.改造目录结构

```
src
	api
	components
	layout
	store
	router
	utils
	views
	App.tsx
	index.tsx
	logo.svg
	react-app-env.d.ts
	reportWebVitals.ts
  seupTests.ts
```

```tsx
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  // document.getElementById('root') as HTMLElement
  document.getElementById("root") as HTMLDivElement // 缩小类型范围
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
```

```tsx
// src/App.tsx
import React, { FC } from "react";

interface IAppProps {}

const App: FC<IAppProps> = () => {
  return <div>App</div>;
};

export default App;
```

# 3.安装一些必须的模块

## 3.1 配置预处理器

两种方式：

- 抽离配置文件配置预处理器
- 不抽离配置文件 craco 进行预处理器配置

> 本项目推荐使用第二种方式

```sh
$ yarn add @craco/craco @types/node --dev
```

https://www.npmjs.com/package/@craco/craco

### 3.1.1 配置别名@

项目根目录创建 `craco.config.js`，代码如下：

```ts
// craco.config.js
const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
```

为了使 TS 文件引入时的别名路径能够正常解析，需要配置 `tsconifg.json`，在 `compilerOptions`选项里添加 path 等属性。为了防止配置被覆盖，需要单独创建一个文件 `tsconfig.path.json`，添加以下代码

```json
// tsconfig.path.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["node"]
  }
}
```

在 `tsconifg.json` 引入配置文件：

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "extends": "./tsconfig.path.json",
  "include": ["src"]
}
```

修改 `package.json` 如下：

```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test"
},
```

```sh
$ npm run start
```

## 3.2 AntDesign 组件库

官网地址：https://ant.design/index-cn 4.22.2

国内官方镜像地址：https://ant-design.antgroup.com/index-cn

国内 gitee 镜像地址：https://ant-design.gitee.io/index-cn

```
cnpm i antd -S
```

`src/index.css`

```css
/* src/index.css */
@import "~antd/dist/antd.css";
```

`src/index.tsx`

```tsx
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
```

测试组件库

```tsx
// src/App.tsx
import React, { FC } from "react";
import { Button } from "antd";
interface IAppProps {}

const App: FC<IAppProps> = () => {
  return (
    <div>
      App
      <Button type="primary" danger>
        Primary
      </Button>
    </div>
  );
};

export default App;
```

> 浏览器查看发现测试通过

## 3.3 安装 vscode 插件

> 插件名称：Typescript React code snippets
>
> 插件作用：可以通过 tssfc（TS 函数式组件） 等快捷键快速生成带 TS 类型约束的基本组件结构

# 4.创建主布局文件

预览模板：https://pro.ant.design/zh-CN/

> src/layout/Index.tsx 作为后台管理系统的主页面布局(包含左侧的菜单栏，顶部，底部等)

https://ant-design.gitee.io/components/layout-cn/#components-layout-demo-custom-trigger

> 不要照着代码敲，直接复制即可，给 Layout 组件添加 id 为`admin-app`

```tsx
// src/layout/Index.tsx 主要的布局文件
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout id="admin-app">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
```

> 主组件引入 主界面的布局文件

```tsx
// src/App.tsx
import { FC } from "react";
import Index from "./layout/Index";

type AppProps = {};

const App: FC = (props: AppProps) => (
  <>
    <Index />
  </>
);

export default App;
```

> 查看浏览器，预览运行结果

> 发现页面并不是全屏。审查元素设置 root 以及 components-layout-demo-custom-trigger 高度为 100%

```css
/* src/index.css */
@import "~antd/dist/antd.less";

// 设置全屏  --- 审查元素 一层一层找 坚决不放过任何一个遗漏的
html,
body,
#root {
  height: 100%;
}

#admin-app {
  height: 100%;
}
// 布局文件
// #components-layout-demo-custom-trigger .trigger {  // 组件库提供案例id，改成自己的
#admin-app .trigger {
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
}
// #components-layout-demo-custom-trigger .trigger:hover
#admin-app .trigger:hover {
  color: #1890ff;
}

// #components-layout-demo-custom-trigger .logo {
#admin-app .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
```

# 5.拆分主界面

> 先拆分左侧的菜单栏组件

```tsx
// src/layout/components/SideBar.tsx 左侧菜单栏
import React, { FC, useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
interface ISideBarProps {}

const { Sider } = Layout;
const SideBar: FC<ISideBarProps> = () => {
  const [collapsed] = useState(false);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "nav 1",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "nav 2",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3",
          },
        ]}
      />
    </Sider>
  );
};

export default SideBar;
```

```tsx
// src/layout/components/AppHeader.tsx 头部组件
import React, { FC, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
const { Header } = Layout;
interface IAppHeaderProps {}

const AppHeader: FC<IAppHeaderProps> = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })}
    </Header>
  );
};

export default AppHeader;
```

```tsx
// src/layout/components/AppMain.tsx 内容区域
import React, { FC } from "react";
import { Layout } from "antd";
interface IAppMainProps {}
const { Content } = Layout;
const AppMain: FC<IAppMainProps> = () => {
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }}
    >
      Content
    </Content>
  );
};

export default AppMain;
```

整和组件资源

```ts
// src/layout/components/index.ts
export { default as SideBar } from "./SideBar";
export { default as AppHeader } from "./AppHeader";
export { default as AppMain } from "./AppMain";
```

```tsx
// src/layout/Index.tsx 主要的布局文件
import { Layout } from "antd";
import React from "react";

import { AppHeader, AppMain, SideBar } from "./components";

const App: React.FC = () => {
  return (
    <Layout id="admin-app">
      {/* 左侧菜单栏 */}
      <SideBar />
      <Layout className="site-layout">
        {/* 头部 */}
        <AppHeader />
        {/* 内容 */}
        <AppMain />
      </Layout>
    </Layout>
  );
};

export default App;
```

> 此时点击头部的控制器，发现只有头部组件的 图标在切换，但是并没有影响左侧菜单的收缩
>
> 建议使用状态管理器管理控制的这个状态

# 6. 路由配置

2021 年 11 月 4 日 发布了 react-router-dom 的 v6.0.0 版本：https://reactrouter.com/

如需使用 v5 版本：https://v5.reactrouter.com/web/guides/quick-start `cnpm i react-router-dom@5 -S`

> 本项目采用 V6 版本

## 6.1 基本路由配置

1. 安装

```
yarn add react-router-dom
```

2. 注入路由 index.tsx

```tsx
import { HashRouter } from "react-router-dom";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
```

3. 在 App.tsx 做路由映射

```tsx
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout";
import Login from "./views/Login";
import DashBoard from "./views/DashBoard";
import Category from "./views/Course/Category";
import ArticleList from "./views/Course/ArticleList";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/course/category" element={<Category />} />
          <Route path="/course/article/list" element={<ArticleList />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
```

4. 在 layout/components/AppContent.tsx 中呈现子组件

```tsx
import React from "react";
import { Breadcrumb, Layout } from "antd";
import { Outlet } from "react-router-dom";  //使用Outlet呈现子组件
const { Content } = Layout;
type Props = {};

export default function AppContent({}: Props) {
  return (
    <Content style={{ margin: "0 16px" }}>
        <Outlet />
      </div>
    </Content>
  );
}

```

## 6.2 侧边菜单触发路由跳转

1. 定义菜单数据包 router/index.tsx

> 放在路由文件夹中，方便未来用这个数据包动态生成 Route，进而完成菜单与路由的自动关联

```tsx
import { AreaChartOutlined } from "@ant-design/icons";
export const mainRoutes = [
  {
    key: "/dashboard",
    label: "数据统计",
    title: "数据统计",
    icon: <AreaChartOutlined />,
  },
  {
    key: "/course/category",
    label: "课程分类",
    title: "课程分类",
    icon: <AreaChartOutlined />,
  },
  {
    key: "/course/article/list",
    label: "课程列表",
    title: "课程列表",
    icon: <AreaChartOutlined />,
  },
];
```

2. Menu 渲染与路由切换

> 在 layout/component/AppSide.tsx 中使用数据包渲染 Menu 并使用 useNavigate 触发路由切换

```tsx
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { mainRoutes } from "../../router/index";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;
type Props = {};

export default function AppSider({}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleMenu = (obj: any) => {
    console.log(obj);
    navigate(obj.key);
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={mainRoutes}
        onClick={handleMenu}
      />
    </Sider>
  );
}
```

## 6.3 为路由数据包添加 TS 约束

1. 新增类型定义文件 d.ts

```typescript
// src/router/inter.d.ts
import { ReactNode } from "react";

// key属性可以使用 左侧菜单的路由地址，因为它具有唯一性
export interface IMenuProps {
  key: string;
  label: string;
  title: string;
  icon?: ReactNode;
  element?: ReactNode;
  children?: IMenuProps[];
}
```

2. 约束菜单

```tsx
// routes/index.tsx
import { AreaChartOutlined } from "@ant-design/icons";
import { IMenuProps } from "./inter.d.ts";
export const mainRoutes: IMenuProps = [
  {
    key: "/dashboard",
    label: "数据统计",
    title: "数据统计",
    icon: <AreaChartOutlined />,
  },
  {
    key: "/course/category",
    label: "课程分类",
    title: "课程分类",
    icon: <AreaChartOutlined />,
  },
  {
    key: "/course/article/list",
    label: "课程列表",
    title: "课程列表",
    icon: <AreaChartOutlined />,
  },
];
```

3. 按业务划分二级菜单

```tsx
import {
  AreaChartOutlined,
  SettingOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import { IMenuProps } from "./inter";
import DashBoard from "@/views/DashBoard";
import Category from "@/views/Course/Category";
import ArticleList from "@/views/Course/ArticleList";
import Role from "@/views/Manager/Role";
import User from "@/views/Manager/User";
export const mainRoutes: IMenuProps[] = [
  {
    key: "/dashboard",
    label: "数据统计",
    title: "数据统计",
    icon: <AreaChartOutlined />,
    element: <DashBoard />,
  },
  {
    key: "/course",
    label: "课程管理",
    title: "课程管理",
    icon: <RadarChartOutlined />,
    children: [
      {
        key: "/course/category",
        label: "课程分类",
        title: "课程分类",
        element: <Category />,
      },
      {
        key: "/course/article/list",
        label: "课程列表",
        title: "课程列表",
        element: <ArticleList />,
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
];
```

## 6.4 动态渲染路由

> 单层菜单渲染逻辑，参考 step02 分支
>
> 根据菜单数据包，动态生成 Route 路由组件，后续就可以通过 router/index.tsx 中的数据变化，同时控制菜单跟路由。

1. 在 router/utils.tsx 中封装动态渲染函数

```tsx
//方法1:根据数据包动态生成Route
export const renderRoutes = () => {
  let arr: IMenuProps[] = [];
  mainRoutes.forEach((item) => {
    if (item.children) {
      arr = [...arr, ...item.children];
    } else {
      arr.push(item);
    }
  });
  return arr.map((item) => (
    <Route key={item.key} path={item.key} element={item.element} />
  ));
};

//方法2：根据数据包动态生成Route，递归写法，调用时需要传递路由数据包
export const renderRoutes = (routes: IMenuProps[]): ReactNode[] => {
  return routes.map((item: IMenuProps) => {
    if (item.children) {
      return <Fragment key={item.key}>{renderRoutes(item.children)}</Fragment>;
    } else {
      return <Route key={item.key} path={item.key} element={item.element} />;
    }
  });
};
```

2. 调整 App.tsx 中的路由

```tsx
import React from "react";
import "./App.less";
// import router from "@/router/index"; //路径别名
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout";
import Login from "./views/Login";
import { renderRoutes } from "@/router/utils";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* 方法1：手写路由 */}
          {/* <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/course/category" element={<Category />} />
          <Route path="/course/article/list" element={<ArticleList />} />
          <Route path="/manager/role" element={<Role />} /> */}
          {/* 方法2：数据包生成路由【推荐】 */}
          {renderRoutes()}
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}
export default App;
```

# 任务

1. 搭建 React+TS 项目
2. 使用 craco 完成自定义配置
3. 搭建主面板并合理拆分组件
4. 配置路由、菜单并完成页面动态切换

# 7.AntD 主题配置

https://ant-design.antgroup.com/docs/react/use-in-typescript-cn

> 修改主题的本质，其实是修改 Antd 组件库样式 less 主题颜色变量

按照 [配置主题](https://ant-design.antgroup.com/docs/react/customize-theme-cn) 的要求，自定义主题需要用到类似 [less-loader](https://github.com/webpack-contrib/less-loader/) 提供的 less 变量覆盖功能。我们可以引入 [craco-antd](https://github.com/DocSpring/craco-antd) 或者是 `craco-less`来帮助加载 less 样式和修改变量。

**<u>！！！craco-antd 主题配置方案，跟 ProComponent 不兼容！！！</u>**

> create-react-app创建的项目环境，默认是不能解析less语法的
>
> 可以先在项目中随便创建一个less文件，引入组件后，观察less嵌套语法是否能够生效

1. 安装less解析模块，让项目能够解析less语法

```
yarn add  @craco/craco  craco-less
```

2. 项目根目录下新建theme.js主题文件

```
module.exports = {
  "@primary-color": "#6E48C2", //全局主色
};
```

3. 在根目录新建craco.config.js配置文件

```typescript
const CracoLessPlugin = require("craco-less");
const CracoAlias = require('craco-alias')
let theme = require('./theme.js')  //引入主题文件
module.exports = {
  plugins: [{ //less相关配置
    plugin: CracoLessPlugin,
    options: {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: theme,   //配置主题
          javascriptEnabled: true,
        },
      },
    },
  }],
  devServer:{ //本地代理
    proxy:{
      '/hehe':{
        target:'https://shopapi.smartisan.com',
        pathRewrite:{
          '^/hehe':''
        },
        changeOrigin:true
      }
    }
  }
};
```

4. 修改package.json中的启动命令

```
"scripts": {
  "start": "craco start",
  "build": "craco build"
},
```



5. 在项目index.js中引入antd.less

> 如果是在App.css中引入，记得将后缀改为less

6. 修改 `src/App.less`，在文件顶部引入 `antd/dist/antd.less`。

```css
@import '~antd/dist/antd.less';
```

7. 重启项目

```
yarn start
```

antd 内建了深色主题和紧凑主题，你可以参照 [使用暗色主题和紧凑主题](https://ant-design.antgroup.com/docs/react/customize-theme-cn#使用暗色主题和紧凑主题) 进行接入。

可以定制的变量列表如下：

```scss
@primary-color: #1890ff; // 全局主色
@link-color: #1890ff; // 链接色
@success-color: #52c41a; // 成功色
@warning-color: #faad14; // 警告色
@error-color: #f5222d; // 错误色
@font-size-base: 14px; // 主字号
@heading-color: rgba(0, 0, 0, 0.85); // 标题色
@text-color: rgba(0, 0, 0, 0.65); // 主文本色
@text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
@disabled-color: rgba(0, 0, 0, 0.25); // 失效色
@border-radius-base: 2px; // 组件/浮层圆角
@border-color-base: #d9d9d9; // 边框色
@box-shadow-base: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
  0 9px 28px 8px rgba(0, 0, 0, 0.05); // 浮层阴影
```

> 同样，你可以使用 [react-app-rewired](https://github.com/timarney/react-app-rewired) 和 [customize-cra](https://github.com/arackaf/customize-cra) 来自定义 create-react-app 的 webpack 配置。

# 8.Axios 封装及 LeanCloud 配置

1. 安装 axios

```
yarn add axios
```

2. 注册并获取 LeanCloud 的配置参数，封装 request.ts

```typescript
import axios from "axios";
const instance = axios.create({
  baseURL: "https://api2204.h5project.cn/1.1",
  headers: {
    "X-LC-Id": "务必使用自己新建的LeanCloud应用ID",
    "X-LC-Key": "务必使用自己新建的LeanCloud应用Key",
    "Content-Type": "application/json",
  },
});
export default instance;
```

3. 封装分类录入 api

```typescript
import request from "@/utils/request";
export interface CategoryType {
  objectId?: string; //类目ID
  cateName: string; //类目名称
  fatherId: string; //父级类目ID
  fatherName?: string; //父级类目名称
}
//新增课程分类
export const categoryPost = (cateObj: CategoryType) => {
  return request.post("/classes/ReactCategory", cateObj);
};
```

# 9.课程分类管理

> 对标用户端 App 名称： NiceDay ，可以在应用商店搜索安装参考

1. 基于 Table、Modal 搭建分类管理主页

```tsx
import { Space, Table, Tag, Row, Col, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import CategoryForm from "./components/CategoryForm";
const Category: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>课程分类管理</Col>
        <Col>
          <Button type="primary">新增分类</Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
      <Modal title="Basic Modal" open={isModalOpen} footer={null}>
        <CategoryForm />
      </Modal>
    </div>
  );
};

export default Category;
```

2. 单独拆分 CategoryForm 弹窗表单组件，完成数据录入请求

```tsx
//  views/Course/components/CategoryForm.tsx
import { Button, Form, Input, Select } from "antd";
import React from "react";
import { categoryPost, CategoryType } from "@/api/course";
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CategoryForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: CategoryType) => {
    console.log(values);
    categoryPost(values).then((res) => {
      console.log(res);
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="cateName" label="类目名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="fatherId" label="父级类目" rules={[{ required: true }]}>
        <Select placeholder="请选择父级类目" allowClear>
          <Option value="0-0">顶级类目</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
```

# 任务

> 参考 step03 分支

1. 侧边双层菜单渲染、路由动态渲染
2. 主题配置 【可选】
3. 使用 Table、Modal、Form 搭建分类管理页
4. 尝试录入基本分类数据

# 10.分类交互完善

> 参考代码：step04-table 分支

## 10.1 Modal 显示控制

1. Modal 的 open 属性控制

```tsx
<Modal
  title="类目管理"
  open={isModalOpen}
  footer={null}
  onCancel={() => {
    setIsModalOpen(false);
  }}
>
  <CategoryForm setIsModalOpen={setIsModalOpen} />
</Modal>
```

2. 在 Form 表单组件中，设定特殊的 props 类型

```tsx
interface IProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>; //声明触发useState变化的set方法类型
}
const CategoryForm: React.FC<IProps> = (props) => {
  props.setIsModalOpen;
};
```

## 10.2 Table 表格基本使用

1. columns 的作用，定义每一列表格渲染格式

```typescript
const columns: ColumnsType<CategoryType> = [
  {
    title: "类目ID",
    dataIndex: "objectId",
    key: "objectId",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "上架状态", //表格头部文字
    dataIndex: "status", //需要跟数据包字段名称对应
    key: "status",
    render: (bool, record, index) => <Switch checked={bool} />,
    // render是格子的自定义渲染函数，
    //  bool：这一格子对应数据，
    //  record：这一行的数据对象，
    //  index：这一行的序号
  },
];
```

2. dataSourse 的作用，渲染表格的数据包，需要跟 columns 有对应关系

```typescript
const data: CategoryType[] = [
  //测试表格
  {
    objectId: "asdfadf",
    cateName: "冥想",
    fatherId: "0-0",
    status: true, //每个字段需要跟columns中的dataIndex对应，才能渲染出来
  },
];
```

3. 表格组件使用

```tsx
<Table columns={columns} dataSource={data} rowKey="objectId" />
```

## 10.3 子类目录入逻辑

1. 父子通信向弹窗表单传递主类目数据

```tsx
<CategoryForm setIsModalOpen={setIsModalOpen} cateList={data} />
```

2. CategoryForm.tsx 组件中渲染主类目 Select 列表

```tsx
interface IProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>; //声明触发useState变化的set方法类型
  cateList: Array<CategoryType>; //1. 接收类目列表数据
}
const CategoryForm: React.FC<IProps> = (props) => {
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="fatherId" label="父级类目" rules={[{ required: true }]}>
        <Select placeholder="请选择父级类目" allowClear>
          <Option value="0-0">顶级类目</Option>
          {/* 2. 列表渲染主类目 */}
          {props.cateList.map(({ objectId, cateName }) => {
            return (
              <Option value={objectId} key={objectId}>
                {cateName}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="status" label="是否上架" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
```

## 10.4 嵌套表格的使用

1. 参考合理的组件库案例 【树形表格数据展示】

   [表格 Table - Ant Design (gitee.io)](https://ant-design.gitee.io/components/table-cn/#components-table-demo-tree-data)

2. 表格默认支持树形数据的展示

> 表格支持树形数据的展示，当数据中有 `children` 字段时会自动展示为树形表格，如果不需要或配置为其他字段可以用 `childrenColumnName` 进行配置。
>
> 可以通过设置 `indentSize` 以控制每一层的缩进宽度。

3. 对加载到的线上分类数据包格式进行处理，实现分类父子嵌套

```tsx
// 通过接口的继承，让Table数据包内支持追加children
interface CategoryTableType extends CategoryType {
  children?: CategoryType[];
}

useEffect(() => {
  categoryGet().then((res) => {
    let arr: CategoryTableType[]; //1.按照类目层级存放类目数据
    let { results } = res.data;
    console.log(results); //处理前,单层数组
    arr = results.filter((item: CategoryTableType) => item.fatherId == "0-0"); //2.找出主类目
    arr.forEach((item: CategoryTableType) => {
      //3.遍历主类目
      let children = results.filter(
        (child: CategoryTableType) => item.objectId == child.fatherId
      );
      item.children = children; //4.向指定主类目下，追加对应的子类目数据
    });
    console.log(arr); //处理后
    setData(arr); //5.处理后，数组每个对象中会携带children
  });
}, []);
```

4. 将带有 children 字段的 data，设置给 Table，即可实现展开效果

```tsx
export interface CategoryType {
  objectId?: string; //类目ID
  cateName: string; //类目名称
  fatherId: string; //父级类目ID
  status: boolean; //上架状态
  fatherName?: string; //父级类目名称
}
interface CategoryTableType extends CategoryType {
  children?: CategoryType[];
}

// 此时，data数据包的格式如下
const [data, setData] = useState<Array<CategoryTableType>>([]);

// 表格采用全新的data数据，自动实现树形效果
<Table columns={columns} dataSource={data} rowKey="objectId" />;
```

## 10.5 更新分类的上架状态

1. 封装 api

```typescript
export const categoryPut = (objectId: string, status: boolean) => {
  return request.put(`/classes/ReactCategory/${objectId}`, { status });
};
```

2. 调用异步请求，更新数据库后，更新本地列表

```tsx
const handleStatus = (record: CategoryType, index: number) => {
  // console.log(record, index);
  let { fatherId, status, objectId } = record;
  categoryPut(objectId, !status).then((res) => {
    if (fatherId == "0-0") {
      //修改父级类目
      data[index].status = !status;
    } else {
      //获取父级类目序号
      let fIdx: number = data.findIndex((item) => item.objectId == fatherId);
      // console.log(fIdx, index);
      data[fIdx].children[index].status = !status;
    }
    // console.log(data);
    setData([...data]);
  });
};
```

# 任务

1. 完善分类弹窗交互
2. 录入子分类
3. Table 表格的基本使用
4. 【拓展】Table 表格嵌套

# 11.课程发布页交互

> 代码参考：step05-upload 分支

## 11.1 图片上传所需知识储备

1. base64 编码

   - 存储图像信息的长字符串

   - base64 的格式特点

     ```
     data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABM
     ```

2. 前端

- Upload 组件

- 生成图片的 base64 编码资源

  ```
     data:image/png;base64,iVBORw0KG...
  ```

- Upload 组件的两种上传方式

  - 通过接口路径上传 action="后端给的图片上传地址"
  - 通过自定义方法上传 customRequest 【此项目选择本方案】

3. LeanCloud

- 安装并初始化 SDK
- 使用 SDK 将本地 base64 图片资源，转化为 LeanCloud 文件资源后，并上传

## 11.2 LeanCloud SDK 使用流程

[SDK 的安装与初始化](https://leancloud.cn/docs/sdk_setup-js.html#hash117588)
[SDK 构建 leancloud 文件资源](https://leancloud.cn/docs/leanstorage_guide-js.html#hash813653189)

1. 安装

   ```
   yarn add leancloud-storage
   ```

2. 封装 config/index.ts 存储公共配置常量

   ```typescript
   // 集中管理常量配置
   export const ID = "自己的LeanCloud空间ID";
   export const KEY = "自己的LeanCloud空间Key";
   export const BASE = "https://api2204.h5project.cn"; //自己的LeanCloud域名，可以是LeanCloud分配的临时域名
   ```

3. 在入口文件 index.tsx 中初始化 LeanCloud 的 SDK

   ```tsx
   import { ID, KEY, BASE } from "@/config/index"; //此文件需要自己定义
   // 初始化LeanCloud的SDK
   AV.init({
     appId: ID,
     appKey: KEY,
     serverURL: BASE,
   });
   ```

4. 在 ImgUpload.tsx 组件中使用 SDK 提供的方法，实现图片的上传

   ```tsx
   //自定义上传函数
   const handleUpload = (info: any): any => {
     // console.log(info);  //1.本地资源
     getBase64(info.file, (base64) => {
       //2.获取base64编码
       // console.log(base64);
       // picture.png 是文件名
       const file = new AV.File("picture.png", { base64 }); //3.构建LeanCloud资源对象
       file.save().then((res: any) => {
         //4.上传资源至LeanCloud
         console.log(res);
         let { url } = res.attributes;
         setImageUrl(url); //5.使用LeanCloud返回的图片链接预览
       });
     });
   };
   ```

## 11.3 使用子父通信，获取图片路径 【不推荐-可以思考】

1. 在 Banner/pub.jsx 中向 ImgUpload 传递一个 handleImg 事件函数

2. 在 ImgUpload.jsx 中上传那图片后，触发 handleImg 函数，并携带图片 url

3. 将图片 url 整合到 Banner/pub.jsx 的表单数据中

4. 将带有真实图片 url 的表单数据，存储至 LeanCloud 数据库

## 11.4 使用 Form 表单提供的方法，提取自定义组件的值

- Form 表单会向内部的自定义组件的 props 注入一些属性
  - onChange 修改自定义组件对于表单的 value 值

    ```javascript
    props.onChange(url); //让表单组件获取到url
    ```

## 11.5 Cascader 级联组件渲染分类

```tsx
const handleCategory = (cateArr: CategoryTableType[]) => {
  // 将分类数据包处理为如下格式
  // [
  //   {
  //     value: "zhejiang",
  //     label: "Zhejiang",
  //     children: [
  //       {
  //         value: "hangzhou",
  //         label: "Hangzhou",
  //       },
  //     ],
  //   },
  // ]
  let arr: CacaderType[] = [];
  cateArr.forEach((item) => {
    //提取主分类
    if (item.fatherId == "0-0") {
      arr.push({
        value: item.objectId,
        label: item.cateName,
        children: [],
      });
    }
  });
  // console.log(arr);
  arr.forEach((item) => {
    cateArr.forEach((child) => {
      if (item.value == child.fatherId) {
        item.children.push({
          value: child.objectId,
          label: child.cateName,
          children: [],
        });
      }
    });
  });
  // console.log(arr);
  setCasOption(arr);
};
useEffect(() => {
  categoryGet().then((res) => {
    handleCategory(res.data.results);
  });
}, []);
```

# 12. 富文本编辑器

## 12.1 Braft

> 参考：step07-braft 分支

[braft](https://braft.margox.cn/) 组件化使用方式，作者很久没维护了，更 React18 不是特别兼容

1. 安装

```
yarn add braft-editor
```

2. 引入使用

```tsx
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";

// 调用
<BraftEditor />;
```

## 12.2 WangEditor

[wangEditor](https://www.wangeditor.com/v4/)   基于 DOM 容器进行初始化使用

> 代码参考：step08-wangEditor 分支

1. 安装

```
npm i wangeditor --save
```

2. RichText.jsx 中引入并初始化

```tsx
import React, { useEffect } from "react";
import E from "wangeditor"; //1.引入
type Props = {};

export default function RichText({}: Props) {
  useEffect(() => {
    // console.log("富文本useEffect");
    const editor = new E("#rich-cont"); //2.创建富文本对象
    editor.create(); //3.生成编辑器面板
    return () => {
      //这个函数会在对应的useEffect下次调用之前调用
      // console.log("userEffect返回函数");
      editor.destroy(); //4. 解决编辑器反复初始化的报错
    };
  }, []);
  return <div id="rich-cont"></div>;
}
```

3. 表单获取富文本内容

```typescript
const editor = new E("#rich-cont");
//失焦事件
editor.config.onblur = function (newHtml: string) {
  console.log("onblur", newHtml); // 获取最新的 html 内容
  props.onChange(newHtml); //让表单获取到富文本内容
};
editor.create();
```

## 12.3 富文本编辑器功能拓展

```
+ 自定义菜单
+ zindex控制
+ 事件监听
+ 图片上传
```

```javascript
import React, { useEffect } from "react";
import E from "wangeditor";
import { IFormComponentProps } from "@/types/course";
import { getBase64 } from "@/utils/tools";
import AV from "leancloud-storage";
export default function RichText(props: any) {
  useEffect(() => {
    // console.log("富文本useEffect");
    const editor = new E("#rich-cont");
    //失焦事件
    editor.config.onblur = function (newHtml: string) {
      console.log("onblur", newHtml); // 获取最新的 html 内容
      props.onChange(newHtml); //让表单获取到富文本内容
    };
    // 配置菜单栏，设置不需要的菜单
    editor.config.excludeMenus = ["code", "video"];
    //自定义图片上传
    editor.config.customUploadImg = function (
      resultFiles: any,
      insertImgFn: any
    ) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      // console.log(resultFiles);
      getBase64(resultFiles[0], (base64) => {
        console.log(base64);
        new AV.File("rich.png", { base64 }).save().then((res: any) => {
          // console.log(res);
          let { url } = res.attributes;
          insertImgFn(url);
        });
      });

      // 上传图片，返回结果，将图片插入到编辑器中
      // insertImgFn(imgUrl)
    };
    editor.create();
    return () => {
      //在此useEffect下次调用之前调用
      // console.log("userEffect返回函数");
      editor.destroy(); //解决编辑器反复初始化的报错
    };
  }, []);
  return <div id="rich-cont"></div>;
}
```

# 13. ProComponent 高级组件

> 代码参考: step09-ProComponent 分支

[文档](https://procomponents.ant.design/)

## 13.1 高级表格基本使用

1. 安装 PropComponent

   ```
   yarn add @ant-design/pro-components
   ```

2. 从 ProComponent 官方获取高级表格组件 TS 代码

   > **<u>！！！craco-antd 主题配置方案，跟 ProComponent 不兼容！！！</u>**
   >
   > ERROR in ./node_modules/@ant-design/pro-provider/es/useStyle/index.js 3:0-30
   > Module not found: Error: Can't resolve 'antd/lib/theme/style' in 'D:\2204H5\React 项目（B 端）\react-admin-ts2204\node_modules\@ant-design\pro-provider\es\useStyle'
   >
   > ERROR in ./node_modules/@ant-design/pro-provider/es/useStyle/index.js 4:0-36
   > Module not found: Error: Can't resolve 'antd/lib/theme' in 'D:\2204H5\React 项目（B 端）\react-admin-ts2204\node_modules\@ant-design\pro-provider\es\useStyle'

3. 解决方案

   ```tsx
   方法1：禁用craco-antd配置，重启项目
   plugins: [
       // {
       //   plugin: CracoAntDesignPlugin, //主题配置
       //   options: {
       //     customizeTheme: {
       //       "@primary-color": "#7546C9",
       //     },
       //   },
       // },
     ],

   方法2：使用less-loader实现主题配置
   ```

4. 注释代码中的 umi-request 相关引用逻辑【后期会使用 axios 请求高级表格数据】

5. 通过调整 columns 配置项，修改表格结构

   ```
     {
        title: "商品名称",
        dataIndex: "name", //跟后端下发的数据包字段对应，才能渲染
        copyable: true,
        ellipsis: true,  //超出显示省略号
        filters: true,  //
        search:true,   //是否作为查询条件
        onFilter: true,
     },
   ```

6. 封装课程的请求 API

   ```typescript
   //课程列表
   export const articleGet = () => {
     return request.get("/classes/ReactAricle");
   };
   ```

7. 需要在 ProTable 组件的 request 配置项中，完成异步数据的请求

- request 内部的三个参数的作用
- request 内部的返回值格式 {data:数据包,success:true}

```javascript
<ProTable
  columns={columns}
  actionRef={actionRef}
  cardBordered
  request={async (params = {}, sort, filter) => {
    //当高级表格相关条件发生变化时，会自动触发request
    console.log(params, sort, filter);
    // 此处的params就是用户在查询表单中指定的字段
    // sort   是点击表格头部的排序按钮提供的数据
    // filter 是点击表格头部的筛选按钮提供的数据
    let res = await articleGet({ ...params }, sort.price);
    return {
      data: res.data.results,
      success: true,
    };
  }}
/>
```

8. 通过调整 request 方法的查询条件，修改表格内容

## 13.2 完善高级表格搜索功能

> 代码参考: step10-course 分支

1. 调整表格columns配置，支持按照是否为vip过滤课程

```typescript
{
    disable: true,
    title: "是否会员课程",
    dataIndex: "isvip",
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: "select",
    render: (bool, record) => {
      console.log("record值", record);
      return record.isvip ? "会员课程" : "免费课程";
    },
    valueEnum: {
      true: {
        text: "会员课程",
        status: "Success",
      },
      false: {
        text: "免费课程",
        status: "Error",
      },
    },
},
```

2. 调整表格request传参

```tsx
<ProTable<ArticleType>
    columns={columns}
    actionRef={actionRef}
    cardBordered
    request={async (params = {}, sort, filter) => {
        console.log("params", params);
        console.log("filter", filter);
        console.log("sort", sort);
        let res = await articleGet(params as IArticleParams);
        return {
            data: res.data.results,
        };
    }}
/>
```

3. 修改api异步请求方法

```typescript
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
    condition.isvip = isvip == "true" ? true : false;
  }
  let cond = JSON.stringify(condition);
  return request.get(`/classes/ReactAricle?where=${cond}`);
};

```

## 13.3 课程编辑功能

1. 复用课程发布页，作为课程编辑页结构ArticleEdit.tsx
2. 配置路由，通过hidden属性隐藏侧边菜单显示

```typescript
{
    key: "/course/edit",
    label: "课程编辑",
    title: "课程编辑",
    element: <ArticleEdit />,
    hidden: true,
},
```

3. 列表页通过query-string处理并传递search数据

> 如果考虑性能问题，也可以把columns配置项置于组件内部，然后通过编程式导航去传递search，这样只有当用户点击的时候才会执行qs.stringify，节省一定的渲染性能

```tsx
{
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <Link to={`/course/edit?${qs.stringify(record)}`}>编辑</Link>,
      <a target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>
    ],
  },
```

4. 编辑页数据初始化渲染

> 需要使用setFildsValue、useLayoutEffect(保证富文本渲染正常)

```tsx
import ImgUpload from "@/components/ImgUpload";
import { Button, Cascader, CascaderProps, Form, Input, Switch } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { articlePost, categoryGet, articlePut } from "@/api/course";
import { CategoryTableType, ArticleType } from "@/types/course";
import RichText from "@/components/RichText";
import { useLocation } from "react-router-dom";
import qs from "query-string";
const { TextArea } = Input;

interface CacaderType {
  value: string;
  label: string;
  children: CacaderType[];
}
const ArticleEdit: React.FC = () => {
  const location = useLocation();
  const [casOption, setCasOption] = useState<Array<CacaderType>>([]);
  const [form] = Form.useForm(); //1. 获取表单对象
  let initData = qs.parse(location.search);
  useLayoutEffect(() => { //4. 此处使用useLayoutEffect，保证富文本渲染正常
    form.setFieldsValue(initData); //3.为表单设置默认值
  }, []);
  const handleSubmit = (values: ArticleType) => {
    let [catelv1, catelv2] = values.category;
    values.catelv1 = catelv1; //单独存放主分类id
    values.catelv2 = catelv2; //单独存放子分类id
    articlePut(initData.objectId as string, values).then((res) => {
      console.log(res);
    });
  };
  return (
    <Form
      onFinish={handleSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      form={form}  //2. 绑定表单
    >
      ...
    </Form>
  );
};

export default ArticleEdit;

```



3. 请求api接口修改后端课程数据

```typescript
//课程更新
export const articlePut = (objectId: string, artObj: ArticleType) => {
  return request.put(`/classes/ReactAricle/${objectId}`, artObj);
};
```



## 任务

1. 完成图片上传组件的封装

2. 完成富文本编辑器的使用

3. 会使用 ProComponent 高级组件

4. 完善课程列表相关交互

# 14. 登录功能

## 14.1 搭建 Login 面板

- Row Col
- Card
- Form

## 14.2 登录状态分析

```
记录用户登录状态的数据包
{
  isLogin:false,  //表达用户登录状态
  isLoading:false,  //控制登录交互
  userInfo:null  //存储用户信息
}
```

1. 默认状态

```
{
  isLogin:false,
  isLoading:false,
  userInfo:null
}
```

2. 开始登录 LOGIN_START

```
{
  isLogin:false,
  isLoading:true,
  userInfo:null
}
```

3. 登录成功 LOGIN_SUCCESS

```
{
  isLogin:true,
  isLoading:false,
  userInfo:用户信息数据对象
}
```

4. 登录失败 LOGIN_FAIL

```
{
  isLogin:false,
  isLoading:false,
  userInfo:null
}
```

## 14.3 集成状态管理器 RTK

1. RTK 基本使用流程回顾

   - 安装
   - 定义 store
     - createSlice
     - configureStore
   - Provider 注入
   - 使用
     - useSelector 提取数据
     - useDispatch 触发变化
2. 安装

```
yarn add @reduxjs/toolkit react-redux
```

3. 创建store/modules/user.ts模块

```typescript
import { IUserParams } from "./../../api/user";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { userLogin } from "@/api/user";
import { NavigateFunction } from "react-router-dom";
export interface UserStateType {
  isLogin: boolean;
  isLoading: boolean;
  userInfo: Object | null;
}
let initialState: UserStateType = {
  isLogin: false,
  isLoading: false,
  userInfo: null,
};
//尝试提取本地存储数据
let uinfo = localStorage.getItem("userInfo");
if (uinfo) {
  initialState.isLogin = true;
  initialState.userInfo = JSON.parse(uinfo);
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //开始登录
    loginStart(state) {
      state.isLoading = true;
    },
    //登录成功
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isLogin = true;
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); //本地存储
    },
    //登录失败
    loginFail(state) {
      state.isLoading = false;
      state.isLogin = false;
      state.userInfo = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFail } = userSlice.actions;

//异步请求
export const userLoginAsync = (
  dispatch: Dispatch,
  params: IUserParams,
  navigate: NavigateFunction
) => {
  dispatch(loginStart()); //开始登录
  console.log("开始登录");
  setTimeout(() => {
    //测试登录流程效果
    userLogin(params)
      .then((res) => {
        console.log("登录成功", res);
        dispatch(loginSuccess(res.data)); //登录成功
        navigate("/");
      })
      .catch((err) => {
        dispatch(loginFail()); //登录失败
        console.log("登录成功", err);
      });
  }, 1000);
};

export default userSlice.reducer;

```

4. 创建 store

```typescript
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

```

1. 在 index.tsx 入口文件中，Provider 注入

```tsx
...
import { Provider } from "react-redux";  
import store from "./store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
```



## 14.4 登录功能实现

1. 点击【登录】按钮后，让登录面板进入 Loading 状态

   - Spin

   - 状态机中的 isLoading 控制 Spin

```tsx
import { useSelector, useDispatch } from "react-redux";
import { userLoginAsync } from "@/store/modules/user"; //1.引入异步action方法
import { RootState } from "@/store";  //2. 状态机state数据类型
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const { isLoading } = useSelector((state: RootState) => state.user); //3.提取状态机数据
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    userLoginAsync(dispatch, values, navigate); //5. 触发状态机异步请求
  };
  return (
    <Row justify="center" align="middle" className="login-cont">
      <Col span={8}>
        // 4. 使用状态机提供的isLoading控制Spin状态
        <Spin spinning={isLoading}>
          <Card title="知识付费管理平台">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={initData}
              onFinish={onFinish}
            >
            	...
            </Form>
          </Card>
        </Spin>
      </Col>
    </Row>
  );
};

export default Login;

```



2. 通过异步 action 控制登录流程

```typescript
//异步请求
export const userLoginAsync = (
  dispatch: Dispatch,
  params: IUserParams,
  navigate: NavigateFunction
) => {
  dispatch(loginStart()); //1. 开始登录
  console.log("开始登录");
  setTimeout(() => {
    //测试登录流程效果
    userLogin(params)
      .then((res) => {
        console.log("登录成功", res);
        dispatch(loginSuccess(res.data)); //2. 登录成功
        navigate("/");
      })
      .catch((err) => {
        dispatch(loginFail()); //3. 登录失败
        console.log("登录成功", err);
      });
  }, 1000);
};
```



## 14.5 登录成功的后续逻辑

1. 封装guard/RequireAuth.tsx守卫组件

```tsx
import React from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "@/layout";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
type Props = {};

export default function RequireAuth({}: Props) {
  const { isLogin } = useSelector((state: RootState) => state.user);
  return <>{isLogin ? <MainLayout /> : <Navigate to="/login" />}</>;
}

```



2. 在 App.tsx 中使用守卫组件

```tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import { renderRoutes } from "@/router/utils";
import { mainRoutes } from "@/router/index";
import RequireAuth from "./guard/RequireAuth";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RequireAuth />}>
          {renderRoutes(mainRoutes)}
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;

```



3. 登录成功后，在 store/modules/user.ts中触发路由跳转

```typescript
userLogin(params)
    .then((res) => {
    console.log("登录成功", res);
    dispatch(loginSuccess(res.data)); //登录成功
    navigate("/");  //触发路由跳转
})
```



4. 处理刷新后，登录状态丢失的问题

```typescript
// 2. 尝试提取本地存储数据
let uinfo = localStorage.getItem("userInfo");
if (uinfo) {
  initialState.isLogin = true;
  initialState.userInfo = JSON.parse(uinfo);
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //登录成功
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isLogin = true;
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // 1. 本地存储
    },
  },
});
```



## 14.6 使用第三方模块操作本地存储

[文档](https://www.npmjs.com/package/store2)

```
// Store current user
store.set('user', { name:'Marcus' })

// Get current user
store.get('user')

// Remove current user
store.remove('user')
```

# 15 个人账号相关功能完善

## 15.1 退出登录

1. 搭建顶部导航栏的下拉菜单
   [参考组件](https://ant-design.gitee.io/components/dropdown-cn)

2. 在下拉菜单中显示当前用户名称

```
const { userInfo } = useSelector((state: RootState) => state.user);
```

3. 退出登录功能
   > 复用状态机 user.ts 模块中的 loginFail 方法

```
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //登录失败、退出登录
    loginFail(state) {
      state.isLoading = false;
      state.isLogin = false;
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});
```

## 15.2 记住密码

> 勾选记住密码：使用 localStorage 进行持久存储
> 未勾选记住密码：使用 sessionStorage 进行会话存储

1. 如何判断是否记住密码

   > 让状态机做本地存储操作时，拿到勾选状态

2. 调整登录异步 action
   > 异步 action 的 params 参数中，可以拿到表单提交的 remember

```
export const userLoginAsync = (
  dispatch: Dispatch,
  params: IUserParams,
  navigate: NavigateFunction
) => {
  dispatch(loginStart()); //开始登录
  console.log("开始登录");
  setTimeout(() => {
    //测试登录流程效果
    userLogin(params)
      .then((res) => {
        console.log("登录成功", res);
        dispatch(loginSuccess({ info: res.data, remember: params.remember })); //登录成功，传递remember
        navigate("/");
      })
      .catch((err) => {
        dispatch(loginFail()); //登录失败
        console.log("登录成功", err);
      });
  }, 1000);
};
```

3. 修改同步 action 方法 loginSuccess 逻辑

```
loginSuccess(state, action) {
  state.isLoading = false;
  state.isLogin = true;
  state.userInfo = action.payload;
  console.log("登录成功", action);
  let { info, remember } = action.payload;
  if (remember) {
    localStorage.setItem("userInfo", JSON.stringify(info)); //持久存储
  } else {
    sessionStorage.setItem("userInfo", JSON.stringify(info)); //会话存储
  }
},
```

4. 刷新后提取本地存储的逻辑调整

```
//尝试提取本地存储数据
let uinfo =
  localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
if (uinfo) {
  initialState.isLogin = true;
  initialState.userInfo = JSON.parse(uinfo);
}
```

## 15.3 个人设置

1. 表单结构搭建
2. useSelector 封装

```
// src/store/hook.ts 自定义useSelector 以及 useDispatch 避免后续组件使用时需要单独引入每一次 js不需要
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./index";

// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch; // () => AppDispatch 代表返回的是一个函数
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // TypedUseSelectorHook<RootState> 类型注解
// 以后组件中不要再单独使用 useSelector, useDispatch，使用useAppSelector 以及useAppDispatch 代替

```

3. 用户默认内容显示

```
const Setting: React.FC = () => {
  const [form] = Form.useForm();  //1.获取表单对象
  // const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const { userInfo } = useAppSelector((state) => state.user); //提前封装自定义Hook，并指定state类型
  useEffect(() => {
    form.setFieldsValue(userInfo); //3. 为表单设置默认数据
  }, []);
  return (
    <Form
      onFinish={handleSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      form={form}  //2. 绑定表单对象
    >
    </Form>
  );
}
```

4. 看懂用户更新接口

```curl -X PUT \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "X-LC-Session: qmdj8pdidnmyzp0c7yqil91oc" \
  -H "Content-Type: application/json" \
  -d '{"phone":"18600001234"}' \
  https://API_BASE_URL/1.1/users/55a47496e4b05001a7732c5f
```

5. 更新 api 接口封装

```
export interface UserUpdateFormType {
  username: string;
  avatar: string;
  nickname: string;
}

//用户信息更新
export const userUpdate = (objectId: string, params: UserUpdateFormType) => {
  // console.log(request);
  return request.put(`/users/${objectId}`, params);
};

```

6. 为 axios 添加拦截器，并在拦截器中配置 session 请求头

```
import axios, { AxiosRequestConfig } from "axios";
import { ID, KEY, BASE } from "@/config";
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
    console.log("请求拦截器", config);
    let uinfo =
      localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
    if (uinfo) {
      config.headers["X-LC-Session"] = JSON.parse(uinfo).sessionToken;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default instance;

```

7. 在组件中发起更新请求

## 15.4 个人信息本地同步

> 核心思路是复用状态机 user.ts 中的 loginSuccess 实现本地信息同步

1. 调整状态机逻辑代码

```
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //登录成功
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isLogin = true;
      // console.log("登录成功", action);
      let { info, remember } = action.payload;
      state.userInfo = info;
      localStorage.setItem("remember", remember); //1. 记录用户本地存储位置
      if (remember) {
        localStorage.setItem("userInfo", JSON.stringify(info)); //持久存储
      } else {
        sessionStorage.setItem("userInfo", JSON.stringify(info)); //会话存储
      }
    },
    //登录失败、退出登录
    loginFail(state) {
      state.isLoading = false;
      state.isLogin = false;
      state.userInfo = null;
      localStorage.removeItem("userInfo");  //2. 清除所有本地、会话存储内容
      sessionStorage.removeItem("userInfo");
    },
  },
});

```

2. 在 Setting/index.tsx 中触发 loginSuccess 并传递相应的值

```
const handleSubmit = (values: UserUpdateFormType) => {
  userUpdate(userInfo?.objectId as string, values).then((res) => {
    let remember = eval(localStorage.getItem("remember") as string); //需要保证数据未布尔值类型
    console.log("remember", remember);
    dispatch(
      loginSuccess({
        info: { ...userInfo, ...values }, //更新用户信息
        remember,  //决定信息更新的位置：本地存储或会话存储
      })
    );
  });
};
```

# 16 设置面包屑导航

> 代码参考： step13-breadcrumb 分支

## 16.1 参考文档

通过案例项目，得知 面包屑组件应该包含在 页面的头部 https://vvbin.cn/next/#/feat/breadcrumb/flat

参照组件库的面包屑 https://ant-design.gitee.io/components/breadcrumb-cn/#components-breadcrumb-demo-react-router

## 16.2 设置面包屑导航

面包屑组件实现思路分析

```ts
/**
面包屑导航映射表
/: 系统首页
/banner: 轮播图管理
/banner/home： 首页轮播图
/banner/active: 活动页轮播图
/banner/add: 添加轮播图
/pro: 产品管理
/pro/list: 产品列表
/pro/list/home: 首页产品列表
/pro/list/detail: 详情推荐列表
/pro/list/cart: 购物车推荐列表
**/

// 如果将上述的映射表 放到一个对象中，可以通过地址栏的pathname属性 获取相应的 该对象的key值即可得到 对应的value值
如果当前用户访问的路由 /banner/home
面包屑导航应该显示：/轮播图管理/首页轮播图
// src/layout/components/AppBreadcrumb.tsx

interface IAppBreadcrumbProps {}
const breadcrumbNameMap: Record<string, string> = {}; //1. 存放面包屑映射数据包
const getBreadcrumbData = (menus: IMenuProps[]) => {
  //2. 将路由数据包转为面包屑映射数据包的方法
  menus.forEach((item) => {
    if (item.children) {
      breadcrumbNameMap[item.key] = item.label;
      getBreadcrumbData(item.children);
    } else {
      breadcrumbNameMap[item.key] = item.label;
    }
  });
};
getBreadcrumbData(menus);
const AppBreadcrumb: FC<IAppBreadcrumbProps> = () => {
  const location = useLocation();
  // /pro/list/cart
  const pathSnippets = location.pathname.split("/").filter((i) => i); // ['pro', 'list', 'cart']  //3. 将当前用户所访问的路径，通过/切割为数组
  console.log(pathSnippets);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    //4. 生成面包屑元素
    // url /
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    console.log(url); // /pro  /pro/list /pro/list/cart
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    location.pathname === "/" ? null : (
      <Breadcrumb.Item key="home">
        <Link to="/">系统首页</Link>
      </Breadcrumb.Item>
    ),
  ].concat(extraBreadcrumbItems);

  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

export default AppBreadcrumb;
```

## 16.3 调用面包屑组件

使用新封装的面包屑组件替换原来的面包屑组件，尽可能不动原来的布局

> AppContent.tsx 组件中调用

```tsx
import React from "react";
import { Breadcrumb, Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppBreadcrumb from "./AppBreadcrumb";
const { Content } = Layout;
type Props = {};

export default function AppContent({}: Props) {
  return (
    <Content style={{ margin: "0 16px" }}>
      {/* 静态面包屑 */}
      {/* <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb> */}
      {/* 动态面包屑 */}
      <AppBreadcrumb />
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <Outlet />
      </div>
    </Content>
  );
}
```

# 17 . 角色管理

> 参考代码：step15-role分支

## 17.1 角色的新增

1. 角色概念及作用

   > 设定一个带有可修改的菜单访问权限的信息字段
   > 管理员：课程发布、个人设置
   > 设定角色可以更加方便的控制每个账户对于平台的访问权限

2. 角色管理面板搭建
3. 角色字段分析

   - 角色名称 roleName
   - 角色级别 roleLevel
   - 菜单权限 tree
   - 被勾选的菜单 checkedKeys

4. 将勾选的菜单数据处理为 tree 结构

```
checkedNodes  处理前

{key: '/dashboard', label: '数据统计', title: '数据统计', icon: {…}, element:
{key: '/course/category', label: '课程分类', title: '课程分类', element: {…}}
{key: '/course/artlist', label: '图文课程', title: '图文课程', element: {…}}
{key: '/course/artpub', label: '图文发布', title: '图文发布', element: {…}, hidden: true}
{key: '/manager/user', label: '账号管理', title: '账号管理', element: {…}}
{key: '/manager/role', label: '角色管理', title: '角色管理', element: {…}}
{key: '/manager', label: '系统管理', title: '系统
checkedNodes  整理后

{
  key:'/course',
  label:'课程管理',
  children:[
    {key: '/course/category', label: '课程分类', title: '课程分类', element: {…}}
    {key: '/course/artlist', label: '图文课程', title: '图文课程', element: {…}}
    {key: '/course/artpub', label: '图文发布', title: '图文发布', element: {…}, hidden: true}
  ]
}

```

5. 为方便过滤，需要在路由数据包中，给没有子菜单的路由，追加 nochild
   > 或者添加别的判断依据

```
{
  key: "/dashboard",
  label: "数据统计",
  title: "数据统计",
  icon: <AreaChartOutlined />,
  element: <DashBoard />,
  nochild:1   //代表当前菜单没有子菜单
},
```

6. 勾选数据整理的逻辑代码

```typescript
const handleTreeCheck = (checkedKeys: any, e: any) => {
    // console.log(checkedKeys, e);
    // let { checkedNodes } = e;
    let tempList: Array<string> = []; //临时记录父级的label
    let result: Array<any> = []; //1. 记录最终处理后的被勾选的树形数据
    let checkedNodes = e.checkedNodes.filter((item: IMenuProps) => {
      if (item.nochild) {
        let { key, label, title, nochild, hidden } = item;
        result.push({ key, label, title, nochild, hidden }); //提取被勾选切没有子菜单的主菜单
      }
      return !item.children && !item.nochild; //过滤得到拿到所有被勾选的子菜单
    });
    checkedNodes.forEach((item: IMenuProps) => {
      let parent: any = mainRoutes.find((itm: IMenuProps) => {
        return itm.children
          ? itm.children.some((child: IMenuProps) => item.label == child.label)
          : false;
      });
      // console.log("父级", parent);
      let { key, label, title, nochild, hidden } = item;
      let treeItem = { key, label, title, nochild, hidden };  //不存放组件对象，避免后续用tree渲染侧边栏出问题
      if (!tempList.includes(parent?.label)) {
        // 第一次找到勾选元素的父级
        tempList.push(parent.label);
        result.push({
          key: parent.key,
          label: parent.label,
          title: parent.title,
          children: [treeItem],
        });
      } else {
        //有相同父级的勾选元素
        let myParent: any = result.find(
          (res: IMenuProps) => res.label == parent.label
        );
        if (myParent.children) {
          myParent.children.push(treeItem);
        }
      }
    });
    // console.log("找到的父级label", tempList);
    // console.log("处理结果", result);
    setTree(result);
    setCheckedKeys(checkedKeys);
  };
```

7. 录入角色数据

## 17.2 角色编辑

1. 编辑时需要在 Drawer 向编辑组件传入待编辑的数据

- 编辑按钮

```
{
  title: "操作",
  render(text, record, index) {
    return (
      <Space>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            setEditRole(record);  //传递被编辑数据
            setIdx(index); //记录被编辑下标
            setOpen(true);
          }}
        >
          编辑
        </Button>
        <Button type="primary" size="small" danger>
          删除
        </Button>
      </Space>
    );
  },
},
```

- 组件调用

```
<Drawer title="新增角色" placement="right" onClose={onClose} open={open}>
    {open ? (
      <RoleForm handleTableUpdate={handleTableUpdate} editRole={editRole} />
    ) : (
      ""
    )}
  </Drawer>
```

2. 在 views/Manager/components/RoleForm.tsx 组件中渲染被编辑数据

```
useEffect(() => {
  console.log("角色表单", props.editRole);
  if (props.editRole) {
    form.setFieldsValue(props.editRole);
  }
}, []);
```

3. 在点击 RoleForm.tsx 的提交按钮时，需要区分新增、编辑

```
const onFinish = (values: IRoleParams) => {
  values.tree = tree;
  values.checkedKeys = checkedKeys;
  // console.log(values);
  if (!props.editRole) {
    //新增
    rolePost(values).then((res) => {
      props.handleTableUpdate({ ...values, objectId: res.data.objectId }, 1); //将表单数据给到表格
    });
  } else {
    //修改
    rolePut(props.editRole?.objectId, values).then((res) => {
      props.handleTableUpdate(
        { ...values, objectId: props.editRole?.objectId },
        2
      );
    });
  }
};
```

4. 在 Role.tsx 角色列表中，根据新增、编辑，更新列表数据

```
const handleTableUpdate = (roleObj: IRoleParams, type: 1 | 2) => {
  //为表格追加新数据、修改数据
  console.log(roleObj);
  if (type === 1) {
    setData([...data, roleObj]); //新增
  } else {
    data[idx] = roleObj; //修改
    setData([...data]);
  }
  //关闭遮罩
  setOpen(false);
};
```

## 17.3 删除角色

1. 封装api

```typescript
//角色删除 api/user.ts
export const roleDel = (objectId: string) => {
  return request.delete(`/classes/ReactRole/${objectId}`);
};
```



2. 使用Popconfirm组件做删除确认

```json
// views/Manager/Role.tsx
{
      title: "操作",
      render(text, record: IRoleParams, index) {
        return (
          <Space>
            <Popconfirm
              title="确定不是手抖点错?"
              onConfirm={() => {
                confirm(record, index);
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary" size="small" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
},
```



3. 触发删除操作

```typescript
// views/Manager/Role.tsx
const confirm = (record: IRoleParams, index: number) => {
    console.log("点了确认");
    roleDel(record.objectId).then((res) => {
        data.splice(index, 1);
        setData([...data]);
    });
};
```



## 17.4 批量删除角色

1. 看懂批量操作接口

```
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "Content-Type: application/json" \
  -d '{
        "requests": [
          {
            "method": "DELETE",
            "path": `/1.1/classes/ReactRole/${objectId}`
          }
        ]
      }' \
  https://API_BASE_URL/1.1/batch
```



2. 封装批量删除api

```typescript
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
```



2. 勾选时存储待删除的数据包、待删除的数据序号

```tsx
//1. 需要在初始化数据包的时候，为每一个包追加一个key字段
useEffect(() => {
    roleGet().then((res) => {
        let { results } = res.data;
        results.forEach((item: IRoleParams, index: number) => {
            item.key = index;
        });
        setData(results);
    });
}, []);


//2. 剔除表格的rowKey配置，让它使用数据包中的key
<Table rowSelection={rowSelection} columns={columns} dataSource={data} />

//3. 勾选事件触发时，记录数据包、序号包
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any,
    info: any
  ) => {
    console.log(
      "selectedRowKeys changed: ",
      newSelectedRowKeys,
      selectedRows,
      info
    );
    setSelectedRowKeys(newSelectedRowKeys); //记录被勾选行的序号
    setSelectedRows(selectedRows); //记录被勾选行的数据包，为了拿到objectId
  };
```



2. 触发批量删除操作

```typescript
//批量删除操作
const handleBatchDel = () => {
    roleBatchDel(selectedRows).then((res) => {
        for (let i = data.length - 1; i >= 0; i--) {  //必须采用倒序删除
            if (selectedRowKeys.includes(i)) {
                data.splice(i, 1);
            }
        }
        setData([...data]);
    });
};
```



# 18 账号管理

## 18.1 账号分配

1. 复用角色页面，快速搭建账号管理页
2. 改造UserForm.tsx并完成角色列表的渲染

```tsx
<Form.Item name="roleidx" label="账号角色">
    <Select>
        {roleList.map((item, index) => {
            return (
                <Option value={index} key={item.objectId}>
                    {item.roleName}
                </Option>
            );
        })}
    </Select>
</Form.Item>
```

3. 看懂账号账号注册接口

[存储 REST API 使用指南 - LeanCloud 文档](https://leancloud.cn/docs/rest_api.html#hash885156)

```
curl -X POST \
  -H "X-LC-Id: {{appid}}" \
  -H "X-LC-Key: {{appkey}}" \
  -H "Content-Type: application/json" \
  -d '{"username":"tom","password":"f32@ds*@&dsa","phone":"18612340000"}' \
  https://API_BASE_URL/1.1/users
```

4. 封装分配账号的api

```typescript
//分配账号【本质是代别人注册】
export interface IUserRegParams extends IUserParams {
  roleid: string;
  rolename: string;
  roleidx: number;
}
export const userReg = (params: IUserRegParams) => {
  return request.post("/users", params);
};
```

5. 触发账号分配请求

```typescript
const onFinish = (values: IUserRegParams) => {
    let { objectId, roleName } = roleList[values.roleidx];
    values.roleid = objectId;  //追加角色id
    values.rolename = roleName; //追加角色名称
    console.log(values);
    userReg(values);
};
```

## 18.2 账号列表渲染

1. 封装api

```typescript
//账号列表
export const userGet = () => {
  return request.get("/users");
};
```

1. 渲染表格数据

```tsx
useEffect(() => {
    userGet().then((res) => {
        setData(res.data.results);
    });
}, []);
```





# 19 角色权限控制

> 参考代码：step16-permission分支

## 19.1 侧边菜单渲染控制

> 此处要注意，在录入角色的时候，角色tree数据包中不能有icon、element等组件对象信息，否则直接渲染会异常。

1. 调整角色列表请求api，支持按id查询单个角色

```typescript
//角色列表
export const roleGet = (roleid: string = "") => {
  let id = roleid ? `/${roleid}` : "";
  return request.get(`/classes/ReactRole${id}`);
};
```



2. 调整用户登录异步请求，在用户信息数据包中，追加角色数据

```typescript
//异步请求
export const userLoginAsync = (
  dispatch: Dispatch,
  params: IUserParams,
  navigate: NavigateFunction
) => {
  dispatch(loginStart()); //开始登录
  setTimeout(() => {
    //测试登录流程效果
    userLogin(params)
      .then(async (res) => {
        console.log("登录成功", res);
        let role = await roleGet(res.data.roleid); //1.根据登录后得到的角色id，获取角色数据，如果后端支持联表查询，这个请求可以省略。
        console.log("角色数据包", role);
        dispatch(
          loginSuccess({
            info: { ...res.data, roleData: role.data },  // 2. 此处追加角色信息
            remember: params.remember,
          })
        ); //登录成功
        navigate("/");
      })
      .catch((err) => {
        dispatch(loginFail()); //登录失败
        console.log("登录成功", err);
      });
  }, 1000);
};
```

3. 整合后的用户信息格式如下

```json
{
    "sessionToken":"nmm5t9jrfura5guhzwfhfdjyx",
    "updatedAt":"2022-11-23T08:42:24.847Z",
    "roleid":"637ddc2160195e6845b3133b",  //1. 角色id，用来加载角色其他信息
    "objectId":"637ddcf01d35662164c07eeb",
    "username":"小老板",
    "shortId":"nwvsft",
    "createdAt":"2022-11-23T08:42:24.847Z",
    "emailVerified":false,
    "rolename":"管理员",  //2. 角色名称，可以用来做按钮级别的权限判断
    "roleidx":1,
    "mobilePhoneVerified":false,
    "roleData":{  // 3. 从角色表中加载的详细角色信息
        "roleName":"管理员",
        "updatedAt":"2022-11-23T08:38:57.848Z",
        "tree":[   //4. 可以直接用做侧边菜单的渲染
            {
            "key":"/dashboard",
            "label":"数据统计",
            "title":"数据统计",
            "nochild":1
            }
        ],
        "createdAt":"2022-11-23T08:38:57.848Z",
        "checkedKeys":["/dashboard","/course"],  //5. 可以作为白名单，控制路由访问
        "roleLevel":2,
        "objectId":"637ddc2160195e6845b3133b"
    }
}
```



3. 在AppSider.tsx侧边菜单中，使用当前登录的用户角色tree数据渲染菜单

```typescript
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { mainRoutes } from "@/router/index";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
const { Sider } = Layout;
type MenuEventType = {
  key: string;
  keyPath: Array<string>;
};
export default function AppSider() {
  const [collapsed, setCollapsed] = useState(false);
  const roleData = useAppSelector((state) => state.user.userInfo?.roleData);  //1. 提取状态机中的角色数据
  const navigate = useNavigate();
  const handleMenu = (obj: MenuEventType) => {
    console.log(obj);
    navigate(obj.key);
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo">知识付费平台</div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={roleData!.tree}   //2. 使用角色数据渲染侧边菜单
        onClick={handleMenu}
      />
    </Sider>
  );
}

```

## 19.2 通过白名单控制路由访问权限

> 在AppContent.tsx中通过白名单判断控制路由

```tsx
import React from "react";
import { Breadcrumb, Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import AppBreadcrumb from "./AppBreadcrumb";
import { useAppSelector } from "@/store/hooks";
const { Content } = Layout;
type Props = {};

export default function AppContent({}: Props) {
  //1. 获取状态机中的路由白名单
  let whiteList: Array<string> = useAppSelector(
    (state) => state.user.userInfo!.roleData.checkedKeys
  );
  let { pathname } = useLocation(); //2. 获取当前用户访问的路由
  return (
    <Content style={{ margin: "0 16px" }}>
      {/* <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb> */}
      <AppBreadcrumb />
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
		{/* 3 .通过白名单控制访问权限*/}
        {whiteList.includes(pathname) ? <Outlet /> : "没有权限"}
      </div>
    </Content>
  );
}

```

## 19.3 按钮级别的权限控制

> 例如：控制【管理员】可以访问图文课程页面，但是不能访问课程列表的编辑按钮

```tsx
let rolename = ""; //1. 当前用户的角色名称，变量提升

{
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      //3. 使用角色名称控制按钮访问权限
      rolename == "超级管理员" ? (
        <Link to={`/course/edit?${qs.stringify(record)}`}>编辑</Link>
      ) : (
        ""
      ),
      <a target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: "copy", name: "复制" },
          { key: "delete", name: "删除" },
        ]}
      />,
    ],       
  },
];
  
  
 export default () => { 
     // 2. 提取状态机中的角色名称
 	rolename = useAppSelector((state) => state.user.userInfo!.rolename);
 }
```





# 20. 数据可视化图表

[Apache ECharts](https://echarts.apache.org/zh/index.html)

## 20.1 Echarts基本使用

[在项目中引入 ECharts - 入门篇 - Handbook - Apache ECharts](https://echarts.apache.org/handbook/zh/basics/import)

1. 安装

```
npm install echarts --save
```

2. 使用官方示例渲染基础图表

```typescript
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
```



## 20.2 自定义配置

> 通过本地模拟data数据，体验图表变化

```typescript
let xdata = [];
let ydata = [];
for (let i = 9; i <= 17; i++) {
  xdata.push(i);
  ydata.push(Math.round(Math.random() * 800 + 200));
}
export default {
  title: {
    text: "在线学习人数",
  },
  grid: {
    width: "70%",
  },
  tooltip: {},
  xAxis: {
    data: xdata,
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: ydata,
    },
  ],
};

```



## 20.3 自定义随机数据

> 这里通过自定义模拟数据算法，实现自定义折线图的呈现效果。
>
> 实际项目中，数据会有专门的后端数据统计接口下发。

```typescript
let x = []
let data1 = []
let data2 = []
let j=3
for(let i=8;i<=24;i+=2){
  let n = i<10 ? `0${i}` : i
  x.push(n)
  let m = 0
  let f = Math.round(Math.random()*10000)
  if(j%3 == 1){
    m = f
  }
  if(j%3 == 2){
    m = -f
  }
  // 0  1 2    3 4 5    6 7 8   9  10 11
  // 0 m -m   0 m -m
  data1.push(30000+m)
  data2.push(30000-m)
  j++
}
export default {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: x
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      // stack: 'Total',   //【！！注意！！】一定要注释这一项，否则数据显示会异常
      data: data1,
      smooth: true,
      symbol: 'none',  //控制线上的指示点
      lineStyle: {   //控制线条样式
        color: '#2879FF',
        width: 3
      },
    },
    {
      name: 'Video Ads',
      type: 'line',
      // stack: 'Total',    //【！！注意！！】一定要注释这一项，否则数据显示会异常
      data: data2,
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#F6AE07',
        width: 3
      },
    }
  ]
};
```



## 20.4使用后端接口数据控制图表

> 这里通过请求LeanCloud提供的计数接口，统计不同分类的课程数量占比。
>
> 真实项目中，数据的统计由后端整理好后通过一个数据接口统一下发。

1. 看懂LeanCloud的【对象计数】接口

[存储 REST API 使用指南 - LeanCloud 文档](https://leancloud.cn/docs/rest_api.html#hash737098615)

```
curl -X GET \
  -H "X-LC-Id: PhooC2pGuFn5MkTPdTRn7O99-gzGzoHsz" \
  -H "X-LC-Key: 4x587AuiHPH0eZspQnvR5qaH" \
  -G \
  --data-urlencode 'where={"pubUser":"官方客服"}' \
  --data-urlencode 'count=1' \
  --data-urlencode 'limit=0' \
  https://API_BASE_URL/1.1/classes/Post
```

2. 根据计数接口，封装api

```typescript
//按照分类统计课程数
export const chartGet = (catelv1: string) => {
  return request.get(
    `/classes/ReactAricle?where={"catelv1":"${catelv1}"}&count=1&limit=0`
  );
};

```

3. 同步请求得到计数结果后，再配置饼状图的option

```typescript
(async () => {
    var pieChart = echarts.init(
        document.getElementById("pie") as HTMLDivElement
    );
    // 1. 同步请求数据接口
    let res1 = await chartGet("63743fa51d35662164b31ad1"); //正念冥想
    let res2 = await chartGet("63743fb01d35662164b31adc"); //睡眠助手
    let res3 = await chartGet("63743fb760195e6845a5af15"); //舒缓音乐
    console.log(res1, res2, res3);
    // 2. 将得到的数据，赋值给指定的options配置
    pie.series[0].data[0].value = res1.data.count;
    pie.series[0].data[1].value = res2.data.count;
    pie.series[0].data[2].value = res3.data.count;
    // 3. 将整理后的option配置设置给图表对象
    pieChart.setOption(pie);
})();
```



# 21.地图的使用

## 21.1高德地图基本使用流程

一、开发准备

1. 首先，[注册开发者账号](https://lbs.amap.com/dev/id/newuser)，成为高德开放平台开发者

2. 登陆之后，在进入「应用管理」 页面「创建新应用」

3. 为应用[添加 Key](https://lbs.amap.com/dev/key/app)，「服务平台」一项请选择「 Web 端 ( JSAPI ) 」。

4. 添加成功后，可获取到 key 值。

二、调整侧边菜单渲染与白名单控制

> 方便快速访问到新增的业务页面

三、安装高德地图模块

```
npm i @amap/amap-jsapi-loader --save
```

四、初始化地图

```tsx
import React, { useEffect } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
type Props = {};

export default function MyMap({}: Props) {
  useEffect(() => {
    AMapLoader.load({
      key: "57c8f4c2d0ec7719d59e864b88ddfe1f", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [""], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        let map = new AMap.Map("container", {
          //设置地图容器id
          viewMode: "3D", //是否为3D地图模式
          zoom: 5, //初始化地图级别
          center: [105.602725, 37.076636], //初始化地图中心点位置
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div id="container" style={{ height: "500px", border: "1px solid red" }}>
      地图加载中...
    </div>
  );
}

```



## 21.2拓展地图功能

> 实现地图覆盖热点的功能，参考示例
>
> [圆点标记-点标记-示例中心-JS API 2.0 示例 | 高德地图API (amap.com)](https://lbs.amap.com/demo/jsapi-v2/example/marker/circlemarker)

```tsx
import React, { useEffect } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import { capitals } from "./capitals";
type Props = {};

export default function MyMap({}: Props) {
  useEffect(() => {
    AMapLoader.load({
      key: "57c8f4c2d0ec7719d59e864b88ddfe1f", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Driving"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        let map = new AMap.Map("container", {
          //设置地图容器id
          viewMode: "3D", //是否为3D地图模式
          resizeEnable: true,
          center: [116.397428, 39.90923], //地图中心点
          zoom: 5, //地图显示的缩放级别
        });
        for (var i = 0; i < capitals.length; i += 1) {
          var center = capitals[i].center;
          var circleMarker = new AMap.CircleMarker({
            center: center,
            radius: 10 + Math.random() * 10, //3D视图下，CircleMarker半径不要超过64px
            strokeColor: "white",
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: "rgba(0,0,255,1)",
            fillOpacity: 0.5,
            zIndex: 10,
            bubble: true,
            cursor: "pointer",
            clickable: true,
          });
          circleMarker.setMap(map);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div id="container" style={{ height: "500px", border: "1px solid red" }}>
      地图加载中...
    </div>
  );
}

```



# 22.Excel导入导出

## 20.1 导出

[js-export-excel - npm (npmjs.com)](https://www.npmjs.com/package/js-export-excel)

1. 基本使用演示

```tsx
import React from "react";
const ExportJsonExcel = require("js-export-excel");

type Props = {};

export default function Export({}: Props) {
  const handleExport = () => {
    var option: any = {};

    option.fileName = "excel";

    option.datas = [
      {
        sheetData: [
          { one: "一行一列", two: "一行二列" },
          { one: "二行一列", two: "二行二列" },
        ],
        sheetName: "sheet",
        sheetFilter: ["two", "one"],
        sheetHeader: ["第一列", "第二列"],
        columnWidths: [20, 20],
      },
      {
        sheetData: [
          { one: "一行一列", two: "一行二列" },
          { one: "二行一列", two: "二行二列" },
        ],
      },
    ];

    var toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel(); //保存
  };
  return (
    <div>
      <div onClick={handleExport}>导出表格</div>
    </div>
  );
}

```

2. 将数据库的数据导出为表格

```tsx
import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import request from "@/utils/request";
const ExportJsonExcel = require("js-export-excel");

type Props = {};
const columns: any = [
  {
    title: "Banner的ID",
    dataIndex: "objectId",
    key: "objectId",
  },
  {
    title: "轮播名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "图片链接",
    dataIndex: "img",
    key: "img",
  },
  {
    title: "超链接",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "轮播描述",
    dataIndex: "desc",
    key: "desc",
  },
];
export default function Export({}: Props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    request.get("/classes/Banner").then((res) => {
      setData(res.data.results);
    });
  }, []);
  const handleExport = () => {
    // 直接导出文件

    var option: any = {}; //导出文件相关配置

    option.fileName = "轮播图数据"; //导出的文件名

    option.datas = [
      //配置excel表格内部数据，一个对象为一张表
      {
        sheetData: data,
        sheetName: "轮播图",
        sheetFilter: ["name", "img", "url", "desc"], //控制每一列中需要渲染的字段
        // sheetHeader: ["轮播名称", "轮播图片", "超链接", "轮播描述"], //每一列的头部标题信息
        sheetHeader: ["name", "img", "url", "desc"], //方便后续导入
        columnWidths: [20, 20],
      },
    ];

    var toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel(); //保存
  };
  return (
    <div>
      <Button onClick={handleExport}>导出Excel</Button>
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

```



## 20.2 导入

[xlsx - npm (npmjs.com)](https://www.npmjs.com/package/xlsx)

```typescript
// src/views/excel/Import.tsx
import { Button, Table, Switch, Image } from "antd";
import { useState } from "react";
import * as XLSX from "xlsx";
import request from "@/utils/request";

type ImportProps = {};
interface DataType {
  proid: string;
  proname: string;
  img1: string;
  originprice: number;
  discount: number;
  sales: number;
  stock: number;
  category: string;
  brand: string;
  issale: number;
  isrecommend: number;
  isseckill: number;
}
export default function Import(props: ImportProps) {
  const [banner, setBanner] = useState([]);
  const importExcel = () => {
    // 1. 导入数据
    const file = (document.getElementById("fileRef") as HTMLInputElement)
      .files![0];
    const reader = new FileReader();
    reader.readAsBinaryString(file); // 转成 二进制格式
    reader.onload = function () {
      const workbook = XLSX.read(this.result, { type: "binary" });
      const t = workbook.Sheets["轮播图"]; // 【！注意！】拿到表格数据,需要跟表格文件内部的表名一致
      // console.log(t)
      const r: any = XLSX.utils.sheet_to_json(t); // 2. 转换成json格式
      // console.log(r)
      setBanner(r);
      // 将r的数据上传至服务器
      console.log("json数据", r);

      //方法2，导出为html
      var container = document.getElementById("cont");
      (container as HTMLDivElement).innerHTML = XLSX.utils.sheet_to_html(t);
      console.log("html数据", XLSX.utils.sheet_to_html(t));
    };
  };

  //3. 将表格数据批量传入数据库
  const handleBatch = () => {
    let requests = banner.map((item) => {
      return {
        method: "POST",
        path: "/1.1/classes/Banner",
        body: item,
      };
    });
    request.post("/batch", { requests });
  };

  return (
    <>
      <Button
        onClick={() => {
          // 触发文件选择器
          (document.getElementById("fileRef") as HTMLInputElement).click();
        }}
      >
        导入数据
      </Button>
      <input type="file" hidden id="fileRef" onChange={importExcel} />
      <Button type="primary" onClick={handleBatch}>
        将导入的数据批量录入数据库
      </Button>
      <div id="cont"></div>
    </>
  );
}

```

# 23. 大文件上传

> 【！！注意！！】演示大文件上传的时候，一定要先启动node服务，然后再重启一下React项目
>
> 因为，Node服务开发的时候使用的是3000端口，所有接口逻辑对接也都是通过3000端口提供的
>
> 需要React项目让出3000端口供Node使用。

## 1. 文章参考

Vue项目参考：[字节跳动面试官：请你实现一个大文件上传和断点续传 - 掘金 (juejin.cn)](https://juejin.cn/post/6844904046436843527)

React项目参考：[大文件上传之切片上传、秒传、断点续传(React) - 掘金 (juejin.cn)](https://juejin.cn/post/7073319150948450334)

## 2. 大文件上传流程及关键技术分析

> 大文件内容摘要

1. 普通文件上传【图片上传】
   + 使用Upload组件直接上传文件
   + 后端接收并存储文件，返回存放路径
   + 前端将文件路径存入数据库
2. 普通手段上传大文件的问题 【视频上传】
   + 如果直接使用Upload组件上传会存在问题  【不合理】
     + 上传速度较慢
     + 上传到中途意外断开后，下次需要整体重新上传
3. 大文件上传的推荐方式
   + **文件切片** ，原生JS可以将大文件在本地处理为二进制数据，然后进行切片，例如将1000M文件切成1000份。
   + 通过**hash算法**，提取每个切片的【**内容摘要id**】加密字符串 ，内容不变则内容摘要就不会变
     + 切片1内容：摘要id123456
     + 切片2内容：摘要id321654
   + 通过ajax依次向后端提交切片内容及其摘要
   + 假设ajax请求，在向后端传递到第999个切片数据包的时候，发生了网络错误
   + 用户就需要重新选择刚才的那个视频文件，进行上传
     + 前端会将生成【内容摘要id】传到后端
     + 后端会根据【内容摘要id】识别未上传的摘要id，并下发前端
     + 前端只需要把未上传的那一个切片给到服务器即可
     + 实现**【断点续传】**
   + 后端拿到了前端所提交的所有1000个切片，需要合成为对应的视频文件
   + 后端会对本次上传的完整视频，再形成一次【整体内容摘要id】
   + 当下次前端提交相同的文件的时候，直接可以实现**【秒传】**

## 3. 大文件上传后端服务

> LeanCloud云服务本身并没有提供大文件上传的接口，需要我们暂时使用Node服务进行测试体验。
>
> 真实项目中的大文件上传接口，由公司后端开发人员来实现
>
> 【！注意！】Node服务最终会把文件存储到项目的filelist目录下，该目录已经在.gitignore中添加了忽略，避免视频大文件被提交至git仓库

Node服务仓库地址：https://gitee.com/team-2203/large-file-upload.git

1. 克隆仓库

```
git clone https://gitee.com/team-2203/large-file-upload.git
```

2. 安装依赖

```bash
cd large-file-upload
yarn
```

3. 启动大文件上传服务

```
yarn start
```



## 4. 前端代码逻辑

> 【！注意！】前端代码逻辑是基于js准备的，为避免修改太多了类型约束，前端代码逻辑需要通过**jsx**文件进行演示

1. 新建大文件上传组件

```typescript
// views/BigFileUpload/index.jsx 
import React, { useState, useEffect, useMemo } from "react";
import request from "../../utils/large-request";
import styled from "styled-components";
import hashWorker from "../../utils/hash-worker";
import WorkerBuilder from "../../utils/worker-build";

const CHUNK_SIZE = 1 * 1024 * 1024;

const UpLoadFile = function () {
  const [fileName, setFileName] = useState("");
  const [fileHash, setFileHash] = useState("")
  const [chunkList, setChunkList] = useState([])
  const [hashPercentage, setHashPercentage] = useState(0)

  // 获取文件后缀名
  const getFileSuffix = (fileName) => {
    let arr = fileName.split(".");
    if (arr.length > 0) {
      return arr[arr.length - 1]
    }
    return "";
  }

  // 拆分文件
  const splitFile = (file, size = CHUNK_SIZE) => {
    const fileChunkList = [];
    let curChunkIndex = 0;
    while (curChunkIndex <= file.size) {
      const chunk = file.slice(curChunkIndex, curChunkIndex + size);
      fileChunkList.push({ chunk: chunk, })
      curChunkIndex += size;
    }
    return fileChunkList;
  }
  // 选择文件
  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length === 0) return;
    // 保存文件名
    setFileName(files[0].name);
    // 文件分片
    const chunkList = splitFile(files[0])
    setChunkList(chunkList);
  }

  // 发送合并请求
  const mergeRequest = (hash) => {
    request({
      url: "http://localhost:3000/merge",
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({
        // 服务器存储的文件名：hash+文件后缀名
        fileHash: hash,
        suffix: getFileSuffix(fileName),
        // 用于服务器合并文件
        size: CHUNK_SIZE
      })
    })
  }
  // 上传分片
  const uploadChunks = async (chunksData, hash) => {
    const formDataList = chunksData.map(({ chunk, hash }) => {
      const formData = new FormData()
      formData.append("chunk", chunk);
      formData.append("hash", hash);
      formData.append("suffix", getFileSuffix(fileName));
      return { formData };
    })

    const requestList = formDataList.map(({ formData }, index) => {
      return request({
        url: "http://localhost:3000/upload",
        data: formData,
        onprogress: e => {
          let list = [...chunksData];
          list[index].progress = parseInt(String((e.loaded / e.total) * 100));
          setChunkList(list)
        }
      })
    })
    // 上传文件
    Promise.all(requestList).then(() => {
      // 延迟发送合并请求，方便观察服务器合并文件的步骤
      setTimeout(() => {
        mergeRequest(hash);
      }, 1000);

    })
  }
  // 计算文件hash
  const calculateHash = (chunkList) => {
    return new Promise(resolve => {
      const woker = new WorkerBuilder(hashWorker)
      woker.postMessage({ chunkList: chunkList })
      woker.onmessage = e => {
        const { percentage, hash } = e.data;
        setHashPercentage(percentage);
        if (hash) {
          // 当hash计算完成时，执行resolve
          resolve(hash)
        }
      }
    })
  }
  // 上传文件
  const handleUpload = async (e) => {
    if (!fileName) {
      alert("请先选择文件")
      return;
    }
    if (chunkList.length === 0) {
      alert("文件拆分中，请稍后...")
      return;
    }
    // 计算hash
    const hash = await calculateHash(chunkList)
    console.log("文件的hash为：", hash)
    setFileHash(hash)
    const { shouldUpload, uploadedChunkList } = await verfileIsExist(hash, getFileSuffix(fileName));
    console.log(shouldUpload)
    if (!shouldUpload) {
      alert("文件已存在，无需重复上传");
      return;
    }
    let uploadedChunkIndexList = [];
    if (uploadedChunkList && uploadedChunkList.length > 0) {
      uploadedChunkIndexList = uploadedChunkList.map(item => {
        const arr = item.split("-");
        return parseInt(arr[arr.length - 1])
      })
      console.log(uploadedChunkIndexList)
      alert("已上传的区块号：" + uploadedChunkIndexList.toString())
    }
    const chunksData = chunkList.map(({ chunk }, index) => ({
      chunk: chunk,
      hash: hash + "-" + index,
      progress: 0
    })).filter(item2 => {
      // 过滤掉已上传的块
      const arr = item2.hash.split("-")
      return uploadedChunkIndexList.indexOf(parseInt(arr[arr.length - 1])) === -1;
    })
    console.log(chunksData)
    // 保存分片数据
    setChunkList(chunksData)
    // 开始上传分片
    uploadChunks(chunksData, hash)
  }

  // 秒传：验证文件是否存在服务器
  const verfileIsExist = async (fileHash, suffix) => {
    const { data } = await request({
      url: "http://localhost:3000/verFileIsExist",
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({
        fileHash: fileHash,
        suffix: suffix
      })
    })
    return JSON.parse(data);
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} /><br />
      <button onClick={handleUpload}>上传</button>
      <ProgressBox chunkList={chunkList} />
    </div>
  )
}
const BlockWraper = styled.div`
  width: ${({ size }) => size + "px"};
  height: ${({ size }) => size + "px"};
  text-align: center;
  font-size: 12px;
  line-height: ${({ size }) => size + "px"}; 
  border: 1px solid #ccc;
  position: relative;
  float: left;
  &:before {
    content: "${({ chunkIndex }) => chunkIndex}";
    position: absolute;
    width: 100%;
    height: 10px;
    left: 0;
    top: 0;
    font-size: 12px;
    text-align: left;
    line-height: initial;
    color: #000
  }
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: ${({ progress }) => progress + "%"};
    background-color: pink;
    left: 0;
    top: 0;
    z-index: -1;
  }
`
const ChunksProgress = styled.div`
  *zoom: 1;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
`
const Label = styled.h3``
const ProgressWraper = styled.div``
const Block = ({ progress, size, chunkIndex }) => {
  return (<BlockWraper size={size} chunkIndex={chunkIndex} progress={progress}>
    {progress}%
  </BlockWraper>)
}

const ProgressBox = ({ chunkList = [], size = 40 }) => {
  const sumProgress = useMemo(() => {
    if (chunkList.length === 0) return 0
    return chunkList.reduce((pre, cur, sum) => pre + cur.progress / 100, 0) * 100 / (chunkList.length)
  }, [chunkList])

  return (
    <ProgressWraper>
      <Label>文件切分为{chunkList.length}段，每段上传进度如下：</Label>
      <ChunksProgress>
        {chunkList.map(({ progress }, index) => (
          <Block key={index} size={size} chunkIndex={index} progress={progress} />
        ))}
      </ChunksProgress>
      <Label>总进度:{sumProgress.toFixed(2)}%</Label>
    </ProgressWraper >
  )
}

export default UpLoadFile;
```

2. 准备大文件上传组件所需的相关文件

   + 在utils中放入提前准备好的三个js方法文件，在代码分支：step18-excel-bigfile 中获取

     + hash-worker.js
     + large-request.js
     + worker-build.js

   + 安装styled-components模块

     ```
     yarn add styled-components
     ```

     

## 5.测试大文件上传

1. 直接测试，可以观察到文件切片效果，每个切片1M大小
2. 多次测试，代码逻辑中有随机的上传失败设置，可以体验到断点续传
3. 上传相同视频测试，可以体验到秒传效果

# 24. 其他项目业务功能拓展

## 1.音频课程

> 结合图片图文发布的Upload组件可以实现**音频课程发布**

## 2.视频课程

> 结合大文件上传功能，可以实现**视频课程发布**
