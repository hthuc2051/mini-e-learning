import axios from "axios";
import * as Config from '../../Config';
import * as Constants from '../constant';
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
      let headers = {}
    if (callKey === Constants.LOGIN ||callKey === Constants.REGISTER) {
         headers = { 'Content-Type': 'application/json',
         'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With' };
    }else if(callKey == Constants.DASHBOARD){
        headers = {
        'Access-Control-Allow-Origin':'*',
       'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
   'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With' };
    }

    let result = null;
    console.log(endpoint);
    console.log(Config.API_URL);
    try {
        result = await axios({
            method: method,
            url: `${Config.API_URL}/${endpoint}`,
            data: body,
            headers: headers
        })
    } catch (err) {
        result = err.response;
    }
    return result;
}
