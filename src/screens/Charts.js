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
import _, { groupBy, toPairs } from "lodash";
import styles from "./Charts.module.css";
import moment from "moment";

import { watchParties } from "../services/PartiesService";
import { watchUsers } from "../services/UserService";

const COLORS = ["#A86BC2", "#DDCCFF", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  
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
  state = {
    prepareCategoriesChart: [],
    prepareUsersChart: []
  };
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/c9pL8k61/";
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/30763kr7/";

  componentDidMount() {
    // responsible for rendering data in pie chart
    watchParties(parties => {
      const result = groupBy(parties, party => party.partyType);
      const pairs = toPairs(result).map(pair => {
        const [date, arr] = pair;
        return [date, arr.length];
      });
      const piechartData = pairs.map(pair => {
        const [date, registeredUsers] = pair;
        return {
          name: date,
          value: registeredUsers
        };
      });
      this.setState({ prepareCategoriesChart: piechartData });
    });

    watchUsers(users => {
      const sortedArray = _.sortBy(
        users,
        user => {
          return moment(user.joined, "DD.MM.YYYY");
        },
        ["asc"]
      );

      const result = groupBy(sortedArray, user => user.joined);

      const pairs = toPairs(result).map(pair => {
        const [date, arr] = pair;
        return [date, arr.length];
      });
      const chartData = pairs.slice(-7).map(pair => {
        const [date, registeredUsers] = pair;
        return {
          name: date,
          użytkownicy: registeredUsers
        };
      });
      this.setState({ prepareUsersChart: chartData });
    });
  }

  render() {
    return (
      <div className={styles.chartt}>
        <div>
          <h2>Ilość imprez według kategorii</h2>
          <PieChart width={400} height={500}>
            <Pie
              data={this.state.prepareCategoriesChart}
              cx={200}
              cy={200}
              labelLine={false}
              labelString="adkwg"
              label={renderCustomizedLabel}
              outerRadius={180}
              fill="#8884d8"
              dataKey="value">
              {this.state.prepareCategoriesChart.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>

        <div>
          <h2>Liczba zarejestrowanych użytkowników w ostatnim czasie</h2>
          <BarChart
            width={750}
            height={300}
            data={this.state.prepareUsersChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="użytkownicy" fill="#A86BC2" />
          </BarChart>
        </div>
      </div>
    );
  }
}
