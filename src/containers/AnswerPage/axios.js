
import * as Actions from './actions';
import * as Constants from '../constant';
import callApi from '../api/apiCaller';

export const fetchQuestionsOfLesson = async (lessonId, dispatch) => {
    let res = await callApi(`question_response`); //TODO: Change later
    if (res != null) {
        handleResponse(res, dispatch, Constants.FETCH_QUESTIONS);
    }
}

const handleResponse = async (res, dispatch, action) => {
    let status = res.status;
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