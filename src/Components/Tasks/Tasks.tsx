import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import NoData from "../../Shared/NoData/NoData";
import axios from "axios";

import Photo7 from "../../assets/images/download.png";
import { useForm } from "react-hook-form";
import Header from "../../Shared/Header/Header";

export default function Tasks() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { baseUrl, requstHeaders }: any = useContext(AuthContext);
  const [tasksList, setTasksList] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [modelState, setModelState] = useState("colse");
  const [usersList, setUsersList] = useState([]);
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
    setIsLoding(true);

    axios
      .put(`${baseUrl}/Task/${itemId}`, data, {
        headers: requstHeaders,
      })
      .then((response) => {
        handleClose();
        getAllTasks();
        toast.success("Task Updated Successfuly");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "'Task Not Updated'");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  //*************** to delete Task *****************
  const deleteTask = () => {
    setIsLoding(true);

    axios
      .delete(`${baseUrl}/Task/${itemId}`, {
        headers: requstHeaders,
      })
      .then((response) => {
        handleClose();
        getAllTasks();
        toast.success("Task Deleted Successfuly");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Task Not Deleted");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  // *************** to get all users *****************
  const getAllUsers = () => {
    axios
      .get(`${baseUrl}/Users/?pageSize=100&pageNumber=1`, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response);
        
        setUsersList(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went Wrong");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  // *************** to get all tasks *****************
  const getAllTasks = () => {
    setIsLoding(true);

    axios
      .get(`${baseUrl}/Task/manager?pageSize=10&pageNumber=1`, {
        headers: requstHeaders,
      })
      .then((response) => {

        setTasksList(response?.data?.data);
        console.log(response)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went Wrong");
      })
      .finally(() => {
        setIsLoding(false);
      });
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
        <div className="shareColor text-white w-75 text-center rounded-5">
          <span className="fw-bold"> in progress </span>
        </div>
      );
    } else if (tasksList.status == "Done") {
      return (
        <div className="bg-success text-white w-50 text-center rounded-5">
          <span className="fw-bold"> done </span>
        </div>
      );
    }
  };

  useEffect(() => {
    getAllTasks();
    getAllUsers();
  }, []);

  return (
    <>
      {/* ************* this model to delete Category *********** */}
      <Modal show={modelState == "delete-model"} onHide={handleClose}>
        <Modal.Body className="bg-danger text-white  rounded-5">
             <div className="text-center ">
              <img className="rounded-3" src={Photo7} alt="nodata" />
              <h4> Delete This Category ?</h4>
              <p>
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
            </div>

            <div className="text-end mt-5">
              <button
                onClick={deleteTask}
                className="btn btn-light  my-2"
              >
                {isLoding == true ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Delete this item"
                )}
              </button>
            </div>
         
        </Modal.Body>
      </Modal>

      {/* ************* this model to update Category *********** */}
      <Modal show={modelState == "update-model"} onHide={handleClose}>
        <Modal.Body className="caption bgr rounded-4 border1">
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

      {/* **************** to content above table ****************** */}
      <div className="bgc   ">
      <Header>
        <div className="bg-white header d-flex justify-content-between px-4 py-3 ">
          <h3 className="text2"> Tasks </h3>
          <div className=" px-5  ">
            <button
              onClick={addNewTask}
              className="btn btn-success rounded-5 btnColor "
            >
              + Add New Task
            </button>
          </div>
        </div>
      </Header>

      {/* **************** to display table ****************** */}
      {!isLoding ? (
        <div className="table-responsive  py-4  ">
          {tasksList.length > 0 ? (
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
                        <i
                          onClick={() => showUpdateModel(task)}
                          className="fa fs-6 text-success fa-edit"
                        ></i>
                        <i
                          onClick={() => showDeleteModel(task?.id)}
                          className="fa ms-3 fs-6 text-danger fa-trash"
                        ></i>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </div>
      ) : (
        <div className="text-center loading mb-5 mt-4 ">
          {" "}
          <i className="fa-solid text-success fa-spin fa-spinner fs-1"></i>{" "}
        </div>
      )}
      </div>
    </>
  );
}
