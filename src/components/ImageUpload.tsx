import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import AV from "leancloud-storage";
import React, { ChangeEventHandler, useState } from "react";

//将本地资源对象转变为base64编码
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

//在执行上传文件前判断文件类型
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

interface IProps {
  id: string;
  onChange: ChangeEventHandler;
  value: string;
}

const ImgUpload: React.FC = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  // console.log("图片Upload组件", props);

  //自定义上传函数
  const handleUpload = (info: any): any => {
    // console.log(info);//本地资源对象
    setLoading(true);
    getBase64(info.file, (base64) => {
      // console.log(base64);
      // image.png 是文件名
      const file = new AV.File("image.png", { base64 }); //构建leanCloud文件资源对象
      file.save().then((res: any) => {
        console.log(res);
        let { url } = res.attributes;
        setLoading(false);
        props.onChange(url); //让表单拿到url
        setImageUrl(url);
      });
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={handleUpload}
    >
      {imageUrl || props.value ? (
        <img
          src={imageUrl || props.value}
          alt="avatar"
          style={{ width: "100%" }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default ImgUpload;
