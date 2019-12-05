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
import _, {groupBy, toPairs, fromPairs, orderBy, sortBy} from 'lodash'
import styles from "./Chartss.module.css";
import {posts, users} from "../components/data.js"
import moment from 'moment'

const prepareUsersChart = () => {
  
  const sortedArray =
  _.sortBy(users, (user) => {
   return moment(user.joined, "DD.MM.YYYY")
  }, ['asc']);


 
 //console.warn(sortedArray)

 const result = groupBy(sortedArray, user => user.joined)
 
 const pairs = toPairs(result).map(pair => {
   const [date, arr] = pair
   return [date, arr.length]

 })
 const chartData = pairs.slice(-7).map(pair => {
   const [date, registeredUsers] = pair
   return {
     name: date,
     value: registeredUsers
   
   }
 })
 return chartData;
}
prepareUsersChart();




const prepareCategoriesChart = () => {
 const result = groupBy(posts, party => party.categories)
 const pairs = toPairs(result).map(pair => {
   const [date, arr] = pair
   return [date, arr.length]
 })
 const piechartData = pairs.map(pair => {
   const [date, registeredUsers] = pair
   return {
     name: date,
     value: registeredUsers
   }
 })
   return piechartData;
}

prepareCategoriesChart();


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
             data={prepareCategoriesChart()}
             cx={200}
             cy={130}
             labelLine={false}
             labelString="adkwg"
             label={renderCustomizedLabel}
             outerRadius={100}
             fill="#8884d8"
             dataKey="value">
             {prepareCategoriesChart().map((entry, index) => (
               <Cell
                 key={`cell-${index}`}
                 fill={COLORS[index % COLORS.length]}
               />
             ))}
           </Pie>
           <Legend/>
         </PieChart>
       </div>
       
       <div>
         <h2>Liczba zarejestrowanych użytkowników w ciągu ostatniego tygodnia</h2>
         <BarChart width={750} height={300} data={prepareUsersChart()}>
           <CartesianGrid strokeDasharray="3 3" />
           <XAxis dataKey="name" />
           <YAxis />
           <Tooltip />
           <Legend />

           <Bar dataKey="value" fill="#A86BC2" />
         </BarChart>
       </div>
     </div>
   );
 }
}