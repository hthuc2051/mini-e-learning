
import callApi from '../api/apiCaller';
import * as Actions from './actions';
import * as Constants from '../constant';

export const getMainBox = async (userId,dispatch) => {
    console.log(userId);
    let res = await  callApi(Constants.DASHBOARD_ENDPOINT,"GET",userId.id,Constants.DASHBOARD); //TODO: Change later
    if (res != null) {
        handleResponse(res, dispatch, Constants.DASHBOARD);
    }
    console.log(res);
}


    const handleResponse = async (res, dispatch, action) => {
        let status = res.status;
        let messages = '';
        switch (status) {
            case 200:
                await dispatch(Actions.is2xx(200, action, res.data));
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
