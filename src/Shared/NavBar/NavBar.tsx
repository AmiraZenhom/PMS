
import navImg from "../../assets/images/navbarImg.png"
import navLogo from "../../assets/images/navLogo.png"




export default function NavBar({adminData}) {
  // console.log(adminData);

  return (
    <>
    <div className=" px-3 py-1 navbarCaption d-flex justify-content-between ">

      <div className="">
        <img className='navlogo' src={navLogo} alt="" />
      </div>

      <div className=" w-25 d-flex ">
        <div className='navbarImg '>
          <img className='navbarImg' src={navImg} alt="" />
        </div>

        <div className='navCaption'>
          <span className='ms-2 fw-bold'> {adminData.userName} </span> <br />
          <span className='navEmail ms-2'> {adminData.userEmail} </span>
        </div>

      </div>

    </div>
  </>
  )
}
