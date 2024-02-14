import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/PMS 3.png";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
export default function Register({ saveAdminData }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoding] = useState(false);
  const { baseUrl }:any = useContext(AuthContext);
  // ****************** to Register **********************
  const onSubmit = (data) => {
    // console.log(data);
    setIsLoding(true);

    axios
      .post(`${baseUrl}/Users/Register`, data)

      .then((response) => {
        localStorage.setItem("adminToken", response.data.token);
       
        console.log(response);
        navigate("/verify");
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
      <div className="Auth-container bgr vh-100 w-100">
        <div className="w-25 m-auto  text-center">
          <img className="w-75 mt-2 " src={logo} alt="" />
        </div>
        <div className="mt-2 w-100  d-flex justify-content-center align-items-center">
          <div className="caption w-50 rounded-5 py-3  ">
            <form
              className="form w-75 m-auto mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
             
              <p className="text-white mt-3">welcome to PMS <br />
                       <h2 className="text1">Create New Account</h2></p>

              <div className="row">
                {/* ************************* for input Image ***************************** */}
                <div className="form-group mt-1 mt-2 col-md-12">
                  <div className="w-25 text-center   photo m-auto">
                    
                    <input
                      className=" p-2 bg-white text-white text-center inputs rounded-5"
                      aria-label="file example"
                      type="file"
                      {...register("profileImage", {})}
                    />
                  </div>
                </div>
                {/* ************************* for input Name ***************************** */}
                <div className="form-group mt-3 position-relative mt-4 col-md-6">
                  <label htmlFor="">User Name</label>
                  <input
                    className=" p-2 text-white inputs"
                    placeholder="Enter your name"
                    type="text"
                    {...register("userName", {
                      required: true,
                    })}
                  />

                  {errors.userName && errors.userName.type === "required" && (
                    <span className="text-danger mt-4">
                      userName is required
                    </span>
                  )}
                </div>
                {/* ************************* for input email ***************************** */}
                <div className="form-group mt-3 position-relative mt-4 col-md-6">
                  <label htmlFor="">E-mail</label>
                  <input
                    className=" p-2 text-white inputs"
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
                {/* ************************* for input country ***************************** */}
                <div className="form-group mt-3 position-relative mt-4 col-md-6">
                  <label htmlFor="">country</label>
                  <input
                    className=" p-2 text-white inputs"
                    placeholder="Enter your country"
                    type="text"
                    {...register("country", {
                      required: true,
                    })}
                  />

                  {errors.country && errors.country.type === "required" && (
                    <span className="text-danger mt-4">
                      country is required
                    </span>
                  )}
                </div>
                {/* ************************* for input Phone Number ***************************** */}
                <div className="form-group mt-3 position-relative mt-4 col-md-6">
                  <label htmlFor="">Phone Number</label>
                  <input
                    className=" p-2 text-white inputs"
                    placeholder="Enter your phone number"
                    type="number"
                    {...register("phoneNumber", {
                      required: true,
                    })}
                  />

                  {errors.phoneNumber &&
                    errors.phoneNumber.type === "required" && (
                      <span className="text-danger mt-4">
                        phoneNumber is required
                      </span>
                    )}
                </div>

                {/* ************************* for input password ************************* */}
                <div className="form-group mt-3 position-relative col-md-6">
                  <label htmlFor="">Password</label>
                  <input
                    className="p-2 text-white inputs"
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                    })}
                  />

                  {errors.password && errors.password.type === "required" && (
                    <span className="text-danger mt-3">
                      Password is required
                    </span>
                  )}

                  {errors.password && errors.password.type === "pattern" && (
                    <span className="text-danger mt-4">
                      Password must include at least one lowercase letter, one
                      uppercase letter, one digit, one special character, and be
                      at least 6 characters long
                    </span>
                  )}
                </div>
                {/* ************************* for input confirmPassword ************************* */}
                <div className="form-group mt-3 position-relative col-md-6">
                  <label htmlFor="">Password</label>
                  <input
                    className="p-2 text-white inputs"
                    placeholder="Confirm New Password"
                    type="password"
                    {...register("confirmPassword", {
                      required: true,
                      pattern:
                        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                    })}
                  />

                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "required" && (
                      <span className="text-danger mt-4">
                        confirmPassword is required
                      </span>
                    )}

                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "pattern" && (
                      <span className="text-danger mt-4">
                        confirmPassword must include at least one lowercase
                        letter, one uppercase letter, one digit, one special
                        character, and be at least 6 characters long
                      </span>
                    )}
                </div>
              </div>

              <div className="form-group text-center mt-4 mb-2">
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
  );
}