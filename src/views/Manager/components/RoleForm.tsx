import { Button, Form, Input, Tree, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { mainroutes } from "@/router";
import { IMenuProps } from "@/router/interface";
import { IRoleParams, rolePost, rolePut } from "@/api/user";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
interface IProps {
  handleTableUpdate: any;
  editRole: IRoleParams | undefined;
}
const RoleForm: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  let [tree, setTree] = useState<IMenuProps[]>([]); //实时存放勾选的tree数据
  let [checkedKeys, setCheckedKeys] = useState<Array<string>>([]); //记录被勾选的路由路径
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

  useEffect(() => {
    // console.log("角色表单", props.editRole);
    if (props.editRole) {
      form.setFieldsValue(props.editRole);
    }
  }, []);

  const onReset = () => {
    form.resetFields();
  };
  const handleTreeCheck = (checkedKeys: any, e: any) => {
    // console.log(checkedKeys, e);
    // let {checkedNodes} = e
    let tempList: Array<string> = []; //临时记录后续找到的父级label，用来判断，避免出现多个相同父级
    let result: Array<any> = []; //记录最终处理后的被勾选的树形数据
    let checkedNodes = e.checkedNodes.filter((item: IMenuProps) => {
      //将没有children元素的主菜单挑出来
      if (item.nochild) {
        let { key, label, title, nochild, hidden } = item;
        result.push({ key, label, title, nochild, hidden }); //提取被勾选切没有子菜单的主菜单
      }
      return !item.children && !item.nochild; //过滤出所有被勾选的子菜单
    }); //拿到所有被勾选的子菜单

    checkedNodes.forEach((item: IMenuProps) => {
      // 找到当前被遍历子菜单的主菜单
      let parent: any = mainroutes.find((itm: IMenuProps) => {
        return itm.children
          ? itm.children.some((child: IMenuProps) => item.label === child.label)
          : false;
      });
      // console.log("父级", parent);
      let { key, label, title, nochild, hidden } = item;
      let treeItem = { key, label, title, nochild, hidden };
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
          (res: IMenuProps) => res.label === parent.label
        );
        if (myParent.children) {
          myParent.children.push(treeItem);
        }
      }
    });
    // console.log("找到子级的父级label", tempList);
    // console.log("整理结果", result);
    setTree(result);
    setCheckedKeys(checkedKeys);
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="roleName" label="角色名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="roleLevel" label="角色级别" rules={[{ required: true }]}>
        <InputNumber min={1} max={10} />
      </Form.Item>
      <Form.Item name="tree" label="菜单权限">
        <Tree
          treeData={mainroutes}
          checkable
          onCheck={handleTreeCheck}
          defaultCheckedKeys={props.editRole?.checkedKeys}
        />
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

export default RoleForm;
