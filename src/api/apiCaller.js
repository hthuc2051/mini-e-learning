import axios from "axios";

export default async function callApi(endpoint, method = "GET", body, callKey) {
    //   const token = localStorage.getItem("USER");
    //   let headers = {}
    //   if (callKey === 'ADMIN') {
    //     headers = { 'Authorization': token }
    //   } else if (callKey === 'UPLOAD') {
    //     headers = { 'Authorization': token, 'Content-Type': 'multipart/form-data' }
    //   } else if (callKey === 'LOGIN') {
    //     headers = { 'Content-Type': 'application/json' }
    //   }
    let result = null;
    try {
        result = await axios({
            method: method,
            url: `/api/${endpoint}`,
            data: body,
            headers: headers
        })
    } catch (err) {
        result = err.response;
    }
    return result;
}
