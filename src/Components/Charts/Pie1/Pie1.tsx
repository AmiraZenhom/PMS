import React, { useContext, useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";
import { AuthContext } from "../../../Context/AuthContext";

export default function Pie1() {
  const { baseUrl, requstHeaders }: any = useContext(AuthContext);
  const [tasksCount, setTasksCount] = useState({});

  const getTasksCount = () => {
    axios
      .get(`${baseUrl}/Task/count`, {
        headers: requstHeaders,
      })
      .then((response) => {
        setTasksCount(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTasksCount();
  }, []);
  //   const {toDo,inprogress,done} =
  //     tasksCount
  //   ;

  const data = [
    { name: "ToDo", value: tasksCount.toDo },
    { name: "inProgress", value: tasksCount.inProgress },
    { name: "Done", value: tasksCount.done },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
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

  const COLORS = ["#0088FE", "#b72e89", "#956c14"];
  return (
    <>
      <div className="chart text-center  mb-3">
        <div className="text-center mx-5 px-5 ">
          <PieChart width={250} height={220}>
            <Pie
              dataKey="value"
              data={data}
              cx={120}
              cy={100}
              innerRadius={60}
              outerRadius={105}
              fill="#8884d8"
              paddingAngle={5}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((data, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="row  ">
          <div className="col-md-4 ">
            <span>
              <i className="fa-solid fa-circle bgicons1 pe-2 "></i>
            </span>
            <span>ToDo</span>
          </div>
          <div className="col-md-4">
            <span>
              <i className="fa-solid fa-circle bgicons2  pe-2 "></i>
            </span>
            <span>InProgress</span>
          </div>
          <div className="col-md-4">
            <span>
              <i className="fa-solid fa-circle bgicons3 pe-2  "></i>
            </span>
            <span>Done</span>
          </div>
        </div>

      
      </div>
    </>
  );
}
