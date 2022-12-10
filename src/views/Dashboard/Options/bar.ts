let xdata = [];
let ydata = [];

for (let i = 9; i <= 18; i++) {
  xdata.push(i);
  ydata.push(Math.round(Math.random() * 800 + 200));
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: {
    text: "实时用户数据",
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
