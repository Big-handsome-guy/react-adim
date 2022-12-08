import React, { useEffect } from "react";
import E from "wangeditor";
// import { IFormComponentProps } from "@/types/course";

export default function RichText(props: any) {
  useEffect(() => {
    // console.log("富文本useEffect");
    const editor = new E("#rich-cont");
    //失焦事件
    editor.config.onblur = function (newHtml: string) {
      console.log("onblur", newHtml); // 获取最新的 html 内容
      props.onChange(newHtml); //让表单获取到富文本内容
    };
    editor.create();
    editor.txt.html(props.value);
    return () => {
      //在此useEffect下次调用之前调用
      // console.log("userEffect返回函数");
      editor.destroy(); //解决编辑器反复初始化的报错
    };
  }, [props]);
  return <div id="rich-cont"></div>;
}
