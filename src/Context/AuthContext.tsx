import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react" ;

export let AuthContext = createContext(null)

export default function AuthContextProvider(props){


    // ******************* to baseUrl for apis *******************
    const baseUrl = `http://upskilling-egypt.com:3003/api/v1`;
   
    
    // ******************* to decoded token *******************
    const [adminData , setAdminData] = useState(()=> localStorage.getItem("adminToken"));

    const saveAdminData = ()=> {
        const encodedToken = localStorage.getItem("adminToken");
        try{
            const decodedToken = jwtDecode(encodedToken);
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

    return (  <AuthContext.Provider value= {{adminData , saveAdminData  , baseUrl }} > 
                {props.children} 
            </AuthContext.Provider>)

}