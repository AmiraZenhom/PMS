import { useForm } from "react-hook-form";
import {  Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/PMS 3.png";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
export default function ChangePassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoding] = useState(false);
  const { baseUrl } = useContext(AuthContext);

  // ****************** to changePassword **********************
  const onSubmit = (data) => {
    // console.log(data);
    setIsLoding(true);

    axios
      .post(`${baseUrl}/Users/ChangePassword`, data)

      .then((response) => {
       
        console.log(response)
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
        <div className="Auth-container bgr w-100 vh-100">
          <div className="">  <Link to="/dashboard"  className=' ms-5 fs-4  text-white '> 
                   <span><i className="fa-solid fa-arrow-left"></i></span> back to home
                  </Link></div>
        <div className="w-25 m-auto text-center">
          <img className="w-75 mt-5" src={logo} alt="" />
        </div>
        <div className="mt-3 d-flex justify-content-center align-items-center">
          <div className="caption  w-50 rounded-5 py-3 ">
            <form
              className="form w-75 m-auto mt-4"
              onSubmit={handleSubmit(onSubmit)}
            >
             
              <p className="text-white">welcome to PMS <br />
                       <h2 className="text1"> Change Password</h2></p>
            

              {/* ************************* for input password ************************* */}
              <div className="form-group mt-4 position-relative">
                <label htmlFor="">oldPassword</label>
                <input
                  className="py-2 text-white inputs"
                  placeholder="oldPassword"
                  type="password"
                  {...register("oldPassword", {
                    required: true,
                    pattern:
                      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                  })}
                />

                {errors.oldPassword && errors.oldPassword.type === "required" && (
                  <span className="text-danger mt-4">oldPassword is required</span>
                )}

                {errors.oldPassword && errors.oldPassword.type === "pattern" && (
                  <span className="text-danger mt-4">
                    Password must include at least one lowercase letter, one
                    uppercase letter, one digit, one special character, and be
                    at least 6 characters long
                  </span>
                )}
              </div>
              {/* ************************* for input New Password ************************* */}
              <div className="form-group mt-4 position-relative">
                <label htmlFor="">New Password</label>
                <input
                  className="py-2 text-white inputs"
                  placeholder="New Password"
                  type="password"
                  {...register("newPassword", {
                    required: true,
                    pattern:
                      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                  })}
                />

                {errors.newPassword && errors.newPassword.type === "required" && (
                  <span className="text-danger mt-4">Password is required</span>
                )}

                {errors.newPassword && errors.newPassword.type === "pattern" && (
                  <span className="text-danger mt-4">
                    Password must include at least one lowercase letter, one
                    uppercase letter, one digit, one special character, and be
                    at least 6 characters long
                  </span>
                )}
              </div>
              {/* ************************* for input confirmNewPassword ************************* */}
              <div className="form-group mt-4 position-relative">
                <label htmlFor="">New Password</label>
                <input
                  className="py-2 text-white inputs"
                  placeholder="Confirm New Password"
                  type="password"
                  {...register("confirmNewPassword", {
                    required: true,
                    pattern:
                      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                  })}
                />

                {errors.confirmNewPassword && errors.confirmNewPassword.type === "required" && (
                  <span className="text-danger mt-4">Password is required</span>
                )}

                {errors.confirmNewPassword && errors.confirmNewPassword.type === "pattern" && (
                  <span className="text-danger mt-4">
                    Password must include at least one lowercase letter, one
                    uppercase letter, one digit, one special character, and be
                    at least 6 characters long
                  </span>
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
      </div>
    
    </>
  )
}
