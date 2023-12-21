import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import logo from "../../assets/images/PMS 3.png";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
export default function RequestResetPass() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoding] = useState(false);
  const { baseUrl } = useContext(AuthContext);
   // ****************** to forgetPassword **********************
   const onSubmit = (data) => {
    // console.log(data);
    setIsLoding(true);

    axios
      .post(`${baseUrl}/Users/Reset/Request`, data)

      .then((response) => {
       
        navigate("/restPassword");
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
       <div className="Auth-container bgf w-100 vh-100">
    <div className="w-25 m-auto  text-center">
      <img className="w-75 mt-5" src={logo} alt="" />
    </div>
    <div className="mt-3 d-flex justify-content-center align-items-center">
      <div className="caption w-50 rounded-5 py-3 ">
        <form
          className="form w-75 m-auto py-4 my-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-white">welcome to PMS</p>
          <h2>ForgetPassword</h2>

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

          <div className="form-group text-center py-2 mt-5">
            <button className=" text-white">
              {isLoading == true ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Verify"
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
