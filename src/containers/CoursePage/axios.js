
import * as Actions from './actions';
import * as Constants from '../constant';
import callApi from '../api/apiCaller';

export const fetchCourse = async (courseId, dispatch) => {
    // let res = await callApi(`course`); //TODO: Change later
    // if (res != null) {
        let res = 
        {
            "status":200,
            "data" : "hello",
        };
        handleResponse(res, dispatch, Constants.FETCH_COURSE);
    // }
}


const handleResponse = async (res, dispatch, action) => {
    let status = res.status;
    console.log("AXIOUS");
    let messages = '';
    switch (status) {
        case 200:
            await dispatch(Actions.is2xx(200, action + Constants.PREFIX_OK, res.data));
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