import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import Pie2 from "../Charts/Pie2/Pie2";
import Pie1 from "../Charts/Pie1/Pie1";

export default function Home({ adminData }) {
  const { baseUrl, requstHeaders }: any = useContext(AuthContext);
  const [tasksCount, setTasksCount] = useState([]);
  const [usersCount, setUsersCount] = useState([]);
  const { userRole }: any = useContext(AuthContext);

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

  const getUsersCount = () => {
    axios
      .get(`${baseUrl}/Users/count`, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response.data);
        setUsersCount(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (userRole === "Manager") {
      getUsersCount();
      getTasksCount();
    } else {
      getTasksCount();
    }
  }, []);

  return (
    <>
      <div className="animate__animated  animate__backInDown">
        <div className="my-4 me-3 ms-4  rounded-3">
          <div className="bgHome text-white py-5 px-4">
            <h1 className="mt-3 ">
              Welcome <span className="text1 ">{adminData.userName}</span>
            </h1>

            <p className="my-3 fs-2">
              You can add project and assign tasks to your team
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row ps-3 two rounded-3   mb-3">
            <div className="col-md-6 px-2 ">
              <div className="borderLeft m-4 w-75 px-2  ">
                <h5>Tasks</h5>
                <p className="mt-2">Lorem ipsum dolor sit amet,consecteture</p>
              </div>
              <div className="row justify-content-evenly align-Items-center">
                <div className="col-md-3 text-center rounded-3 pt-3 one1 ">
                  <i className="fa-solid fa-clipboard-list fs-1 "></i>
                  <p>
                    Tasks <br /> ToDo
                  </p>
                  <p>{tasksCount.toDo}</p>
                </div>
                <div className="col-md-3  text-center rounded-3  pt-3 one3  ">
                  <i className="fa-solid fa-chart-column fs-1 "></i>
                  <p>
                    Tasks <br /> InProgress
                  </p>
                  <p>{tasksCount.inProgress}</p>
                </div>

                <div className="col-md-3  text-center rounded-3 pt-3 one2  ">
                  <i className="fa-solid fa-clipboard-user fs-1"></i>
                  <p>
                    Tasks <br /> Done
                  </p>
                  <p>{tasksCount.done}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6   ">
              <div className=" ">
                <p className="fs-2 border1 mt-3 ">Tasks</p>
                <Pie1 />
              </div>
            </div>
          </div>
          {userRole == "Manager" ? (
            <div className="row ps-3 one mb-3  rounded-3">
              <div className="col-md-6 px-2  ">
                <div className="borderLeft m-4 w-75 px-2  ">
                  <h5>Users</h5>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet,consecteture
                  </p>
                </div>
                <div className="row justify-content-evenly align-Items-center  ">
                  <div className="col-md-5 text-center rounded-3 pt-3 one1   ">
                    <i className="fa-solid fa-clipboard-list fs-1  "></i>
                    <p>
                      Users <br /> ActivatedEmployeeCount
                    </p>
                    <p>{usersCount.activatedEmployeeCount}</p>
                  </div>
                  <div className="col-md-6  text-center rounded-3  pt-3 one3  ">
                    <i className="fa-solid fa-chart-column fs-1 "></i>
                    <p>
                      Users <br />
                      DeactivatedEmployeeCount
                    </p>
                    <p>{usersCount.deactivatedEmployeeCount}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6   ">
                <div className=" ">
                  <p className="fs-2  border1 mt-3">Users</p>
                  <Pie2 />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
