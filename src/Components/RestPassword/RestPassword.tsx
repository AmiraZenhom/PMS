import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    formState : { errors },
  } = useForm();
  const [isLoding , setIsLoding] =useState(false);
  const {baseUrl} = useContext(AuthContext)
   
   const onSubmit = (data)=> {
    setIsLoding(true)

    axios.post(`${baseUrl}/Users/Reset` , data)

    .then(()=> {   
      navigate("/login")
      toast.success("Successfully Reset Your Password")
    })
    .catch((error)=> {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message)
      setIsLoding(false)
    })
  }



  return(<>
     <div className="Auth-container">
        <div className='imageLogo mt-4 text-center'>
          <img className='w-100' src= {logo} alt="" />
        </div>
        <div className="mt-3 d-flex justify-content-center align-items-center">
          
          <div className="caption ">

              <form className='form w-75 m-auto ' onSubmit={handleSubmit(onSubmit)}>
                <p className="text-white">welcome to PMS</p>
                <h2>Reset Password</h2>


  {/* ************************* for input email ***************************** */}
                <div className='form-group mt-2 position-relative mt-4'>
                    <label htmlFor="">E-mail</label>
                    <input className=' p-2 text-white inputs' 
                      placeholder= 'Enter your E-mail' 
                      type="email" 
                      {...register("email" , {
                        required: true,
                        pattern : /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                      })}
                    />

                  {errors.email && errors.email.type === "required" && (
                  <span className='text-danger mt-4'>Email is required</span>
                  )}

                  {errors.email && errors.email.type === "pattern" && (
                  <span className='text-danger mt-4'>invaild email</span>
                  )}
                </div>
  {/* ************************* for OTP code ***************************** */}
                <div className='form-group mt-2 position-relative mt-4'>
                    <label htmlFor="">OTP Verification</label>
                    <input className=' py-2 text-white inputs' 
                      placeholder= 'Enter Verification' 
                      type="text" 
                      {...register("seed" , {
                        required: true,
                      })}
                    />

                  {errors.seed && errors.seed.type === "required" && (
                  <span className='text-danger mt-4'>OTP is required</span>
                  )}
                </div>

  {/* ************************* for input password ************************* */}
              <div className='form-group mt-2 position-relative'>
                  <label htmlFor="">Password</label>
                  <input className='p-2 text-white inputs' 
                    placeholder='Enter your password' 
                    type="password" 
                    {...register("password" , {
                      required : true,
                      pattern : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/
                    })}
                  />

                  {errors.password && errors.password.type === "required" && (
                  <span className='text-danger mt-4'>Password is required</span>
                  )}

                  {errors.password && errors.password.type === "pattern" && (
                  <span className='text-danger mt-4'>Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long</span>
                  )}
               </div>



  {/* ************************* for input Confirm password ************************* */}
                <div className='form-group mt-2 position-relative'>
                  <label htmlFor="">Password</label>
                  <input className='p-2 text-white inputs' 
                    placeholder='Confirm password' 
                    type="password" 
                    {...register("confirmPassword" , {
                      required : true,
                      pattern : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/
                    })}
                  />

                  {errors.password && errors.password.type === "required" && (
                  <span className='text-danger mt-4'>Password is required</span>
                  )}

                  {errors.password && errors.password.type === "pattern" && (
                  <span className='text-danger mt-4'>Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long</span>
                  )}

                </div>

                <div className='form-group text-center mt-4'>
                  <button className=' text-white' type="submit"> 
                    {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "save"}
                  </button>
                </div>

              </form>
          

          </div>
        </div>
     </div>
    </>
  )
}
