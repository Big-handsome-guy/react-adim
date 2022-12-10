import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Space, Image } from "antd";
import { useRef } from "react";
import { articleGet, IArticleParams } from "../../api/course";
import { ArticleType } from "../../types/course";
import { Link, useNavigate } from "react-router-dom";
import querystring from "query-string";
import { useAppSelector } from "@/store/hooks";

let rolename = "";

const columns: ProColumns<ArticleType>[] = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
  },
  {
    title: "课程名称",
    dataIndex: "name",
    copyable: true,
    ellipsis: true,
    tip: "课程名称",
    formItemProps: {
      rules: [
        {
          required: true,
          message: "此项为必填项",
        },
      ],
    },
  },
  {
    disable: true,
    title: "是否会员课程",
    dataIndex: "isvip",
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: "select",
    render: (bool, record) => {
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
  {
    disable: true,
    title: "课程封面",
    dataIndex: "poster",
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (url: any, record) => (
      <Space>
        <Image height={50} src={url} />
      </Space>
    ),
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      rolename === "超级管理员" ? (
        <Link to={`/course/edit?${querystring.stringify(record)}`}>编辑</Link>
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
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  rolename = useAppSelector((state) => state.user.userInfo!.rolename);

  return (
    <ProTable<ArticleType>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        let res = await articleGet(params as IArticleParams);
        return {
          data: res.data.results,
        };
      }}
      editable={{
        type: "multiple",
      }}
      columnsState={{
        persistenceKey: "pro-table-singe-demos",
        persistenceType: "localStorage",
        onChange(value) {
          console.log("value: ", value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === "get") {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            navigate("/course/artpublic");
          }}
        >
          新建
        </Button>,
      ]}
    />
  );
};
