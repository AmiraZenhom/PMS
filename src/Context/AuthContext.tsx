import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react" ;

export let AuthContext = createContext(null)

export default function AuthContextProvider(props){

    const [userRole , setUserRole] = useState(null)
    // ******************* to baseUrl for apis *******************
    const baseUrl = `http://upskilling-egypt.com:3003/api/v1`;
    const requstHeaders = { 
        Authorization : `Bearer ${localStorage.getItem("adminToken")}`,
    }
   
    
    // ******************* to decoded token *******************
    const [adminData , setAdminData] = useState(()=> localStorage.getItem("adminToken"));

    const saveAdminData = ()=> {
        const encodedToken = localStorage.getItem("adminToken");
        try{
            const decodedToken = jwtDecode(encodedToken);
            setUserRole(decodedToken.userGroup); 
            setAdminData(decodedToken)
        }catch (error){
            setAdminData(null)
        }
    }
    
    useEffect( ()=> {
        if (localStorage.getItem("adminToken")) {
            saveAdminData()
        }
    } , [])

    return (  <AuthContext.Provider value= {{adminData , saveAdminData ,userRole , baseUrl, requstHeaders }} > 
                {props.children} 
            </AuthContext.Provider>)

}