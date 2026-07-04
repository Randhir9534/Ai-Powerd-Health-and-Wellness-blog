import axios from "axios";
import base_url from "./api";

let axiosInstance=axios.create({
    baseURL: base_url
});

axiosInstance.interceptors.request.use(
    async function (config){
        const token=localStorage.getItem("token");
        if(token){
            config.headers.Authorization=token
            config.headers["x-access-token"]=token;
            // config.headers.Autorization=`Bearer${token};
        }
        return config;
    },
    function(err){
        return Promise.reject(err);
    }
);
export default axiosInstance;

// img path setup
// export const authDetailsPath=(media)=>{
//     return base_url+`uploads/user/profile_pic/${media}`
// }
