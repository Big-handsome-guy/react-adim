// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: {
    text: "课程分类占比",
    subtext: "Fake Data",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  grid: {
    width: "70%",
  },
  legend: {
    left: "center",
    top: "bottom",
    itemWidth: 14,
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "60%"],
      left: "-20%",
      data: [
        { value: 1048, name: "正念冥想" },
        { value: 735, name: "睡眠助手" },
        { value: 580, name: "舒缓音乐" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
