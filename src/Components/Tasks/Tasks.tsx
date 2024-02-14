import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Modal } from "react-bootstrap";
import axios from "axios";
import noData from "../../assets/images/download.jpg";
import { useForm } from "react-hook-form";
import EmployeeTasks from "../employeeTasks/employeeTasks";

export default function Tasks() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { baseUrl, requstHeaders, userRole }: any = useContext(AuthContext);
  const [tasksList, setTasksList] = useState([]);
  const [itemId, setItemId] = useState(0);
  const [projectList, setProjectList] = useState([]);
  const [modelState, setModelState] = useState("colse");
  const [usersList, setUsersList] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  const handleClose = () => setModelState("colse");

  // *************** to show delete model ***************
  const showDeleteModel = (id) => {
    setItemId(id);
    setModelState("delete-model");
  };

  // *************** to show update model ***************
  const showUpdateModel = (task) => {
    setItemId(task?.id);
    setValue("title", task?.title);
    setValue("description", task?.description);
    setValue("employeeId", task?.employee?.id);
    setModelState("update-model");
  };

  // *************** to update task *****************
  const updateTask = (data) => {
    // setIsLoding(true);
    if (userRole == "Manager") {
      axios
        .put(`${baseUrl}/Task/${itemId}`, data, {
          headers: requstHeaders,
        })
        .then((response) => {
          handleClose();
          getAllTasks(userRole);
          // toast.success("Task Updated Successfuly");
        });
      // .catch((error) => {
      //   toast.error(error?.response?.data?.message || "'Task Not Updated'");
      // })
    }
  };

  //*************** to delete Task *****************

  const deleteTask = () => {
    axios
      .delete(`${baseUrl}/Task/${itemId}`, {
        headers: requstHeaders,
      })
      .then((response) => {
        handleClose();
        getAllTasks(userRole);
        // toast.success("Task Deleted Successfuly");
      });
    // .catch((error) => {
    //   toast.error(error?.response?.data?.message || "Task Not Deleted");
    // })
  };

  // *************** to get all users *****************

  const getAllUsers = () => {
    if (userRole == "Manager") {
      axios
        .get(`${baseUrl}/Users/?pageSize=100`, {
          headers: requstHeaders,
        })
        .then((response) => {
          setUsersList(response?.data?.data);
        });
      // .catch((error) => {
      //   toast.error(error?.response?.data?.message || "Something went Wrong");
      // })
    }
  };

  // *************** to get all tasks *****************

  const getAllTasks = (pageNo: number = 1) => {
    // setIsLoding(true);
    if (userRole == "Manager") {
      axios
        .get(`${baseUrl}/Task/manager`, {
          headers: requstHeaders,
          params: {
            pageSize: 5,
            pageNumber: pageNo,
          },
        })
        .then((response) => {
          setTasksList(response?.data?.data);
          setArrayOfPages(
            Array(response?.data?.totalNumberOfPages)
              .fill()
              .map((_, i) => i + 1)
          );
        });
      // .catch((error) => {
      //   toast.error(error?.response?.data?.message || "Something went Wrong");
      // })
      // .finally(() => {
      //   setIsLoding(false);
      // });
    }
  };

  //**************** for navigate to add new task ******************

  const addNewTask = () => {
    navigate("/dashboard/tasks/addTask");
  };

  //*************** to check task status (toDo / inProgress / done) ***************

  const taskStatus = (tasksList) => {
    if (tasksList.status == "ToDo") {
      return (
        <div className="bg-info text-white w-50 text-center rounded-5">
          <span className="fw-bold"> to do </span>
        </div>
      );
    } else if (tasksList.status == "InProgress") {
      return (
        <div className="shareColor text-white w-50 text-center rounded-5 ">
          <span className="fw-bold"> in progress </span>
        </div>
      );
    } else if (tasksList.status == "Done") {
      return (
        <div className=" tasksDone text-white w-50 text-center rounded-5">
          <span className="fw-bold"> done </span>
        </div>
      );
    }
  };

  // *************** to get all projects *****************

  const getAllProjects = () => {
    if (userRole == "Manager") {
      axios
        .get(`${baseUrl}/Project/manager`, {
          headers: requstHeaders,
        })
        .then((response) => {
          setProjectList(response?.data.data);
        });
      // .catch((error) => {
      //   toast.error(error?.response?.data?.message || "Something went Wrong");
      // })
      // .finally(() => {
      //   setIsLoding(false);
      // });
    }
  };

  //********************* to show tasks of selected project******************* */

  const getProjectValue = (selected, pageNo) => {
    // setIsLoding(true);
    let id = selected.target.value;

    axios
      .get(`${baseUrl}/Task/project/${id}`, {
        headers: requstHeaders,
        params: {
          pageSize: 5,
          pageNumber: pageNo,
        },
      })
      .then((response) => {
        setArrayOfPages(
          Array(response?.data?.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );

        setTasksList(response?.data.data);
      });
    // .catch((error) => {
    //   toast.error(error?.response?.data?.message || "Something went Wrong");
    // })
    // .finally(() => {
    //   setIsLoding(false);
    // });
  };

  useEffect(() => {
    if (userRole) {
      getAllTasks();
      getAllUsers();
      getAllProjects();
    }
  }, [userRole]);
  return (
    <>
      {/* ************* this model to delete Category *********** */}

      <Modal show={modelState == "delete-model"} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center noData mt-3">
            <img className="w-50" src={noData} alt="" />
            <h5 className="mt-3">Delete This Task ?</h5>
            <p>
              are you sure you want to delete this item ? if you are sure just{" "}
              <br /> click on delete it
            </p>

            <div className="text-end mt-5">
              <button
                onClick={deleteTask}
                className="btn text-end border border-danger text-danger"
              >
                {isLoding == true ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Delete this item"
                )}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ************* this model to update Category *********** */}

      <Modal show={modelState == "update-model"} onHide={handleClose}>
        <Modal.Body>
          <div className="headerModel">
            <h3 className="ms-3 mt-3 text-center fw-bold">Update Task</h3>
          </div>

          <form
            className="form w-100 m-auto mt-5"
            onSubmit={handleSubmit(updateTask)}
          >
            {/* ************** for title input ************ */}
            <div className="form-group mt-4">
              <label>Title</label>
              <input
                className="form-control rounded-3 py-2 mt-2"
                placeholder="Name"
                type="text"
                {...register("title", {
                  required: true,
                })}
              />
              {errors.title && errors.title.type === "required" && (
                <span className="text-danger mt-4">title is required</span>
              )}
            </div>

            {/* ************** for description input ************ */}
            <div className="form-group mt-4 ">
              <label>Description</label>
              <input
                className="form-control rounded-3 pb-5 mt-2"
                placeholder="Description"
                type="text"
                {...register("description", {
                  required: true,
                })}
              />
              {errors.description && errors.description.type === "required" && (
                <span className="text-danger mt-4">
                  description is required
                </span>
              )}
            </div>

            {/* ************** to select user **************** */}

            <div className="col-md-12">
              <div className="form-group mt-3">
                <label className="pb-2">user</label>
                <select
                  {...register("employeeId", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="form-select"
                >
                  <option value="" className="text-muted">
                    Select user
                  </option>
                  {usersList.map((user, index) => (
                    <option key={index} value={user.id}>
                      {user?.userName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group mt-3 text-center">
              <button className="shredBtn w-75 mt-4 fs-4">
                {isLoding == true ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {userRole == "Manager" ? (
        <div className="animate__animated animate__backInRight">
          {/* **************** to content above table ****************** */}

          <div className="bg-white header d-flex justify-content-between px-4 py-3 ">
            <h3 className="text1"> Tasks </h3>
            <button onClick={addNewTask} className="shredBtn">
              {" "}
              <i className="fa fa-plus"></i> Add New Task{" "}
            </button>
          </div>

          {/* //**************** to filter tasks by projects   *************/}

          <div className="d-flex px-3 justify-content-center  ">
            <div className=" mt-4  bord rounded-2 ">
              <select onChange={getProjectValue} className="form-select">
                <option value="" className="text-warning">
                  filter tasks by project
                </option>

                {projectList.map((project, index) => (
                  <option
                    className="text-success"
                    key={index}
                    value={project?.id}
                  >
                    {project?.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* **************** to display table ****************** */}

          <div className="table-responsive px-4">
            <table className="table table-striped mt-4">
              <thead className="">
                <tr className="">
                  <th className="theadTable" scope="col">
                    #
                  </th>
                  <th className="theadTable">Title</th>
                  <th className="theadTable" scope="col">
                    Statues
                  </th>
                  <th className="theadTable" scope="col">
                    User
                  </th>
                  <th className="theadTable" scope="col">
                    Project
                  </th>
                  <th className="theadTable" scope="col">
                    Date Created
                  </th>
                  <th className="theadTable text-center " scope="col text-end">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {tasksList.map((task, index) => (
                  <>
                    <tr key={task?.id}>
                      <td scope="row"> {index + 1} </td>
                      <td> {task?.title} </td>
                      <td> {taskStatus(task)} </td>
                      <td> {task?.employee?.userName} </td>
                      <td> {task?.project?.title} </td>
                      <td> {task?.creationDate.slice(0, 10)} </td>
                      <td className="text-center">
                        <button
                          className="actionBtn"
                          onClick={() => showUpdateModel(task)}
                        >
                          <i className="fa fs-6 text-success fa-edit"></i>
                        </button>

                        <button
                          className="actionBtn"
                          onClick={() => showDeleteModel(task?.id)}
                        >
                          <i className="fa ms-3 fs-6 text-danger fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <nav aria-label="...">
              <ul className="pagination pagination-sm d-flex justify-content-center point">
                {arrayOfPages.map((pageNo) => (
                  <>
                    <li
                      onClick={() => {
                        getAllTasks(userRole, pageNo);
                      }}
                      className="page-item  p-2 element-with-pointer pe-auto"
                    >
                      <a className="page-link">{pageNo}</a>
                    </li>
                  </>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <EmployeeTasks />
      )}
    </>
  );
}
