import { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function SideBar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  let { userRole }: any = useContext(AuthContext);

  const handelToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  // ******************* to log out ********************
  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <>
      <div className="sideBar-container overflow-visible  ">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <MenuItem
              className="togel "
              onClick={handelToggle}
              icon={
                isCollapsed ? (
                  <i className="fa-solid icon-tolgle-right  fa-chevron-right"></i>
                ) : (
                  <i className="fa-solid icon-tolgle-left fa-chevron-left "></i>
                )
              }
            ></MenuItem>

            <MenuItem
              className={
                isCollapsed
                  ? "hov_collapsed icons iconHover mx-3"
                  : "icons iconHover mx-3"
              }
              icon={<i className="fa fa-home me-4 "></i>}
              component={<Link to="/dashboard" />}
            >
              {!isCollapsed ? "Home" : ""}
            </MenuItem>

            {userRole == "Manager" ? (
              <MenuItem
                className={
                  isCollapsed
                    ? "hov_collapsed icons iconHover mx-3"
                    : "icons iconHover mx-3"
                }
                icon={<i className="fa-solid fa-users me-4"></i>}
                component={<Link to="/dashboard/users" />}
              >
                {!isCollapsed ? "Users" : ""}
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              className={
                isCollapsed
                  ? "hov_collapsed icons iconHover mx-3"
                  : "icons iconHover mx-3"
              }
              icon={<i className="fa-solid fa-diagram-project me-4"></i>}
              component={<Link to="/dashboard/projects" />}
            >
              {!isCollapsed ? " Projects" : ""}
            </MenuItem>

            <MenuItem
              className={
                isCollapsed
                  ? "hov_collapsed icons iconHover mx-3"
                  : "icons iconHover mx-3"
              }
              icon={<i className="fa-solid fa-tasks me-4"></i>}
              component={<Link to="/dashboard/tasks" />}
            >
              {!isCollapsed ? " Tasks" : ""}
            </MenuItem>

            <MenuItem
              className={
                isCollapsed
                  ? "hov_collapsed icons iconHover mx-3"
                  : "icons iconHover mx-3"
              }
              icon={<i className="fa-solid fa-unlock me-4"></i>}
              component={<Link to="/changePassword" />}
            >
              {!isCollapsed ? " Change Password" : ""}
            </MenuItem>

            <MenuItem
              className={
                isCollapsed
                  ? "hov_collapsed icons iconHover mx-3 "
                  : "icons iconHover mx-3"
              }
              onClick={logout}
              icon={<i className="fa-solid fa-right-from-bracket me-4"></i>}
            >
              {!isCollapsed ? "   Logout" : ""}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
