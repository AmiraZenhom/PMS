import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";

export default function MasterLayout({adminData}) {
  return (
    <>
      <div className='d-flex'>

        <div className='bg-danger'>
            <SideBar/>
        </div> 

        <div className='w-100 bg-info'>
            <div className='container-fluid'>
                <NavBar adminData = {adminData} />
                <Header/>
                <Outlet/>
            </div>
        </div>

      </div>

    </>
  )
}
