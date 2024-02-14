import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import NoData from "../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import avatar from "../../assets/images/navbarImg.png";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const { baseUrl, requstHeaders, userRole }: any = useContext(AuthContext);
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);
  const [userId, setUserId] = useState(0);
  const [modelState, setModelState] = useState("colse");
  const [userDetails, setUserDetails] = useState({});
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const handleClose = () => setModelState("colse");

  // *************** to view detail of user *****************
  const showViewModel = (id) => {
    setUserId(id);
    setModelState("view-model");
    getUserDetails(id);
  };

  // *************** to get user details *****************
  const getUserDetails = (id) => {
    axios
      .get(`${baseUrl}/Users/${id}`, {
        headers: requstHeaders,
      })
      .then((response) => {
        setUserDetails(response?.data);
      })
      .catch((error) => {
        error(error?.response?.data?.message || "Not Found Tag Ids");
      });
  };

  // *************** to toggle active user *****************
  const toggleUser = (id) => {
    setIsLoding(true);

    axios
      .put(
        `${baseUrl}/Users/${id}`,
        { id },
        {
          headers: requstHeaders,
        }
      )
      .then((response) => {
        console.log(response);
        getAllUsers();
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "User not blocked");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  // *************** to get all users *****************
  const getAllUsers = (pageNo) => {
    setIsLoding(true);
    axios
      .get(`${baseUrl}/Users/`, {
        headers: requstHeaders,
        params: {
          pageSize: 10,
          pageNumber: pageNo,
        },
      })
      .then((response) => {
        setUsersList(response?.data?.data);
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

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {/* ************* this model to view recipe *********** */}
      <Modal show={modelState == "view-model"} onHide={handleClose}>
        <Modal.Body>
          <h3 className="ms- mt-3 text-success fw-bold">User Details</h3>

          <div className="w-50 text-center m-auto mt-4">
            {userDetails?.imagePath ? (
              <img
                className="w-75"
                src={
                  `https://upskilling-egypt.com:3003/` + userDetails.imagePath
                }
                alt=""
              />
            ) : (
              <img className="w-75" src={avatar} alt="" />
            )}
          </div>

          <div className="mt-4 userDetails">
            <h6 className="mt-4 pb-2 fs-4">
              {" "}
              <span className="text-success fs-6">User Name : </span>{" "}
              {userDetails?.userName}{" "}
            </h6>
            <h6 className="fs-4 pb-2">
              {" "}
              <span className="fs-6 text-success">Role : </span>{" "}
              {userDetails?.group?.name}{" "}
            </h6>
            <h6 className="fs-4 pb-2">
              {" "}
              <span className="fs-6 text-success">Email : </span>{" "}
              {userDetails?.email}{" "}
            </h6>
            <h6 className="fs-4 pb-2">
              {" "}
              <span className="fs-6 text-success">Phone Number : </span>{" "}
              {userDetails?.phoneNumber}{" "}
            </h6>
          </div>
        </Modal.Body>
      </Modal>
      <div className=" animate__animated  animate__backInLeft">
        {/* **************** to content above table ****************** */}
        <div className="bg-white header d-flex justify-content-between px-4 py-3 ">
          <h3 className="text1"> Users </h3>
        </div>

        {/* **************** to display table ****************** */}
        {!isLoding ? (
          <div className="table-responsive px-4 ">
            {usersList.length > 0 ? (
              <>
                <table className="table table-striped mt-4   ">
                  <thead className="">
                    <tr className="">
                      <th className="theadTable" scope="col">
                        #
                      </th>
                      <th className="theadTable">User Name</th>
                      <th className="theadTable" scope="col">
                        Statues
                      </th>
                      <th className="theadTable" scope="col">
                        Phone Number
                      </th>
                      <th className="theadTable" scope="col">
                        Email
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
                    {usersList.map((user, index) => (
                      <>
                        <tr key={user?.id}>
                          <td scope="row">
                            {" "}
                            {user?.isActivated ? (
                              <div> {index + 1}</div>
                            ) : (
                              <div className="text-danger"> {index + 1}</div>
                            )}
                          </td>

                          <td>
                            {" "}
                            {user?.isActivated ? (
                              <div>{user?.userName}</div>
                            ) : (
                              <div className="text-danger">
                                {user?.userName}
                              </div>
                            )}
                          </td>
                          <td>
                            {" "}
                            {user?.isActivated ? (
                              <div className="bg-success text-white w-100 text-center rounded-5">
                                <span> Active </span>
                              </div>
                            ) : (
                              <div className="bg-danger text-white text-center rounded-5 w-100">
                                <span> Not Active </span>
                              </div>
                            )}
                          </td>
                          <td>
                            {" "}
                            {user?.isActivated ? (
                              <div> {user?.phoneNumber}</div>
                            ) : (
                              <div className="text-danger">
                                {" "}
                                {user?.phoneNumber}
                              </div>
                            )}
                          </td>
                          <td>
                            {" "}
                            {user?.isActivated ? (
                              <div> {user?.email}</div>
                            ) : (
                              <div className="text-danger"> {user?.email}</div>
                            )}
                          </td>

                          <td>
                            {" "}
                            {user?.isActivated ? (
                              <div>{user?.creationDate.slice(0, 10)} </div>
                            ) : (
                              <div className="text-danger">
                                {" "}
                                {user?.creationDate.slice(0, 10)}{" "}
                              </div>
                            )}
                          </td>

                          <td className="text-center">
                            {user?.isActivated ? (
                              <i
                                onClick={() => showViewModel(user.id)}
                                className="fa fs-6 text-success fa-eye point"
                              ></i>
                            ) : (
                              <i
                                onClick={() => showViewModel(user.id)}
                                className="fa fs-6 text-danger fa-eye point"
                              ></i>
                            )}

                            {user?.isActivated ? (
                              <button
                                onClick={() => toggleUser(user?.id)}
                                className="block bg-success mx-3 "
                              >
                                {" "}
                                Block{" "}
                              </button>
                            ) : (
                              <button
                                onClick={() => toggleUser(user?.id)}
                                className="unBlockBtn bg-danger mx-3"
                              >
                                {" "}
                                Un Block{" "}
                              </button>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
                <nav aria-label="...">
                  <ul className="pagination  point pagination-sm d-flex justify-content-center">
                    {arrayOfPages.map((pageNo) => (
                      <>
                        <li
                          onClick={() => {
                            getAllUsers(pageNo);
                          }}
                          className="page-item  p-2 element-with-pointer pe-auto"
                        >
                          <a className="page-link">{pageNo}</a>
                        </li>
                      </>
                    ))}
                  </ul>
                </nav>{" "}
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
