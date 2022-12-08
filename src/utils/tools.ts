import type { RcFile } from "antd/es/upload/interface";
//将本地资源对象转换为base64编码
export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
