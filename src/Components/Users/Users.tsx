import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import NoData from "../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import Header from "../../Shared/Header/Header";
import Modal from "react-bootstrap/Modal";
import Phot from "../../assets/images/navbarImg.png";

export default function Users({ adminData }) {
  const navigate = useNavigate();
  const { baseUrl, requstHeaders }: any = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [modalState, setModalState] = useState("close");
  const handleClose = () => setModalState("close");
  const [userDetails, setUserDetails] = useState([]);

  const showViewModal = (id) => {
    setModalState("view-modal");
    getUserDetails(id);
  };
  const getUserDetails = (id) => {
    axios
      .get(`${baseUrl}/Users/${id}`, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response.data);
        setUserDetails(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // *************** to get all projects *****************
  const getUserList = () => {
    setIsLoding(true);
    axios
      .get(`${baseUrl}/Users/?pageSize=10&pageNumber=1`, {
        headers: requstHeaders,
      })
      .then((response) => {
        setUserList(response?.data?.data);
        console.log(response);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went Wrong");
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <Modal show={modalState == "view-modal"} onHide={handleClose}>
        <Modal.Body className="mod text-center caption  rounded-4 bgr py-4   border1 ">
          <h3 className="text-white">User Details</h3>
          <div className="row">
            <div className="col-md-8">
              <div className="text-start">
                <p>
                  <span className="text-white">Name :</span>{" "}
                  {userDetails?.userName}
                </p>
                <p>
                  {" "}
                  <span className="text-white">Email :</span>{" "}
                  {userDetails?.email}
                </p>
                {userDetails.isActivated ? (
                  <p className="text-white">
                    status :{" "}
                    <span className="bg-success rounded-5 text-center mx-2 p-2 text1   act">
                      Activat
                    </span>
                  </p>
                ) : (
                  <p className="text-white" >
                    
                    Statues :
                    <span className="bg-danger rounded-5 text-center text1 mx-2 p-2 act ">
                      Not Active
                    </span>
                  </p>
                )}
                <p>
                  {" "}
                  <span className="text-white">Date Created :</span>{" "}
                  {userDetails?.creationDate?.slice(0, 10)}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              {/* <img className="bg-danger"  src={Phot} alt="" /> */}
              {userDetails.imagePath ? (
                <img className="w-100 rounded-2 border"
                  src={`http://upskilling-egypt.com:3003/` + userDetails.imagePath}
                  alt=""
                />
              ) : (
                <img className="bg-danger w-100 rounded-2 border" src={Phot} alt="" />
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="bgc   ">
        <div>
          {/* **************** to content above table ****************** */}
          <Header className=" header d-flex justify-content-between my-1    ">
            <h3 className="bg-white my-2 pb-4 fs-1 ps-4  "> Users </h3>
          </Header>
        </div>

        {/* **************** to display table ****************** */}
        {!isLoding ? (
          <div className="table-responsive py-4  ">
            {userList?.length > 0 ? (
              <table className="table table-striped mt-4 text-center   ">
                <thead>
                  <tr className="table-dark">
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
                  {userList.map((user, index) => (
                    <>
                      <tr className="py-3 my-2" key={user?.id}>
                        <td scope="row"> {index + 1} </td>
                        <td>{user.userName} </td>

                        <td className="    act">
                          {user.isActivated ? (
                            <span className="bg-success rounded-5 px-3 py-1">Activat</span>
                          ) : (
                            <span className="bg-danger rounded-5 p-1">Not Active</span>
                          )}
                        </td>

                        <td> {user.phoneNumber} </td>
                        <td> {user.email} </td>
                        <td> {user.creationDate?.slice(0, 10)} </td>
                        <td className="text-center">
                          <i
                            onClick={() => showViewModal(user.id)}
                            className="fa fa-eye fs-4 ms-2 text-success"
                          ></i>
                          <i className="fa ms-3 fs-5 text-danger fa-solid fa-ban"></i>
                         
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
