import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import styles from "./Chartss.module.css";

//Pie chart

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const data1 = [
  {
    name: "Ariana Grande",
    ocena: 5
  },
  {
    name: "Posterunek",
    ocena: 5
  },
  {
    name: "Selena Gomez",
    ocena: 4.8
  },
  {
    name: "Podensing",
    ocena: 4.3
  },
  {
    name: "Polo Hermano",
    ocena: 4
  },
  {
    name: "Zjazd do bazy",
    ocena: 4
  },
  {
    name: "Pub Pompa",
    ocena: 4
  }
];

const COLORS = ["#A86BC2", "#DDCCFF", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/c9pL8k61/";
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/30763kr7/";

  render() {
    return (
      <div className={styles.chartt}>
        <div>
          <h2>Ilość imprez według kategorii</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx={200}
              cy={130}
              labelLine={false}
              labelString="adkwg"
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div>
          <h2>Najlepiej oceniane bary</h2>
          <BarChart width={750} height={300} data={data1}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="ocena" fill="#A86BC2" />
          </BarChart>
        </div>
      </div>
    );
  }
}
