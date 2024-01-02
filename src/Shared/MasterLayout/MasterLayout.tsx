import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";

export default function MasterLayout({adminData}) {
  return (
    <>
      <NavBar adminData = {adminData} />
      <div className='d-flex'>

        <div className='vh-100 '>
            <SideBar/>
        </div> 

        <div className='w-100 bgc'>
            <div className='container-fluid bord'>
              
                <Header/>
                <Outlet/>
            </div>
        </div>

      </div>

    </>
  )
}
