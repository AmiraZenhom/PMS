import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import logo from "../../assets/images/PMS 3.png";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
export default function VerfiyUser({ saveAdminData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoding] = useState(false);
  const { baseUrl } = useContext(AuthContext);

  // ****************** to login **********************
  const onSubmit = (data) => {
    // console.log(data);
    setIsLoding(true);

    axios
      .put(`${baseUrl}/Users/verify`, data)

      .then((response) => {
        localStorage.setItem("adminToken", response.data.token);
        navigate("/login");
        toast.success("Successfully");
      })
      .catch((error) => {
        // console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
        setIsLoding(false);
      });
  };
  return (
    <>
    <div className="Auth-container bgl w-100 vh-100 ">
        <div className="w-25 m-auto  text-center">
          <img className="w-75 mt-5 " src={logo} alt="" />
        </div>
        <div className="mt-3 d-flex justify-content-center align-items-center">
          <div className="caption w-50 rounded-5 py-3 ">
            <form
              className="form w-75 m-auto mt-4"
              onSubmit={handleSubmit(onSubmit)}
            >
             
              <p className="text-white">welcome to PMS <br />
                       <h2 className="text1">Verify Account</h2></p>

              {/* ************************* for input email ***************************** */}
              <div className="form-group mt-5 position-relative mt-4">
                <label htmlFor="">E-mail</label>
                <input
                  className=" py-2 text-white inputs"
                  placeholder="Enter your E-mail"
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                />

                {errors.email && errors.email.type === "required" && (
                  <span className="text-danger mt-4">Email is required</span>
                )}

                {errors.email && errors.email.type === "pattern" && (
                  <span className="text-danger mt-4">invaild email</span>
                )}
              </div>

              {/* ************************* for input code ************************* */}
              <div className="form-group mt-4 position-relative">
                <label htmlFor="">OTP Verification</label>
                <input
                  className="py-2 text-white inputs"
                  placeholder="Enter Verification"
                  type="text"
                  {...register("code", {
                    required: true,
                   
                  })}
                />

                {errors.code && errors.code.type === "required" && (
                  <span className="text-danger mt-4">Code is required</span>
                )}

              
              </div>

           

              <div className="form-group text-center mt-4">
                <button className=" text-white">
                  {isLoading == true ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div></>
  )
}
