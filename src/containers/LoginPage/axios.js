
import callApi from '../api/apiCaller';
import * as Actions from './actions';
import * as Constants from '../constant';

export const login = async (dispatch, name, password) => {
    let data = JSON.stringify({username : name,password : password});
    console.log(data);
    let res = await callApi(Constants.LOGIN_ENDPOINT,Constants.POST_METHOD,data,Constants.LOGIN); //TODO: Change later
    if (res != null) {
        handleResponse(res, dispatch, Constants.LOGIN);
    }
}

    const handleResponse = async (res, dispatch, action) => {
        let status = res.status;
        let messages = '';
        switch (status) {
            case 200:
                await dispatch(Actions.is2xx(status,action,res.data));
                break;
            case 400:
                // await dispatch(Actions.isNot2xx(400, messages));
                break;
            case 401:
                // await dispatch(Actions.isNot2xx(401, Constants.MSG_REQUEST_LOGIN));
                break;
            case 403:
                // await dispatch(Actions.isNot2xx(403, Constants.MSG_REQUEST_LOGIN));
                break;
            case 404:
                // messages = await getMessages(res.data.message);
                // await dispatch(Actions.isNot2xx(404, messages));
                break;
            case 408:
                await dispatch(Actions.isNot2xx(408, action + Constants.PREFIX_TIME_OUT));
                break;
            default:
                await dispatch(Actions.isNot2xx(500, action + Constants.PREFIX_FAILED));
                break;
        }
    }
