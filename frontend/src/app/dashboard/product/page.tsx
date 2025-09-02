import {Form} from "./components/form"
import { getCookieServer } from "@/lib/cookieServer"
import { api } from "@/services/api";

export default async function Product(){
    const token = await getCookieServer();

    const response = await api.get("/category", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return(    
        <Form categories={response.data}/> 
    )
}