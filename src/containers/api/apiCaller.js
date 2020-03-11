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
    let headers = {};
    let result = null;
    if (callKey === Constants.LOGIN || callKey === Constants.REGISTER || callKey == Constants.SAVE_LESSON) {
        headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        };
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
    }else if( callKey == Constants.DASHBOARD || callKey == Constants.QUESION){
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        };

        try {
            result = await axios({
                method: method,
                url: `${Config.API_URL}/${endpoint}/${body}`,
                data:body,
                headers: headers
            })
        } catch (err) {
            result = err.response;
        }
    }else{
        
    }




    return result;
}
