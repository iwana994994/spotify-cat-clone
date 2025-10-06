import  axiosInstance  from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore.tsx";
import { useChatStore } from "@/stores/useChat.tsx";

import { useAuth } from "@clerk/clerk-react";

import { Loader } from "lucide-react";


import { useEffect, useState } from "react";


const updateApiToken = async (token:string |null) => {
    if(token){
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else{
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
    
}
const AuthProvaider = ({children}:{children:React.ReactNode}) => {
    const {getToken,userId}=useAuth();
    const [loading, setloading] = useState(true)
    const {checkAdmin}=useAuthStore();
    const {initSocket,disconnectSocket}=useChatStore();
  

    useEffect(() => {
        
    const inithAuth = async () => {
        try {
            const token = await getToken();
            await updateApiToken(token);
            	if (token) {
					await checkAdmin();
                   if(userId)
                   {initSocket(userId)}
                }
           console.log("Auth initialized successfully!");
    }
      
                
    
   catch (error) {
				updateApiToken(null);
				console.log("Error in auth provider", error);
			}
  finally {
           setloading(false);
        }
};
  inithAuth();   
  return () => disconnectSocket();
    }, [getToken, checkAdmin,disconnectSocket,initSocket,userId]);
if(loading){
    return (
    <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-8 text-emerald-500"></Loader>
    </div>)
}
    return (<>{children}</>)
}


export default AuthProvaider;