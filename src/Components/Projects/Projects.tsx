import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import NoData from "../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import Header from "../../Shared/Header/Header";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Photo7 from "../../assets/images/download.png";

export default function Projects() {
  const navigate = useNavigate();
  const { baseUrl, requstHeaders, userRole }: any = useContext(AuthContext);
  const [projectList, setProjectList] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [modalState, setModalState] = useState("close");
  const [itemId, setItemId] = useState(0);
  const [projectDetails, setProjectDetails] = useState([]);
  const [projects, setProjects] = useState([]);
  const handleClose = () => setModalState("close");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const showAddModal = () => {
    getCategoryList();
    setValue("name", null);
    setModalState("modal-one");
  };
  const showViewModal = (id) => {
    setModalState("view-modal");
    getProjectDetails(id);
  };
  const showUpdateModal = (projectItem) => {
    getCategoryList();
    setItemId(projectItem.id);
    console.log(projectItem);
    setValue("title", projectItem.title);
    setValue("description", projectItem.description);

    setModalState("modal-three");
  };
  const UpdateCategory = (data) => {
    axios
      .put(`${baseUrl}/Project/${itemId}`, data, {
        headers: requstHeaders,
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        console.log(response);
        handleClose();
        getCategoryList();

        toast.success("Up date Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // *************** to  onSubmit projects *****************
  const onSubmit = (data) => {
    axios
      .post(`${baseUrl}/Project`, data, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response);

        handleClose();
        getCategoryList();
        toast.success("Add Successfully");
      })
      .catch((error) => {
        toast(error?.response?.data?.message || "error");
      });
  };
  const getProjectDetails = (id) => {
    axios
      .get(`${baseUrl}/Project/${id}`, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response.data);
        setProjectDetails(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // *************** to get all projects *****************
  const getCategoryList = () => {
    setIsLoding(true);
    axios
      .get(`${baseUrl}/Project/manager`, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response);

        setProjectList(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went Wrong");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };
  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("modal-two");
  };
  const getProject = () => {
    axios
      .get(`${baseUrl}/Project`, {
        headers: requstHeaders,
      })
      .then((response) => {
        setProjects(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // *************** to Delete projects *****************
  const deleteCategory = (id) => {
    axios
      .delete(`${baseUrl}/Project/${itemId}`, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response);
        handleClose();
        getCategoryList();
        toast.success("Delete Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // *************** to first run *****************
  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <>
      {/* **************** to AddModal ****************** */}
      <Modal show={modalState == "modal-one"} onHide={handleClose}>
        <Modal.Body className="mod1  caption  rounded-4 bgr py-4   border1">
          <form
            className="row g-3 needs-validation  "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h4 className="text1 text-center"> Add a New Project</h4>
            <div className="form-group ">
              <input
                type="text"
                className="form-control my-2 border-success"
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors.title && errors.title.type === "required" && (
                <span className="w-75 text-danger">title is required</span>
              )}
            </div>
            <textarea
              className="form-control mb-3 border-success "
              id="exampleFormControlTextarea1"
              placeholder="Description"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && errors.description.type === "required" && (
              <span className="w-75 text-danger">Description is required</span>
            )}
            <div className="row justify-content-end py-2">
              <div className="col-3  ">
                <button
                  onClick={handleClose}
                  className="btn btn-danger w-100 my-2  "
                >
                  Cancel
                </button>
              </div>
              <div className="col-3">
                <button className="btn btn-success w-100 my-2 btnColor">
                  Add
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* **************** to DeleteModal ****************** */}
      <Modal show={modalState == "modal-two"} onHide={handleClose}>
        <Modal.Body className="mod rounded-5 bg-danger text-white">
          <form
            className=" w-75  m-auto  "
            onSubmit={handleSubmit(deleteCategory)}
          >
            <div className="text-center ">
              <img className="rounded-3" src={Photo7} alt="nodata" />
              <h4> Delete This Category ?</h4>
              <p>
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
            </div>
            <div className="text-end">
              <button onClick={deleteCategory} className="btn btn-light  my-2">
                Delete this item
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={modalState == "view-modal"} onHide={handleClose}>
        <Modal.Body className="mod text-center caption  rounded-4 bgr py-4   border1 ">
          <h3 className="text-white">User Details</h3>
          <div className="text-start">
            <p>
              <span className="text-white">Name :</span> {projectDetails?.title}
            </p>
            <p>
              {" "}
              <span className="text-white">Description :</span>{" "}
              {projectDetails?.description}
            </p>

            <p>
              {" "}
              <span className="text-white">Date Created :</span>{" "}
              {projectDetails?.creationDate?.slice(0, 10)}
            </p>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={modalState == "modal-three"} onHide={handleClose}>
        <Modal.Body className="mod1  caption  rounded-4 bgr py-4   border1 ">
          <form
            className=" w-75  m-auto  "
            onSubmit={handleSubmit(UpdateCategory)}
          >
            <h4 className="text-white py-3"> Up date Item</h4>
            <div className="col-md-12 form-group ">
              <input
                type="text"
                className="form-control mb-3 border-success"
                id="validationCustom01"
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors.title && errors.title.type === "required" && (
                <span className="w-75 text-danger">Title is required</span>
              )}
              <div className="valid-feedback">Looks good!</div>
            </div>

            <textarea
              className="form-control mb-3 border-success"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Description"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && errors.description.type === "required" && (
              <span className="w-75 text-danger">Description is required</span>
            )}

            <button className="btn btn-success btnColor w-100 my-4">
              Up date
            </button>
          </form>
        </Modal.Body>
      </Modal>
      {/* **************** to content above table ****************** */}
      <div className="bgc   ">
        <Header>
          <div className="bg-white header d-flex justify-content-between px-4 py-3 ">
            <h3 className="text2"> Projects </h3>
            <div className=" px-5  ">
              <button
                onClick={showAddModal}
                className="btn btn-success rounded-5 btnColor "
              >
                + Add New Project
              </button>
            </div>
          </div>
        </Header>

        {/* **************** to display table ****************** */}
        {!isLoding ? (
          <div className="table-responsive py-4 ">
            {projectList.length > 0 ? (
              <table className="table table-striped mt-4">
                <thead className="">
                  <tr className="">
                    <th className="theadTable" scope="col">
                      #
                    </th>
                    <th className="theadTable">Title</th>
                    <th className="theadTable" scope="col">
                      Description
                    </th>
                    <th className="theadTable" scope="col">
                      Num Users
                    </th>
                    <th className="theadTable" scope="col">
                      Num Tasks
                    </th>
                    <th className="theadTable" scope="col">
                      Date Created
                    </th>
                    <th
                      className="theadTable text-center "
                      scope="col text-end"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {projectList.map((project, index) => (
                    <>
                      <tr key={project?.id}>
                        <td scope="row"> {index + 1} </td>
                        <td> {project?.title} </td>
                        <td className="">
                          {" "}
                          <div className="status w-50 text-center rounded-5">
                            {" "}
                            <span>{project.description}</span>{" "}
                          </div>
                        </td>
                        <td> 10 </td>
                        <td> 10 </td>
                        <td> {project?.creationDate.slice(0, 10)}</td>
                        {userRole == "Manager" ? (
                        <td className="text-center">
                          <i
                            onClick={() => showUpdateModal(project)}
                            className="fa fs-6 text-success fa-edit"
                          ></i>
                          <i
                            onClick={() => showDeleteModal(project.id)}
                            className="fa ms-3 fs-6 text-danger fa-trash"
                          ></i>
                          <i
                            onClick={() => showViewModal(project.id)}
                            className="fa fa-eye  ms-2 text1"
                          ></i>
                        </td>):""}
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
