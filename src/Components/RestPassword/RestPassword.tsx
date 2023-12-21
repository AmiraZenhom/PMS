import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import logo from "../../assets/images/PMS 3.png";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
export default function RestPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoding] = useState(false);
  const { baseUrl } = useContext(AuthContext);
    // ****************** to resetPassword **********************
    const onSubmit = (data) => {
      // console.log(data);
      setIsLoding(true);
  
      axios
        .post(`${baseUrl}/Users/Reset`, data)
  
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
        <div className="w-25 m-auto text-center">
          <img className="w-75 mt-2" src={logo} alt="" />
        </div>
        <div className=" d-flex justify-content-center align-items-center">
          <div className="caption  w-50 rounded-5  ">
            <form
              className="form w-75 m-auto mt-4"
              onSubmit={handleSubmit(onSubmit)}
            >
             
              <p className="text-white">welcome to PMS <br />
                       <h2 className="text1"> Reset  Password</h2></p>

              {/* ************************* for input email ***************************** */}
                <div className="form-group mt-2 position-relative mt-4">
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

              {/* ************************* for input OTP ************************* */}
              <div className="form-group mt-4 position-relative">
                <label htmlFor="">OTP Verification</label>
                <input
                  className="py-2 text-white inputs"
                  placeholder="Enter Verification"
                  type="password"
                  {...register("seed", {
                    required: true,
                   
                  })}
                />

                {errors.seed && errors.seed.type === "required" && (
                  <span className="text-danger mt-4">code is required</span>
                )}

              
              </div>
              {/* ************************* for input New Password ************************* */}
              <div className="form-group mt-4 position-relative">
                <label htmlFor="">New Password</label>
                <input
                  className="py-2 text-white inputs"
                  placeholder="Enter your New Password"
                  type="password"
                  {...register("password", {
                    required: true,
                    pattern:
                      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                  })}
                />

                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger mt-4">password is required</span>
                )}

                {errors.password && errors.password.type === "pattern" && (
                  <span className="text-danger mt-4">
                    Password must include at least one lowercase letter, one
                    uppercase letter, one digit, one special character, and be
                    at least 6 characters long
                  </span>
                )}
              </div>
              {/* ************************* for input confirmNewPassword ************************* */}
              <div className="form-group mt-4 position-relative">
                <label htmlFor="">Confirm Password</label>
                <input
                  className="py-2 text-white inputs"
                  placeholder="Confirm New Password"
                  type="password"
                  {...register("confirmPassword", {
                    required: true,
                    pattern:
                      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                  })}
                />

                {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                  <span className="text-danger mt-4">confirmPassword is required</span>
                )}

                {errors.confirmNewPassword && errors.confirmNewPassword.type === "pattern" && (
                  <span className="text-danger mt-4">
                    Password must include at least one lowercase letter, one
                    uppercase letter, one digit, one special character, and be
                    at least 6 characters long
                  </span>
                )}
              </div>

           

              <div className="form-group text-center mt-4 mb-4">
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
