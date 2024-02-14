import logo from "../../assets/images/PMS 3.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";


export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);
  const { baseUrl, requstHeaders }: any = useContext(AuthContext);

  const goBack = () => {
    window.history.back();
  };

  // ****************** to login **********************
  const onSubmit = (data) => {
    setIsLoding(true);

    axios
      .put(`${baseUrl}/Users/ChangePassword`, data, {
        headers: requstHeaders,
      })

      .then((response) => {
        console.log(response);
        navigate("/dashboard");
        toast.success("Password Updated Successfully");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  return (
    <>
      <div className={`Auth-container  `}>
        <div className="imageLogo">
          <img className="w-100 " src={logo} alt="" />
        </div>
        <div className="mt-3 d-flex justify-content-center align-items-center animate__animated  animate__rollIn ">
          <div className="caption ">
            <form
              className="form w-75 m-auto mt-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                <div className="col-md-8">
                  {" "}
                  <p className="text-white mt-1">welcome to PMS</p>
                </div>
                <div className="col-md-4">
                  <div
                    onClick={goBack}
                    className=" ms-5 text-white nav-link  point   fs-5  "
                  >
                    <span>
                      <i className="fa-solid fa-arrow-left me-2"></i>
                    </span>{" "}
                    back
                  </div>
                </div>
              </div>
              <h2>Change Password</h2>

              {/* ************************* for input old password ***************************** */}
              <div className="form-group mt- position-relative mt-4">
                <label htmlFor="old">Old Password </label>
                <input
                  className={` inputs p-2`}
                  id="old"
                  placeholder="Enter your Old Password"
                  type="password"
                  {...register("oldPassword", {
                    required: true,
                    pattern:
                      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
                  })}
                />

                {errors.oldPassword &&
                  errors.oldPassword.type === "required" && (
                    <span className="text-danger mt-4">
                      oldPassword is required
                    </span>
                  )}

                {errors.oldPassword &&
                  errors.oldPassword.type === "pattern" && (
                    <span className="text-danger mt-4">
                      oldPassword must include at least one lowercase letter,
                      one uppercase letter, one digit, one special character,
                      and be at least 6 characters long
                    </span>
                  )}
              </div>

              {/* ************************* for input new password ***************************** */}
              <div className="form-group mt- position-relative mt-4">
                <label htmlFor="password"> New Password </label>
                <input
                  className="inputs p-2"
                  placeholder=" New Password"
                  id="password"
                  type="password"
                  {...register("newPassword", {
                    required: "Please Enter New Password",
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                  })}
                />

                {errors.newPassword && (
                  <span className="text-danger">
                    {errors.newPassword.message}
                  </span>
                )}
              </div>

              {/* ************************* for input confirm password ***************************** */}
              <div className="form-group position-relative mt-4">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                  className="inputs p-2"
                  placeholder="Confirm New Password"
                  id="confirmNewPassword"
                  type="password"
                  {...register("confirmNewPassword", {
                    required: "Please confirm your password",
                    validate: {
                      checkNewPassConfirmationHandler: (value) => {
                        const { newPassword } = getValues();
                        return (
                          newPassword === value ||
                          "Newpassword and confirmNewPassword doesn't match!!"
                        );
                      },
                    },
                  })}
                />

                {errors.confirmNewPassword && (
                  <span className="text-danger">
                    {errors.confirmNewPassword?.message}
                  </span>
                )}
              </div>

              <div className="form-group text-center mt-4">
                <button onClick={onSubmit} className=" text-white">
                  {isLoding == true ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Change"
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
