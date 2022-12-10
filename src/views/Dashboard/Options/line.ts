let x = [];
let data1 = [];
let data2 = [];
let j = 3;
for (let i = 8; i <= 24; i += 2) {
  let n = i < 10 ? `0${i}` : i;
  x.push(n);
  let m = 0;
  let f = Math.round(Math.random() * 10000);
  if (j % 3 === 1) {
    m = f;
  }
  if (j % 3 === 2) {
    m = -f;
  }
  // 0  1 2    3 4 5    6 7 8   9  10 11
  // 0 m -m   0 m -m
  data1.push(30000 + m);
  data2.push(30000 - m);
  j++;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: {
    text: "支付金额",
  },
  //   tooltip: {
  //     trigger: "axis",
  //   },
  legend: {
    data: ["今天", "昨天"],
    left: "center",
    top: "bottom",
  },
  grid: {
    left: "3%",
    bottom: "10%",
    width: "85%",
    containLabel: true,
  },
  //   toolbox: {
  //     feature: {
  //       saveAsImage: {},
  //     },
  //   },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: x,
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "今天",
      type: "line",
      //   stack: "Total",
      smooth: true,
      symbol: "none", //控制线上的指示点
      lineStyle: {
        //控制线条样式
        color: "#2879FF",
        width: 3,
      },
      data: data1,
    },
    {
      name: "昨天",
      type: "line",
      smooth: true,
      symbol: "none", //控制线上的指示点
      lineStyle: {
        //控制线条样式
        color: "#F6AE07",
        width: 3,
      },
      //   stack: "Total",
      data: data2,
    },
  ],
};
