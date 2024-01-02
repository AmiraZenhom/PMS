import React, { useContext, useEffect, useState} from "react";
import axios from "axios";



import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { AuthContext } from "../../../Context/AuthContext";


export default function Pie2() {

    const { baseUrl,requstHeaders } =useContext(AuthContext);
  
  const [usersCount, setUsersCount] = useState([]);
  


  const getUsersCount = () => {
    axios
      .get(`${baseUrl}/Users/count`, {
        headers: requstHeaders,
      })
      .then((response) => {
       
        setUsersCount(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 

//   const {toDo,inprogress,done} = 
//     tasksCount
//   ;
useEffect(() => {
    getUsersCount();
    
  }, []);

const data = [
    { name: "activatedEmployeeCount", value: usersCount.activatedEmployeeCount},
    { name: "deactivatedEmployeeCount", value: usersCount.deactivatedEmployeeCount
},
 
   
  ];

  const COLORS = ["#0088FE", "#b72e89", "#956c14", ];
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
        fill="dark"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
      <div className="chart ">

   <ResponsiveContainer width={300} height={220}>
   
   <PieChart >
   
   <Pie 
        data={data}
        cx={120}
        cy={100}
        innerRadius={60}
        outerRadius={105}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        labelLine={false}
        label={renderCustomizedLabel}
      >
        {data.map((data, item) => (
          <Cell key={data.name} fill={COLORS[item % COLORS.length]} />
        ))}
      </Pie>
 
  
   
    </PieChart>


   </ResponsiveContainer>
   
<div className="row">
    <div className="col-md-6">
        <span><i className="fa-solid fa-circle bgicons1 pe-2 "></i></span><span className="bgicons1 ">Activated</span>
    </div>
    <div className="col-md-6">
        <span><i className="fa-solid fa-circle bgicons2   pe-2 "></i></span><span className="bgicons2 ">Deactivated </span>
    </div>
   
</div>

 
      </div>
    
    </>
  );
}
