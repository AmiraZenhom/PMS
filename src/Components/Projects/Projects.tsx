import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import NoData from "../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import noData from "../../assets/images/bg3.png";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function Projects() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { baseUrl, requstHeaders, userRole }: any = useContext(AuthContext);
  const [projectList, setProjectList] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [modelState, setModelState] = useState("colse");
  const handleClose = () => setModelState("colse");

  // *************** to show delete model ***************
  const showDeleteModel = (id) => {
    setItemId(id);
    setModelState("delete-model");
  };

  // *************** to show update model ***************
  const showUpdateModel = (project) => {
    setItemId(project?.id);
    setValue("title", project?.title);
    setValue("description", project?.description);
    setModelState("update-model");
  };

  //*************** to delete project *****************
  const deleteProject = () => {
    setIsLoding(true);

    axios
      .delete(`${baseUrl}/Project/${itemId}`, {
        headers: requstHeaders,
      })
      .then((response) => {
        handleClose();
        getAllProject();
        toast.success("Project Deleted Successfuly");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Project Not Deleted");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  // *************** to update project *****************
  const updateProject = (data) => {
    setIsLoding(true);

    axios
      .put(`${baseUrl}/Project/${itemId}`, data, {
        headers: requstHeaders,
      })
      .then((response) => {
        handleClose();
        getAllProject();
        toast.success("Project Updated Successfuly");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "'Project Not Updated'");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  // *************** to get all projects *****************
  const getAllProject = ( pageNo:number) => {
    setIsLoding(true);
  
    axios
      .get(
        userRole == "Manager"?
            `${baseUrl}/Project/manager`:`${baseUrl}/Project/employee`,
       
      
         {
        headers: requstHeaders,
        params: {
          pageSize: 5,
          pageNumber: pageNo,
        },
      })
      .then((response) => {
        console.log(userRole);
        
        setProjectList(response?.data?.data);
        setArrayOfPages(
          Array(response?.data?.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went Wrong");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };
  //**************** for navigate to add new project ******************
  const addNewProject = () => {
    navigate("/dashboard/projects/addProject");
  };

  useEffect(() => {
    getAllProject();
  }, [userRole]);

  return (
    <>
      {/* ************* this model to delete Category *********** */}
      <Modal show={modelState == "delete-model"} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center noData mt-3">
            <img className="w-50" src={noData} alt="" />
            <h5 className="mt-3">Delete This Category ?</h5>
            <p>
              are you sure you want to delete this item ? if you are sure just{" "}
              <br /> click on delete it
            </p>

            <div className="text-end mt-5">
              <button
                onClick={deleteProject}
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
            <h3 className="ms-3 mt-3 text-center fw-bold">Update project</h3>
          </div>

          <form
            className="form w-100 m-auto mt-5"
            onSubmit={handleSubmit(updateProject)}
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
<div className=" animate__animated  animate__zoomInDown">
      {/* **************** to content above table ****************** */}
      <div className="bg-white header d-flex justify-content-between px-4 py-3 ">
        <h3 className="text1"> Projects </h3>
        {userRole == "Manager" ? (
          <button onClick={addNewProject} className="shredBtn">
            {" "}
            <i className="fa fa-plus"></i> Add New Project{" "}
          </button>
        ) : (
          ""
        )}
      </div>

      {/* **************** to display table ****************** */}

      {!isLoding ? (
        <div className="table-responsive px-4 ">
          {projectList.length > 0 ? (
            <>
              {" "}
              <table className="table table-striped mt-4 ">
                <thead className="">
                  <tr className="">
                    <th className="theadTable" scope="col">
                      #
                    </th>
                    <th className="theadTable">Title</th>
                    <th className="theadTable " scope="col">
                      Description
                    </th>
                    <th className="theadTable " scope="col">
                      Date Created
                    </th>
                    {userRole == "Manager" ? (
                      <th
                        className="theadTable text-center  "
                        scope="col text-end"
                      >
                        Actions
                      </th>
                    ) : (
                      <th className=" theadTable  " scope="col "></th>
                    )}
                  </tr>
                </thead>

                <tbody className="bgtr ">
                  {projectList.map((project, index) => (
                    <>
                      <tr key={project?.id}>
                        <td scope="row" className="py-3 text-success  ">
                          {" "}
                          {index + 1}-{" "}
                        </td>
                        <td className="texttr"> {project?.title} </td>
                        <td className="texttr"> {project?.description} </td>
                        <td className="texttr">
                          {" "}
                          {project?.creationDate.slice(0, 10)}{" "}
                        </td>
                        <td className="text-center texttr">
                          {userRole == "Manager" ? (
                            <div>
                              <button
                                className="actionBtn"
                                onClick={() => showUpdateModel(project)}
                              >
                                <i className="fa fs-6 text-success fa-edit"></i>
                              </button>

                              <button
                                className="actionBtn"
                                onClick={() => showDeleteModel(project?.id)}
                              >
                                <i className="fa ms-3 fs-6 text-danger fa-trash"></i>
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
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
                          getAllProject(userRole, pageNo);
                        }}
                        className="page-item  p-2 element-with-pointer pe-auto"
                      >
                        <a className="page-link">{pageNo}</a>
                      </li>
                    </>
                  ))}
                </ul>
              </nav>
            </>
          ) : (
            <NoData />
          )}
        </div>
      ) : (
        <div className="text-center loading mb-5 mt-4 ">
          {" "}
          <i className="fa-solid text-success fa-spin fa-spinner"></i>{" "}
        </div>
      )}
      </div>
    </>
  );
}
