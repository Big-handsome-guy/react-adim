import React, { useEffect } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import { capitals } from "@/views/Amap/capitals";

type Props = {};

export default function MyMap({}: Props) {
  useEffect(() => {
    AMapLoader.load({
      key: "625d5ccad679333850c23f70b8e5a032", // 申请好的Web端开发者Key，首次调用 load 时必填
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
    <div
      id="container"
      style={{ height: "500px", border: "1px solid #d8d8d8" }}
    >
      地图加载中.........
    </div>
  );
}
