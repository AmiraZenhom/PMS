import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import ToDo from "../ToDo/ToDo";
import Inprogress from "../Inprogress/Inprogress";
import Done from "../Done/Done";
interface Task {
  id: string;
  title: string;
  status: string;
}
export default function EmployeeTasks(task: Task) {
  const { baseUrl, requstHeaders, userRole }: any = useContext(AuthContext);
  // const [isLoding, setIsLoding] = useState(false);
  const [allTasks, setAllTasks] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });

  //***********get all employee tasks********* */
  const getAllTasks = () => {
    // setIsLoding(true);
    if (userRole !== "Manager") {
      axios
        .get(`${baseUrl}/Task`, {
          headers: requstHeaders,
          params: {
            pageSize: 5,
            pageNumber: 1,
          },
        })
        .then((response) => {
          setAllTasks({
            todo: response?.data?.data.filter(
              (task) => task?.status === "ToDo"
            ),
            inprogress: response?.data?.data.filter(
              (task) => task?.status === "InProgress"
            ),
            done: response?.data?.data.filter(
              (task) => task?.status === "Done"
            ),
          });
        });

      // .catch((error) => {
      //   toast.error(error?.response?.data?.message || "Something went Wrong");
      // })
      // .finally(() => {
      //   setIsLoding(false);
      // });
    }
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <div className=" employeeTasksContainer overflow-hidden px-2  animate__animated  animate__bounceInDown">
        <h4 className="texttr bg-white m-0 p-3">Task Board</h4>
        <div className=" row px-5">
          <div className="col-md-4 px-1">
            <h4 className="p-4  bgicons1">
              To Do <i className="fa-solid fa-list ms-2  "></i>{" "}
            </h4>
            <ToDo allTasks={allTasks?.todo} getAllTasks={getAllTasks} />
          </div>

          <div className="col-md-4 px-1">
            <h4 className="p-4 bgicons2">
              In progress <i className="fa-solid bgicons2  fa-spinner ms-2"></i>
            </h4>
            <Inprogress
              allTasks={allTasks?.inprogress}
              getAllTasks={getAllTasks}
            />
          </div>

          <div className="col-md-4 px-1">
            <h4 className="p-4 bgicons3">
              Done <i className="fa-solid fa-check ms-2"></i>
            </h4>
            <Done allTasks={allTasks?.done} getAllTasks={getAllTasks} />
          </div>
        </div>
      </div>
    </>
  );
}
