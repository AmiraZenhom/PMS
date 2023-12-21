import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";



export default function SideBar() {

  const [isCollapsed , setIsCollapsed] = useState(false);

  const handelToggle = ()=>{
    setIsCollapsed(!isCollapsed);
  }

  const navigate = useNavigate()

  const logout = ()=>{
    localStorage.removeItem("adminToken");
    navigate("/login")
  }

  return (
    
    <>
    <div className="sideBar-container">

      <Sidebar  collapsed={isCollapsed}>
        <Menu >
          <MenuItem onClick={handelToggle} icon={ <i className="fa-solid fa-users"></i>}> </MenuItem>
          <MenuItem className="icons" icon={<i className="fa fa-home"></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/users" />}> Users</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-table"></i>} component={<Link to="/dashboard/projects" />}> Projects</MenuItem>
          <MenuItem icon={<i className="fa-regular fa-calendar-days"></i>} component={<Link to="/dashboard/tasks" />}> Tasks</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-unlock"></i>} component={<Link to="/changePassword" />}> Change Password</MenuItem>
          <MenuItem onClick={logout} icon={<i className="fa-solid fa-right-from-bracket"></i>}> Logout</MenuItem>
        </Menu>
      </Sidebar>
      {/* <button onClick={logout} className="btn btn-success">Logout</button> */}

    </div>
    </>
  )
}
