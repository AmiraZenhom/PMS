
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import MasterLayout from './Shared/MasterLayout/MasterLayout'
import NotFound from './Shared/NotFound/NotFound'
import Home from './Components/Home/Home'
import Projects from './Components/Projects/Projects'
import Users from './Components/Users/Users'
import Tasks from './Components/Tasks/Tasks'
import AuthLayout from './Shared/AuthLayout/AuthLayout'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import RestPassword from './Components/RestPassword/RestPassword'
import RequestResetPass from './Components/RequestResetPass/RequestResetPass'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import VerfiyUser from './Components/VerfiyUser/VerfiyUser'
import { ToastContainer } from 'react-toastify'
// import { useContext, useEffect, useState } from 'react'
// import { jwtDecode } from 'jwt-decode'
import ProtectedRouter from './Shared/ProtectedRouter/ProtectedRouter'
import { AuthContext } from './Context/AuthContext'
import { useContext } from 'react'
import AddNewTask from './Components/AddNewTask/AddNewTask'

import Bar from './Components/PieCharts/Bar'



function App() {

  let {adminData , saveAdminData} = useContext(AuthContext)

  const routes = createBrowserRouter([
    {
      path : "dashboard",
      element : ( <ProtectedRouter adminData = {adminData}>
                  <MasterLayout adminData = {adminData} />
                </ProtectedRouter>
                ),
      errorElement : <NotFound/>,
      children : [
        { index: true, element: <Home/> },
        { path : "projects", element: <Projects/> },
        { path : "users", element: <Users/> },
        { path : "tasks", element: <Tasks/>},
        { path : "tasks/addTask", element: <AddNewTask/> },
        { path : "pie", element: <Bar/> },] 
      

    },
    {
      path : "/",
      element : <AuthLayout/>,
      errorElement : <NotFound/>,
      children : [
        { index: true, element: <Login saveAdminData = {saveAdminData}/> },
        { path : "/login", element: <Login saveAdminData = {saveAdminData}/> },
     
       
        { path : "/register", element: <Register/> }, 
        { path : "/restPassword", element: <RestPassword/> }, 
        { path : "/requestRestPass", element: <RequestResetPass/> },
        { path : "/changePassword", element: <ChangePassword/> },
        { path : "/verify", element: <VerfiyUser/> },
      ]
    }
  ])

  return (
    <>

      <ToastContainer
        theme='colored'
        autoClose={2000}
        position='top-left'
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
      <RouterProvider router={routes}/>

    </>
  )
}

export default App
