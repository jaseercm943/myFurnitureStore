
import axios from "axios";

 const commonAPI=async(http,url,reqBody,reqHeader)=>{
    const configuration={
        method:http,
        url:url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Connection-Type":"application/json"}
    }

    return await axios(configuration).then(res=>{
        // console.log(res);
        
        return res

    }).catch(err=>{
        // console.log(err);
        
        return err
    })
}
export  default commonAPI