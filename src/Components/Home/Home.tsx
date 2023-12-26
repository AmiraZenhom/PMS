import { useContext, useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import PP from"../../assets/images/download.png"
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import Bar from "../PieCharts/Bar";
export default function Home() {
  const { baseUrl, requstHeaders }: any = useContext(AuthContext);
  const [contTasks, setContTasks] = useState([]);
 const [contUsers, setcontUsers] = useState([]);

  const getContTasks= () => {
    axios
      .get(`${baseUrl}/Task/count`, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response)
        setContTasks(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getContUsers= () => {
    axios
      .get(`${baseUrl}/Users/count`, {
        headers: requstHeaders,
      })
      .then((response) => {
        console.log(response)
        setcontUsers(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getContTasks();
    getContUsers();
  
   
  }, [])
  
    return (
        <>
          <div className="">
          <div className="my-4 mx-3 rounded-3">
                <Header>
                   <div className="bgHome text-white py-5 px-4">
                    <h1 className="my-3">Welcome <span className="text1">Upskilling</span></h1>
                    <p className="my-3 fs-2">You can add project and assign tasks to your team</p>
                   </div>
                </Header>
            </div>
          <div className="container">
          <div className="row ps-3">
               
               <div className="col-md-6 px-2  one rounded-3 ">
               <div className="borderLeft m-4 w-75 px-2  ">
                   <h5>Tasks</h5>
                   <p className="mt-2">Lorem ipsum dolor sit amet,consecteture</p>
               </div>
                   <div className="row justify-content-evenly align-Items-center">
                       <div className="col-md-3  text-center rounded-3  pt-3 one1">
                       
                       <i className="fa-solid fa-chart-column fs-1"></i>
                       <p>Progress</p>
                       <p>{contTasks.inProgress}</p>
                       </div>
                       <div className="col-md-3 text-center rounded-3 pt-3 one2 ">
                          
                       <i className="fa-solid fa-clipboard-list fs-1"></i>
                       <p>Tasks Number</p>
                       <p>22225</p>
                       </div>
                       <div className="col-md-3  text-center rounded-3 pt-3 one3 ">
                       
                       <i className="fa-solid fa-clipboard-user fs-1"></i>
                       <p>Projects Number</p>
                       <p>22225</p>
                       </div>
                   </div>
               </div>
             <div className="col-md-6 ">
             <div className="mx-1 bg-white rounded-3 " >
                  <div className="mx-2"> <p>Progress</p>
                   <p>Lorem ipsum dolor sit amet,consecteture</p></div>
                   <div className="row rounded-3  w-25 mx-1">
                   <div className="col-md-3   "> 
                          <i className="fa-solid fa-clipboard-list mt-2 "></i>
                          </div>
                          <div className="col-md-9">
                            <p>Tasks</p>
                           <p>22225</p></div>
                   </div>
                   <div className="col-md-12  ">
                      <Bar/>
                   </div>
               </div>
             </div>
           </div>
          </div>

          </div>
        </>
    )
}
